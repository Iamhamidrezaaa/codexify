"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Risk: type as landscape — ~65% viewport height, edge-cropped. */
export function AirHero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="home-hero"
    >
      <div className="relative z-[1] flex min-h-[100svh] flex-col px-[var(--margin-mobile)] md:px-0">
        <p className="type-overline absolute top-[max(5.5rem,12vh)] end-[var(--margin-mobile)] z-[2] tracking-[0.32em] text-[#1A1816]/35 md:end-[var(--margin-desktop)]">
          کدکسیفای
        </p>

        <motion.h1
          id="home-hero"
          className="absolute inset-x-0 bottom-[-0.12em] start-[-0.06em] pe-[8%] font-black text-[#1A1816] md:start-[-0.04em]"
          style={{
            fontSize: "clamp(4.5rem, 18vh, 12rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
          }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          ترکیب،
          <br />
          پیش از
          <br />
          هر ادعا.
        </motion.h1>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] bg-gradient-to-b from-transparent to-[#E4DFD4]/75"
      />
    </section>
  );
}
