"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FlagSpotlight } from "@/components/FlagSpotlight";
import { MagneticTitle } from "@/components/MagneticTitle";

function HeroBadge({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-2 text-xs text-fg ${className}`}
    >
      <span className="size-2 shrink-0 rounded-full bg-lime shadow-[0_0_10px_var(--lime)]" />
      استودیوی طراحی و توسعه وب
    </motion.div>
  );
}

function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <MagneticTitle
        lines={[
          { text: "وب‌سایتی که", className: "hero-title text-fg" },
          {
            text: "آیندهٔ دیجیتال تو را می‌سازد",
            className: "hero-title-line2",
          },
        ]}
      />
    </motion.div>
  );
}

function HeroSubtitle({ className = "" }: { className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full text-right text-[15px] leading-8 text-muted ${className}`}
    >
      طراحی سایت‌های سریع و تمیز برای کسب‌وکارهایی که می‌خواهند فروش آنلاین داشته
      باشند.
    </motion.p>
  );
}

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
      className="relative flex min-h-dvh max-md:h-[100svh] max-md:max-h-[100svh] max-md:min-h-[100svh] flex-col overflow-hidden bg-bg"
    >
      <FlagSpotlight x={pos.x} y={pos.y} active={active} />

      {/* دسکتاپ — بدون تغییر منطق قبلی */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1360px] flex-1 flex-col justify-center px-5 pb-32 pt-28 md:flex md:px-16 lg:px-20">
        <div className="mb-6 flex w-full flex-col items-start md:mb-8">
          <HeroBadge className="md:text-[13px]" />
        </div>
        <HeroTitle />
        <HeroSubtitle className="md:mt-10 md:whitespace-nowrap md:text-base lg:text-[17px]" />
      </div>

      {/* ارتفاع واقعی برای absoluteها روی موبایل */}
      <div className="pointer-events-none max-md:h-[100svh] md:hidden" aria-hidden />

      {/*
        موبایل: مرکز عمودی هر نوار پرچم با top درصدی + translateY
        سبز ≈ 16.67% | سفید ≈ 50% | قرمز ≈ 83.33%
      */}
      <div className="absolute inset-0 z-10 md:hidden">
        {/* نوار سبز — کمی پایین‌تر از وسط عمودی */}
        <div className="absolute inset-x-5 top-[calc(16.666%+1.25rem)] -translate-y-1/2">
          <HeroBadge />
        </div>

        {/* نوار سفید — فاصله ۱ و ۲ برابر */}
        <div className="absolute inset-x-5 top-1/2 -translate-y-1/2">
          <HeroTitle />
        </div>

        {/* نوار قرمز */}
        <div className="absolute inset-x-5 top-[83.333%] -translate-y-1/2">
          <HeroSubtitle />
        </div>

        <p
          className="pointer-events-none absolute right-5 z-30 text-[11px] tracking-[0.18em] text-fg/55"
          style={{ top: "auto", bottom: "1.25rem" }}
        >
          SCROLL TO EXPLORE
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-16 bg-gradient-to-b from-transparent to-bg/80 md:block"
      />

      {/* فقط دسکتاپ — روی موبایل نسخهٔ داخل لایه absolute استفاده می‌شود */}
      <div className="pointer-events-none absolute bottom-7 right-16 z-30 hidden text-right md:block">
        <p className="text-[11px] tracking-[0.18em] text-fg/55">
          SCROLL TO EXPLORE
        </p>
      </div>
    </section>
  );
}
