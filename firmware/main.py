from machine import Pin, I2C, ADC
import ssd1306
import time
import functions


# to get data from the joystick
adc_x = ADC(Pin(26))
adc_y = ADC(Pin(27))
sw = Pin(22, Pin.IN, Pin.PULL_UP)

# setting up the screens
i2c0 = I2C(0, sda=Pin(16), scl=Pin(17), freq=400000)
i2c1 = I2C(1, sda=Pin(18), scl=Pin(19), freq=400000)
oled1 = ssd1306.SSD1306_I2C(128, 64, i2c0, addr=0x3C)
oled2 = ssd1306.SSD1306_I2C(128, 64, i2c1, addr=0x3C)

choices = ["1: Ode to Joy", "2: Mary's Lamb", "3: Twinkle", "4: Quit"]
yPosSongs = [27, 36, 45, 54, 63]
effects = ["Vibrato", "Distortion", "Flute", "Distortion Flute", "No effect"]
tiles = [0,1,2,3,4,5,6,7]

functions.start_audio_engine()
while True:
    oled1.text('This is Circuit', 0, 0)
    oled1.text('Break!', 0, 9)
    oled1.text('Pick a song:', 0, 18)

    #higlighting the first song
    highlight_width = len(choices[0]) * 8 + 4
    highlight_length = 9
    oled1.fill_rect(0, 27, highlight_width, highlight_length, 1)
    oled1.text(choices[0], 2, 28, 0)

    for i in range(1,4):
        oled1.text(choices[i], 0, yPosSongs[i])
    oled1.show()


    #getting user choice from the joystick
    # Read raw 16-bit analog values
    button_pressed = sw.value() == 0 # Read button state (True when pressed)
    userChoice = 0 #default to first choice
    while button_pressed == 0:
        x_raw = adc_x.read_u16()
        y_raw = adc_y.read_u16()

        # clear the previous rectangle first
        oled1.fill_rect(1,yPosSongs[userChoice], highlight_width, highlight_length, 0)
        oled1.text(choices[userChoice], 0, yPosSongs[userChoice], 1)
        oled1.show()

        # Scroll up from the MIDDLE point, but we cant go past the first choice
        if(x_raw < 400 and userChoice != 0):
            userChoice -= 1
            highlight_width = len(choices[userChoice]) * 8 + 4
            highlight_length = 9
            oled1.fill_rect(0, yPosSongs[userChoice], highlight_width, highlight_length, 1)
            oled1.text(choices[userChoice], 2, yPosSongs[userChoice]-1, 0)
            oled1.show()

        # scroll down from the MIDDLE point, but we cant go past the last choice
        elif(x_raw > 60000 and userChoice != 3):
            userChoice += 1
            highlight_width = len(choices[userChoice]) * 8 + 4
            highlight_length = 9
            oled1.fill_rect(0, yPosSongs[userChoice], highlight_width, highlight_length, 1)
            oled1.text(choices[userChoice], 2, yPosSongs[userChoice]-1, 0)
            oled1.show()

        else: #just display the choice the user is on
            highlight_width = len(choices[userChoice]) * 8 + 4
            highlight_length = 9
            oled1.fill_rect(0, yPosSongs[userChoice], highlight_width, highlight_length, 1)
            oled1.text(choices[userChoice], 2, yPosSongs[userChoice]-1, 0)
            oled1.show()

        button_pressed = sw.value() == 0
        time.sleep(0.1)

    oled1.fill(0)
    oled1.show()

    if userChoice == 3:
        break

    else:
        oled1.text("Your selection:", 0,0)
        oled1.text(choices[userChoice], 0, 9)
        oled1.text("Now playing...", 0, 36)
        oled1. text("Look at the next", 0, 45)
        oled1.text("screen...", 0, 54)
        oled1.show()

        time.sleep(2)

        oled1.fill(0)
        oled1.show()

        button_pressed = sw.value() == 0
        while button_pressed == 0: #free-play will end when the user presses down on the joystick
            x_raw = adc_x.read_u16()
            y_raw = adc_y.read_u16()
            effectIdx = functions.sound_effect(x_raw, y_raw)
            functions.update_joystick_effects(x_raw, y_raw)
            
            # Send current note information to website
            functions.print_notes(functions.BUTTON_PINS)

            for i in range(8):
                if functions.BUTTON_PINS[i].value() == 0:
                    if i < 4:
                        oled2.fill_rect(i*32,0,30,31,0)
                    else:
                        oled2.fill_rect((i-4)*32,33,30,31,0)
                    oled2.show()

            oled1.fill(0)
            oled1.show()

            # OLED 2
            oled2.fill_rect(0,0,30,31,1) #0
            oled2.fill_rect(32,0,30,31,1) #1
            oled2.fill_rect(64,0,30,31,1) #2
            oled2.fill_rect(96,0,30,31,1) #3

            oled2.fill_rect(0,33,30,31,1) #4
            oled2.fill_rect(32,33,30,31,1) #5
            oled2.fill_rect(64,33,30,31,1) #6
            oled2.fill_rect(96,33,30,31,1) #7
            oled2.show()

            # OLED 1
            # Read value from pot and convert to percentage
            vol = functions.get_volume()*100
            oled1.text('Volume: ' + f"{vol:.2f}" + '%', 0, 0) #value it outputs has to be controlled by the potentiometer.

            oled1.show()
            #The loop for the sound effect has to run as long as the song is playing and stop once its done
            oled1.text("Sound effect: ",0, 9 )
            oled1.text(effects[effectIdx], 0, 18)
            oled1.show()

            button_pressed = sw.value() == 0
            #time.sleep(0.1)

        oled1.fill(0)
        oled2.fill(0)
        oled1.text("The circuit has", 0, 0)
        oled1.show()
        oled2.text("been broken!", 0, 0)
        oled2.show()
        time.sleep(3)
        oled1.fill(0)
        oled2.fill(0)
        oled1.show()
        oled2.show()




oled1.text("Goodbye!", 0, 0)
oled2.fill(0)
oled1.show()
oled2.show()
time.sleep(1)
oled1.poweroff()
oled2.poweroff()