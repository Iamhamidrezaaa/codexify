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

export function ShearIndex() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[28vh] overflow-visible pb-[clamp(4rem,12vh,8rem)] pt-[clamp(2rem,6vh,4rem)] text-[#E8E2D6]"
      aria-labelledby="home-index"
    >
      {/* Same ink continuity — no new background */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-[20vh] bottom-[-35vh] bg-[#12110F]"
      />

      <div className="relative z-[1] mx-auto grid max-w-[96rem] gap-12 px-[var(--margin-mobile)] md:grid-cols-12 md:gap-8 md:px-[var(--margin-desktop)]">
        <h2
          id="home-index"
          className="type-overline tracking-[0.22em] text-[#E8E2D6]/35 md:col-span-3 md:sticky md:top-[30vh] md:self-start"
        >
          فهرست کارها
        </h2>

        <ol className="md:col-span-9 md:col-start-4">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.n}
              className="group grid grid-cols-[4.5rem_1fr] items-end border-t border-[#E8E2D6]/10 py-[clamp(1.4rem,3.5vh,2.4rem)] last:border-b"
              initial={reduce ? false : { opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className="font-latin tabular-nums text-[#E8E2D6]/35"
                style={{ fontSize: "0.7rem", letterSpacing: "0.14em" }}
              >
                {item.n}
              </span>
              <span
                className="justify-self-start font-medium"
                style={{
                  fontSize: "clamp(1.6rem, 3.8vw, 3.25rem)",
                  lineHeight: 1.05,
                }}
              >
                {item.t}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Dawn leak — light plane begins under index */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-18vh] h-[40vh] bg-gradient-to-b from-transparent via-[#DCD6CB]/40 to-[#DCD6CB]"
      />
    </section>
  );
}
