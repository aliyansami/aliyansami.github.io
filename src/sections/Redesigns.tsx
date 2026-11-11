import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealText, SectionLabel } from "../components/motion";

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

const samples = [
  {
    slug: "dental",
    name: "Harbourline Family Dental",
    niche: "Dental practice",
    color: "#9ff0c4",
    ink: "#062014",
    changes: ["Dark, memorable look with an animated hero", "Booking card front and centre", "Live \"Open now\" status"],
  },
  {
    slug: "vet",
    name: "Kestrel Vale Veterinary",
    niche: "Vet clinic",
    color: "#ffd43b",
    ink: "#1a1600",
    changes: ["Illustrated, animated pets", "\"Who's coming in?\" pet picker", "Care tabs by life stage"],
  },
  {
    slug: "florist",
    name: "Juniper & Thistle Flowers",
    niche: "Florist",
    color: "#7c5cff",
    ink: "#ffffff",
    changes: ["Bouquet that blooms in", "Live build-a-bouquet", "Same-day delivery countdown"],
  },
];

/** Wide screens: the section pins and the panels slide sideways as you scroll down. */
function useHorizontal() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide && !reduce;
}

export default function Redesigns() {
  const horizontal = useHorizontal();
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  useLayoutEffect(() => {
    if (!horizontal || !track.current) return setDistance(0);
    const el = track.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  return (
    <section
      ref={outer}
      className={horizontal ? "redesigns is-horizontal" : "redesigns"}
      id="redesigns"
      style={horizontal ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="redesigns-pin">
        <motion.div ref={track} className="redesigns-track" style={horizontal ? { x } : undefined}>
          <div className="redesigns-intro">
            <SectionLabel index="03" label="Sample redesigns" light />
            <RevealText className="display" text="Same business. Before, and after." accent={["after."]} />
            <Reveal as="p" className="redesigns-lead" delay={0.15}>
              Most small-business sites look like the same template. These makeovers show what changes when a site
              is designed to be remembered, and to turn visitors into bookings and orders.
            </Reveal>
            <Reveal as="p" className="redesigns-note" delay={0.25}>
              Concept work for illustration: sample businesses, not real clients.
            </Reveal>
            <Reveal delay={0.3}>
              <a className="btn btn-light" href="examples/">
                Compare all three <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>

          {samples.map((s, i) => (
            <Reveal
              key={s.slug}
              as="article"
              className="sample"
              delay={horizontal ? 0 : 0.05}
              style={{ "--c": s.color, "--ci": s.ink } as React.CSSProperties}
            >
              <a className="sample-media" href={`examples/${s.slug}/after.html`} aria-label={`Open the live ${s.name} redesign`}>
                <img className="sample-after" src={asset(`examples/img/${s.slug}-after.webp`)} alt="" loading="lazy" />
                <span className="sample-before">
                  <img src={asset(`examples/img/${s.slug}-before.webp`)} alt="" loading="lazy" />
                  <b>Before</b>
                </span>
                <b className="sample-after-tag">After</b>
                <span className="sample-open" aria-hidden="true">
                  Open live ↗
                </span>
              </a>
              <div className="sample-copy">
                <p className="sample-meta tabular">
                  {String(i + 1).padStart(2, "0")} · {s.niche}
                </p>
                <h3>{s.name}</h3>
                <ul>
                  {s.changes.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="sample-links">
                  <a className="arrow-link" href={`examples/${s.slug}/after.html`}>
                    Live redesign <span aria-hidden="true">↗</span>
                  </a>
                  <a className="arrow-link" href={`examples/#${s.slug}`}>
                    Before vs after <span aria-hidden="true">→</span>
                  </a>
                </p>
              </div>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
