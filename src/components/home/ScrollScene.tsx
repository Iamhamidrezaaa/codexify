"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.15, 0.45], [-120, 0]);
  const rightX = useTransform(scrollYProgress, [0.15, 0.45], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.85], [0.92, 1, 0.96]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[110dvh] items-center justify-center overflow-hidden bg-bg px-5"
    >
      <p className="absolute top-16 left-1/2 -translate-x-1/2 text-sm text-muted">
        ( Keep scrolling )
      </p>

      <motion.div style={{ opacity, scale }} className="relative text-center">
        <motion.span
          style={{ x: leftX }}
          className="absolute top-1/2 -left-4 hidden -translate-y-1/2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-lime md:block md:-left-28"
        >
          طراحی
        </motion.span>
        <motion.span
          style={{ x: rightX }}
          className="absolute top-1/2 -right-4 hidden -translate-y-1/2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-lime md:block md:-right-28"
        >
          تجربه
        </motion.span>

        <h2 className="text-5xl font-extrabold tracking-tight text-fg md:text-8xl lg:text-9xl">
          بیا بسازیم
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted">
          جایی که ایده از دو طرف می‌آید، روی اسکرول قفل می‌شود، و به تجربهٔ واقعی
          تبدیل می‌شود.
        </p>
      </motion.div>
    </section>
  );
}
