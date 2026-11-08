import { useEffect, useRef } from "react";

/**
 * A quiet grid of dots behind the intro. Dots near the pointer ease away from it
 * and pick up the accent colour, then drift back when it leaves.
 */

const SPACING = 24;
const RADIUS = 140;
const PUSH = 18;

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = 0;
    let height = 0;
    let dots: { x: number; y: number; ox: number; oy: number; heat: number }[] = [];
    let ink = cssVar("--dot");
    let accent = cssVar("--accent");
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);
      const offX = (width - (cols - 1) * SPACING) / 2;
      const offY = (height - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * SPACING;
          const y = offY + r * SPACING;
          dots.push({ x, y, ox: x, oy: y, heat: 0 });
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const d of dots) {
        const dx = d.ox - pointer.x;
        const dy = d.oy - pointer.y;
        const dist = Math.hypot(dx, dy);
        const f = dist < RADIUS ? 1 - dist / RADIUS : 0;
        const ease = f * f;
        const tx = d.ox + (dist ? (dx / dist) * PUSH * ease : 0);
        const ty = d.oy + (dist ? (dy / dist) * PUSH * ease : 0);
        d.x += (tx - d.x) * 0.16;
        d.y += (ty - d.y) * 0.16;
        d.heat += (ease - d.heat) * 0.12;

        ctx!.globalAlpha = 0.35 + d.heat * 0.65;
        ctx!.fillStyle = d.heat > 0.08 ? accent : ink;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 1.1 + d.heat * 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function frame() {
      draw();
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (reduceMotion || !visible || document.hidden || raf) return;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      layout();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      ink = cssVar("--dot");
      accent = cssVar("--accent");
      draw();
    };
    scheme.addEventListener("change", onScheme);

    layout();
    draw();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      scheme.removeEventListener("change", onScheme);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden="true" />;
}
