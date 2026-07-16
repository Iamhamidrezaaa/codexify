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
      className="bg-[#EFECE5] py-[clamp(5rem,16vh,10rem)]"
      aria-labelledby="home-index"
    >
      <div className="mx-auto max-w-[96rem] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <h2 id="home-index" className="sr-only">
          فهرست کارها
        </h2>

        <ul className="flex flex-col gap-[clamp(1.25rem,3vh,2rem)]">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.n}
              className="flex items-baseline gap-5 md:gap-10"
              style={{
                marginInlineStart: `calc(${i} * clamp(0.5rem, 1.8vw, 2rem))`,
              }}
              initial={reduce ? false : { opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: reduce ? 0 : i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="type-number shrink-0 text-ink/50">{item.n}</span>
              <span
                className="font-medium text-ink"
                style={{
                  fontSize: "clamp(1.75rem, 4.5vw, 3.75rem)",
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
