"use client";

import { useEffect, useRef } from "react";

const LEASH = 16;

/**
 * Cursor icon only (dot + ring).
 * Background illumination lives in FlagSpotlight on the hero — not a white overlay.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    const dot = { x: mouse.x, y: mouse.y };
    let moving = false;
    let idleTimer: number | null = null;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      moving = true;
      if (rootRef.current) rootRef.current.style.opacity = "1";
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        moving = false;
      }, 100);
    };

    const tick = () => {
      const dx = mouse.x - ring.x;
      const dy = mouse.y - ring.y;
      const dist = Math.hypot(dx, dy) || 0;

      if (moving) {
        dot.x += (mouse.x - dot.x) * 0.8;
        dot.y += (mouse.y - dot.y) * 0.8;

        if (dist > LEASH) {
          const t = (dist - LEASH) / dist;
          ring.x += dx * t;
          ring.y += dy * t;
        } else {
          ring.x += dx * 0.07;
          ring.y += dy * 0.07;
        }
      } else {
        ring.x += (mouse.x - ring.x) * 0.14;
        ring.y += (mouse.y - ring.y) * 0.14;
        dot.x += (ring.x - dot.x) * 0.24;
        dot.y += (ring.y - dot.y) * 0.24;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      if (idleTimer) window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="custom-cursor-root pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
