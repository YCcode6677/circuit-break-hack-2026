import _thread #gemini
import micropython
import math
from array import array
from machine import Pin, I2S, ADC

# Use potentiometer for volume
pot = ADC(Pin(28))

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
TABLE_SIZE = 512  # must be a power of 2 (mask trick below relies on it)

sck_pin = Pin(20) #bclk
ws_pin = Pin(21) #lrc pin
sd_pin = Pin(15) #din

audio_out = I2S(
    0, sck=sck_pin, ws=ws_pin, sd=sd_pin,
    mode=I2S.TX, bits=bits, format=I2S.MONO,
    rate=rate, ibuf=16384
)

# 16-bit signed sine table for speed
sine_table = array('h', [int(32767 * math.sin(2 * math.pi * i / TABLE_SIZE)) for i in range(TABLE_SIZE)])

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

NUM_VOICES = 8
BUTTON_PINS = [Pin(14, Pin.IN, Pin.PULL_UP), Pin(13, Pin.IN, Pin.PULL_UP),
               Pin(11, Pin.IN, Pin.PULL_UP), Pin(9, Pin.IN, Pin.PULL_UP),
               Pin(7, Pin.IN, Pin.PULL_UP), Pin(5, Pin.IN, Pin.PULL_UP),
               Pin(3, Pin.IN, Pin.PULL_UP), Pin(1, Pin.IN, Pin.PULL_UP),]
NOTE_FREQS = [262, 294, 330, 349, 392, 440, 493, 523]  # Major C scale in order

FRAC_BITS = 16  # fixed-point precision for phase accumulation
phase = array('i', [0] * NUM_VOICES)
step = array('i', [0] * NUM_VOICES)  # 0 = voice silent, recomputed each chunk

out_buf = array('h', bytes(CHUNK * 2))

DRIVE = 1  # 1 = no distortion
CLIP_THRESHOLD = 32767  # Max value before clipping
VIBRATO_RATE = 5  # (Hz)
VIBRATO_INTENSITY = 0.02  # Max frequency deviation as fraction (2%)
USE_TRIANGLE = False

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

#from gemini
def update_joystick_effects(x_data, y_data):
    global DRIVE, CLIP_THRESHOLD, VIBRATO_INTENSITY, USE_TRIANGLE

    if y_data < 400:
        #vibrato
        DRIVE = 1
        CLIP_THRESHOLD = 32767
        VIBRATO_INTENSITY = 0.03
        USE_TRIANGLE = False
    elif y_data > 60000:
        #distortion
        DRIVE=4
        CLIP_THRESHOLD=10000
        VIBRATO_INTENSITY=0.03
        USE_TRIANGLE=False
    elif x_data < 400:
        #flute
        DRIVE = 1
        CLIP_THRESHOLD = 12000
        VIBRATO_INTENSITY = 0.0
        USE_TRIANGLE=True
    elif x_data>60000:
        #distortion flute?
        DRIVE=3
        CLIP_THRESHOLD=32767
        VIBRATO_INTENSITY=0.0
        USE_TRIANGLE=False
    else:
        #center-nothing
        DRIVE=1
        CLIP_THRESHOLD=32767
        VIBRATO_INTENSITY=0.0
        USE_TRIANGLE=False
        
# Send note information over USB serial to website
def print_notes(buttons): # List of buttons
    for i in range(len(buttons)):
        # Check if any buttons are pressed
        if buttons[i].value() == 1:
            print(f"Note {i} pressed")

def audio_thread_loop():
    vibrato_phase = 0.0
    while True:
        if VIBRATO_INTENSITY > 0.0:

            # Increase vibrato phase by one chunk's worth of time
            vibrato_phase += 2 * math.pi * VIBRATO_RATE * (CHUNK / rate)
            if vibrato_phase > 2 * math.pi:
                vibrato_phase -= 2 * math.pi

            # Convert to multiplier
            pitch_mult = 1.0 + (math.sin(vibrato_phase) * VIBRATO_INTENSITY)
        else:
            pitch_mult = 1.0

        for idx in range(NUM_VOICES):
            if BUTTON_PINS[idx].value() == 0:  # pressed
                freq = NOTE_FREQS[idx] * pitch_mult
                step[idx] = int((freq * TABLE_SIZE * (1 << FRAC_BITS)) / rate)
            else:
                step[idx] = 0

        active_table = triangle_table if USE_TRIANGLE else sine_table

        # Send current note information to website
        print_notes(BUTTON_PINS)
        
        # Adjust volume with get_volume()
        synth_chunk(out_buf, CHUNK, active_table, phase, step, NUM_VOICES, 
                    int(MAX_AMPLITUDE * get_volume()), DRIVE, CLIP_THRESHOLD)
        audio_out.write(out_buf)
            
def start_audio_engine(): #from gemini
    _thread.start_new_thread(audio_thread_loop, ())

def sound_effect(x_data, y_data):
    if (y_data < 400):
        return 0
    elif(y_data > 60000):
        return 1
    elif(x_data < 400):
        return 2
    elif(x_data > 60000):
        return 3
    else:
        return 4
