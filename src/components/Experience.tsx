import Reveal from "./Reveal";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="mb-3 font-mono text-sm tracking-widest text-accent">04 — JOURNEY</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Experience</h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {experience.map((e, i) => (
            <Reveal key={e.role + e.org} delay={i * 0.08}>
              <div className="relative grid gap-4 rounded-2xl border border-white/10 bg-card/40 p-7 transition hover:border-white/20 sm:grid-cols-[180px_1fr]">
                <div>
                  <div className="font-mono text-sm text-accent2">{e.period}</div>
                  <div className="mt-1 font-display text-lg font-semibold text-white">{e.org}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{e.role}</h3>
                  <ul className="mt-3 space-y-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
