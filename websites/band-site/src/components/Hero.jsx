import BreakButton from "./BreakButton";
import logo from "../assets/images/logo.png";

function Hero() {
    return (
        <div className="pixel-hero">

            {/* CRT scan lines */}
            <div className="scanlines"></div>

            {/* Pixel decorations */}
            <div className="pixel-star star-1">+</div>
            <div className="pixel-star star-2">+</div>
            <div className="pixel-star star-3">◆</div>
            <div className="pixel-star star-4">+</div>
            <div className="pixel-star star-5">◆</div>

            {/* HUD */}
            <div className="hero-hud">
                <div>
                    <span className="hud-label">SCORE</span>
                    <strong>002026</strong>
                </div>

                <div>
                    <span className="hud-label">WORLD</span>
                    <strong>HACK-26</strong>
                </div>

                <div>
                    <span className="hud-label">MODE</span>
                    <strong>BATTLE</strong>
                </div>
            </div>

            <div className="hero-main">

                <p className="insert-coin">
                    ◆ UCLA HAcK 2026 ◆
                </p>

                <img
                    src={logo}
                    alt="Circuit Break"
                    className="hero-logo"
                />

                <p className="ready-player">
                    READY PLAYER 1
                </p>

                <h1 className="pixel-title">
                    CIRCUIT
                    <br />
                    <span>BREAK</span>
                </h1>

                <div className="pixel-divider">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <h2 className="hero-tagline">
                    BREAK THE CIRCUIT.
                    <br />
                    BUILD THE SOUND.
                </h2>

                <p className="hero-description">
                    An arcade-inspired digital instrument where
                    physical controls, electronic sound and live
                    visuals become one playable experience.
                </p>

                <div className="pixel-buttons">

                    <BreakButton
                        href="#instrument"
                        className="pixel-button primary"
                    >
                        ▶ START GAME
                    </BreakButton>

                    <BreakButton
                        href="#live"
                        className="pixel-button secondary"
                    >
                        LIVE MODE
                    </BreakButton>

                </div>

                <p className="press-start">
                    PRESS START TO CONTINUE
                </p>

            </div>

            {/* Pixel floor */}
            <div className="pixel-ground">
                {Array.from({ length: 30 }).map((_, index) => (
                    <div key={index}></div>
                ))}
            </div>

        </div>
    );
}

export default Hero;