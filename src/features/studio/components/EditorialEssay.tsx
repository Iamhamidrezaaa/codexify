"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

type EditorialEssayProps = {
  paragraphs: string[];
  className?: string;
  measure?: "narrow" | "default" | "wide";
  /** First paragraph reads as lead */
  lead?: boolean;
};

const MEASURE = {
  narrow: "max-w-[var(--measure-narrow)]",
  default: "max-w-[var(--measure)]",
  wide: "max-w-[var(--measure-wide)]",
} as const;

/**
 * Long-form essay body — book measure, slow paragraph dissolve.
 * Reveals are soft; the memorable interaction lives on the opening statement.
 */
export function EditorialEssay({
  paragraphs,
  className,
  measure = "default",
  lead = true,
}: EditorialEssayProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("space-y-[var(--space-7)]", className)}>
      {paragraphs.map((paragraph, i) => (
        <motion.p
          key={`${i}-${paragraph.slice(0, 20)}`}
          className={cn(
            "type-body-lg text-muted leading-[1.8]",
            MEASURE[measure],
            lead && i === 0 && "text-ink/75",
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.9,
            delay: prefersReducedMotion ? 0 : i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}
