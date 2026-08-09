import "./Instrument.css";
import instrumentImg from "../assets/images/123.png";

const notes = [
    { note: "C", freq: "262 Hz" },
    { note: "D", freq: "294 Hz" },
    { note: "E", freq: "330 Hz" },
    { note: "F", freq: "349 Hz" },
    { note: "G", freq: "392 Hz" },
    { note: "A", freq: "440 Hz" },
    { note: "B", freq: "493 Hz" },
    { note: "C", freq: "523 Hz" },
];

const effects = [
    {
        id: "01",
        name: "VIBRATO",
        symbol: "〰",
        description:
            "Adds a repeating pitch variation to create a smooth, expressive sound.",
    },
    {
        id: "02",
        name: "DISTORTION",
        symbol: "⚡",
        description:
            "Transforms the clean tone into a heavier and more aggressive sound.",
    },
    {
        id: "03",
        name: "FLUTE",
        symbol: "♫",
        description:
            "Changes the instrument tone into a softer flute-inspired sound.",
    },
    {
        id: "04",
        name: "DISTORTION FLUTE",
        symbol: "★",
        description:
            "Combines the flute sound profile with distortion for a unique hybrid tone.",
    },
];

function Instrument() {
    return (
        <main className="instrument-page">
            <section className="instrument-hero">
                <div className="hero-grid" />

                <div className="hero-content">
                    <p className="pixel-label">PLAYER 1 EQUIPMENT</p>

                    <h1 className="instrument-title">
                        CIRCUIT
                        <span>BREAKER</span>
                    </h1>

                    <p className="instrument-subtitle">
                        ARCADE MUSIC CONTROLLER
                    </p>

                    <div className="instrument-display">
                        <div className="instrument-image-box">
                            <img
                                src={instrumentImg}
                                alt="Circuit Breaker instrument"
                                className="instrument-image"
                            />

                            <div className="scan-line" />
                        </div>

                        <div className="instrument-stats">
                            <div className="stat-row">
                                <span>CLASS</span>
                                <strong>DIGITAL ARCADE</strong>
                            </div>

                            <div className="stat-row">
                                <span>NOTES</span>
                                <strong>8</strong>
                            </div>

                            <div className="stat-row">
                                <span>RANGE</span>
                                <strong>1 OCTAVE</strong>
                            </div>

                            <div className="stat-row">
                                <span>CONTROL</span>
                                <strong>PHYSICAL</strong>
                            </div>

                            <div className="stat-row">
                                <span>DATA</span>
                                <strong>USB SERIAL</strong>
                            </div>
                        </div>
                    </div>

                    <div className="hero-tags">
                        <div>
                            <strong>08</strong>
                            <span>NOTES</span>
                        </div>

                        <div>
                            <strong>04+</strong>
                            <span>SOUND MODES</span>
                        </div>

                        <div>
                            <strong>USB</strong>
                            <span>CONNECTED</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="instrument-section">
                <div className="section-heading">
                    <span>01</span>

                    <div>
                        <p>INPUT SYSTEM</p>
                        <h2>CONTROL PANEL</h2>
                    </div>
                </div>

                <div className="control-panel">
                    <div className="note-panel">
                        <p className="panel-title">NOTE BUTTONS</p>

                        <div className="note-grid">
                            {notes.map((item, index) => (
                                <button
                                    className="note-button"
                                    key={`${item.note}-${index}`}
                                >
                                    <span className="button-index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <strong>{item.note}</strong>

                                    <small>{item.freq}</small>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="control-side">
                        <div className="control-card">
                            <p>CONTROL A</p>

                            <div className="joystick">
                                <div className="joystick-stick" />
                                <div className="joystick-base" />
                            </div>

                            <h3>JOYSTICK</h3>
                            <span>SOUND EFFECT CONTROL</span>
                        </div>

                        <div className="control-card">
                            <p>CONTROL B</p>

                            <div className="knob">
                                <div className="knob-mark" />
                            </div>

                            <h3>VOLUME</h3>
                            <span>REAL-TIME LEVEL CONTROL</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="instrument-section">
                <div className="section-heading">
                    <span>02</span>

                    <div>
                        <p>AUDIO RANGE</p>
                        <h2>SOUND PROFILE</h2>
                    </div>
                </div>

                <div className="sound-profile">
                    <div className="sound-info">
                        <p className="terminal-line">
                            &gt; SYSTEM_STATUS: READY
                        </p>

                        <p className="terminal-line">
                            &gt; OCTAVE_RANGE: C4 → C5
                        </p>

                        <p className="terminal-line">
                            &gt; OUTPUT_MODE: DIGITAL
                        </p>

                        <p className="terminal-line">
                            &gt; INPUT_COUNT: 8
                        </p>

                        <p className="terminal-line">
                            &gt; USB_LINK: ENABLED
                        </p>
                    </div>

                    <div className="octave">
                        {notes.map((item, index) => (
                            <div className="octave-note" key={`octave-${index}`}>
                                <div
                                    className="octave-bar"
                                    style={{
                                        height: `${55 + index * 7}px`,
                                    }}
                                />

                                <strong>{item.note}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="instrument-section">
                <div className="section-heading">
                    <span>03</span>

                    <div>
                        <p>SOUND MODIFIERS</p>
                        <h2>EFFECTS</h2>
                    </div>
                </div>

                <div className="effects-grid">
                    {effects.map((effect) => (
                        <article className="effect-card" key={effect.id}>
                            <span className="effect-number">
                                FX_{effect.id}
                            </span>

                            <div className="effect-symbol">
                                {effect.symbol}
                            </div>

                            <h3>{effect.name}</h3>

                            <p>{effect.description}</p>

                            <div className="effect-status">
                                <span className="status-light" />
                                READY
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="instrument-section">
                <div className="section-heading">
                    <span>04</span>

                    <div>
                        <p>SYSTEM ARCHITECTURE</p>
                        <h2>HOW IT WORKS</h2>
                    </div>
                </div>

                <div className="system-flow">
                    <div className="flow-box">
                        <span>01</span>
                        <strong>PLAYER</strong>
                        <small>Physical Input</small>
                    </div>

                    <div className="flow-arrow">
                        →
                    </div>

                    <div className="flow-box">
                        <span>02</span>
                        <strong>PICO 2</strong>
                        <small>Process Input</small>
                    </div>

                    <div className="flow-arrow">
                        →
                    </div>

                    <div className="flow-box">
                        <span>03</span>
                        <strong>SOUND</strong>
                        <small>Audio Output</small>
                    </div>
                </div>

                <div className="usb-flow">
                    <div className="usb-line" />

                    <div className="usb-box">
                        <span>USB DATA</span>
                        <strong>PICO → WEBSITE</strong>
                    </div>

                    <div className="usb-line" />

                    <div className="usb-box">
                        <span>LIVE RESPONSE</span>
                        <strong>VISUALIZER</strong>
                    </div>
                </div>
            </section>

            <section className="instrument-section design-section">
                <div className="section-heading">
                    <span>05</span>

                    <div>
                        <p>DESIGN LANGUAGE</p>
                        <h2>BUILT TO BREAK THE CIRCUIT</h2>
                    </div>
                </div>

                <div className="design-grid">
                    <div className="design-card">
                        <span>01</span>
                        <h3>ARCADE</h3>
                        <p>
                            Large physical controls make the instrument
                            immediate, playful and performance-focused.
                        </p>
                    </div>

                    <div className="design-card">
                        <span>02</span>
                        <h3>CIRCUIT</h3>
                        <p>
                            Electronics are not hidden from the identity.
                            They define how the instrument looks and reacts.
                        </p>
                    </div>

                    <div className="design-card">
                        <span>03</span>
                        <h3>BREAK</h3>
                        <p>
                            Sound and visuals react with distortion,
                            fragmentation and controlled digital chaos.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Instrument;