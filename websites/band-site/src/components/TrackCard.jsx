import { useRef, useState } from "react";

export default function TrackCard({ track }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayToggle = async () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
            } catch (error) {
                console.error("Audio playback failed:", error);
            }
        } else {
            audio.pause();
        }
    };

    return (
        <article className="track-card">
            <div className="track-top">
                <span className="track-number">TRACK {track.id}</span>
                <span className="track-duration">{track.duration}</span>
            </div>

            <div className="track-cover-container">
                <img
                    src={track.cover}
                    alt={`${track.title} album cover`}
                    className="track-cover"
                />
            </div>

            <div className="track-info">
                <p className="track-type">{track.type}</p>

                <h3 className="track-name">{track.title}</h3>

                <div className="track-details">
                    <div className="track-detail-box">
                        <span className="detail-label">RANGE</span>
                        <strong>{track.range}</strong>
                    </div>

                    <div className="track-detail-box">
                        <span className="detail-label">VISUAL</span>
                        <strong>{track.visual}</strong>
                    </div>
                </div>

                <div className="track-effects">
                    {track.effects.map((effect) => (
                        <span className="effect-tag" key={effect}>
                            {effect}
                        </span>
                    ))}
                </div>

                <button
                    className={`track-play-button ${isPlaying ? "playing" : ""}`}
                    onClick={handlePlayToggle}
                    type="button"
                >
                    <span className="play-icon">
                        {isPlaying ? "Ⅱ" : "▶"}
                    </span>

                    <span>
                        {isPlaying ? "NOW PLAYING" : "PLAY RECORDING"}
                    </span>
                </button>

                <audio
                    ref={audioRef}
                    src={track.audio}
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                />
            </div>
        </article>
    );
}