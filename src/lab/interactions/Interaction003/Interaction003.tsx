"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type TextMaskRevealProps = {
  text: string;
  className?: string;
  /** Delay before reveal (seconds) */
  delay?: number;
};

/**
 * Interaction003 — Text Mask Reveal
 * Clip-path wipe from inline-start (RTL-aware via inset logical feel using scaleX origin).
 */
export function Interaction003({
  text,
  className,
  delay = 0.1,
}: TextMaskRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={cn("overflow-hidden", className)}>
      <motion.span
        className="block origin-right will-change-transform"
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        whileInView={{ clipPath: "inset(0 0 0 0%)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </motion.span>
    </p>
  );
}
