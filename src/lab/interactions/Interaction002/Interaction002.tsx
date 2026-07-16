"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type WeightPulseProps = {
  text: string;
  className?: string;
  fromWeight?: number;
  toWeight?: number;
};

/**
 * Interaction002 — Variable Font Weight Animation
 * Discrete Peyda weights animated via font-weight transition on hover/focus.
 * (Peyda ships as static masters — CSS interpolates between computed weights.)
 */
export function Interaction002({
  text,
  className,
  fromWeight = 300,
  toWeight = 800,
}: WeightPulseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      tabIndex={0}
      className={cn(
        "inline-block outline-none transition-[font-weight,letter-spacing,color] duration-500 ease-out",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas",
        !prefersReducedMotion && "hover:tracking-[-0.01em]",
        className,
      )}
      style={{
        fontWeight: fromWeight,
        // CSS custom property handoff for hover via group not needed —
        // use state-less CSS with hover when reduced motion is off
      }}
      onMouseEnter={(e) => {
        if (prefersReducedMotion) return;
        (e.currentTarget as HTMLElement).style.fontWeight = String(toWeight);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.fontWeight = String(fromWeight);
      }}
      onFocus={(e) => {
        if (prefersReducedMotion) return;
        (e.currentTarget as HTMLElement).style.fontWeight = String(toWeight);
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.fontWeight = String(fromWeight);
      }}
    >
      {text}
    </span>
  );
}
