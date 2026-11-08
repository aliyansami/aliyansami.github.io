import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { process, profile, roles, services, trust, capabilities, type Project } from "../data/content";

// One spring for everything that moves, so the deck, cards and overlay feel related.
export const spring = { type: "spring", stiffness: 380, damping: 36, mass: 0.9 } as const;
// Softer spring for the deck sliding sideways, so long moves ease in and settle gently
const glide = { type: "spring", stiffness: 160, damping: 32, mass: 1 } as const;
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const shot = (slug: string, n: number) => asset(`work/${slug}/${n}.jpg`);
const pad = (n: number) => String(n).padStart(2, "0");

export type DeckItem =
  | { id: string; type: "project"; project: Project }
  | { id: "about" | "services" | "process" | "experience" | "contact"; type: "info" };

type Theme = { bg: string; fg: string };

const infoMeta: Record<string, { title: string; kind: string; theme: Theme }> = {
  about: { title: "About me", kind: "Who you'd be working with", theme: { bg: "#ffffff", fg: "#111213" } },
  services: { title: "Services", kind: "Websites, stores & AI", theme: { bg: "#ffd43b", fg: "#1a1600" } },
  process: { title: "How it works", kind: "From first call to launch", theme: { bg: "#3b6cff", fg: "#ffffff" } },
  experience: { title: "Experience", kind: "Roles, education & skills", theme: { bg: "#9ff0c4", fg: "#062014" } },
  contact: { title: "Say hello", kind: "Free mock-up, fixed quote", theme: { bg: "#ff5a1f", fg: "#ffffff" } },
};

const meta = (item: DeckItem) =>
  item.type === "project"
    ? {
        title: item.project.name,
        kind: item.project.kind,
        tag: item.project.year,
        theme: { bg: item.project.tint, fg: "#f4f4f2" },
      }
    : { ...infoMeta[item.id], tag: "" };

/* Cursor: a small pill that follows the pointer over the deck and says what a click does. */

function DeckCursor({ label }: { label: string | null }) {
  const x = useSpring(0, { stiffness: 600, damping: 45 });
  const y = useSpring(0, { stiffness: 600, damping: 45 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    let placed = false;
    const move = (e: PointerEvent) => {
      // Jump on the first event so the pill doesn't fly in from the corner
      if (!placed) {
        x.jump(e.clientX);
        y.jump(e.clientY);
        placed = true;
        return;
      }
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      fine.removeEventListener("change", update);
      window.removeEventListener("pointermove", move);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div className="deck-cursor" style={{ x, y }} aria-hidden="true">
      <AnimatePresence>
        {label && (
          <motion.span
            key="pill"
            className="deck-cursor-pill"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={spring}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={label}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* What sits inside each card's frame in the deck */

function Cover({ item }: { item: DeckItem }) {
  if (item.type === "project") {
    return <img className="cover-img" src={shot(item.project.slug, 1)} alt="" draggable={false} loading="lazy" />;
  }
  switch (item.id) {
    case "about":
      return <img className="cover-img cover-photo" src={asset(profile.photo)} alt="" draggable={false} />;
    case "services":
      return (
        <ul className="cover-list">
          <li>Clinic websites</li>
          <li>Online stores</li>
          <li>AI & custom software</li>
        </ul>
      );
    case "process":
      return (
        <ol className="cover-steps">
          {process.map((p, i) => (
            <li key={p.step}>
              <span className="tabular">{pad(i + 1)}</span>
              {p.step}
            </li>
          ))}
        </ol>
      );
    case "experience":
      return (
        <ul className="cover-timeline">
          {roles.map((r) => (
            <li key={r.org}>
              <span className="tabular">{r.period.match(/\d{4}/)?.[0]}</span>
              {r.org}
            </li>
          ))}
        </ul>
      );
    case "contact":
      return (
        <div className="cover-contact">
          <span>Have a project in mind?</span>
          <strong>{profile.email}</strong>
        </div>
      );
  }
}

/* Card in the deck */

function Card({
  item,
  index,
  hidden,
  onOpen,
  onHover,
  wasDragged,
}: {
  item: DeckItem;
  index: number;
  hidden: boolean;
  onOpen: (id: string) => void;
  onHover: (label: string | null) => void;
  wasDragged: () => boolean;
}) {
  const m = meta(item);
  return (
    <motion.li
      className="card-slot"
      style={{ "--bg": m.theme.bg } as React.CSSProperties}
      // On load the cards deal out from a loose stack on the left, one after another
      initial={{ opacity: 0, x: -index * 36, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ ...spring, delay: 0.45 + index * 0.06 }}
    >
      <motion.button
        type="button"
        layoutId={`card-${item.id}`}
        className={`card card-${item.type === "project" ? "project" : item.id}`}
        data-id={item.id}
        style={{ "--bg": m.theme.bg, "--fg": m.theme.fg, visibility: hidden ? "hidden" : "visible" } as React.CSSProperties}
        transition={spring}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.985 }}
        onPointerEnter={() => onHover("Open")}
        onPointerLeave={() => onHover("Drag")}
        onClick={() => {
          if (wasDragged()) return;
          onOpen(item.id);
        }}
        aria-label={`Open ${m.title}: ${m.kind}`}
      >
        <span className="card-top">
          <span className="tabular">{pad(index + 1)}</span>
          {m.tag && <span className="tabular">{m.tag}</span>}
        </span>
        <span className="card-arrow" aria-hidden="true">
          →
        </span>
        <motion.span layoutId={`frame-${item.id}`} className="card-frame" transition={spring}>
          <Cover item={item} />
        </motion.span>
        <span className="card-foot">
          <motion.span layout="position" layoutId={`title-${item.id}`} className="card-title" transition={spring}>
            {m.title}
          </motion.span>
          <span className="card-kind">{m.kind}</span>
        </span>
      </motion.button>
    </motion.li>
  );
}

/* Expanded content for each kind of card */

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { ...spring, delay } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
});

function ProjectBody({ project }: { project: Project }) {
  const [active, setActive] = useState(1);
  useEffect(() => setActive(1), [project.slug]);
  const thumbs = Array.from({ length: project.shots }, (_, i) => i + 1);

  return (
    <>
      <motion.div layoutId={`frame-${project.slug}`} className="panel-frame" transition={spring}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={active}
            src={shot(project.slug, active)}
            alt={`${project.name} screen ${active}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          />
        </AnimatePresence>
      </motion.div>
      <motion.div className="panel-thumbs" {...reveal(0.12)}>
        {thumbs.map((n) => (
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
      </motion.div>
      <div className="panel-body">
        <PanelTitle id={project.slug} title={project.name} sub={`${project.kind} · ${project.context}, ${project.year}`} />
        <motion.div {...reveal(0.18)}>
          <p className="panel-lead">{project.summary}</p>
          <ul className="panel-points">
            {project.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <ul className="tags" aria-label="Stack">
            {project.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
}

function PanelTitle({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <div>
      <motion.h3 id="overlay-title" layout="position" layoutId={`title-${id}`} transition={spring}>
        {title}
      </motion.h3>
      <motion.p className="panel-sub" {...reveal(0.14)}>
        {sub}
      </motion.p>
    </div>
  );
}

function InfoBody({ id }: { id: Exclude<DeckItem, { type: "project" }>["id"] }) {
  const m = infoMeta[id];
  return (
    <div className="panel-body panel-body-info">
      <div className="panel-side">
        {id === "about" ? (
          <motion.div layoutId={`frame-${id}`} className="panel-portrait" transition={spring}>
            <img src={asset(profile.photo)} alt={profile.name} />
          </motion.div>
        ) : (
          <motion.div layoutId={`frame-${id}`} className="panel-frame-ghost" transition={spring} />
        )}
        <PanelTitle id={id} title={m.title} sub={m.kind} />
      </div>

      <motion.div className="panel-main" {...reveal(0.18)}>
        {id === "about" && (
          <>
            {profile.about.map((p) => (
              <p key={p} className="panel-lead">
                {p}
              </p>
            ))}
            <p className="panel-links">
              <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </p>
          </>
        )}

        {id === "services" &&
          services.map((s) => (
            <section key={s.title} className="panel-block">
              <h4>{s.title}</h4>
              <p className="panel-sub">{s.for}</p>
              <ul className="panel-points">
                {s.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </section>
          ))}

        {id === "process" && (
          <>
            <ol className="panel-steps">
              {process.map((p, i) => (
                <li key={p.step}>
                  <span className="tabular">{pad(i + 1)}</span>
                  <div>
                    <h4>{p.step}</h4>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="panel-grid">
              {trust.map((t) => (
                <div key={t.title}>
                  <h4>{t.title}</h4>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {id === "experience" && (
          <>
            <dl className="panel-roles">
              {roles.map((r) => (
                <div key={r.org}>
                  <dt>
                    <strong>{r.title}</strong>
                    <span>
                      {r.org}, {r.place}
                    </span>
                  </dt>
                  <dd>
                    <span className="tabular">{r.period}</span>
                    {r.note && <span>{r.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="panel-grid">
              {capabilities.map((c) => (
                <div key={c.label}>
                  <h4>{c.label}</h4>
                  <ul className="tags">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        {id === "contact" && (
          <>
            <p className="panel-display">Let's get your business online.</p>
            <p className="panel-lead">
              Send me a quick email with your business name and what you need. I'll reply within one working day
              with a free mock-up offer and a fixed quote. No pressure, no obligation.
            </p>
            <p className="panel-links">
              <a className="pill-button" href={`mailto:${profile.email}?subject=Free%20mock-up%20request`}>
                {profile.email}
              </a>
              <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* Overlay */

function Overlay({
  item,
  position,
  total,
  onClose,
  onStep,
}: {
  item: DeckItem;
  position: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const m = meta(item);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
      // Keep keyboard focus inside the dialog
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="overlay-title">
      <motion.div
        className="overlay-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        ref={panelRef}
        layoutId={`card-${item.id}`}
        className="panel"
        style={{ "--bg": m.theme.bg, "--fg": m.theme.fg, borderRadius: 24 } as React.CSSProperties}
        transition={spring}
      >
        <div className="panel-bar">
          <span className="tabular">
            {pad(position + 1)} / {pad(total)}
          </span>
          <div className="panel-nav">
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous card">
              ←
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label="Next card">
              →
            </button>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close">
              Esc
            </button>
          </div>
        </div>
        <div className="panel-scroll">
          {item.type === "project" ? <ProjectBody project={item.project} /> : <InfoBody id={item.id} />}
        </div>
      </motion.div>
    </div>
  );
}

/* Deck */

export default function Deck({ items }: { items: DeckItem[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState({ left: 0, step: 360 });
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const dragDistance = useRef(0);
  const lastOpen = useRef<string | null>(null);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first ? first.offsetWidth + gap : 360;
    const left = Math.min(0, viewport.clientWidth - track.scrollWidth);
    setBounds({ left, step });
    if (x.get() < left) x.set(left);
  }, [x]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useMotionValueEvent(x, "change", (v) => {
    setProgress(bounds.left === 0 ? 0 : v / bounds.left);
  });

  const clamp = (v: number) => Math.max(bounds.left, Math.min(0, v));
  const snap = (v: number) => clamp(Math.round(v / bounds.step) * bounds.step);
  const slideTo = (v: number) => animate(x, snap(v), glide);

  // While the deck is moving, cards ignore hover so they don't lift as they pass under the cursor.
  // The flag clears shortly after the last movement, so it can never get stuck on.
  const movingTimer = useRef(0);
  const lastX = useRef(0);
  useMotionValueEvent(x, "change", (v) => {
    // Ignore the tiny sub-pixel creep at the end of a glide, so clicks work as soon as it looks still
    const dx = Math.abs(v - lastX.current);
    lastX.current = v;
    if (dx < 1) return;
    viewportRef.current?.classList.add("is-moving");
    window.clearTimeout(movingTimer.current);
    movingTimer.current = window.setTimeout(() => viewportRef.current?.classList.remove("is-moving"), 90);
  });
  useEffect(() => () => window.clearTimeout(movingTimer.current), []);
  const wheelTarget = useRef(0);
  const wheeling = useRef(false);

  // Trackpads scroll sideways; vertical wheel over the deck also moves it, then it settles on a card.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let settle = 0;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!delta) return;
      e.preventDefault();
      // Move a target and let a spring chase it, instead of jumping on every event
      if (!wheeling.current) wheelTarget.current = x.get();
      wheeling.current = true;
      wheelTarget.current = clamp(wheelTarget.current - delta);
      animate(x, wheelTarget.current, { type: "spring", stiffness: 220, damping: 42, restDelta: 0.5 });
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        wheeling.current = false;
      }, 200);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settle);
    };
  });

  // Arrow keys move the deck when nothing is open
  useEffect(() => {
    if (openId) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") slideTo(x.get() - bounds.step);
      if (e.key === "ArrowLeft") slideTo(x.get() + bounds.step);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const close = useCallback(() => setOpenId(null), []);
  const index = items.findIndex((it) => it.id === openId);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenId((cur) => {
        const i = items.findIndex((it) => it.id === cur);
        return items[(i + dir + items.length) % items.length].id;
      }),
    [items],
  );

  // Lock page scroll while a card is open, keep it in view, and restore focus on close.
  useEffect(() => {
    if (!openId) {
      if (lastOpen.current) {
        trackRef.current?.querySelector<HTMLElement>(`[data-id="${lastOpen.current}"]`)?.focus({ preventScroll: true });
      }
      return;
    }
    lastOpen.current = openId;
    const i = items.findIndex((it) => it.id === openId);
    animate(x, snap(-i * bounds.step), glide);
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  const atStart = progress <= 0.01;
  const atEnd = progress >= 0.99;

  return (
    <LayoutGroup>
      <div
        ref={viewportRef}
        className="deck"
        onPointerEnter={() => setCursor("Drag")}
        onPointerLeave={() => setCursor(null)}
      >
        <motion.ul
          ref={trackRef}
          className="deck-track"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: bounds.left, right: 0 }}
          dragElastic={0.1}
          dragTransition={{
            power: 0.4,
            timeConstant: 450,
            bounceStiffness: 180,
            bounceDamping: 34,
          }}
          // Reset on every press, so a plain click after an earlier drag isn't mistaken for a drag
          onPointerDownCapture={() => {
            dragDistance.current = 0;
          }}
          onDragStart={() => {
            dragDistance.current = 0;
            wheeling.current = false;
          }}
          onDrag={(_, info: PanInfo) => {
            dragDistance.current = Math.max(dragDistance.current, Math.abs(info.offset.x));
          }}
        >
          {items.map((it, i) => (
            <Card
              key={it.id}
              item={it}
              index={i}
              hidden={it.id === openId}
              onOpen={setOpenId}
              onHover={setCursor}
              wasDragged={() => dragDistance.current > 6}
            />
          ))}
        </motion.ul>
      </div>

      <div className="deck-controls">
        <div className="deck-progress" aria-hidden="true">
          <motion.span style={{ scaleX: Math.max(progress, 0.04) }} />
        </div>
        <span className="deck-count tabular" aria-hidden="true">
          {pad(items.length)} cards
        </span>
        <div className="deck-buttons">
          <button type="button" onClick={() => slideTo(x.get() + bounds.step)} disabled={atStart} aria-label="Previous cards">
            ←
          </button>
          <button type="button" onClick={() => slideTo(x.get() - bounds.step)} disabled={atEnd} aria-label="Next cards">
            →
          </button>
        </div>
      </div>

      <DeckCursor label={openId ? null : cursor} />

      <AnimatePresence>
        {openId && index >= 0 && (
          <Overlay key="overlay" item={items[index]} position={index} total={items.length} onClose={close} onStep={step} />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
