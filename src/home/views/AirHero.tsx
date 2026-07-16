"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AirHero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-visible"
      aria-labelledby="home-hero"
    >
      <motion.p
        aria-hidden
        className="pointer-events-none absolute -end-[6%] top-[6%] z-0 select-none font-black leading-none text-[#1A1816]/[0.07] md:top-[2%]"
        style={{ fontSize: "clamp(8rem, 28vw, 22rem)" }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        ترکیب
      </motion.p>

      <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-[var(--margin-mobile)] pb-[clamp(4rem,12vh,7rem)] pt-[clamp(5.5rem,14vh,8rem)] md:px-[var(--margin-desktop)]">
        <div className="flex justify-end">
          <span className="type-overline tracking-[0.28em] text-[#1A1816]/40">
            کدکسیفای
          </span>
        </div>

        <motion.h1
          id="home-hero"
          className="max-w-[10em] self-start pe-2 font-semibold text-[#1A1816] md:max-w-[9em]"
          style={{
            fontSize: "clamp(2.4rem, 6.2vw, 5.25rem)",
            lineHeight: 1.08,
          }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          ترکیب،
          <br />
          پیش از
          <br />
          هر ادعا.
        </motion.h1>
      </div>

      {/* Leak into next room — plane continues below fold */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28vh] bg-gradient-to-b from-transparent to-[#E8E3D9]/80"
      />
    </section>
  );
}
