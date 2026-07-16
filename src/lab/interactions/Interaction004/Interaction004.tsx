"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type EditorialImageRevealProps = {
  className?: string;
  /** Accent panel label for a11y */
  label?: string;
  /** Background tone */
  tone?: "ink" | "accent" | "muted";
};

const TONE: Record<NonNullable<EditorialImageRevealProps["tone"]>, string> = {
  ink: "bg-ink",
  accent: "bg-accent",
  muted: "bg-border-strong",
};

/**
 * Interaction004 — Editorial Image Reveal
 * Geometry panel (no stock photography) revealed via clip-path + scale.
 */
export function Interaction004({
  className,
  label = "پنل هندسی ادیتوریال",
  tone = "ink",
}: EditorialImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full max-w-xl overflow-hidden bg-canvas-subtle",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <motion.div
        className={cn("absolute inset-0 origin-bottom", TONE[tone])}
        initial={
          prefersReducedMotion
            ? false
            : { clipPath: "inset(100% 0 0 0)", scale: 1.06 }
        }
        whileInView={
          prefersReducedMotion
            ? undefined
            : { clipPath: "inset(0% 0 0 0)", scale: 1 }
        }
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        className="pointer-events-none absolute inset-0 border border-border"
        aria-hidden
      />
      <span className="absolute bottom-4 start-4 type-number text-canvas/80">
        ۰۴
      </span>
    </div>
  );
}
