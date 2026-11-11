import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { profile } from "../data/content";
import { ease, spring } from "./motion";

export const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "redesigns", label: "Redesigns" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Which section is under the middle of the screen. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // Back at the top, nothing is active
    const onScroll = () => window.scrollY < window.innerHeight * 0.4 && setActive(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

export default function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  // Tuck the bar away while reading downwards, bring it back on any upward scroll
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > 240 && y > prev && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        className={scrolled ? "nav is-scrolled" : "nav"}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease }}
      >
        <a className="nav-name" href="#top" onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <nav className="nav-links" aria-label="Sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "is-active" : undefined}>
              {active === s.id && <motion.span layoutId="nav-active" className="nav-active" transition={spring} />}
              <span className="nav-text">{s.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-examples" href="examples/">
            <span className="spark" aria-hidden="true">
              ✦
            </span>
            <span className="long">Sample redesigns</span>
            <span className="short">Examples</span>
          </a>
          <a className="nav-cta" href={`mailto:${profile.email}?subject=Free%20mock-up%20request`}>
            <span className="dot" aria-hidden="true" /> Available
          </a>
          <button
            type="button"
            className={open ? "nav-menu is-open" : "nav-menu"}
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <i />
            <i />
          </button>
        </div>

        <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-sheet"
            className="sheet"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
          >
            <nav aria-label="Sections">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.05 }}
                >
                  <span className="tabular">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="sheet-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
