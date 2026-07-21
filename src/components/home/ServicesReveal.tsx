"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { ServicePreviewCard } from "@/components/home/ServicePreviewCard";
import { useLenisProgress } from "@/hooks/useLenisProgress";
import { SERVICES, type ServiceItem } from "@/lib/constants";

/** زیر هدر — نوار مارکی */
const MARQUEE_DOCK = "5.75rem";
/** سرویس‌ها زیر نوار مارکی — کمی بالاتر برای فضای فلش اسکرول */
const SERVICES_BELOW_MARQUEE = "9.5rem";

const MARQUEE = [
  "طراحی سفارشی",
  "UI / UX",
  "هویت بصری",
  "برندینگ",
  "مسیر فروش",
  "سئو فنی",
  "لود سریع",
  "موبایل‌فرست",
  "پنل مدیریت",
  "پشتیبانی",
] as const;

function ServiceRow({
  progress,
  index,
  item,
}: {
  progress: MotionValue<number>;
  index: number;
  item: ServiceItem;
}) {
  /* ۰۱→۰۴ با فاصله؛ ۰۳ (UI/UX) حدود ۰٫۵۰ کامل می‌شود */
  const starts = [0.26, 0.34, 0.42, 0.5] as const;
  const start = starts[index] ?? 0.5;
  const enterEnd = start + 0.06;

  const opacity = useTransform(progress, [0, start, enterEnd], [0, 0, 1]);
  const y = useTransform(progress, [0, start, enterEnd], [28, 28, 0]);

  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useSpring(mouseX, { stiffness: 280, damping: 28, mass: 0.4 });
  const cardY = useSpring(mouseY, { stiffness: 280, damping: 28, mass: 0.4 });

  const placeAtPointer = (e: PointerEvent<HTMLAnchorElement>, hard = false) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    if (hard) {
      /* همان لحظهٔ ورود: بدون انیمیشن از ۰٫۰ / وسط */
      mouseX.jump(x);
      mouseY.jump(yPos);
      cardX.jump(x);
      cardY.jump(yPos);
    } else {
      mouseX.set(x);
      mouseY.set(yPos);
    }
  };

  return (
    <motion.li style={{ opacity, y }} className="relative shrink-0">
      <Link
        href={item.href}
        onPointerEnter={(e) => {
          placeAtPointer(e, true);
          setHovered(true);
        }}
        onPointerMove={(e) => placeAtPointer(e, false)}
        onPointerLeave={() => setHovered(false)}
        className="group relative flex w-full flex-col justify-center gap-0.5 border-t border-line px-2 py-2 transition-colors duration-300 hover:bg-white md:flex-row md:items-center md:justify-between md:gap-6 md:px-4 md:py-2.5"
      >
        <span className="font-sans text-lg font-bold text-lime transition-colors duration-300 group-hover:text-black md:w-14 md:text-xl">
          {item.num}
        </span>

        <div className="relative min-w-0 flex-1 text-right">
          <h3 className="font-sans text-xl font-bold text-white transition-colors duration-300 group-hover:text-black md:text-2xl lg:text-[1.65rem]">
            {item.title}
          </h3>
          <p className="mt-1 font-sans text-sm leading-6 text-white/80 transition-colors duration-300 group-hover:text-black/65 md:text-[15px] md:leading-7">
            {item.desc}
          </p>
        </div>

        <span
          aria-hidden
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 text-lg text-white transition-colors duration-300 group-hover:text-black md:left-5 md:block"
        >
          <span className="inline group-hover:hidden">↗</span>
          <span className="hidden group-hover:inline">→</span>
        </span>

        {hovered ? (
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: cardX, top: cardY, x: "-50%", y: "-50%" }}
            className="pointer-events-none absolute z-30 hidden md:block"
          >
            <ServicePreviewCard item={item} />
          </motion.span>
        ) : null}
      </Link>
    </motion.li>
  );
}

/**
 * 0.00–0.22  مارکی + pitch
 * 0.22–0.56  ردیف‌های ۰۱→۰۴ (۰۳ = UI/UX ≈ ۰٫۴۸)
 * 0.56–0.78  هولد ≈ یک اسکرول بعد از UI/UX
 * 0.78–0.92  خروج به Work
 */
export function ServicesReveal() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useLenisProgress(ref);

  const marqueeOp = useTransform(
    scrollYProgress,
    [0, 0.02, 0.78, 0.88],
    [1, 1, 1, 0],
  );
  /*
   * نوار از پایین → dock زیر هدر
   * متن از همان لحظه به سمت وسط می‌رود و از progress≈۰٫۳۲ قفل می‌شود
   */
  const marqueeY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.22, 0.32, 1],
    [320, 180, 60, 0, 0],
  );
  const marqueeX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.22, 0.32, 1],
    [-320, -180, -60, 0, 0],
  );

  const pitchOp = useTransform(
    scrollYProgress,
    [0, 0.04, 0.16, 0.24],
    [0, 1, 1, 0],
  );
  const pitchY = useTransform(scrollYProgress, [0, 0.06, 0.24], [20, 0, -28]);
  const cueOp = useTransform(scrollYProgress, [0.02, 0.08, 0.14], [0, 1, 0]);

  const servicesOp = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.78, 0.9],
    [0, 1, 1, 0],
  );
  const servicesY = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.78, 0.9],
    [40, 0, 0, -16],
  );

  return (
    <section
      ref={ref}
      className="relative z-20 -mt-[130dvh] h-[400vh] bg-bg"
    >
      {/* لنگر منو — همهٔ ردیف‌های خدمات کامل و سفید */}
      <div
        id="services"
        className="pointer-events-none absolute inset-x-0 top-[56%] h-px"
        aria-hidden
      />
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden bg-bg">
        {/* مارکی: بالا می‌آید + متن تا وسط حرکت می‌کند و قفل می‌شود */}
        <motion.div
          style={{
            top: MARQUEE_DOCK,
            y: marqueeY,
            opacity: marqueeOp,
          }}
          className="pointer-events-none absolute inset-x-0 z-30 flex justify-center overflow-hidden border-y border-white/10 bg-bg py-3 md:py-3.5"
        >
          <motion.div
            style={{ x: marqueeX }}
            className="flex w-max items-center gap-6 whitespace-nowrap will-change-transform md:gap-8"
          >
            {MARQUEE.map((item) => (
              <span
                key={item}
                dir="rtl"
                className="inline-flex items-center gap-2.5 font-sans text-sm font-medium tracking-[0.12em] text-white/75 md:text-base"
              >
                <span className="text-lime" aria-hidden>
                  ✦
                </span>
                <span>{item}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: pitchY, opacity: pitchOp }}
          className="pointer-events-none absolute inset-x-0 top-[40%] z-10 flex flex-col items-center px-6 text-center md:top-[42%] md:px-16"
        >
          <motion.div
            style={{ opacity: cueOp }}
            className="mb-4 grid size-9 place-items-center rounded-full border border-white/35"
            aria-hidden
          >
            <span className="size-1.5 rounded-full bg-white" />
          </motion.div>
          <p className="font-sans text-sm font-medium tracking-wide text-lime md:text-base">
            ( چی می‌سازیم )
          </p>
          <p className="mx-auto mt-4 max-w-4xl font-sans text-2xl font-semibold leading-[1.35] text-balance text-white md:mt-5 md:text-4xl lg:text-5xl">
            <span className="block">وبسایت، اپ و سیستم</span>
            <span className="mt-1 block md:mt-2">
              رشدی که برندت را جلو می‌برد
            </span>
          </p>
        </motion.div>

        {/* سرویس‌ها زیر خط مارکی */}
        <motion.div
          style={{
            top: SERVICES_BELOW_MARQUEE,
            y: servicesY,
            opacity: servicesOp,
          }}
          className="absolute inset-x-0 bottom-0 z-20 flex min-h-0 flex-col justify-start overflow-visible bg-bg px-5 pb-20 pt-3 md:px-16 md:pb-24 md:pt-4 lg:px-20"
        >
          <div className="mx-auto flex w-full max-w-[1360px] flex-col">
            <div className="max-w-2xl shrink-0 text-right md:mr-0 md:ml-auto">
              <h2 className="font-sans text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl">
                از ایده تا سایت آماده
              </h2>
              <p className="mt-2 font-sans text-sm leading-6 text-white/80 md:text-base md:leading-7">
                با استفاده از تیمی خلاق و با تجربه سایتی برای شما طراحی می‌کنیم که
                فروش آنلاین شما رو تضمین کند.
              </p>
            </div>

            <ul className="mt-3 flex flex-col border-b border-line md:mt-4">
              {SERVICES.map((item, i) => (
                <ServiceRow
                  key={item.num}
                  progress={scrollYProgress}
                  index={i}
                  item={item}
                />
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
