import { useState } from "react";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Instrument from "./components/Instrument";
import Band from "./components/Band";
import Setlist from "./components/Setlist";
import Visualizer from "./components/visualizer/Visualizer";
import Footer from "./components/Footer";

import dino1 from "./assets/images/dino1.png";
import dino2 from "./assets/images/dino2.png";
import dino3 from "./assets/images/dino3.png";
import dino4 from "./assets/images/dino4.png";


import "./App.css";

const DINO_BY_MEMBER = {
  1: dino1,
  2: dino2,
  3: dino3,
  4: dino4,
};

function App() {
  const [selectedMember, setSelectedMember] = useState(1);
  return (
    <>
      <Navbar />

      <main>

        <section id="home" className="home-section">
          <Hero />
        </section>

        <section id="instrument" className="game-section">
          <Instrument />
        </section>

        <section id="band" className="game-section alt-section">
          <Band
            selectedMember={selectedMember}
            onSelectMember={setSelectedMember} />

        </section>

        <section id="music" className="game-section">
          <Setlist />
        </section>

        <section id="live" className="game-section live-section">
          <Visualizer
            selectedMember={selectedMember}
            selectedDino={DINO_BY_MEMBER[selectedMember]} />
        </section>

      </main>

      <Footer />
    </>
  );
}

export default App;