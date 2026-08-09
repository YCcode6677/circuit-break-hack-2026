export default function TrackCard({ track }) {
    return (
        <article className="track-card">
            <div className="track-top">
                <span>TRACK {track.id}</span>
                <span>{track.duration}</span>
            </div>

            <div className="track-cover-wrap">
                <img
                    src={track.cover}
                    alt={`${track.title} album cover`}
                    className="track-cover"
                />
            </div>

            <div className="track-info">
                <p className="track-type">{track.type}</p>

                <h3>{track.title}</h3>

                <div className="track-details">
                    <div>
                        <span className="detail-label">RANGE</span>
                        <strong>{track.range}</strong>
                    </div>

                    <div>
                        <span className="detail-label">VISUAL</span>
                        <strong>{track.visual}</strong>
                    </div>
                </div>

                <div className="track-effects">
                    {track.effects.map((effect) => (
                        <span key={effect}>{effect}</span>
                    ))}
                </div>

                <div className="track-player">
                    <p className="player-label">PLAY RECORDING</p>

                    <audio controls className="audio-player">
                        <source src={track.audio} type="audio/mpeg" />
                        Your browser does not support audio playback.
                    </audio>
                </div>
            </div>
        </article>
    );
}