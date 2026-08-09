import micropython
import math
from array import array
from machine import Pin, I2S, ADC

# Use potentiometer for volume
pot = ADC(Pin(26))

def get_volume():
    # Read value from pot and convert to percentage
    raw_value = pot.read_u16()
    percentage = raw_value / 65535.0
    return percentage

# Setup audio
rate = 22050
bits = 16
CHUNK = 256
MAX_AMPLITUDE = 8000
TABLE_SIZE = 512  # Must be a power of 2 (mask trick below relies on it)

sck_pin = Pin(16) # Bit clock
ws_pin = Pin(17) # Left-right clock
sd_pin = Pin(18) # Digital input

audio_out = I2S(
    0, sck=sck_pin, ws=ws_pin, sd=sd_pin,
    mode=I2S.TX, bits=bits, format=I2S.MONO,
    rate=rate, ibuf=4000
)

# 16-bit signed sine table for speed
sine_table = array('h', [int(32767 * math.sin(2 * math.pi * i / TABLE_SIZE)) for i in range(TABLE_SIZE)])

# Triangle waveform table for different timbre
triangle_table = array('h', [0] * TABLE_SIZE)
for i in range(TABLE_SIZE):
    # Normalize position within the cycle to -1.0 .. 1.0 triangle shape
    if i < TABLE_SIZE // 4:
        # Rising from 0 to peak (0 -> 1)
        value = i / (TABLE_SIZE // 4)
    elif i < TABLE_SIZE // 2:
        # Falling from peak to 0 (1 -> 0)
        value = 1.0 - (i - TABLE_SIZE // 4) / (TABLE_SIZE // 4)
    elif i < 3 * TABLE_SIZE // 4:
        # Falling from 0 to trough (0 -> -1)
        value = -(i - TABLE_SIZE // 2) / (TABLE_SIZE // 4)
    else:
        # Rising from trough to 0 (-1 -> 0)
        value = -1.0 + (i - 3 * TABLE_SIZE // 4) / (TABLE_SIZE // 4)

    triangle_table[i] = int(32767 * value)

NUM_VOICES = 4
BUTTON_PINS = [Pin(4, Pin.IN, Pin.PULL_UP), Pin(5, Pin.IN, Pin.PULL_UP),
               Pin(6, Pin.IN, Pin.PULL_UP), Pin(7, Pin.IN, Pin.PULL_UP)]
NOTE_FREQS = [261, 329, 392, 440]  # C4, E4, G4, A4

FRAC_BITS = 16  # Fixed-point precision for phase accumulation
phase = array('i', [0] * NUM_VOICES)
step = array('i', [0] * NUM_VOICES)  # 0 = voice silent, recomputed each chunk

out_buf = array('h', bytes(CHUNK * 2))

@micropython.viper
def synth_chunk(out: ptr16, n: int, sine: ptr16, phase_arr: ptr32, step_arr: ptr32, 
                voices: int, amp: int, drive: int, clip: int):
    active_count = 0
    for v in range(voices):
        if step_arr[v] != 0:
            active_count += 1
    if active_count == 0:
        for i in range(n):
            out[i] = 0
        return
    for i in range(n):
        acc = 0
        for v in range(voices):
            s = step_arr[v]
            if s != 0:
                p = phase_arr[v]
                idx = (p >> 16) & 511  # table index, wraps automatically
                acc += sine[idx]
                phase_arr[v] = p + s

        # Average voices and apply gain
        mixed = (acc // active_count) * drive

        # Hard clip
        if mixed > clip:
            mixed = clip
        elif mixed < -clip:
            mixed = -clip

        # Scale down to fit output range
        out[i] = mixed * amp // clip

# Distortion
DRIVE = 3  # 1 = no distortion
CLIP_THRESHOLD = 32767  # Max value before clipping

# Vibrato
VIBRATO_RATE = 5  # (Hz)
VIBRATO_INTENSITY = 0.02  # Max frequency deviation as fraction (2%)
vibrato_phase = 0.0

# Flute
FLUTE = True

def audio_loop():
    global vibrato_phase
    while True:
        # Increase vibrato phase by one chunk's worth of time
        vibrato_phase += 2 * math.pi * VIBRATO_RATE * (CHUNK / rate)
        if vibrato_phase > 2 * math.pi:
            vibrato_phase -= 2 * math.pi

        # Convert to multiplier
        pitch_mult = 1.0 + (math.sin(vibrato_phase) * VIBRATO_INTENSITY)

        for idx in range(NUM_VOICES):
            if BUTTON_PINS[idx].value() == 0:  # pressed
                freq = NOTE_FREQS[idx] * pitch_mult
                step[idx] = int((freq * TABLE_SIZE * (1 << FRAC_BITS)) / rate)
            else:
                step[idx] = 0
        if (FLUTE):
            # Adjust volume with get_volume()
            synth_chunk(out_buf, CHUNK, triangle_table, phase, step, NUM_VOICES, 
                        int(MAX_AMPLITUDE * get_volume()), DRIVE, CLIP_THRESHOLD)
        else:
            synth_chunk(out_buf, CHUNK, sine_table, phase, step, NUM_VOICES, 
                        int(MAX_AMPLITUDE * get_volume()), DRIVE, CLIP_THRESHOLD)
        
        audio_out.write(out_buf)

try:
    audio_loop()
except KeyboardInterrupt:
    print("\nStopping audio hardware.")
finally:
    audio_out.deinit()