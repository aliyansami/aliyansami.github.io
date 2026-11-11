import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealText, SectionLabel, ease } from "../components/motion";
import { projects, type Project } from "../data/content";

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;
const shot = (slug: string, n: number) => asset(`work/${slug}/${n}.jpg`);
const pad = (n: number) => String(n).padStart(2, "0");

function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 1000px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");
    const update = () => setWide(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

function Chapter({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Screenshot and colour block move at slightly different speeds as the chapter passes
  // Smaller drift on phones, where the screenshot sits right above its thumbnails
  const range = useWide() ? 60 : 16;
  const mediaY = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const blockY = useTransform(scrollYProgress, [0, 1], [-range / 2, range / 2]);
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={flip ? "chapter is-flipped" : "chapter"}
      style={{ "--tint": project.tint } as React.CSSProperties}
      aria-labelledby={`p-${project.slug}`}
    >
      <div className="chapter-media">
        <motion.span className="chapter-block" style={{ y: blockY }} aria-hidden="true" />
        <motion.div className="browser" style={{ y: mediaY }}>
          <div className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{project.name}</span>
          </div>
          <div className="browser-view">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={active}
                src={shot(project.slug, active)}
                alt={`${project.name}, screen ${active} of ${project.shots}`}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
        {project.shots > 1 && (
          <div className="thumbs" role="group" aria-label={`${project.name} screens`}>
            {Array.from({ length: project.shots }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={n === active ? "is-active" : undefined}
                onClick={() => setActive(n)}
                aria-label={`Show screen ${n}`}
                aria-pressed={n === active}
              >
                <img src={shot(project.slug, n)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="chapter-copy">
        <Reveal className="chapter-meta">
          <span className="chapter-num tabular">{pad(index + 1)}</span>
          <span>
            {project.context} · {project.year}
          </span>
        </Reveal>
        <RevealText as="h3" className="chapter-title" text={project.name} id={`p-${project.slug}`} />
        <Reveal as="p" className="chapter-kind" delay={0.1}>
          {project.kind}
        </Reveal>
        <Reveal as="p" className="chapter-summary" delay={0.15}>
          {project.summary}
        </Reveal>
        <ul className="chapter-points">
          {project.points.map((pt, i) => (
            <Reveal as="li" key={pt} delay={0.2 + i * 0.06} y={16}>
              {pt}
            </Reveal>
          ))}
        </ul>
        <Reveal as="p" className="chapter-stack" delay={0.4}>
          {project.stack.join(" / ")}
        </Reveal>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="work-head">
        <SectionLabel index="02" label="Selected work" />
        <RevealText
          className="display"
          text="Products I've designed, built and shipped."
          accent={["shipped."]}
        />
        <Reveal as="p" className="work-count tabular" delay={0.2}>
          {pad(projects.length)} projects · 2024 – 2026
        </Reveal>
      </div>
      {projects.map((p, i) => (
        <Chapter key={p.slug} project={p} index={i} />
      ))}
    </section>
  );
}
