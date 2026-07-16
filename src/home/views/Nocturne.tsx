"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function Nocturne() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] bg-[#121110] text-[#E8E4DC]"
      aria-labelledby="home-nocturne"
    >
      <div className="flex min-h-[100svh] flex-col justify-between px-[var(--margin-mobile)] py-[clamp(4rem,12vh,7rem)] md:px-[var(--margin-desktop)]">
        <p className="type-overline tracking-[0.2em] text-[#E8E4DC]/35">
          میدانِ شب
        </p>

        <motion.div
          className="max-w-[min(40rem,92%)] self-start"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="home-nocturne"
            className="font-semibold"
            style={{
              fontSize: "clamp(2.5rem, 6.2vw, 5.5rem)",
              lineHeight: 1.12,
              textWrap: "balance",
            }}
          >
            تجربه‌هایی که انگار همیشه همین‌طور بوده‌اند.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 self-end text-end md:max-w-[16rem]">
          <Link
            href="mailto:hello@codexify.studio"
            className="type-nav font-latin text-[#E8E4DC]/55 transition-opacity hover:opacity-100"
          >
            hello@codexify.studio
          </Link>
          <p className="type-caption text-[#E8E4DC]/30">
            یک کانال. بدون فرمِ نمایشی.
          </p>
        </div>
      </div>
    </section>
  );
}
