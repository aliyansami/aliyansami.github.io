import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { projects, type Project } from "../data/content";

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <button
      onMouseMove={onMove}
      onClick={onOpen}
      className={`spotlight group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-7 text-left transition hover:-translate-y-1.5 hover:border-white/25 ${
        p.featured ? "sm:col-span-2" : ""
      }`}
    >
      {/* accent glow strip */}
      <span
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          {p.featured && (
            <span className="mb-2 inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-accent2">
              Featured
            </span>
          )}
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{p.title}</h3>
          <p className="mt-2 max-w-xl text-slate-400">{p.blurb}</p>
        </div>
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white transition group-hover:rotate-45 group-hover:border-white/30"
          style={{ background: `${p.accent}22` }}
        >
          ↗
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.tags.slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400"
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="mb-3 font-mono text-sm tracking-widest text-accent">03 — SELECTED WORK</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Things I've <span className="gradient-text">built & shipped</span>
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            A look at the systems behind the products. Tap any card for the deeper story.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <ProjectCard p={p} onOpen={() => setActive(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative z-10 w-full max-w-lg rounded-2xl p-8"
            >
              <span
                className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${active.accent}, transparent)` }}
              />
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
              <h3 className="font-display text-2xl font-bold text-white">{active.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-300">{active.description}</p>

              <h4 className="mt-6 font-mono text-xs tracking-widest text-accent">HIGHLIGHTS</h4>
              <ul className="mt-3 space-y-2">
                {active.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-slate-300">
                    <span className="mt-1 text-accent2">▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
