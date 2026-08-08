import member1 from "../assets/images/1.png";
import member2 from "../assets/images/2.png";
import member3 from "../assets/images/3.png";
import member4 from "../assets/images/4.png";
const members = [
    {
        id: 1,
        player: "P1",
        name: "Emily Reyes",
        role: "HARDWARE",
        title: "ELECTRONICS / CIRCUITS",
        description:
            "Responsible for circuit design, wiring, and physical controls for the instrument.",
        skills: ["CIRCUITS", "SOLDERING", "TESTING"],
        image: member1,
    },

    {
        id: 2,
        player: "P2",
        name: "Tasfia Uddin",
        role: "MECHANICAL",
        title: "CAD / FABRICATION",
        description:
            "Designs the instrument body, enclosure, and mechanical components.",
        skills: ["CAD", "3D PRINT", "FABRICATION"],
        image: member2,
    },

    {
        id: 3,
        player: "P3",
        name: "Phillip Wang",
        role: "FIRMWARE",
        title: "SOUND / EMBEDDED",
        description:
            "Programs the instrument controls, sound behavior, and embedded systems.",
        skills: ["PICO", "AUDIO", "USB DATA"],
        image: member3,
    },

    {
        id: 4,
        player: "P4",
        name: "Yicong Qiu",
        role: "SOFTWARE",
        title: "WEB / VISUALS",
        description:
            "Builds the website, visual interface, and live performance visualizer.",
        skills: ["REACT", "VISUALS", "WEB SERIAL"],
        image: member4,
    },
];

export default members;