# WebSocket and Pico Integration Guide

## Current Status

The WebSocket functionality has been added to the website.

The website can now receive the following types of data through the WebSocket server:

```text
NOTE:x
EFFECT:x
VOLUME:x
```

The complete website-side flow has been tested using simulated Pico input:

```text
Mock Input
    ↓
picoServer.js
    ↓
WebSocket
    ↓
Visualizer.jsx
    ↓
Website Visuals
```

The simulated tests for notes, effects, volume, song progress, and the final victory screen all worked correctly.

Because I do not have the physical Pico with me, the real Pico-to-website USB connection has not been tested yet. The remaining physical integration and testing needs to be completed in person.

---

## WebSocket Address Configuration

The WebSocket address is configured in:

```text
websites/band-site/.env.local
```

### Option 1 — Pico Server and Website on the Same Laptop

This is the recommended setup for the competition because it is simpler and more reliable.

Use:

```text
VITE_PICO_WS_URL=ws://localhost:8080
```

The setup will look like this:

```text
Pico
  ↓ USB
Laptop
  ├── picoServer.js
  └── Website
```

No IP address configuration is required in this setup.

---

## Option 2 — Pico Server and Website on Different Laptops

Use this setup only if the Pico is connected to one laptop while the website is displayed on another laptop.

Example:

```text
Pico
  ↓ USB
Laptop A
  └── picoServer.js
         ↓ Wi-Fi / LAN
Laptop B
  └── Website
```

Both laptops must be connected to the same Wi-Fi or local network.

### Step 1 — Find the IP Address of Laptop A

Laptop A is the laptop connected to the Pico and running `picoServer.js`.

On macOS, run:

```bash
ipconfig getifaddr en0
```

Example output:

```text
192.168.1.47
```

### Step 2 — Update `.env.local`

On the laptop running the website, open:

```text
websites/band-site/.env.local
```

Change:

```text
VITE_PICO_WS_URL=ws://localhost:8080
```

to:

```text
VITE_PICO_WS_URL=ws://192.168.1.47:8080
```

Replace `192.168.1.47` with the actual IP address of Laptop A.

Important: use the IP address of the laptop running `picoServer.js`, not the Pico's IP address.

### Step 3 — Restart the Website

After changing `.env.local`, restart the Vite development server:

```bash
Ctrl + C
npm run dev
```

The new `.env.local` value will not be applied until Vite is restarted.

---

## In-Person Pico Testing

Once the physical Pico is available, connect it to the laptop with a USB data cable.

From:

```text
websites/band-site
```

run:

```bash
npm run pico
```

The expected output should look similar to:

```text
[WS] Server running on port 8080
[SERIAL] Connecting to /dev/tty.usbmodem...
[SERIAL] Pico connected
```

When the Pico sends data, the terminal should show messages such as:

```text
[PICO] NOTE:0
[PICO] EFFECT:DISTORTION
[PICO] VOLUME:0.5
```

The website is already prepared to receive those messages.

---

## Pico Data Format

The Pico firmware should send data using the following format.

### Notes

```text
NOTE:0
NOTE:1
NOTE:2
NOTE:3
NOTE:4
NOTE:5
NOTE:6
NOTE:7
```

Example Pico code:

```python
print(f"NOTE:{i}")
```

### Effects

The effect name sent by the Pico must match the effect names supported by the website.

Examples:

```text
EFFECT:NORMAL
EFFECT:ECHO
EFFECT:DISTORTION
EFFECT:REVERB
EFFECT:BITCRUSH
```

### Volume

Volume should be sent as a number from `0` to `1`.

Examples:

```text
VOLUME:0
VOLUME:0.5
VOLUME:1
```

Example Pico code:

```python
print(f"VOLUME:{volume}")
```

---

## Recommended Final Setup

For the competition, use the same laptop for the Pico server and website whenever possible:

```text
Physical Controls
      ↓
Pico main.py
      ↓ USB
picoServer.js
      ↓ WebSocket
Visualizer.jsx
      ↓
Live Website Visuals
```

With this setup, keep:

```text
VITE_PICO_WS_URL=ws://localhost:8080
```

This avoids unnecessary dependence on venue Wi-Fi or local network communication.

---

## Remaining In-Person Tasks

1. Connect the real Pico with a USB data cable.
2. Make sure the Pico firmware outputs `NOTE`, `EFFECT`, and `VOLUME` messages in the expected format.
3. Run `npm run pico` and confirm that the Pico serial port is detected.
4. Run the website and confirm the WebSocket connection.
5. Test all eight notes.
6. Test all implemented effects.
7. Test the physical volume control.
8. Test the full song sequence and confirm that the final victory animation is triggered.

The website-side WebSocket implementation and simulated testing are already complete. The main remaining task is the physical Pico integration and end-to-end hardware test.
