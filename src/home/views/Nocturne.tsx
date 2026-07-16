"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function Nocturne() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#0B0A09] text-[#EDE8DF]"
      aria-labelledby="home-nocturne"
    >
      <div
        className="pointer-events-none absolute inset-y-0 start-[18%] w-[min(28vw,20rem)] bg-[#EDE8DF]/[0.04]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-[10%] start-[18%] w-px bg-[#EDE8DF]/20"
        aria-hidden
      />

      <div className="relative z-[1] flex min-h-[100svh] flex-col px-[var(--margin-mobile)] py-[clamp(4.5rem,12vh,7.5rem)] md:px-[var(--margin-desktop)]">
        <p className="type-overline self-end tracking-[0.28em] text-[#EDE8DF]/30">
          میدانِ شب
        </p>

        <div className="flex flex-1 flex-col justify-end gap-[clamp(3rem,10vh,6rem)] pb-4 md:flex-row md:items-end md:justify-between">
          <motion.h2
            id="home-nocturne"
            className="max-w-[16em] font-semibold text-[#EDE8DF] md:max-w-[14em]"
            style={{
              fontSize: "clamp(2.1rem, 4.8vw, 4.35rem)",
              lineHeight: 1.12,
            }}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            تجربه‌هایی که انگار همیشه همین‌طور بوده‌اند.
          </motion.h2>

          <div className="flex flex-col gap-3 md:max-w-[14rem] md:pb-2">
            <Link
              href="mailto:hello@codexify.studio"
              className="font-latin text-[0.72rem] tracking-[0.08em] text-[#EDE8DF]/55 transition-opacity hover:opacity-100"
            >
              hello@codexify.studio
            </Link>
            <p className="text-[0.68rem] leading-relaxed text-[#EDE8DF]/28">
              یک کانال. بدون فرمِ نمایشی.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
