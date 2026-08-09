function VisualizerHUD({
    position,
    note = null,
    effect = "NORMAL",
    volume = 0,
}) {
    const volumePercent = Math.round(volume * 100);


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
                    SYSTEM // ONLINE
                </span>

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
                    CIRCUIT BREAK
                </span>

            </div>
        );
    }


    return null;
}

/* for test the pico connect only */



export default VisualizerHUD;