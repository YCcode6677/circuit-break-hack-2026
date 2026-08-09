import { SerialPort } from "serialport";
import WebSocket, { WebSocketServer } from "ws";

import readline from "node:readline";

const WS_PORT = 8080;
const BAUD_RATE = 115200;
const RETRY_DELAY = 2000;

const wss = new WebSocketServer({
    host: "0.0.0.0",
    port: WS_PORT,
});

console.log(
    `[WS] Server running on port ${WS_PORT}`
);

wss.on("connection", (socket) => {
    console.log(
        "[WS] Website connected"
    );

    socket.on("close", () => {
        console.log(
            "[WS] Website disconnected"
        );
    });
});

function broadcast(message) {
    for (const client of wss.clients) {
        if (
            client.readyState ===
            WebSocket.OPEN
        ) {
            client.send(message);
        }
    }
}

/* for test only !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
const terminal =
    readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });


terminal.on(
    "line",
    (line) => {

        const message =
            line.trim();


        if (!message) {
            return;
        }


        console.log(
            "[MOCK]",
            message
        );


        broadcast(
            message
        );
    }
);

/* for test only !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


let serialPort = null;
let serialBuffer = "";
let retryTimer = null;
let connecting = false;

async function findPico() {
    const ports =
        await SerialPort.list();

    console.log(
        "[SERIAL] Available ports:"
    );

    for (const port of ports) {
        console.log(
            `  ${port.path}`
        );
    }

    const picoByVendor =
        ports.find((port) =>
            port.vendorId?.toLowerCase() ===
            "2e8a"
        );

    if (picoByVendor) {
        return picoByVendor.path;
    }

    const picoByPath =
        ports.find((port) =>
            /usbmodem|ttyACM|ttyUSB/i.test(
                port.path
            )
        );

    return picoByPath?.path ?? null;
}

function scheduleReconnect() {
    if (retryTimer) {
        clearTimeout(
            retryTimer
        );
    }

    retryTimer =
        setTimeout(() => {
            connectPico();
        }, RETRY_DELAY);
}

function handleSerialData(data) {
    serialBuffer +=
        data.toString("utf8");

    const lines =
        serialBuffer
            .replace(/\r/g, "")
            .split("\n");

    serialBuffer =
        lines.pop() ?? "";

    for (const line of lines) {
        const message =
            line.trim();

        if (!message) {
            continue;
        }

        console.log(
            "[PICO]",
            message
        );

        broadcast(
            message
        );
    }
}

async function connectPico() {
    if (
        connecting ||
        serialPort?.isOpen
    ) {
        return;
    }

    connecting = true;

    try {
        const path =
            await findPico();

        if (!path) {
            console.log(
                "[SERIAL] Pico not found. Retrying..."
            );

            scheduleReconnect();

            return;
        }

        console.log(
            `[SERIAL] Connecting to ${path}`
        );

        const port =
            new SerialPort({
                path,
                baudRate: BAUD_RATE,
            });

        serialPort = port;
        serialBuffer = "";

        port.on("open", () => {
            console.log(
                "[SERIAL] Pico connected"
            );
        });

        port.on(
            "data",
            handleSerialData
        );

        port.on("error", (error) => {
            console.error(
                "[SERIAL] Error:",
                error.message
            );
        });

        port.on("close", () => {
            console.log(
                "[SERIAL] Pico disconnected"
            );

            serialPort = null;

            scheduleReconnect();
        });
    } catch (error) {
        console.error(
            "[SERIAL] Connection failed:",
            error.message
        );

        serialPort = null;

        scheduleReconnect();
    } finally {
        connecting = false;
    }
}

connectPico();