"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FlagSpotlight } from "@/components/FlagSpotlight";
import { Header } from "@/components/Header";

export function Hero() {
  const [pos, setPos] = useState({ x: 0.6, y: 0.45 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
    setActive(true);
  }, []);

  return (
    <section
      id="top"
      onPointerMove={onMove}
      onPointerLeave={() => setActive(false)}
      className="relative flex min-h-dvh flex-col overflow-hidden bg-bg"
    >
      <FlagSpotlight x={pos.x} y={pos.y} active={active} />
      <Header />

      {/* Vertically centered, right-aligned title block (RTL: items-start = right) */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-24 pt-28 md:px-16 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-2 text-xs text-fg md:mb-8 md:text-[13px]"
          >
            <span className="size-2 shrink-0 rounded-full bg-lime shadow-[0_0_10px_var(--lime)]" />
            طراح وبسایت — مخاطب فارسی‌زبان
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-start gap-10 text-right md:gap-14"
          >
            <span className="hero-title block w-full text-fg">وب‌سایتی که</span>
            <span className="hero-title-line2 block w-full">
              آیندهٔ دیجیتال تو را می‌سازد
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 w-full text-right text-[15px] leading-8 text-muted md:mt-10 md:whitespace-nowrap md:text-base lg:text-[17px]"
          >
            طراحی وبسایت با تمرکز روی تجربه کاربری، موشن و جزئیاتی که مشتری را
            متقاعد می‌کند سفارش بدهد.
          </motion.p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-7 right-5 z-10 text-right md:right-16">
        <p className="text-[11px] tracking-[0.18em] text-muted/80">
          SCROLL TO EXPLORE
        </p>
      </div>
    </section>
  );
}
