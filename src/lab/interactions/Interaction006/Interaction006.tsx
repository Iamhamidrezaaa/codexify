"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type SmoothCounterProps = {
  value: number;
  className?: string;
  durationMs?: number;
  /** Format with Persian digits */
  persianDigits?: boolean;
};

const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";

function toPersianDigits(n: number) {
  return String(Math.round(n)).replace(/\d/g, (d) => PERSIAN[Number(d)]);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Interaction006 — Smooth Number Counter
 * rAF-driven count-up when entering view. Transform-free; text content only.
 */
export function Interaction006({
  value,
  className,
  durationMs = 1400,
  persianDigits = true,
}: SmoothCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (prefersReducedMotion) {
        setDisplay(value);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        setDisplay(value * easeOutCubic(t));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) run();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [durationMs, prefersReducedMotion, value]);

  const label = persianDigits
    ? toPersianDigits(display)
    : String(Math.round(display));

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={persianDigits ? toPersianDigits(value) : String(value)}
    >
      {label}
    </span>
  );
}
