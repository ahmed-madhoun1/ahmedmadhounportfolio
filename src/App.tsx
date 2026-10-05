import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CursorGlow } from "./components/CursorGlow";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white transition-colors duration-300">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


export default App;
