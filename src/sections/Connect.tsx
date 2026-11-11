import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealText, SectionLabel } from "../components/motion";
import { profile } from "../data/content";
import { LocalTime } from "./Hero";
import BookCall from "../components/BookCall";

export default function Connect() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="connect" id="contact">
      <SectionLabel index="06" label="Contact" />
      <RevealText
        as="h2"
        className="connect-title"
        text="Let's get your business online."
        accent={["online."]}
      />
      <Reveal as="p" className="connect-lead" delay={0.15}>
        Send me a quick email with your business name and what you need. I'll reply within one working day with a free
        mock-up offer and a fixed quote. No pressure, no obligation.
      </Reveal>

      <Reveal className="connect-book" delay={0.2}>
        <BookCall className="btn btn-accent btn-lg" label="Book a free 15-minute call" />
        <span>Pick a time that suits you on my calendar. Video call, no obligation.</span>
      </Reveal>

      <Reveal as="p" className="connect-or" delay={0.25}>
        or email me
      </Reveal>

      <Reveal className="connect-mail" delay={0.25}>
        <a href={`mailto:${profile.email}?subject=Free%20mock-up%20request`}>{profile.email}</a>
        <button type="button" onClick={copy} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "y" : "n"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {copied ? "Copied ✓" : "Copy"}
            </motion.span>
          </AnimatePresence>
        </button>
      </Reveal>

      <ul className="socials">
        {[
          { label: "LinkedIn", note: "Work history & recommendations", href: profile.linkedin },
          { label: "GitHub", note: "Code & side projects", href: profile.github },
          { label: "Sample redesigns", note: "Before & after makeovers", href: "examples/" },
        ].map((s, i) => (
          <Reveal as="li" key={s.label} delay={0.1 + i * 0.07}>
            <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="social-label">{s.label}</span>
              <span className="social-note">{s.note}</span>
              <span className="social-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </Reveal>
        ))}
      </ul>

      <footer className="foot">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          {profile.location} · <LocalTime />
        </span>
        <span className="foot-links">
          <a className="link" href="privacy.html">
            Privacy
          </a>
          <a className="link" href="#top">
            Back to top ↑
          </a>
        </span>
      </footer>
    </section>
  );
}
