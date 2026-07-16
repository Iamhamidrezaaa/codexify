"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { lineReveal } from "@/design/motion";

const HEADLINE =
  "تجربه‌هایی می‌سازیم\nکه انگار همیشه\nهمین‌طور بوده‌اند.";

/**
 * Hero — poster-scale editorial opening.
 * Composition holds without motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 40],
  );
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 0.75, 0.35],
  );
  const metaY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 18],
  );
  const asideOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-[clamp(4rem,12vh,8rem)] pt-publication-chrome"
      aria-labelledby="hero-heading"
    >
      {/* Architectural field — static poster plane */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-y-[18%] start-[8%] hidden w-px bg-[color:var(--hairline)] md:block" />
        <div className="absolute inset-x-[8%] top-[22%] h-px bg-[color:var(--hairline)]" />
        <div className="absolute inset-x-[8%] bottom-[14%] h-px bg-[color:var(--hairline)]" />
        <div className="absolute end-[10%] top-[28%] bottom-[20%] hidden w-[min(22vw,240px)] border border-[color:var(--hairline)] surface-deboss md:block" />
        <div className="absolute end-[10%] top-[28%] hidden h-px w-[min(22vw,240px)] bg-accent/50 md:block" />
        <div className="absolute bottom-[14%] start-[8%] h-2 w-2 bg-ink/25" />
        <div className="absolute top-[22%] end-[8%] h-2 w-2 border border-ink/20" />
      </div>

      <Grid className="items-end gap-y-[var(--space-11)]">
        <motion.div
          className="col-span-4 md:col-span-7 lg:col-span-8"
          style={{ y: headlineY, opacity: headlineOpacity }}
        >
          <div className="mb-[var(--space-7)] flex items-center gap-[var(--space-4)]">
            <span className="type-number type-number-accent">۰۱</span>
            <span
              className={
                prefersReducedMotion
                  ? "h-px w-6 bg-border"
                  : "animate-breathe h-px w-6 bg-accent"
              }
              aria-hidden
            />
            <p className="type-overline">استودیوی طراحی دیجیتال</p>
          </div>

          <TextReveal
            as="h1"
            id="hero-heading"
            text={HEADLINE}
            splitBy="lines"
            className="type-display text-ink"
          />
        </motion.div>

        <motion.div
          className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-3 lg:col-start-10"
          style={{ y: metaY, opacity: asideOpacity }}
        >
          <motion.div
            variants={lineReveal}
            initial="hidden"
            animate="visible"
            className="mb-[var(--space-7)] h-px w-12 bg-accent"
            aria-hidden
          />

          <p className="type-essay max-w-[var(--measure-narrow)] text-muted">
            برای بنیان‌گذاران و برندهایی که حاضر نیستند در وب معمولی
            به‌نظر برسند.
          </p>

          <div className="mt-[var(--space-8)]">
            <LinkArrow href="mailto:hello@codexify.studio">شروع گفتگو</LinkArrow>
          </div>
        </motion.div>
      </Grid>
    </section>
  );
}
