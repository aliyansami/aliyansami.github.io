import { useEffect, useState } from "react";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { profile } from "./data/content";

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-accent to-accent3 text-white shadow-lg shadow-accent/40 transition hover:scale-110"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default function App() {
  return (
    <div className="relative">
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
        <p>
          Designed & built by {profile.name} · © {new Date().getFullYear()}
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Crafted with React, Tailwind & Framer Motion.
        </p>
      </footer>

      <BackToTop />
    </div>
  );
}
