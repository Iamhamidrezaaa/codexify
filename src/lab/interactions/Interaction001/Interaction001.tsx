"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type MagneticTextProps = {
  text: string;
  className?: string;
  /** Max displacement in px */
  strength?: number;
  /** Influence radius in px */
  radius?: number;
};

/**
 * Interaction001 — Magnetic Text
 * Characters subtly lean toward the pointer within a soft radius.
 * Uses transform only. Reduced motion → static text.
 */
export function Interaction001({
  text,
  className,
  strength = 14,
  radius = 120,
}: MagneticTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(() =>
    text.split("").map(() => ({ x: 0, y: 0 })),
  );

  const reset = useCallback(() => {
    setOffsets(text.split("").map(() => ({ x: 0, y: 0 })));
  }, [text]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));

    const onMove = (event: PointerEvent) => {
      const next = chars.map((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius || dist === 0) return { x: 0, y: 0 };
        const force = (1 - dist / radius) * strength;
        return {
          x: (dx / dist) * force,
          y: (dy / dist) * force,
        };
      });
      setOffsets(next);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [prefersReducedMotion, radius, reset, strength, text]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={cn("inline-block cursor-default", className)}
      aria-label={text}
    >
      {text.split("").map((char, i) => {
        const style: CSSProperties = {
          display: "inline-block",
          transform: `translate3d(${offsets[i]?.x ?? 0}px, ${offsets[i]?.y ?? 0}px, 0)`,
          transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        };
        return (
          <span key={`${char}-${i}`} data-char style={style} aria-hidden>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
