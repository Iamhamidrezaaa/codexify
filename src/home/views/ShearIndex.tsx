"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  { n: "۰۱", t: "طراحی وب‌سایت" },
  { n: "۰۲", t: "توسعه" },
  { n: "۰۳", t: "رابط و تجربه" },
  { n: "۰۴", t: "برندینگ" },
  { n: "۰۵", t: "موشن" },
  { n: "۰۶", t: "تعامل" },
] as const;

/** Risk: one edge carries all weight — names flush to start, compressed stack. */
export function ShearIndex() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[32vh] overflow-visible pb-[clamp(3rem,10vh,6rem)] pt-[clamp(1rem,4vh,2rem)] text-[#E8E2D6]"
      aria-labelledby="home-index"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 -top-[22vh] bottom-[-30vh] bg-[#0E0D0C]"
      />

      <div className="relative z-[1] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <h2
          id="home-index"
          className="mb-[clamp(2rem,6vh,3.5rem)] text-[0.58rem] tracking-[0.28em] text-[#E8E2D6]/30"
        >
          فهرست کارها
        </h2>

        <ol className="flex flex-col gap-0">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.n}
              className="flex items-baseline gap-4 border-t border-[#E8E2D6]/[0.08] py-[clamp(0.55rem,1.6vh,1.1rem)] last:border-b"
              initial={reduce ? false : { opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : i * 0.025,
              }}
            >
              <span className="w-8 shrink-0 text-[0.55rem] tracking-[0.16em] text-[#E8E2D6]/28">
                {item.n}
              </span>
              <span
                className="font-semibold"
                style={{
                  fontSize:
                    i === 0
                      ? "clamp(2.4rem, 7vw, 5.5rem)"
                      : "clamp(1.05rem, 2.2vw, 1.65rem)",
                  lineHeight: 1,
                }}
              >
                {item.t}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-16vh] h-[36vh] bg-gradient-to-b from-transparent via-[#D6D0C4]/35 to-[#D6D0C4]"
      />
    </section>
  );
}
