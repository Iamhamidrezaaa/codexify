"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useLenisProgress } from "@/hooks/useLenisProgress";
import { PROJECTS } from "@/lib/constants";

function WorkCard({
  project,
  progress,
  index,
}: {
  project: (typeof PROJECTS)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  /* کارت اول از ابتدای پین پیدا؛ بقیه آبشار کوتاه بدون extrapolate منفی */
  const start = 0.01 + index * 0.028;
  const end = Math.min(start + 0.05, 0.24);

  const opacity = useTransform(
    progress,
    [0, start, end],
    [index === 0 ? 0.7 : 0, index === 0 ? 0.85 : 0, 1],
  );
  const y = useTransform(progress, [0, start, end], [28, 28, 0]);

  const inner = (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-3.5 transition hover:border-lime/40 md:p-4">
      <div className="relative mb-2.5 h-12 overflow-hidden rounded-lg bg-[#141614] md:h-14">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-lime" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--lime)_18%,transparent),transparent_55%)]" />
      </div>
      <p className="text-[11px] font-medium text-lime">{project.tag}</p>
      <h3 className="mt-0.5 text-lg font-bold text-white md:text-xl">
        {project.name}
      </h3>
      <p className="mt-0.5 text-xs text-white/70 md:text-sm" dir="ltr">
        {project.host}
        {!project.live && (
          <span className="mr-2 text-[10px] text-white/45">(آفلاین)</span>
        )}
      </p>
    </article>
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={project.live ? "h-full" : "h-full opacity-80"}
    >
      {project.live ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}

/**
 * تیتر + ۶ کارت — تقریباً سایز قبلی؛ فقط کمی فضای پایین برای فلش اسکرول.
 */
export function Work() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useLenisProgress(ref);

  /* از لحظهٔ پین دیده شود تا handoff مشکی نباشد */
  const titleOp = useTransform(scrollYProgress, [0, 0.04], [0.85, 1]);

  return (
    <section
      ref={ref}
      id="work"
      className="relative z-30 -mt-[50dvh] h-[320vh] bg-bg"
    >
      {/* هم‌پوشانی فقط در خروج Services — وسط لیست خدمات را نمی‌دزدد */}
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden bg-bg px-5 pt-[5.25rem] pb-10 md:px-16 md:pb-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1360px] min-h-0 flex-1 flex-col">
          {/* نوار بین هدر و گرید — تیتر وسط عمودی همین فاصله */}
          <div className="flex h-[5.5rem] shrink-0 items-center md:h-[6.25rem]">
            <motion.h2
              style={{ opacity: titleOp }}
              className="text-2xl font-extrabold tracking-tight text-white md:text-4xl"
            >
              نمونه‌کارها
            </motion.h2>
          </div>

          <div className="grid min-h-0 flex-1 grid-rows-2 content-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-3.5">
            {PROJECTS.map((project, i) => (
              <WorkCard
                key={project.host}
                project={project}
                progress={scrollYProgress}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
