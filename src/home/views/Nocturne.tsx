"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function Nocturne() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[22vh] min-h-[115svh] overflow-visible"
      aria-labelledby="home-nocturne"
    >
      {/* Ink plane rising — not a hard section fill */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[12%] bottom-[-40vh] bg-[#12110F]"
        style={{
          clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      <div className="relative z-[1] flex min-h-[100svh] flex-col px-[var(--margin-mobile)] pb-[clamp(3rem,8vh,5rem)] pt-[clamp(8rem,22vh,14rem)] text-[#EDE8DF] md:px-[var(--margin-desktop)]">
        <p className="type-overline self-end tracking-[0.28em] text-[#EDE8DF]/30">
          میدانِ شب
        </p>

        <div className="flex flex-1 flex-col justify-end gap-[clamp(3rem,10vh,6rem)] md:flex-row md:items-end md:justify-between">
          <motion.h2
            id="home-nocturne"
            className="max-w-[16em] font-semibold text-[#EDE8DF] md:max-w-[14em]"
            style={{
              fontSize: "clamp(2.1rem, 4.8vw, 4.35rem)",
              lineHeight: 1.12,
            }}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
