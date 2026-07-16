"use client";

import { motion, useReducedMotion } from "framer-motion";

const STOREYS = [
  "وب‌سایت",
  "پورتفولیو",
  "است.",
] as const;

export function StoreyManifest() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#F7F6F2]"
      aria-labelledby="home-storey"
    >
      <div className="flex min-h-[100svh] flex-col justify-center px-[var(--margin-mobile)] py-24 md:px-[var(--margin-desktop)]">
        <h2 id="home-storey" className="sr-only">
          خودِ وب‌سایت پورتفولیو است.
        </h2>

        <div className="flex flex-col gap-[clamp(0.35rem,1.2vh,0.75rem)]">
          {STOREYS.map((line, i) => (
            <motion.p
              key={line}
              className="font-bold text-ink"
              style={{
                fontSize:
                  i === 1
                    ? "clamp(3.5rem, 12vw, 9rem)"
                    : "clamp(2.25rem, 7vw, 5.5rem)",
                lineHeight: 0.95,
                marginInlineStart:
                  i === 0
                    ? "0"
                    : i === 1
                      ? "clamp(1rem, 6vw, 5rem)"
                      : "clamp(2rem, 12vw, 10rem)",
              }}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.9,
                delay: reduce ? 0 : i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <p className="type-essay mt-[clamp(3rem,8vh,5rem)] max-w-[20em] text-ink/45">
          هر جزئیات باید پیش از بارگذاری اولین اثر، این را ثابت کند.
        </p>
      </div>
    </section>
  );
}
