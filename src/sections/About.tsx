import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealText, SectionLabel } from "../components/motion";
import { profile } from "../data/content";

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The photo drifts inside its frame and the sticker floats the other way: a gentle depth cue
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const tagY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className="about" id="about">
      <SectionLabel index="01" label="About" />
      <div className="about-grid" ref={ref}>
        <div className="about-media">
          <Reveal className="portrait" y={40}>
            <motion.img src={asset(profile.photo)} alt={profile.name} style={{ y: imgY }} loading="lazy" />
          </Reveal>
          <motion.p className="about-tag" style={{ y: tagY }}>
            <span>Based in</span> Lahore, PK
            <br />
            <span>Working with</span> AU · UK · EU · US
          </motion.p>
        </div>

        <div className="about-copy">
          <RevealText
            className="about-statement"
            text="Three years of shipping production systems. Now building websites, stores and AI products for people who want them done properly."
            accent={["production", "properly."]}
          />
          <div className="about-cols">
            {profile.about.map((p, i) => (
              <Reveal key={p} as="p" delay={0.1 + i * 0.08}>
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal className="about-links" delay={0.3}>
            <a className="arrow-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className="arrow-link" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
