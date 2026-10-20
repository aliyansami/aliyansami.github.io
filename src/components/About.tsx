import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { profile, stats } from "../data/content";

function Counter({ value }: { value: string }) {
  // Numbers count up when scrolled into view; non-numeric (e.g. ∞) renders as-is.
  const num = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(isNaN(num) ? value : "0");

  useEffect(() => {
    if (isNaN(num)) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(String(Math.round(eased * num)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="mb-3 font-mono text-sm tracking-widest text-accent">01 — ABOUT</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Turning hard problems into <span className="gradient-text">shipped product</span>.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-slate-300">{profile.summary}</p>
            <p className="mt-5 leading-relaxed text-slate-400">
              Whether it's orchestrating a multi-step AI workflow on AWS, squeezing identity
              preservation out of a diffusion model, or designing an API that just works — I care
              about systems that are reliable, observable, and genuinely useful.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <span className="text-accent2">◆</span> {profile.resumeNote}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:glow-ring"
                >
                  <div className="font-display text-4xl font-extrabold gradient-text">
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-2 text-sm text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
