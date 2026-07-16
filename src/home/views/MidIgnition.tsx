"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Risk: monumental empty field — content crushed into ~12% corner. */
export function MidIgnition() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[14vh] min-h-[100svh] overflow-visible"
      aria-labelledby="home-mid"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -start-[0.05em] top-[-8%] select-none font-black leading-none text-[#0A0A0A]/[0.045]"
        style={{ fontSize: "clamp(18rem, 55vw, 42rem)" }}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2 }}
      >
        ۰۲
      </motion.span>

      <div className="relative z-[1] flex min-h-[100svh] items-end justify-start px-[var(--margin-mobile)] pb-[clamp(2.5rem,8vh,4.5rem)] md:justify-end md:px-[var(--margin-desktop)]">
        <motion.div
          className="w-full max-w-[16rem] md:max-w-[18rem]"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
        >
          <p className="mb-5 text-[0.58rem] tracking-[0.28em] text-[#0A0A0A]/40">
            ۰۲
          </p>
          <h2
            id="home-mid"
            className="font-semibold text-[#0A0A0A]"
            style={{
              fontSize: "clamp(1.15rem, 1.9vw, 1.55rem)",
              lineHeight: 1.35,
            }}
          >
            خودِ صفحه باید پیش از آثار، طراحی را ثابت کند.
          </h2>
          <p className="mt-8 max-w-[14em] text-[0.62rem] leading-relaxed tracking-[0.04em] text-[#0A0A0A]/38">
            سکوت اندازه‌گیری می‌شود. جرم تصادفی نیست.
          </p>
        </motion.div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute bottom-[-5vh] start-[var(--margin-mobile)] z-[2] text-[0.58rem] tracking-[0.22em] text-[#0A0A0A]/22 md:start-auto md:end-[var(--margin-desktop)]"
      >
        میدانِ شب
      </p>
    </section>
  );
}
