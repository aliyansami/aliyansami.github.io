import { lazy, Suspense, useEffect, useState } from "react";
import { capabilities, profile, projects, roles } from "./data/content";

// Three.js is most of the bundle, so the figure loads after the text.
const EmbeddingField = lazy(() => import("./components/EmbeddingField"));

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

function Header() {
  return (
    <header className="topbar">
      <a href="#top" className="wordmark">
        {profile.name}
      </a>
      <nav aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <p className="topbar-meta">
        {profile.location} · <LocalTime />
      </p>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{profile.role}</p>
        <h1>
          Production AI that answers from <em>your</em> data, and the backend that keeps it honest.
        </h1>
        <p className="lede">{profile.intro}</p>
        <p className="hero-links">
          <a href="#work">Selected work ↓</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </div>
      <figure className="hero-figure">
        <Suspense fallback={<div className="field" aria-hidden="true" />}>
          <EmbeddingField />
        </Suspense>
        <figcaption>
          <span>Fig. 1</span> A query moving through 1,680 embedded chunks, linked to its six nearest
          neighbours. The retrieval step behind every RAG feature I build.
        </figcaption>
      </figure>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="section-head">
        <h2>Selected work</h2>
        <p>2024 — 2026</p>
      </div>
      <ol className="work-list">
        {projects.map((p, i) => (
          <li key={p.name}>
            <details>
              <summary>
                <span className="index tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="work-name">{p.name}</span>
                <span className="work-kind">{p.kind}</span>
                <span className="work-meta">
                  {p.context}, {p.year}
                </span>
                <span className="toggle" aria-hidden="true" />
              </summary>
              <div className="work-body">
                <p className="work-summary">{p.summary}</p>
                <ul className="work-points">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <p className="work-stack">{p.stack.join(" / ")}</p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-head">
        <h2>About</h2>
      </div>
      <div className="about-grid">
        <div className="about-text">
          {profile.about.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <dl className="roles">
          {roles.map((r) => (
            <div key={r.org} className="role">
              <dt>
                <span className="role-title">{r.title}</span>
                <span className="role-org">
                  {r.org}, {r.place}
                </span>
              </dt>
              <dd>
                <span className="role-period tabular">{r.period}</span>
                {r.note && <span className="role-note">{r.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="capabilities">
        {capabilities.map((c) => (
          <div key={c.label}>
            <h3>{c.label}</h3>
            <ul>
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="eyebrow">Contact</p>
      <p className="contact-line">
        Building something with LLMs that needs to work on a Monday morning?{" "}
        <a href={`mailto:${profile.email}`}>Write to me.</a>
      </p>
      <ul className="contact-links">
        <li>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Set in Instrument Serif and Inter. Figure rendered with Three.js.</span>
      </footer>
    </>
  );
}
