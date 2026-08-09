import { useState, useEffect, useRef } from 'react'
import { connectPico, disconnectPico } from './picoSerial'

function VisualizerHUD({ position, volume, effect = 0 }) {

    const volumePercent = Math.round(volume * 100);
    const [connected, setConnected] = useState(false);
    const [lastData, setLastData] = useState(null);
    const [note, setNote] = useState(null);

    useEffect(() => {
        function handleStatus(e) {
            setConnected(e.detail.connected);
        }

        function handleData(e) {
            e.detail.forEach(line => {
                const [type, id, state] = line.split(",");
                if (type === "NOTE" && state === "ON") {
                    setNote(id); // or however you map button index -> note name
                }
            });
        }

        window.addEventListener("pico-status", handleStatus);
        window.addEventListener("pico-data", handleData);

        return () => {
            window.removeEventListener("pico-status", handleStatus);
            window.removeEventListener("pico-data", handleData);
        };
    }, []);

    const handleToggleConnection = () => {
        if (connected) {
            disconnectPico();
        } else {
            connectPico(); // fire-and-forget; loop runs until disconnect/error
        }
    };

    if (position === "top") {
        return (
            <div className="viz-top-bar">

                <div className="viz-live">

                    <span className="viz-live-dot"></span>

                    <span>
                        LIVE VISUALIZER
                    </span>

                </div>


                <span className="viz-status">
                    SYSTEM // {connected ? "ONLINE" : "OFFLINE"}
                </span>

                <button className="viz-pico-btn" onClick={handleToggleConnection}>
                    {connected ? "DISCONNECT PICO" : "CONNECT PICO"}
                </button>

            </div>
        );
    }


    if (position === "bottom") {
        return (
            <div className="viz-bottom-bar">

                <span>
                    NOTE // {note || "---"}
                </span>

                <span>
                    EFFECT // {effect}
                </span>

                <span>
                    VOL // {volumePercent}%
                </span>

                <span>
                    PICO // {lastData || "---"}
                </span>

                <span>
                    CIRCUIT BREAK
                </span>

            </div>
        );
    }


    return null;
}

/* for test the pico connect only */



export default VisualizerHUD;