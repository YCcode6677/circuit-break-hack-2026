import song1 from "../assets/audio/lamb.mp3";
import song2 from "../assets/audio/Twinkle.mp3";
import song3 from "../assets/audio/joy.mp3";
import album1 from "../assets/images/lamb.jpg";
import album2 from "../assets/images/star.jpg";
import album3 from "../assets/images/joy.jpg";
import TrackCard from "./TrackCard";

const tracks = [
    {
        id: "01",
        title: "Mary Had a Little Lamb",
        duration: "01:37",
        type: "MAIN SET",
        range: "C4 - C5",
        visual: "PURPLE BURST",
        effects: ["DISTORTION", "ECHO", "VIBRATO"],
        audio: song1,
        cover: album1,
    },
    {
        id: "02",
        title: "Twinkle Twinkle Little Star",
        duration: "01:24",
        type: "ENCORE",
        range: "C4 - C5",
        visual: "GLITCH WAVE",
        effects: ["REVERB", "DELAY", "TREMOLO"],
        audio: song2,
        cover: album2,
    },

    {
        id: "03",
        title: "Ode to Joy ",
        duration: "12:56",
        type: "ENCORE 02",
        range: "C4 - C5",
        visual: "PIXEL BREAK",
        effects: ["DISTORTION", "DISTORTION FLUTE"],
        audio: song3,
        cover: album3,
    },
];

export default function Setlist() {
    return (
        <section className="setlist" id="setlist">
            <div className="setlist-header">
                <p className="section-label">TRACK SELECT</p>

                <h2>SETLIST</h2>

                <p className="setlist-description">
                    Pick a track.
                </p>
            </div>

            <div className="track-grid">
                {tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </div>
        </section>
    );
}