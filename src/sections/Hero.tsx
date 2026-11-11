import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DotField from "../components/DotField";
import { spring } from "../components/motion";
import { profile } from "../data/content";

export function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular">{time}</span>;
}

// Headline: plain words plus a few coloured phrases. Each piece slides up out of its own
// line box in turn; coloured phrases then get a marker stroke drawn underneath.
type Piece = { text: string; hl?: string };

const headline: Piece[][] = [
  [
    { text: "I design and build" },
    { text: "websites,", hl: "green" },
    { text: "online stores", hl: "violet" },
    { text: "and" },
    { text: "AI products", hl: "orange" },
  ],
  [{ text: "that are a" }, { text: "pleasure", hl: "pink" }, { text: "to use." }],
];

function Headline() {
  let n = 0;
  return (
    <h1>
      {headline.map((line, li) => (
        <span key={li} className={li === 1 ? "quiet" : undefined}>
          {line
            .flatMap((piece): Piece[] => (piece.hl ? [piece] : piece.text.split(" ").map((t): Piece => ({ text: t }))))
            .map((piece, i) => {
              const delay = 0.1 + n++ * 0.045;
              return (
                <Fragment key={i}>
                  <span className={piece.hl ? `word hl hl-${piece.hl}` : "word"}>
                    <motion.span
                      className="word-inner"
                      style={{ "--d": `${delay + 0.45}s` } as React.CSSProperties}
                      initial={{ y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ ...spring, delay }}
                    >
                      {piece.text}
                    </motion.span>
                  </span>{" "}
                </Fragment>
              );
            })}
        </span>
      ))}
    </h1>
  );
}

// Skill pills scattered in the empty side of the hero. Visitors can fling them around.
const pills = [
  { label: "React", bg: "#7c5cff", fg: "#fff", x: "8%", y: "10%", r: -8 },
  { label: "Django", bg: "#12b76a", fg: "#fff", x: "46%", y: "4%", r: 6 },
  { label: "Shopify", bg: "#ffd43b", fg: "#1a1600", x: "68%", y: "30%", r: -4 },
  { label: "OpenAI", bg: "#111213", fg: "#fff", x: "22%", y: "36%", r: 4 },
  { label: "Stripe", bg: "#3b6cff", fg: "#fff", x: "56%", y: "56%", r: -10 },
  { label: "Next.js", bg: "#ffffff", fg: "#111213", x: "4%", y: "64%", r: 9 },
  { label: "Python", bg: "#ff4d6d", fg: "#fff", x: "34%", y: "74%", r: -3 },
  { label: "WooCommerce", bg: "#9ff0c4", fg: "#062014", x: "62%", y: "82%", r: 5 },
];

function Pills() {
  const area = useRef<HTMLDivElement>(null);
  return (
    <div ref={area} className="pills" aria-hidden="true">
      {pills.map((p, i) => (
        <motion.span
          key={p.label}
          className="pill"
          style={{ left: p.x, top: p.y, background: p.bg, color: p.fg }}
          initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: p.r }}
          transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.8 + i * 0.07 }}
          drag
          dragConstraints={area}
          dragElastic={0.25}
          dragTransition={{ bounceStiffness: 420, bounceDamping: 14 }}
          whileHover={{ scale: 1.06 }}
          whileDrag={{ scale: 1.12, rotate: 0, zIndex: 2 }}
        >
          {p.label}
        </motion.span>
      ))}
    </div>
  );
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { ...spring, delay } },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // As the hero scrolls away the copy drifts up a little and fades, so the next section takes over
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="hero" id="top">
      <DotField />
      <Pills />
      <motion.div className="hero-copy" style={{ y, opacity }}>
        <motion.p className="hero-meta" {...rise(0.05)}>
          <span className="dot" aria-hidden="true" /> Available for new projects
          <span className="meta-place">· {profile.location}</span> · <LocalTime />
        </motion.p>
        <Headline />
        <motion.p className="hero-sub" {...rise(0.6)}>
          Software engineer working with businesses in Australia, the UK, Europe and the US. Websites for clinics,
          online stores for shops, and AI features for startups, with a free mock-up before you pay anything.
        </motion.p>
        <motion.div className="hero-ctas" {...rise(0.72)}>
          <a className="btn btn-ink" href="#work">
            See selected work <span aria-hidden="true">↓</span>
          </a>
          <a className="btn btn-line" href={`mailto:${profile.email}?subject=Free%20mock-up%20request`}>
            Get a free mock-up
          </a>
        </motion.div>
      </motion.div>
      <motion.a className="scroll-cue" href="#about" aria-label="Scroll to about" {...rise(1.1)}>
        <span>Scroll</span>
        <i />
      </motion.a>
    </section>
  );
}
