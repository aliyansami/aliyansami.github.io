import Reveal from "./Reveal";
import { skills } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="mb-3 font-mono text-sm tracking-widest text-accent">02 — TOOLKIT</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            The stack I build with
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            A pragmatic, production-focused toolset spanning backend, cloud, and applied machine learning.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-white/10 bg-card/60 p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:glow-ring">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent/30 to-accent3/30 font-mono text-sm text-accent2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{s.group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 transition group-hover:border-white/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
