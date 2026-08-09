/*
To Do:
- Add serial output to pico firmware
- Finish modifying 'Visualizer.jsx'
- Add connect pico controls
*/

// picoSerial.js

let port = null;
let reader = null;
let keepReading = false;

/**
 * Requests a port and starts reading data from the Pico 2.
 */
export async function connectPico() {
  if (port) {
    console.warn("Pico is already connecting or connected.");
    return;
  }

  try {
    // 1. Request port selection from the user
    port = await navigator.serial.requestPort();

    // 2. Open the serial connection
    await port.open({ baudRate: 115200 });
    keepReading = true;

    // Announce connection state change
    window.dispatchEvent(new CustomEvent("pico-status", { detail: { connected: true } }));

    // 3. Setup text stream processing
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    reader = textDecoder.readable.getReader();

    let buffer = "";
    while (port.readable && keepReading) {
      const { value, done } = await reader.read();
      if (done) break;

      if (value) {
        buffer += value;
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        const cleanLines = lines.map(line => line.trim()).filter(Boolean);
        if (cleanLines.length > 0) {
          // Broadcast raw parsed data lines directly to the window
          window.dispatchEvent(new CustomEvent("pico-data", { detail: cleanLines }));
        }
      }
    }

    // 4. Cleanup when loop breaks
    reader.releaseLock();
    await readableStreamClosed.catch(() => { });
    await port.close();
  } catch (error) {
    console.error("Serial connection failed:", error);
  } finally {
    // Reset state variables
    port = null;
    reader = null;
    keepReading = false;
    window.dispatchEvent(new CustomEvent("pico-status", { detail: { connected: false } }));
  }
}

/**
 * Gracefully signals the reading loop to stop and close the port.
 */
export function disconnectPico() {
  keepReading = false;
  if (reader) {
    reader.cancel().catch(() => { }); // Force break out of 'await reader.read()'
  }
}
