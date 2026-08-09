import {
    useEffect,
    useRef,
    useState,
} from "react";

import Dino from "./Dino";
import NoteEffects from "./NoteEffects";
import VisualizerBackground from "./VisualizerBackground";
import VisualizerHUD from "./VisualizerHUD";

import "./Visualizer.css";



const NOTE_KEYS = {
    a: {
        note: "C4",
        index: 0,
    },

    s: {
        note: "D4",
        index: 1,
    },

    d: {
        note: "E4",
        index: 2,
    },

    f: {
        note: "F4",
        index: 3,
    },

    g: {
        note: "G4",
        index: 4,
    },

    h: {
        note: "A4",
        index: 5,
    },

    j: {
        note: "B4",
        index: 6,
    },

    k: {
        note: "C5",
        index: 7,
    },
};

const PICO_NOTES = [
    {
        note: "C4",
        index: 0,
    },

    {
        note: "D4",
        index: 1,
    },

    {
        note: "E4",
        index: 2,
    },

    {
        note: "F4",
        index: 3,
    },

    {
        note: "G4",
        index: 4,
    },

    {
        note: "A4",
        index: 5,
    },

    {
        note: "B4",
        index: 6,
    },

    {
        note: "C5",
        index: 7,
    },
];
const PICO_EFFECTS =
    new Set([
        "NORMAL",
        "ECHO",
        "DISTORTION",
        "REVERB",
        "BITCRUSH",
    ]);


const PICO_WS_URL =
    import.meta.env.VITE_PICO_WS_URL ||
    "ws://localhost:8080";

const EFFECT_KEYS = {
    ArrowUp: "ECHO",
    ArrowLeft: "DISTORTION",
    ArrowRight: "REVERB",
    ArrowDown: "BITCRUSH",
};


/*
Test song:

A S D F G H J K

0 1 2 3 4 5 6 7
*/

const SONG_SEQUENCE = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,


];


function Visualizer({ selectedDino }) {

    const [note, setNote] =
        useState(null);

    const [noteIndex, setNoteIndex] =
        useState(null);

    const [effect, setEffect] =
        useState("NORMAL");

    const [volume, setVolume] =
        useState(0.5);

    const [triggerId, setTriggerId] =
        useState(0);


    /*
    Song state
    */

    const [songProgress, setSongProgress] =
        useState(0);

    const [songComplete, setSongComplete] =
        useState(false);


    /*
    Refs are used for real-time song tracking.
    */

    const songProgressRef =
        useRef(0);

    const victoryTimerRef =
        useRef(null);

    /*
    =============================================
    RESET SONG
    =============================================
    */

    function resetSong() {

        songProgressRef.current =
            0;

        setSongProgress(
            0
        );
    }


    /*
    =============================================
    SHOW VICTORY
    =============================================
    */

    function showVictory() {

        console.log(
            "[SONG] COMPLETE"
        );


        setSongComplete(
            true
        );


        if (
            victoryTimerRef.current
        ) {

            clearTimeout(
                victoryTimerRef.current
            );
        }


        victoryTimerRef.current =
            setTimeout(() => {

                setSongComplete(
                    false
                );

                resetSong();

            }, 3000);
    }


    /*
    =============================================
    CHECK SONG NOTE
    =============================================
    */

    function processSongNote(
        playedNoteIndex
    ) {

        const currentProgress =
            songProgressRef.current;


        const expectedNote =
            SONG_SEQUENCE[
            currentProgress
            ];


        console.log(
            "[SONG]",
            "played:",
            playedNoteIndex,
            "expected:",
            expectedNote,
            "progress:",
            currentProgress
        );


        /*
        Correct note
        */

        if (
            playedNoteIndex ===
            expectedNote
        ) {

            const nextProgress =
                currentProgress + 1;


            songProgressRef.current =
                nextProgress;


            setSongProgress(
                nextProgress
            );


            console.log(
                "[SONG] CORRECT",
                `${nextProgress}/${SONG_SEQUENCE.length}`
            );


            /*
            Song finished
            */

            if (
                nextProgress ===
                SONG_SEQUENCE.length
            ) {

                showVictory();

            }


            return;
        }


        /*
        Wrong note
        */

        console.log(
            "[SONG] WRONG NOTE"
        );



        if (
            playedNoteIndex ===
            SONG_SEQUENCE[0]
        ) {

            songProgressRef.current =
                1;

            setSongProgress(
                1
            );


            return;
        }

        /* making some change here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        resetSong();
    }
    function triggerNote(noteData) {
        setNote(
            noteData.note
        );

        setNoteIndex(
            noteData.index
        );

        setTriggerId(
            (previous) =>
                previous + 1
        );

        processSongNote(
            noteData.index
        );
    }
    /* making some change here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

    useEffect(() => {

        /*
        =============================================
        KEYBOARD INPUT
        =============================================
        */

        function handleKeyDown(event) {

            if (event.repeat) {
                return;
            }


            const key =
                event.key;

            const lowerKey =
                key.toLowerCase();


            /*
            =========================================
            DEBUG VICTORY

            P forces the victory screen.
            =========================================
            */

            if (
                lowerKey === "p"
            ) {

                showVictory();

                return;
            }


            /*
            =========================================
            NOTE INPUT
            =========================================
            */

            if (
                NOTE_KEYS[
                lowerKey
                ]
            ) {

                const noteData =
                    NOTE_KEYS[
                    lowerKey
                    ];


                setNote(
                    noteData.note
                );


                setNoteIndex(
                    noteData.index
                );


                setTriggerId(
                    (previous) =>
                        previous + 1
                );


                /*
                Song detection
                */

                processSongNote(
                    noteData.index
                );


                return;
            }


            /*
            =========================================
            EFFECT INPUT
            =========================================
            */

            if (
                EFFECT_KEYS[key]
            ) {

                event.preventDefault();


                setEffect(
                    EFFECT_KEYS[key]
                );


                return;
            }


            /*
            =========================================
            NORMAL EFFECT
            =========================================
            */

            if (
                key === "0"
            ) {

                setEffect(
                    "NORMAL"
                );


                return;
            }


            /*
            =========================================
            VOLUME DOWN
            =========================================
            */

            if (
                key === "["
            ) {

                setVolume(
                    (previous) => {

                        const next =
                            previous - 0.1;


                        return Math.max(
                            0,
                            Number(
                                next.toFixed(1)
                            )
                        );
                    }
                );


                return;
            }


            /*
            =========================================
            VOLUME UP
            =========================================
            */

            if (
                key === "]"
            ) {

                setVolume(
                    (previous) => {

                        const next =
                            previous + 0.1;


                        return Math.min(
                            1,
                            Number(
                                next.toFixed(1)
                            )
                        );
                    }
                );
            }
        }


        window.addEventListener(
            "keydown",
            handleKeyDown
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );


            if (
                victoryTimerRef.current
            ) {

                clearTimeout(
                    victoryTimerRef.current
                );
            }
        };

    }, []);

    /*make change here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    useEffect(() => {

        let socket = null;
        let reconnectTimer = null;
        let stopped = false;


        function handlePicoMessage(rawMessage) {

            const message =
                rawMessage.trim();


            if (!message) {
                return;
            }


            console.log(
                "[PICO INPUT]",
                message
            );


            const separatorIndex =
                message.indexOf(":");


            if (
                separatorIndex === -1
            ) {

                console.warn(
                    "[PICO INPUT] Unknown message:",
                    message
                );

                return;
            }


            const type =
                message
                    .slice(
                        0,
                        separatorIndex
                    )
                    .trim()
                    .toUpperCase();


            const value =
                message
                    .slice(
                        separatorIndex + 1
                    )
                    .trim();


            if (
                type === "NOTE"
            ) {

                const playedNoteIndex =
                    Number(value);


                if (
                    !Number.isInteger(
                        playedNoteIndex
                    ) ||
                    playedNoteIndex < 0 ||
                    playedNoteIndex >=
                    PICO_NOTES.length
                ) {

                    console.warn(
                        "[PICO INPUT] Invalid note:",
                        value
                    );

                    return;
                }


                const noteData =
                    PICO_NOTES[
                    playedNoteIndex
                    ];


                setNote(
                    noteData.note
                );


                setNoteIndex(
                    noteData.index
                );


                setTriggerId(
                    (previous) =>
                        previous + 1
                );


                processSongNote(
                    noteData.index
                );


                return;
            }


            if (
                type === "EFFECT"
            ) {

                const effectName =
                    value.toUpperCase();


                if (
                    !PICO_EFFECTS.has(
                        effectName
                    )
                ) {

                    console.warn(
                        "[PICO INPUT] Invalid effect:",
                        value
                    );

                    return;
                }


                setEffect(
                    effectName
                );


                console.log(
                    "[PICO EFFECT]",
                    effectName
                );


                return;
            }


            if (
                type === "VOLUME"
            ) {

                const nextVolume =
                    Number(value);


                if (
                    !Number.isFinite(
                        nextVolume
                    )
                ) {

                    console.warn(
                        "[PICO INPUT] Invalid volume:",
                        value
                    );

                    return;
                }


                const safeVolume =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            nextVolume
                        )
                    );


                setVolume(
                    safeVolume
                );


                console.log(
                    "[PICO VOLUME]",
                    safeVolume
                );


                return;
            }


            console.warn(
                "[PICO INPUT] Unknown type:",
                type
            );
        }
        function connectWebSocket() {

            if (stopped) {
                return;
            }


            console.log(
                "[WEBSOCKET] Connecting to",
                PICO_WS_URL
            );


            socket =
                new WebSocket(
                    PICO_WS_URL
                );


            socket.onopen =
                () => {

                    console.log(
                        "[WEBSOCKET] Connected"
                    );
                };


            socket.onmessage =
                (event) => {

                    handlePicoMessage(
                        event.data
                    );
                };


            socket.onerror =
                (error) => {

                    console.error(
                        "[WEBSOCKET] Error:",
                        error
                    );
                };


            socket.onclose =
                () => {

                    console.log(
                        "[WEBSOCKET] Disconnected"
                    );


                    if (stopped) {
                        return;
                    }


                    reconnectTimer =
                        setTimeout(
                            connectWebSocket,
                            1500
                        );
                };
        }


        connectWebSocket();


        return () => {

            stopped =
                true;


            if (
                reconnectTimer
            ) {

                clearTimeout(
                    reconnectTimer
                );
            }


            if (
                socket
            ) {

                socket.close();
            }
        };

    }, []);

    /*make change here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/



    return (

        <div className="viz-panel">


            <VisualizerHUD
                position="top"
            />


            <div className="viz-stage">


                <VisualizerBackground />


                <NoteEffects
                    key={`note-effect-${triggerId}`}
                    noteIndex={noteIndex}
                    triggerId={triggerId}
                    volume={volume}
                />


                <Dino
                    src={selectedDino}
                    noteIndex={noteIndex}
                    triggerId={triggerId}
                    volume={volume}
                />


                {songComplete && (

                    <div className="circuit-broken-screen">


                        <div className="circuit-broken-flash" />


                        <div className="circuit-broken-crack circuit-crack-1" />

                        <div className="circuit-broken-crack circuit-crack-2" />

                        <div className="circuit-broken-crack circuit-crack-3" />

                        <div className="circuit-broken-crack circuit-crack-4" />


                        <div className="circuit-broken-content">


                            <p className="circuit-broken-small">

                                // SONG COMPLETE //

                            </p>


                            <h2 className="circuit-broken-title">

                                THE CIRCUIT

                                <br />

                                HAS BEEN BROKEN!

                            </h2>


                            <p className="circuit-broken-status">

                                SYSTEM // DESTROYED

                            </p>


                        </div>


                    </div>

                )}


            </div>


            <VisualizerHUD
                position="bottom"
                note={note}
                effect={effect}
                volume={volume}
            />


            <div className="song-progress-debug">

                SONG // {songProgress} / {SONG_SEQUENCE.length}

            </div>


        </div>

    );
}


export default Visualizer;