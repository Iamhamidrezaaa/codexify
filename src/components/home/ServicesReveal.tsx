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

/** دقیقاً زیر هدر شناور — نه زیر منو */
const MARQUEE_DOCK = "6.75rem";

function ServiceRow({
  progress,
  index,
  item,
}: {
  progress: MotionValue<number>;
  index: number;
  item: (typeof SERVICES)[number];
}) {
  const starts = [0.5, 0.58, 0.72, 0.82] as const;
  const exits = [0.68, 0.76, 0.88, 0.94] as const;
  const start = starts[index] ?? 0.9;
  const exit = exits[index] ?? 0.94;
  /* offsetها باید داخل [0, 1] باشند — وگرنه WAAPI کرش می‌کند */
  const enterEnd = Math.min(start + 0.05, exit - 0.02);
  const fadeEnd = Math.min(exit + 0.04, 1);

  const opacity = useTransform(
    progress,
    [start, enterEnd, exit, fadeEnd],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, enterEnd, exit, fadeEnd],
    [40, 0, 0, -28],
  );

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
 * 0.00–0.14  فقط مارکی (وسط)
 * 0.12–0.22  جمله زیر مارکی
 * 0.22–0.36  مارکی می‌چسبد زیر هدر
 * 0.36–0.46  جمله محو
 * 0.46+      طراحی وب (بدون Services)، متن سفید، خروج با محو
 */
export function ServicesReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const marqueeY = useTransform(
    scrollYProgress,
    [0, 0.14, 0.34, 1],
    ["38vh", "38vh", "0vh", "0vh"],
  );
  const marqueeOp = useTransform(
    scrollYProgress,
    [0, 0.04, 0.68, 0.76],
    [1, 1, 1, 0],
  );

  const pitchOp = useTransform(
    scrollYProgress,
    [0, 0.12, 0.18, 0.36, 0.44],
    [0, 0, 1, 1, 0],
  );
  const pitchY = useTransform(
    scrollYProgress,
    [0.12, 0.2, 0.36, 0.44],
    [28, 0, -24, -40],
  );
  const pitchVisibility = useTransform(scrollYProgress, (p) =>
    p >= 0.45 || p < 0.1 ? "hidden" : "visible",
  );
  const cueOp = useTransform(scrollYProgress, [0.14, 0.2, 0.28], [0, 1, 0]);

  const servicesOp = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.92, 1],
    [0, 1, 1, 0],
  );
  const servicesY = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.92, 1],
    [56, 0, 0, -32],
  );

  const list = [...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <section
      ref={ref}
      id="services"
      className="relative z-20 -mt-[80dvh] h-[520vh] bg-bg"
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-bg">
        <motion.div
          style={{
            top: MARQUEE_DOCK,
            y: marqueeY,
            opacity: marqueeOp,
          }}
          className="pointer-events-none absolute inset-x-0 z-30 overflow-hidden border-y border-white/10 bg-bg py-3.5 md:py-4"
        >
          <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
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
          </div>
        </motion.div>

        <motion.div
          style={{
            y: pitchY,
            opacity: pitchOp,
            visibility: pitchVisibility,
          }}
          className="pointer-events-none absolute inset-x-0 top-[52%] z-10 flex flex-col items-center px-6 text-center md:top-[54%] md:px-16"
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
          style={{ y: servicesY, opacity: servicesOp }}
          className="absolute inset-x-0 top-[18%] z-20 bg-bg px-5 md:top-[16%] md:px-16 lg:px-20"
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
