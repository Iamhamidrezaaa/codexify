"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MidIgnition() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#F4F1EA]"
      aria-labelledby="home-mid"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute start-0 top-1/2 -translate-y-1/2 select-none font-black leading-none text-[#0A0A0A]/[0.07]"
        style={{
          fontSize: "clamp(12rem, 38vw, 30rem)",
          marginInlineStart: "-0.06em",
        }}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        ۰۲
      </motion.span>

      <div className="relative z-[1] grid min-h-[100svh] grid-rows-[1fr_auto_1fr] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <div aria-hidden />

        <motion.div
          className="max-w-[34rem] justify-self-end border-t border-[#0A0A0A]/20 pt-10 md:max-w-[28rem]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="type-overline mb-8 tracking-[0.2em] text-[#0A0A0A]/35">
            ۰۲
          </p>
          <h2
            id="home-mid"
            className="font-semibold text-[#0A0A0A]"
            style={{
              fontSize: "clamp(1.85rem, 3.6vw, 3.15rem)",
              lineHeight: 1.2,
            }}
          >
            خودِ صفحه باید پیش از آثار، طراحی را ثابت کند.
          </h2>
          <p className="mt-10 max-w-[22em] text-[0.8rem] leading-relaxed tracking-wide text-[#0A0A0A]/42">
            سکوت اندازه‌گیری می‌شود. جرم تصادفی نیست.
          </p>
        </motion.div>

        <div aria-hidden />
      </div>
    </section>
  );
}
