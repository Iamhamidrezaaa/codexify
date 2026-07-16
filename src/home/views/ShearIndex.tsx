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
      className="relative bg-[#1F1C19] py-[clamp(5rem,14vh,9rem)] text-[#E8E2D6]"
      aria-labelledby="home-index"
    >
      <div className="mx-auto grid max-w-[96rem] gap-16 px-[var(--margin-mobile)] md:grid-cols-12 md:gap-8 md:px-[var(--margin-desktop)]">
        <h2
          id="home-index"
          className="type-overline tracking-[0.22em] text-[#E8E2D6]/35 md:col-span-3"
        >
          فهرست کارها
        </h2>

        <ol className="md:col-span-9 md:col-start-4">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.n}
              className="group grid grid-cols-[4.5rem_1fr] items-end border-t border-[#E8E2D6]/12 py-[clamp(1.6rem,4vh,2.8rem)] last:border-b"
              initial={reduce ? false : { opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.7,
                delay: reduce ? 0 : i * 0.04,
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
                className="justify-self-start font-medium transition-transform duration-500 group-hover:-translate-x-1"
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
    </section>
  );
}
