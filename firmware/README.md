# Firmware

EMILY:
- ssd1306.py: the driver for the screens. this must be uploaded onto the pico so the screens can actually
display something!
- main.py: our main file where the game is run from. since this is free-play now, we can have it all in one file
- functions.py: contains helpful functions used in main.py()

HAcK Day 1 progress: functional joystick and screens; functional menu screen for game; able to display tiles
on second screen

HAcK Day 2 TO-DO:
1. insert micropico code into the repo (ask one of the Julians how to do this!)
2. implement functions.py with:
- display_choices(), which will display the menu items, 
- volume_control(), which will display the current volume percentage on oled1, 
- sound_effects(), which will display the current sound effect being used, and will end the game when the
joystick is pressed down
- flash_tile(), which will flash the tile every time its corresponding button is pressed

3. integrate buttons into the board with joystick, screens, and potentiometer
- collaborate with Phillip on the buttons and sound effects (import his files into main.py?)
- place the buttons on a separate breadboard to minimize disorganization

4. learn a song

5. begin schematic on TinkerCad

- OVERALL GOAL: have a working game before the end of the day! Help Tasfia put everything together!!
