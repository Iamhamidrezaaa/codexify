"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";

type OpeningStatementProps = {
  overline: string;
  title: string;
  statement: string;
  className?: string;
};

/**
 * Manifesto opening — one memorable interaction:
 * words clarify from near-invisible ink to full presence.
 */
export function OpeningStatement({
  overline,
  title,
  statement,
  className,
}: OpeningStatementProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = statement.trim().split(/\s+/);

  return (
    <header
      id="chapter-opening"
      className={cn(
        "scroll-mt-header border-b border-border pt-publication-chrome pb-[clamp(5rem,18vh,11rem)]",
        className,
      )}
    >
      <Grid>
        <div className="col-span-4 md:col-span-2 lg:col-span-3">
          <p className="type-overline text-muted">{overline}</p>
          <p className="type-nav mt-[var(--space-3)] text-ink/50">{title}</p>
        </div>

        <div className="col-span-4 mt-[var(--space-10)] md:col-span-8 md:col-start-3 md:mt-0 lg:col-span-8 lg:col-start-4">
          <h1 className="type-statement text-ink" aria-label={statement}>
            {prefersReducedMotion
              ? statement
              : words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block pe-[0.28em]"
                    initial={{ opacity: 0.12 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{
                      duration: 1.35,
                      delay: i * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
          </h1>
        </div>
      </Grid>
    </header>
  );
}
