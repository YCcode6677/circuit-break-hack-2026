def sound_effect(x_data, y_data):
    sound_effects = ["Vibrato", "Effect2", "Effect3", "Effect 4", "normal sound"]
    if (y_data < 400):
        return "Vibrato"
    elif(y_data > 60000):
        return "Effect 2"
    elif(x_data < 400):
        return "Effect 3"
    elif(x_data > 60000):
        return "Effect 4"
    else:
        return "No Effect"
        