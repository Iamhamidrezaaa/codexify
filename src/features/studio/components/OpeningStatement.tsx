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
 * Manifesto opening — poster statement on a printed field.
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
        "relative scroll-mt-header overflow-hidden border-b border-[color:var(--hairline)] pt-publication-chrome pb-[clamp(5.5rem,18vh,12rem)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-[8%] top-[28%] h-px bg-[color:var(--hairline)]" />
        <div className="absolute inset-y-[24%] start-[8%] w-px bg-[color:var(--hairline)]" />
        <div className="absolute end-[10%] top-[36%] bottom-[22%] hidden w-[min(24%,220px)] border border-[color:var(--hairline)] surface-emboss md:block" />
        <div className="absolute bottom-[16%] start-[8%] end-[35%] h-px bg-[color:var(--hairline-strong)]" />
      </div>

      <Grid>
        <div className="col-span-4 md:col-span-2 lg:col-span-3">
          <p className="type-overline text-muted">{overline}</p>
          <p className="type-nav mt-[var(--space-3)] text-ink/45">{title}</p>
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
