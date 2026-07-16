"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AirHero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] bg-[#D8D3C9]"
      aria-labelledby="home-hero"
    >
      <div
        className="pointer-events-none absolute inset-x-[8%] top-[16%] h-px bg-[#1C1A18]/[0.08] md:inset-x-[6%]"
        aria-hidden
      />

      <div className="flex min-h-[100svh] flex-col justify-end px-[var(--margin-mobile)] pb-[clamp(3rem,9vh,5.5rem)] pt-28 md:px-[var(--margin-desktop)]">
        <motion.div
          className="max-w-[min(22rem,78vw)] self-start md:max-w-[min(26rem,32vw)]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            id="home-hero"
            className="font-semibold text-[#1C1A18]"
            style={{
              fontSize: "clamp(1.65rem, 2.8vw, 2.65rem)",
              lineHeight: 1.25,
              textWrap: "balance",
            }}
          >
            ترکیب، پیش از هر ادعا.
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
