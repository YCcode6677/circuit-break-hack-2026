function Dino({
    src,
    noteIndex,
    triggerId,
    volume = 0.5,
}) {

    /* =================================================
       NO DINO
    ================================================= */

    if (!src) {

        return (
            <div className="viz-dino-empty">
                SELECT A PLAYER
            </div>
        );

    }


    /* =================================================
       INTENSITY
    ================================================= */

    const intensity =
        Math.max(
            0.4,
            Math.min(
                1,
                Number(volume) || 0
            )
        );


    /* =================================================
       ACTION CLASS
    ================================================= */

    /*
    A → noteIndex 0 → dino-action-0
    S → noteIndex 1 → dino-action-1
    D → noteIndex 2 → dino-action-2
    ...
    K → noteIndex 7 → dino-action-7
    */

    const actionClass =
        noteIndex === null ||
            noteIndex === undefined

            ? "dino-action-idle"

            : `dino-action-${noteIndex}`;


    /* =================================================
       RENDER
    ================================================= */

    return (

        /*
        -----------------------------------------------
        IDLE WRAPPER

        这一层负责永久的轻微上下浮动。
        -----------------------------------------------
        */

        <div
            className="viz-dino-idle-wrapper"

            style={{
                "--dino-intensity":
                    intensity,
            }}
        >


            {/*
            -------------------------------------------
            ACTION LAYER

            triggerId 每次按键改变。

            key 改变后 React 会重新创建这一层，
            CSS 动画就会重新开始。
            -------------------------------------------
            */}

            <div
                key={`${noteIndex}-${triggerId}`}

                className={
                    `viz-dino-action-layer ${actionClass}`
                }
            >


                {/* ===================================
                    H / K AFTERIMAGE
                =================================== */}

                {(noteIndex === 5 ||
                    noteIndex === 7) && (
                        <>
                            <img
                                src={src}
                                alt=""
                                className="
                                viz-dino-ghost
                                viz-dino-ghost-1
                            "
                                draggable="false"
                            />

                            <img
                                src={src}
                                alt=""
                                className="
                                viz-dino-ghost
                                viz-dino-ghost-2
                            "
                                draggable="false"
                            />

                            <img
                                src={src}
                                alt=""
                                className="
                                viz-dino-ghost
                                viz-dino-ghost-3
                            "
                                draggable="false"
                            />
                        </>
                    )}


                {/* ===================================
                    MAIN DINO
                =================================== */}

                <img
                    src={src}
                    alt="Selected dinosaur"
                    className="viz-dino-image"
                    draggable="false"
                />


                {/* ===================================
                    D / ELECTRIC AURA
                =================================== */}

                {noteIndex === 2 && (

                    <div className="viz-dino-electric-aura">

                        <span />
                        <span />
                        <span />
                        <span />

                    </div>

                )}


                {/* ===================================
                    G / ROAR ENERGY
                =================================== */}

                {noteIndex === 4 && (

                    <div className="viz-dino-roar-core" />

                )}


            </div>

        </div>

    );

}


export default Dino;