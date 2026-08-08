import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Instrument from "./components/Instrument";
import Band from "./components/Band";
import Setlist from "./components/Setlist";
import Visualizer from "./components/Visualizer";
import Footer from "./components/Footer";

import "./App.css";

function App() {
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
          <Band />
        </section>

        <section id="music" className="game-section">
          <Setlist />
        </section>

        <section id="live" className="game-section live-section">
          <Visualizer />
        </section>

      </main>

      <Footer />
    </>
  );
}

export default App;