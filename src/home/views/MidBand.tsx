"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MidBand() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100svh] items-center bg-canvas"
      aria-labelledby="home-mid-title"
    >
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/[0.07]" aria-hidden />

      <motion.div
        className="relative w-full border-y border-ink/10 bg-canvas py-[clamp(2.5rem,7vh,4.5rem)]"
        initial={reduce ? false : { opacity: 0.85 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-wide)] flex-col gap-[var(--space-6)] px-[var(--margin-mobile)] md:flex-row md:items-end md:justify-between md:px-[var(--margin-desktop)]">
          <h2
            id="home-mid-title"
            className="type-heading max-w-[16em] text-ink"
          >
            خودِ صفحه، پورتفولیو است.
          </h2>
          <p className="type-caption max-w-[18em] text-ink/40 md:text-end">
            ترکیب پیش از ادعا. سکوت پیش از تزئین.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
