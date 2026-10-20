import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content";

const roles = [
  "Backend Engineer",
  "AI / ML Engineer",
  "Generative Image Systems",
  "Cloud & Distributed Systems",
];

function useTypewriter(words: string[], speed = 80, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t: number;
    if (!deleting && text === word) {
      t = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((p) => p + 1);
      t = window.setTimeout(() => {}, speed);
    } else {
      t = window.setTimeout(
        () => {
          setText(
            deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(roles);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt for the code card
  const onTilt = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  };
  const resetTilt = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <section id="top" className="relative flex min-h-screen items-center">
      <div className="absolute inset-0 bg-grid" />
      <div className="section-pad grid items-center gap-12 pt-28 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name.split(" ")[0]}
            <br />
            <span className="gradient-text">{profile.name.split(" ")[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-5 font-mono text-lg text-accent2 sm:text-xl"
          >
            <span className="text-slate-500">&gt; </span>
            {typed}
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-accent2" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent3 px-7 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition hover:shadow-accent/50"
            >
              <span className="relative z-10">View my work</span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-7 py-3 font-semibold text-slate-200 transition hover:border-white/40 hover:bg-white/5"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-5 text-sm text-slate-500"
          >
            <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-white">
              GitHub
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a href={`mailto:${profile.email}`} className="transition hover:text-white">
              {profile.email}
            </a>
          </motion.div>
        </div>

        {/* Right: interactive code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto w-full max-w-md"
        >
          <div
            ref={cardRef}
            onMouseMove={onTilt}
            onMouseLeave={resetTilt}
            className="glass glow-ring rounded-2xl p-1 transition-transform duration-200 will-change-transform"
          >
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs text-slate-500">engineer.py</span>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-black/40 p-5 font-mono text-[13px] leading-relaxed">
<span className="text-accent3">class</span> <span className="text-accent2">Engineer</span>:
{"\n"}    <span className="text-slate-500"># build. ship. iterate.</span>
{"\n"}    name = <span className="text-emerald-300">"Aliyan Sami"</span>
{"\n"}    focus = [<span className="text-emerald-300">"backend"</span>, <span className="text-emerald-300">"applied AI"</span>]
{"\n"}    stack = {"{"}
{"\n"}        <span className="text-emerald-300">"api"</span>: <span className="text-emerald-300">"Django + DRF"</span>,
{"\n"}        <span className="text-emerald-300">"cloud"</span>: <span className="text-emerald-300">"AWS + RunPod"</span>,
{"\n"}        <span className="text-emerald-300">"ml"</span>: <span className="text-emerald-300">"FLUX + LoRA"</span>,
{"\n"}    {"}"}
{"\n"}
{"\n"}    <span className="text-accent3">def</span> <span className="text-accent2">solve</span>(self, problem):
{"\n"}        <span className="text-accent3">return</span> <span className="text-emerald-300">"shipped"</span> 🚀
            </pre>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 sm:flex"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </span>
      </a>
    </section>
  );
}
