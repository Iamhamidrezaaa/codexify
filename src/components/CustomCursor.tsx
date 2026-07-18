"use client";

import { useEffect, useRef } from "react";

/** Inner dot radius leash inside the outer ring (px). */
const LEASH = 18;

/**
 * Navbar Digital cursor: small solid lime dot inside a larger hollow lime ring.
 * Dot leads; at the ring edge it drags the ring; on idle, dot recenters.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };
    let moving = false;
    let idleTimer: number | null = null;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      moving = true;
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
        dot.x += (mouse.x - dot.x) * 0.75;
        dot.y += (mouse.y - dot.y) * 0.75;

        if (dist > LEASH) {
          const t = (dist - LEASH) / dist;
          ring.x += dx * t;
          ring.y += dy * t;
        } else {
          ring.x += dx * 0.06;
          ring.y += dy * 0.06;
        }
      } else {
        ring.x += (mouse.x - ring.x) * 0.12;
        ring.y += (mouse.y - ring.y) * 0.12;
        dot.x += (ring.x - dot.x) * 0.22;
        dot.y += (ring.y - dot.y) * 0.22;
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      {/* Outer hollow ring — Navbar size */}
      <div
        ref={ringRef}
        className="rounded-full border-[1.5px] border-lime"
        style={{ width: 44, height: 44, willChange: "transform" }}
      />
      {/* Inner solid lime dot */}
      <div
        ref={dotRef}
        className="rounded-full bg-lime"
        style={{ width: 8, height: 8, willChange: "transform" }}
      />
    </div>
  );
}
