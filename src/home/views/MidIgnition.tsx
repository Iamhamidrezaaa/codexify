"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MidIgnition() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100svh] items-center bg-[#F7F6F2]"
      aria-labelledby="home-mid"
    >
      <div className="w-full">
        <div className="relative border-y border-ink/10 py-[clamp(2.5rem,7vh,4.5rem)]">
          <div className="mx-auto max-w-[96rem] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
            <motion.div
              className="grid items-baseline gap-6 md:grid-cols-[auto_1fr] md:gap-16"
              initial={reduce ? false : { opacity: 0.4 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="type-overline tracking-[0.18em] text-ink/35">
                ۰۲
              </p>
              <div>
                <h2
                  id="home-mid"
                  className="type-heading max-w-[18em] text-ink"
                >
                  خودِ صفحه باید پیش از آثار، طراحی را ثابت کند.
                </h2>
                <p className="type-caption mt-6 max-w-[28em] text-ink/40">
                  سکوت اندازه‌گیری می‌شود. جرم تصادفی نیست.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
