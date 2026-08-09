import { useState, useEffect, useRef } from 'react'
import { connectPico, disconnectPico } from './picoSerial'

function VisualizerHUD({
    position,
    note = null,
    effect = "NORMAL",
    volume = 0,
}) {
    const volumePercent = Math.round(volume * 100);
    const [connected, setConnected] = useState(false);
    const [lastData, setLastData] = useState(null);

    useEffect(() => {
        function handleStatus(e) {
            setConnected(e.detail.connected);
        }

        function handleData(e) {
            // e.detail is an array of cleaned lines from this read chunk
            setLastData(e.detail[e.detail.length - 1]); // most recent line
            dataLogRef.current = [...dataLogRef.current, ...e.detail].slice(-50); // keep last 50
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