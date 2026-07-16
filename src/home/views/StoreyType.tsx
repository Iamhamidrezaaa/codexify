"use client";

import { motion, useReducedMotion } from "framer-motion";

const STOREYS = [
  "هر جزئیات",
  "باید ثابت کند",
  "که طراحی را",
  "می‌شناسیم.",
] as const;

export function StoreyType() {
  const reduce = useReducedMotion();

  return (
    <section
      className="flex min-h-[100svh] items-center bg-canvas"
      aria-labelledby="home-storey-title"
    >
      <h2 id="home-storey-title" className="sr-only">
        بیانیه
      </h2>

      <div className="mx-auto w-full max-w-[var(--container-wide)] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <div className="flex max-w-[22rem] flex-col md:max-w-[28rem]">
          {STOREYS.map((line, i) => (
            <motion.p
              key={line}
              className="border-t border-ink/10 font-semibold text-ink first:border-t-0"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.05,
                paddingBlock: i === 1 || i === 2 ? "0.55em" : "0.28em",
              }}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: 0.8,
                delay: reduce ? 0 : i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
