import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import Redesigns from "./sections/Redesigns";
import Services from "./sections/Services";
import Experience from "./sections/Experience";
import Connect from "./sections/Connect";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Redesigns />
        <Services />
        <Experience />
        <Connect />
      </main>
    </MotionConfig>
  );
}
