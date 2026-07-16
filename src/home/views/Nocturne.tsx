"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/** Risk: statement as full-bleed architectural plane, aggressively edge-cropped. */
export function Nocturne() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[18vh] min-h-[110svh] overflow-hidden"
      aria-labelledby="home-nocturne"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-[10%] bottom-[-45vh] bg-[#0E0D0C]"
        style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="relative z-[1] flex min-h-[110svh] flex-col text-[#EDE8DF]">
        <p className="absolute top-[max(7rem,18vh)] end-[var(--margin-mobile)] z-[2] text-[0.58rem] tracking-[0.3em] text-[#EDE8DF]/35 md:end-[var(--margin-desktop)]">
          میدانِ شب
        </p>

        <motion.h2
          id="home-nocturne"
          className="absolute inset-x-[-0.08em] bottom-[22%] px-0 font-black md:bottom-[18%]"
          style={{
            fontSize: "clamp(3.2rem, 11vw, 8.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.035em",
          }}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          تجربه‌هایی که انگار همیشه همین‌طور بوده‌اند.
        </motion.h2>

        <div className="absolute inset-x-[var(--margin-mobile)] bottom-[clamp(2rem,6vh,3.5rem)] z-[2] flex flex-col gap-2 md:inset-x-auto md:start-[var(--margin-desktop)] md:max-w-[12rem]">
          <Link
            href="mailto:hello@codexify.studio"
            className="font-latin text-[0.62rem] tracking-[0.12em] text-[#EDE8DF]/50 transition-opacity hover:opacity-100"
          >
            hello@codexify.studio
          </Link>
          <p className="text-[0.58rem] leading-relaxed text-[#EDE8DF]/28">
            یک کانال. بدون فرمِ نمایشی.
          </p>
        </div>
      </div>
    </section>
  );
}
