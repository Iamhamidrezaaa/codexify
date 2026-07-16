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

export function IndexStairs() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-[#EFECE6] py-[clamp(5rem,16vh,10rem)]"
      aria-labelledby="home-index-title"
    >
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <h2 id="home-index-title" className="sr-only">
          کارها
        </h2>

        <ul className="flex flex-col gap-[clamp(1.25rem,3vh,2rem)]">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.n}
              className="flex items-baseline gap-[var(--space-6)] md:gap-[var(--space-9)]"
              style={{
                paddingInlineStart: `min(${i * 4}vw, ${i * 2.5}rem)`,
              }}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.7,
                delay: reduce ? 0 : i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="type-number shrink-0 text-ink/70">{item.n}</span>
              <span
                className="font-medium text-ink"
                style={{
                  fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)",
                  lineHeight: 1.15,
                }}
              >
                {item.t}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
