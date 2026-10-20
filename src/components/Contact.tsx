import { useState } from "react";
import Reveal from "./Reveal";
import { profile } from "../data/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-pad">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent3/20 blur-3xl" />

            <p className="relative mb-3 font-mono text-sm tracking-widest text-accent">05 — CONTACT</p>
            <h2 className="relative font-display text-4xl font-extrabold sm:text-5xl">
              Let's build something <span className="gradient-text">great</span>.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-slate-400">
              Have a project, a role, or an idea worth chasing? I'm always up for a good problem.
              The fastest way to reach me is email.
            </p>

            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-gradient-to-r from-accent to-accent3 px-8 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:shadow-accent/50"
              >
                Say hello
              </a>
              <button
                onClick={copyEmail}
                className="rounded-full border border-white/15 px-8 py-3.5 font-semibold text-slate-200 transition hover:border-white/40 hover:bg-white/5"
              >
                {copied ? "✓ Copied!" : "Copy email"}
              </button>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-white">
                GitHub ↗
              </a>
              <span className="h-4 w-px bg-white/10" />
              <span>{profile.location}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
