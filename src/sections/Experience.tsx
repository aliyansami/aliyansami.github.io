import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, RevealText, SectionLabel } from "../components/motion";
import { capabilities, roles } from "../data/content";

const dots = ["#7c5cff", "#12b76a", "#3b6cff", "#ff4d6d"];

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="experience" id="experience">
      <div className="exp-grid">
        <div className="exp-side">
          <SectionLabel index="05" label="Experience" />
          <RevealText className="display" text="Where I've been building." accent={["building."]} />
        </div>

        <ol className="timeline" ref={listRef}>
          <span className="timeline-rail" aria-hidden="true">
            <motion.i style={{ scaleY: fill }} />
          </span>
          {roles.map((r, i) => (
            <Reveal as="li" key={r.org} delay={i * 0.08}>
              <span className="tl-period tabular">{r.period}</span>
              <h3>{r.title}</h3>
              <p className="tl-org">
                {r.org} · {r.place}
              </p>
              {r.note && <p className="tl-note">{r.note}</p>}
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="skills" aria-label="Skills">
        {capabilities.map((c, i) => (
          <div key={c.label} className={i % 2 ? "skill-row is-reverse" : "skill-row"} style={{ "--c": dots[i] } as React.CSSProperties}>
            <span className="skill-label">{c.label}</span>
            <div className="marquee">
              {/* Two copies so the loop is seamless; the second is hidden from screen readers */}
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 || undefined}>
                  {/* Short lists are repeated so each half of the loop is wider than the screen */}
                  {Array.from({ length: c.items.length < 5 ? 3 : 2 }, (_, r) =>
                    c.items.map((it) => (
                      <li key={`${r}-${it}`} aria-hidden={r > 0 || undefined}>
                        {it}
                      </li>
                    )),
                  )}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
