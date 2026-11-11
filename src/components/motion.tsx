import { Fragment, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";

// One spring for things that move under the pointer, one curve for things that arrive on scroll.
export const spring = { type: "spring", stiffness: 380, damping: 36, mass: 0.9 } as const;
export const ease = [0.2, 0, 0, 1] as const;

const inView = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "p" | "span" | "figure" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** A heading whose words slide up out of their own line boxes, one after another. */
export function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
  accent,
  id,
}: {
  id?: string;
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Words (exact match, punctuation included) to colour with the accent */
  accent?: string[];
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={inView}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word" aria-hidden="true">
            <motion.span
              className={accent?.includes(w) ? "word-inner accent" : "word-inner"}
              variants={{ hidden: { y: "108%" }, shown: { y: 0 } }}
              transition={{ duration: 0.8, ease }}
            >
              {w}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}

/** "01 — About" label with a rule that draws itself in. */
export function SectionLabel({ index, label, light }: { index: string; label: string; light?: boolean }) {
  return (
    <div className={light ? "sec-label is-light" : "sec-label"}>
      <span className="tabular">{index}</span>
      <motion.i
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inView}
        transition={{ duration: 1, ease }}
      />
      <span>{label}</span>
    </div>
  );
}
