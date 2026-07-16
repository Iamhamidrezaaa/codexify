"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Risk: single word as landscape — fills the room; satellites microscopic. */
export function StoreyManifest() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[12vh] min-h-[100svh] overflow-hidden"
      aria-labelledby="home-storey"
    >
      <h2 id="home-storey" className="sr-only">
        خودِ وب‌سایت پورتفولیو است.
      </h2>

      <motion.p
        aria-hidden
        className="pointer-events-none absolute inset-x-[-8%] top-1/2 z-0 -translate-y-1/2 select-none text-center font-black leading-none text-[#0A0A0A]/[0.09]"
        style={{ fontSize: "clamp(6rem, 28vw, 22rem)" }}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3 }}
      >
        پورتفولیو
      </motion.p>

      <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-[var(--margin-mobile)] py-[clamp(3rem,9vh,5rem)] md:px-[var(--margin-desktop)]">
        <motion.p
          className="font-semibold text-[#0A0A0A]"
          style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)", lineHeight: 1.2 }}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          وب‌سایت
        </motion.p>

        <div className="flex items-end justify-between gap-8">
          <p className="max-w-[16em] text-[0.62rem] leading-relaxed tracking-[0.03em] text-[#0A0A0A]/45">
            هر جزئیات باید پیش از بارگذاری اولین اثر، این را ثابت کند.
          </p>
          <motion.p
            className="shrink-0 font-semibold text-[#0A0A0A]"
            style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)", lineHeight: 1.2 }}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            است.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
