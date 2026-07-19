"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { SERVICES } from "@/lib/constants";

const MARQUEE = [
  "طراحی وبسایت",
  "UI / UX",
  "فروشگاه آنلاین",
  "NEXT.JS",
  "موشن",
  "ریدیزاین",
  "TAILWIND",
  "هویت بصری",
] as const;

/** همیشه زیر هدر شناور — بدون اسکرول به پشت هدر */
const MARQUEE_DOCK = "5.75rem";
/** سرویس‌ها دقیقاً زیر نوار مارکی */
const SERVICES_BELOW_MARQUEE = "10.25rem";

function ServiceRow({
  progress,
  index,
  item,
}: {
  progress: MotionValue<number>;
  index: number;
  item: (typeof SERVICES)[number];
}) {
  const starts = [0.28, 0.36, 0.44, 0.52] as const;
  const start = starts[index] ?? 0.52;
  const enterEnd = Math.min(start + 0.05, 0.99);

  const opacity = useTransform(progress, [start, enterEnd], [0, 1]);
  const y = useTransform(progress, [start, enterEnd], [36, 0]);

  return (
    <motion.li
      style={{ opacity, y }}
      className="flex flex-col gap-2.5 border-t border-line py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:py-6"
    >
      <span className="font-sans text-xl font-bold text-lime md:w-16">
        {item.num}
      </span>
      <div className="flex-1 text-right">
        <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 font-sans text-sm leading-7 text-white/85 md:text-base">
          {item.desc}
        </p>
      </div>
    </motion.li>
  );
}

/**
 * بدون فاز «مارکی + صفحه سیاه»:
 * 0.00–0.22  مارکی زیر هدر + جملهٔ pitch
 * 0.18–0.30  pitch محو / لیست خدمات وارد (هم‌پوشان)
 * 0.28–0.60  ردیف‌های ۰۱→۰۴
 * 0.78–0.92  خروج به Work
 */
export function ServicesReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const marqueeOp = useTransform(
    scrollYProgress,
    [0, 0.02, 0.78, 0.88],
    [1, 1, 1, 0],
  );
  const marqueeX = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ["-33.333%", "0%", "0%"],
  );

  const pitchOp = useTransform(
    scrollYProgress,
    [0, 0.04, 0.18, 0.28],
    [0, 1, 1, 0],
  );
  const pitchY = useTransform(scrollYProgress, [0, 0.06, 0.28], [20, 0, -28]);
  const cueOp = useTransform(scrollYProgress, [0.02, 0.08, 0.16], [0, 1, 0]);

  /* ورود خدمات قبل از محو کامل pitch — بدون گپ مشکی */
  const servicesOp = useTransform(
    scrollYProgress,
    [0.2, 0.28, 0.78, 0.9],
    [0, 1, 1, 0],
  );
  const servicesY = useTransform(
    scrollYProgress,
    [0.2, 0.28, 0.78, 0.9],
    [40, 0, 0, -20],
  );

  const list = [...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <section
      ref={ref}
      id="services"
      className="relative z-20 -mt-[130dvh] h-[340vh] bg-bg"
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-bg">
        <motion.div
          style={{
            top: MARQUEE_DOCK,
            opacity: marqueeOp,
          }}
          className="pointer-events-none absolute inset-x-0 z-30 overflow-hidden border-y border-white/10 bg-bg py-3.5 md:py-4"
        >
          <motion.div
            style={{ x: marqueeX }}
            className="flex w-max gap-8 whitespace-nowrap will-change-transform"
          >
            {list.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-8 font-sans text-sm font-medium tracking-[0.12em] text-white/75 md:text-base"
              >
                {item}
                <span className="text-lime" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: pitchY, opacity: pitchOp }}
          className="pointer-events-none absolute inset-x-0 top-[42%] z-10 flex flex-col items-center px-6 text-center md:top-[44%] md:px-16"
        >
          <motion.div
            style={{ opacity: cueOp }}
            className="mb-5 grid size-10 place-items-center rounded-full border border-white/35"
            aria-hidden
          >
            <span className="size-1.5 rounded-full bg-white" />
          </motion.div>
          <p className="font-sans text-sm font-medium tracking-wide text-lime md:text-base">
            ( چی می‌سازیم )
          </p>
          <p className="mx-auto mt-5 max-w-4xl font-sans text-2xl font-semibold leading-[1.35] text-balance text-white md:mt-6 md:text-4xl lg:text-5xl">
            <span className="block">وبسایت، اپ و سیستم</span>
            <span className="mt-1 block md:mt-2">
              رشدی که برندت را جلو می‌برد
            </span>
          </p>
        </motion.div>

        <motion.div
          style={{
            top: SERVICES_BELOW_MARQUEE,
            y: servicesY,
            opacity: servicesOp,
          }}
          className="absolute inset-x-0 bottom-0 z-20 overflow-y-auto bg-bg px-5 pb-10 md:px-16 lg:px-20"
        >
          <div className="mx-auto max-w-[1360px]">
            <div className="max-w-2xl text-right md:mr-0 md:ml-auto">
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                طراحی وب، از ایده تا تجربه
              </h2>
              <p className="mt-4 font-sans text-base leading-8 text-white/85">
                فقط طراحی سایت — بدون شلوغی آژانس. تمرکز روی محصولی که دیده شود و
                بفروشد.
              </p>
            </div>

            <ul className="mt-8 border-b border-line md:mt-10">
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
