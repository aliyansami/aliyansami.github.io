import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, RevealText, SectionLabel } from "../components/motion";
import { process, services, trust } from "../data/content";

const pad = (n: number) => String(n).padStart(2, "0");
const colors = ["#0e9f5c", "#6a4cf5", "#f04e12"];

export default function Services() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 85%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="services" id="services">
      <SectionLabel index="04" label="Services" />
      <RevealText className="display" text="What I can build for you." accent={["you."]} />

      <div className="svc-list">
        {services.map((s, i) => (
          <Reveal key={s.title} className="svc-row" style={{ "--c": colors[i] } as React.CSSProperties} delay={i * 0.06}>
            <span className="svc-num tabular">{pad(i + 1)}</span>
            <div className="svc-head">
              <h3>{s.title}</h3>
              <p>{s.for}</p>
            </div>
            <ul>
              {s.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="process">
        <div className="process-head">
          <RevealText as="h3" className="subhead" text="How a project runs" />
          <Reveal as="p" delay={0.1}>
            From first call to launch, with a free mock-up before you commit to anything.
          </Reveal>
        </div>
        <ol className="steps" ref={stepsRef}>
          <motion.span className="steps-line" style={{ scaleX: line }} aria-hidden="true" />
          <motion.span className="steps-line is-vertical" style={{ scaleY: line }} aria-hidden="true" />
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 0.1}>
              <span className="step-dot tabular">{pad(i + 1)}</span>
              <h4>{p.step}</h4>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <dl className="trust">
        {trust.map((t, i) => (
          <Reveal key={t.title} className="trust-item" delay={(i % 3) * 0.07}>
            <dt>{t.title}</dt>
            <dd>{t.text}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
