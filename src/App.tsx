import { Fragment, useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import Deck, { spring, type DeckItem } from "./components/Deck";
import DotField from "./components/DotField";
import { profile, projects } from "./data/content";

const items: DeckItem[] = [
  { id: "about", type: "info" },
  { id: "examples", type: "info" },
  ...projects.slice(0, 2).map((p): DeckItem => ({ id: p.slug, type: "project", project: p })),
  { id: "services", type: "info" },
  ...projects.slice(2).map((p): DeckItem => ({ id: p.slug, type: "project", project: p })),
  { id: "process", type: "info" },
  { id: "experience", type: "info" },
  { id: "contact", type: "info" },
];

function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profile.timezone,
    }).format(new Date());
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
          {line.flatMap((piece): Piece[] => (piece.hl ? [piece] : piece.text.split(" ").map((t): Piece => ({ text: t })))).map(
            (piece, i) => {
              const delay = 0.05 + n++ * 0.04;
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
            },
          )}
        </span>
      ))}
    </h1>
  );
}

// Skill pills scattered in the empty side of the intro. Visitors can fling them around.
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
          transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.7 + i * 0.07 }}
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

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <header className="bar">
          <span className="bar-name">{profile.name}</span>
          <span className="bar-meta">
            {profile.location} · <LocalTime />
          </span>
          <span className="bar-actions">
            <a className="bar-examples" href="examples/">
              <span className="spark" aria-hidden="true">✦</span>
              <span className="long">See sample redesigns</span>
              <span className="short">Examples</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="bar-cta" href={`mailto:${profile.email}?subject=Free%20mock-up%20request`}>
              <span className="dot" aria-hidden="true" /> <span className="long">Available for projects</span>
              <span className="short">Available</span>
            </a>
          </span>
        </header>

        <main>
          <section className="intro">
            <DotField />
            <Pills />
            <Headline />
            <motion.p className="intro-sub" {...rise(0.55)}>
              Software engineer in {profile.location}, working with businesses in Australia, the UK, Europe and
              the US. Drag the cards below, or click one to open it.
            </motion.p>
          </section>

          <motion.section
            className="deck-wrap"
            aria-label="Work and information"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.35 }}
          >
            <Deck items={items} />
          </motion.section>
        </main>

        <footer className="foot">
          <a className="link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <span className="foot-links">
            <a className="link" href="examples/">
              Sample redesigns
            </a>
            <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="link" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </span>
          <span className="foot-copy">© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </MotionConfig>
  );
}
