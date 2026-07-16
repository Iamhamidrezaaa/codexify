"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";

type PrincipleBlockProps = {
  index: string;
  statement: string;
  body: string;
  aside?: string;
  className?: string;
};

/**
 * PrincipleBlock v2 — manifesto scale.
 * Larger statement, optional aside, book-plate rhythm.
 * Process keeps v1; this is for belief systems, not workflow summaries.
 */
export function PrincipleBlock({
  index,
  statement,
  body,
  aside,
  className,
}: PrincipleBlockProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Reveal
      variants={editorialDissolve}
      as="article"
      className={cn(
        "grid gap-[var(--space-5)] border-t border-border pt-[var(--space-8)] md:grid-cols-12 md:gap-[var(--space-6)]",
        className,
      )}
    >
      <p className="type-number text-muted md:col-span-2">{index}</p>
      <div className="md:col-span-10">
        <motion.h3
          className="type-heading text-ink"
          initial={prefersReducedMotion ? false : { opacity: 0.35 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {statement}
        </motion.h3>
        <p className="type-body-lg mt-[var(--space-5)] max-w-[var(--measure)] text-muted leading-[1.75]">
          {body}
        </p>
        {aside ? (
          <p className="type-caption mt-[var(--space-5)] max-w-[var(--measure-narrow)] text-subtle">
            {aside}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
