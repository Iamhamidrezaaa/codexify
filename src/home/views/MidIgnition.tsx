"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MidIgnition() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[18vh] min-h-[110svh] overflow-visible pt-[8vh]"
      aria-labelledby="home-mid"
    >
      {/* Persistent numeral — crosses into night */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute start-0 top-[8%] z-0 select-none font-black leading-none text-[#0A0A0A]/[0.06] md:top-[4%]"
        style={{
          fontSize: "clamp(12rem, 38vw, 30rem)",
          marginInlineStart: "-0.06em",
        }}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1 }}
      >
        ۰۲
      </motion.span>

      <div className="relative z-[1] grid min-h-[100svh] grid-rows-[1fr_auto_1fr] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <div aria-hidden />

        <motion.div
          className="max-w-[34rem] justify-self-end border-t border-[#0A0A0A]/15 pt-10 md:max-w-[28rem]"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Statement edge continues downward into night plane */}
      <p
        aria-hidden
        className="pointer-events-none absolute bottom-[-6vh] end-[var(--margin-mobile)] z-[2] max-w-[12em] text-end text-[0.68rem] tracking-[0.18em] text-[#0A0A0A]/25 md:end-[var(--margin-desktop)]"
      >
        میدانِ شب
      </p>
    </section>
  );
}
