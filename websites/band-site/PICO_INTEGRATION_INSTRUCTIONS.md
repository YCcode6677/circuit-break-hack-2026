# Circuit Break — Pico to Website Integration Checklist

This guide assumes the website visualizer is already working with keyboard input.

The goal is only to connect the physical Pico to the existing website without changing the visual system.

---

## 1. Pico firmware

### File to modify

Use the Pico file that currently controls the 8 buttons and PWM outputs.

Recommended repository location:

```text
pico/main.py
```

### What to change

Keep the current button pins, PWM pins, frequencies, and sound-generation logic.

Add USB serial output so that each new physical button press sends one note event to the website.

The physical button mapping must stay:

| Pico Pin | Note | Website Index |
|---|---|---:|
| GP14 | C4 | 0 |
| GP13 | D4 | 1 |
| GP11 | E4 | 2 |
| GP9 | F4 | 3 |
| GP7 | G4 | 4 |
| GP5 | A4 | 5 |
| GP3 | B4 | 6 |
| GP1 | C5 | 7 |

Important:

- One physical press should create one website event.
- Do not repeatedly send the same event while a button is being held.
- The website needs the note name and the matching index.
- Do not change the index order.

Before website integration, verify the Pico outputs indices `0` through `7` correctly.

---

## 2. Create the browser-to-Pico connection file

### File to create

```text
src/components/visualizer/picoSerial.js
```

### What this file should do

This file should:

1. Request access to the Pico serial port from the browser.
2. Open the serial connection.
3. Continuously read data from the Pico.
4. Split incoming serial data into individual messages.
5. Parse each message.
6. Pass the parsed Pico event into `Visualizer.jsx`.
7. Provide a way to disconnect and close the serial port.

Do not put Dino animation, NoteEffects, or song logic in this file.

Its only responsibility is:

```text
Pico USB
→ Browser Serial
→ Parsed Event
→ Visualizer.jsx
```

---

## 3. Modify `Visualizer.jsx`

### File

```text
src/components/visualizer/Visualizer.jsx
```

This is the main file that needs to receive Pico input.

---

### Change A — Import the Pico serial helper

At the top of `Visualizer.jsx`, near the other imports, add the functions exported from:

```text
./picoSerial
```

The visualizer needs one function to connect and one function to disconnect.

---

### Change B — Move the song functions outside the keyboard `useEffect`

In the current file, these functions are inside the keyboard `useEffect`:

```text
resetSong()
showVictory()
processSongNote()
```

Move all three functions out of the keyboard `useEffect`.

They should still remain inside:

```text
Visualizer()
```

Place them above the keyboard `useEffect`.

This is necessary because both:

```text
Keyboard input
and
Pico input
```

must be able to call the same song-progress function.

Do not change the logic inside these functions.

---

### Change C — Add Pico connection state

Near the existing React state variables, add a state value that records whether the Pico is connected.

The website should be able to display:

```text
USB // OFFLINE
```

or:

```text
USB // CONNECTED
```

---

### Change D — Add one Pico event handler

Add a new function inside `Visualizer()`.

Place it:

```text
after processSongNote()
before the keyboard useEffect
```

This function should receive parsed Pico events.

For a note event, it must update the same existing website values that keyboard input currently updates:

```text
note
noteIndex
triggerId
song progress
```

The important part is that the Pico note index must also be passed into:

```text
processSongNote()
```

Do not create a second song-progress system for the Pico.

The Pico and keyboard must share the existing song logic.

---

### Change E — Add connect and disconnect handlers

Inside `Visualizer()`, add:

```text
handleConnectPico()
handleDisconnectPico()
```

The connect handler should:

1. Ask `picoSerial.js` to connect.
2. Pass the Pico event handler to it.
3. Mark the Pico as connected after success.

The disconnect handler should:

1. Close the serial connection.
2. Mark the Pico as disconnected.

---

## 4. Add a CONNECT PICO control

### File

```text
src/components/visualizer/Visualizer.jsx
```

### Where to add it

Find the existing top HUD:

```text
<VisualizerHUD position="top" />
```

Add the Pico connection controls directly below the top HUD and before:

```text
<div className="viz-stage">
```

The layout should be:

```text
Top HUD
↓
Pico Connect / Disconnect control
↓
Visualizer Stage
↓
Bottom HUD
```

The control should show:

```text
CONNECT PICO
USB // OFFLINE
```

before connection.

After connection:

```text
DISCONNECT PICO
USB // CONNECTED
```

Do not place this button inside `Dino.jsx` or `NoteEffects.jsx`.

---

## 5. Add Pico connection styling

### File

```text
src/components/visualizer/Visualizer.css
```

### Where to modify

Add a new Pico connection section near the bottom of the file.

Only add styles for:

```text
Pico connection bar
Connect / Disconnect button
Connection status text
```

Do not modify the existing Dino animation CSS.

Do not modify the existing NoteEffects CSS.

Do not modify the existing victory-screen CSS.

The current CSS already contains the final result screen styles, including:

```text
.circuit-broken-screen
.circuit-broken-flash
.circuit-broken-content
.circuit-broken-title
.circuit-broken-status
.circuit-broken-crack
```

Those should remain unchanged.

---

## 6. Keep the final song sequence as `0–7`

### File

```text
src/components/visualizer/Visualizer.jsx
```

### Find

```text
SONG_SEQUENCE
```

The final version must represent:

```text
0 1 2 3 4 5 6 7
```

Keyboard equivalent:

```text
A S D F G H J K
```

Physical Pico equivalent:

```text
GP14
GP13
GP11
GP9
GP7
GP5
GP3
GP1
```

The final GP1 / `index 7` press is the note that should trigger the result screen.

If the current array contains additional notes after `7`, remove them.

---

## 7. How the final result should be triggered

Do not make the Pico send a separate victory command.

The intended flow is:

```text
Physical Pico Note
↓
picoSerial.js
↓
Pico event handler in Visualizer.jsx
↓
Existing note state updates
↓
processSongNote(index)
↓
SONG_SEQUENCE reaches 8 / 8
↓
showVictory()
↓
songComplete = true
↓
THE CIRCUIT HAS BEEN BROKEN!
```

The existing `processSongNote()` function should remain responsible for deciding when the song is complete.

The existing `showVictory()` function should remain responsible for turning on the final screen.

The existing result screen should still disappear after the current timer finishes.

---

## 8. Do not modify these files for Pico integration

The Pico connection should not require changes to:

```text
src/components/visualizer/Dino.jsx
src/components/visualizer/NoteEffects.jsx
src/components/visualizer/VisualizerBackground.jsx
src/components/visualizer/VisualizerHUD.jsx
```

The existing visualizer already reacts to:

```text
noteIndex
triggerId
volume
```

The Pico integration only needs to feed the correct values into `Visualizer.jsx`.

---

## 9. Final physical test

After integration:

1. Connect the Pico with a USB data cable.
2. Close Thonny or any other serial monitor.
3. Open the website in desktop Chrome or Edge.
4. Click `CONNECT PICO`.
5. Select the Pico serial device.
6. Confirm the website shows `USB // CONNECTED`.
7. Test every physical note button.
8. Confirm each button updates the HUD.
9. Confirm each button triggers the existing Dino animation.
10. Confirm each button triggers the existing NoteEffect.
11. Play the physical sequence `0 1 2 3 4 5 6 7`.
12. Confirm the final GP1 / index `7` triggers:

```text
THE CIRCUIT
HAS BEEN BROKEN!
```

---

## 10. Debug order

If the Pico does not control the website, check in this order:

```text
Pico button mapping
↓
Pico USB serial output
↓
picoSerial.js
↓
Visualizer.jsx Pico event handler
↓
setNote / setNoteIndex / setTriggerId
↓
processSongNote(index)
```

Do not start by changing Dino or NoteEffects.

---

## Final integration rule

The Pico should only provide input data.

The existing React website should continue controlling:

```text
Dino animations
NoteEffects
HUD
Song progress
Final result screen
```

The final completion sequence is:

```text
0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
```

and `index 7` is the final trigger.

# How to trigger song final action and change it to real sequence
## Song Sequence

//this function is the ** visualizer.jsx **
For testing:

const SONG_SEQUENCE = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
];

This means:

A S D F G H J K

When the real song is finalized, only change this array.

Example:

A A G G H H G

becomes:

const SONG_SEQUENCE = [
    0,
    0,
    4,
    4,
    5,
    5,
    4,
]