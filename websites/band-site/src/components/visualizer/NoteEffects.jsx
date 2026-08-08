/*
=========================================================
CIRCUIT BREAK
NOTE EFFECTS
=========================================================

NOTE MAP

0 / A / C4
→ SHOCKWAVE

1 / S / D4
→ PIXEL FIRE

2 / D / E4
→ LIGHTNING STORM

3 / F / F4
→ GROUND SHATTER

4 / G / G4
→ LASER BURST

5 / H / A4
→ TORNADO

6 / J / B4
→ SLASH / BREAK

7 / K / C5
→ ULTIMATE

Important:
This component only creates the visual elements.

The animation itself is handled by:
Visualizer.css
=========================================================
*/


function NoteEffects({
    noteIndex,
    triggerId,
    volume = 0.5,
}) {

    /* =================================================
       NOTHING PRESSED
    ================================================= */

    if (
        noteIndex === null ||
        noteIndex === undefined
    ) {
        return null;
    }


    /* =================================================
       SAFE VOLUME / INTENSITY
    ================================================= */

    const intensity = Math.max(
        0.4,
        Math.min(
            1,
            Number(volume) || 0
        )
    );


    /* =================================================
       EFFECT ELEMENT COUNTS
    ================================================= */

    const flames = Array.from(
        { length: 18 },
        (_, index) => index
    );


    const bolts = Array.from(
        { length: 10 },
        (_, index) => index
    );


    const lasers = Array.from(
        { length: 12 },
        (_, index) => index
    );


    const shards = Array.from(
        { length: 24 },
        (_, index) => index
    );


    const windBits = Array.from(
        { length: 24 },
        (_, index) => index
    );


    /* =================================================
       RENDER
    ================================================= */

    return (

        <div
            key={`note-fx-${triggerId}`}
            className={`note-fx-layer note-fx-${noteIndex}`}
            style={{
                "--fx-opacity":
                    0.7 + intensity * 0.3,

                "--fx-intensity":
                    intensity,
            }}
            aria-hidden="true"
        >


            {/* =================================================
                NOTE 0
                A / C4

                MASSIVE SHOCKWAVE
            ================================================= */}

            {noteIndex === 0 && (

                <div className="fx-note-container fx-note-shockwave">


                    {/* FULL SCREEN FLASH */}

                    <div className="fx-white-flash" />


                    {/* CENTRAL ENERGY EXPLOSION */}

                    <div className="fx-energy-core" />


                    {/* FOUR SHOCKWAVES */}

                    <div className="fx-ring fx-ring-1" />

                    <div className="fx-ring fx-ring-2" />

                    <div className="fx-ring fx-ring-3" />

                    <div className="fx-ring fx-ring-4" />


                    {/* CROSS BEAMS */}

                    <div
                        className="
                            fx-cross-light
                            fx-cross-x
                        "
                    />

                    <div
                        className="
                            fx-cross-light
                            fx-cross-y
                        "
                    />


                </div>

            )}



            {/* =================================================
                NOTE 1
                S / D4

                PIXEL FIRE
            ================================================= */}

            {noteIndex === 1 && (

                <div className="fx-note-container fx-note-fire">


                    {/* FIRE BACKGROUND */}

                    <div className="fx-fire-glow" />


                    {/* 18 LARGE FLAMES */}

                    {flames.map((index) => {

                        const progress =
                            flames.length > 1
                                ? index /
                                (flames.length - 1)
                                : 0;


                        /*
                        Spread fire across
                        approximately 22% → 78%
                        */

                        const x =
                            22 +
                            progress * 56;


                        /*
                        Make each flame different.
                        */

                        const height =
                            130 +
                            (index % 6) * 38;


                        const width =
                            18 +
                            (index % 4) * 5;


                        const delay =
                            (index % 6) * 0.025;


                        const lean =
                            -10 +
                            (index % 5) * 5;


                        return (

                            <span
                                key={`flame-${index}`}

                                className="fx-big-flame"

                                style={{
                                    "--flame-x":
                                        `${x}%`,

                                    "--flame-height":
                                        `${height}px`,

                                    "--flame-width":
                                        `${width}px`,

                                    "--flame-delay":
                                        `${delay}s`,

                                    "--flame-lean":
                                        `${lean}deg`,
                                }}
                            />

                        );

                    })}


                    {/* FIRE IMPACT */}

                    <div className="fx-fire-shockwave" />


                </div>

            )}



            {/* =================================================
                NOTE 2
                D / E4

                LIGHTNING STORM
            ================================================= */}

            {noteIndex === 2 && (

                <div className="fx-note-container fx-note-lightning">


                    {/* SCREEN FLASH */}

                    <div className="fx-lightning-screen" />


                    {/* LIGHTNING CORE */}

                    <div className="fx-lightning-core" />


                    {/* 10 RADIAL BOLTS */}

                    {bolts.map((index) => {

                        const angle =
                            (
                                360 /
                                bolts.length
                            ) * index;


                        const delay =
                            (index % 4) * 0.025;


                        const length =
                            360 +
                            (index % 4) * 45;


                        return (

                            <span
                                key={`bolt-${index}`}

                                className="fx-mega-bolt"

                                style={{
                                    "--bolt-angle":
                                        `${angle}deg`,

                                    "--bolt-delay":
                                        `${delay}s`,

                                    "--bolt-length":
                                        `${length}px`,
                                }}
                            />

                        );

                    })}


                </div>

            )}



            {/* =================================================
                NOTE 3
                F / F4

                GROUND SHATTER
            ================================================= */}

            {noteIndex === 3 && (

                <div className="fx-note-container fx-note-shatter">


                    {/* GROUND FLASH */}

                    <div className="fx-ground-flash" />


                    {/* IMPACT WAVE */}

                    <div className="fx-ground-wave" />


                    {/* CRACKS */}

                    <span
                        className="
                            fx-ground-crack
                            fx-crack-a
                        "
                    />

                    <span
                        className="
                            fx-ground-crack
                            fx-crack-b
                        "
                    />

                    <span
                        className="
                            fx-ground-crack
                            fx-crack-c
                        "
                    />

                    <span
                        className="
                            fx-ground-crack
                            fx-crack-d
                        "
                    />


                    {/* 24 FLYING SHARDS */}

                    {shards.map((index) => {

                        const angle =
                            (
                                360 /
                                shards.length
                            ) * index;


                        const distance =
                            170 +
                            (index % 8) * 30;


                        const delay =
                            (index % 6) * 0.014;


                        const size =
                            10 +
                            (index % 5) * 4;


                        const rotation =
                            180 +
                            index * 17;


                        return (

                            <span
                                key={`ground-shard-${index}`}

                                className="fx-ground-shard"

                                style={{
                                    "--shard-angle":
                                        `${angle}deg`,

                                    "--shard-distance":
                                        `${distance}px`,

                                    "--shard-delay":
                                        `${delay}s`,

                                    "--shard-size":
                                        `${size}px`,

                                    "--shard-rotation":
                                        `${rotation}deg`,
                                }}
                            />

                        );

                    })}


                </div>

            )}



            {/* =================================================
                NOTE 4
                G / G4

                LASER STARBURST
            ================================================= */}

            {noteIndex === 4 && (

                <div className="fx-note-container fx-note-laser">


                    {/* LASER BACKGROUND */}

                    <div className="fx-laser-screen" />


                    {/* ENERGY CORE */}

                    <div className="fx-laser-core" />


                    {/* ENERGY RING */}

                    <div className="fx-laser-ring" />


                    {/* 12 RADIAL LASERS */}

                    {lasers.map((index) => {

                        const angle =
                            (
                                360 /
                                lasers.length
                            ) * index;


                        const delay =
                            (index % 3) * 0.02;


                        const width =
                            12 +
                            (index % 3) * 3;


                        return (

                            <span
                                key={`laser-${index}`}

                                className="fx-mega-laser"

                                style={{
                                    "--laser-angle":
                                        `${angle}deg`,

                                    "--laser-delay":
                                        `${delay}s`,

                                    "--laser-width":
                                        `${width}px`,
                                }}
                            />

                        );

                    })}


                </div>

            )}



            {/* =================================================
                NOTE 5
                H / A4

                PIXEL TORNADO
            ================================================= */}

            {noteIndex === 5 && (

                <div className="fx-note-container fx-note-tornado">


                    {/* TORNADO BACKGROUND */}

                    <div className="fx-tornado-glow" />


                    {/* FOUR LARGE TORNADO RINGS */}

                    <div
                        className="
                            fx-tornado-ring
                            tornado-ring-1
                        "
                    />

                    <div
                        className="
                            fx-tornado-ring
                            tornado-ring-2
                        "
                    />

                    <div
                        className="
                            fx-tornado-ring
                            tornado-ring-3
                        "
                    />

                    <div
                        className="
                            fx-tornado-ring
                            tornado-ring-4
                        "
                    />


                    {/* 24 WIND PIXELS */}

                    {windBits.map((index) => {

                        const angle =
                            (
                                360 /
                                windBits.length
                            ) * index;


                        const endAngle =
                            angle + 720;


                        const distance =
                            170 +
                            (index % 7) * 27;


                        const delay =
                            (index % 6) * 0.018;


                        const size =
                            8 +
                            (index % 4) * 3;


                        return (

                            <span
                                key={`wind-${index}`}

                                className="fx-wind-bit"

                                style={{
                                    "--wind-angle":
                                        `${angle}deg`,

                                    "--wind-angle-end":
                                        `${endAngle}deg`,

                                    "--wind-distance":
                                        `${distance}px`,

                                    "--wind-delay":
                                        `${delay}s`,

                                    "--wind-size":
                                        `${size}px`,
                                }}
                            />

                        );

                    })}


                </div>

            )}



            {/* =================================================
                NOTE 6
                J / B4

                GIANT SLASH + BREAK
            ================================================= */}

            {noteIndex === 6 && (

                <div className="fx-note-container fx-note-slash">


                    {/* SCREEN SLASH FLASH */}

                    <div className="fx-slash-flash" />


                    {/* THREE LARGE SLASHES */}

                    <span
                        className="
                            fx-giant-slash
                            fx-slash-a
                        "
                    />

                    <span
                        className="
                            fx-giant-slash
                            fx-slash-b
                        "
                    />

                    <span
                        className="
                            fx-giant-slash
                            fx-slash-c
                        "
                    />


                    {/* BREAKING PIXELS */}

                    {shards.map((index) => {

                        const angle =
                            (
                                360 /
                                shards.length
                            ) * index;


                        const distance =
                            180 +
                            (index % 8) * 32;


                        const delay =
                            (index % 6) * 0.012;


                        const size =
                            9 +
                            (index % 5) * 4;


                        const rotation =
                            220 +
                            index * 16;


                        return (

                            <span
                                key={`cut-shard-${index}`}

                                className="fx-cut-shard"

                                style={{
                                    "--shard-angle":
                                        `${angle}deg`,

                                    "--shard-distance":
                                        `${distance}px`,

                                    "--shard-delay":
                                        `${delay}s`,

                                    "--shard-size":
                                        `${size}px`,

                                    "--shard-rotation":
                                        `${rotation}deg`,
                                }}
                            />

                        );

                    })}


                </div>

            )}



            {/* =================================================
                NOTE 7
                K / C5

                ULTIMATE
            ================================================= */}

            {noteIndex === 7 && (

                <div className="fx-note-container fx-note-ultimate">


                    {/* FULL SCREEN WHITEOUT */}

                    <div className="fx-ultimate-whiteout" />


                    {/* HUGE ENERGY CORE */}

                    <div className="fx-ultimate-core" />


                    {/* FOUR ULTIMATE RINGS */}

                    <div
                        className="
                            fx-ring
                            ultimate-ring-1
                        "
                    />

                    <div
                        className="
                            fx-ring
                            ultimate-ring-2
                        "
                    />

                    <div
                        className="
                            fx-ring
                            ultimate-ring-3
                        "
                    />

                    <div
                        className="
                            fx-ring
                            ultimate-ring-4
                        "
                    />


                    {/* 12 ULTIMATE LASERS */}

                    {lasers.map((index) => {

                        const angle =
                            (
                                360 /
                                lasers.length
                            ) * index;


                        return (

                            <span
                                key={`ultimate-laser-${index}`}

                                className="fx-ultimate-laser"

                                style={{
                                    "--laser-angle":
                                        `${angle}deg`,
                                }}
                            />

                        );

                    })}


                    {/* 10 LIGHTNING BOLTS */}

                    {bolts.map((index) => {

                        /*
                        Offset lightning so that
                        it does not overlap perfectly
                        with the lasers.
                        */

                        const angle =
                            (
                                360 /
                                bolts.length
                            ) * index
                            + 18;


                        const delay =
                            (index % 4) * 0.02;


                        return (

                            <span
                                key={`ultimate-bolt-${index}`}

                                className="fx-ultimate-bolt"

                                style={{
                                    "--bolt-angle":
                                        `${angle}deg`,

                                    "--bolt-delay":
                                        `${delay}s`,
                                }}
                            />

                        );

                    })}


                    {/* GIANT CROSS BEAMS */}

                    <div
                        className="
                            fx-ultimate-cross
                            fx-ultimate-cross-x
                        "
                    />

                    <div
                        className="
                            fx-ultimate-cross
                            fx-ultimate-cross-y
                        "
                    />


                </div>

            )}


        </div>

    );

}


export default NoteEffects;