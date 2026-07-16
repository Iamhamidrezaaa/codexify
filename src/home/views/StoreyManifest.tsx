"use client";

import { motion, useReducedMotion } from "framer-motion";

export function StoreyManifest() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative -mt-[16vh] min-h-[105svh] overflow-visible pt-[10vh]"
      aria-labelledby="home-storey"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-5%] top-[38%] z-0 overflow-hidden"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      >
        <span
          className="block select-none text-center font-black leading-none text-[#0A0A0A]/[0.07]"
          style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}
        >
          پورتفولیو
        </span>
      </motion.div>

      <div className="relative z-[1] flex min-h-[90svh] flex-col justify-between px-[var(--margin-mobile)] py-[clamp(3rem,10vh,6rem)] md:px-[var(--margin-desktop)]">
        <h2 id="home-storey" className="sr-only">
          خودِ وب‌سایت پورتفولیو است.
        </h2>

        <motion.p
          className="font-semibold text-[#0A0A0A]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.05,
          }}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          وب‌سایت
        </motion.p>

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="type-essay max-w-[22em] text-[#0A0A0A]/50">
            هر جزئیات باید پیش از بارگذاری اولین اثر، این را ثابت کند.
          </p>
          <motion.p
            className="self-end font-semibold text-[#0A0A0A] md:self-auto"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.05,
            }}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.05 }}
          >
            است.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
