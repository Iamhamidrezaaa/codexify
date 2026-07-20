"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useLenisProgress } from "@/hooks/useLenisProgress";
import { WHATSAPP_URL } from "@/lib/constants";

/**
 * معنی مراحل «How we drive growth» از Navbar Digital — ترجمهٔ فارسی
 */
const APPROACH_STEPS = [
  {
    num: "01",
    title: "اول استراتژی",
    desc: "از هدف کسب‌وکارت شروع می‌کنم، نه از قالب آماده. هر تصمیم به عددی برمی‌گردد که واقعاً مهم است.",
  },
  {
    num: "02",
    title: "طراحی‌شده برای تبدیل",
    desc: "زیبایی حداقلی است که باید باشد. تجربه‌ای می‌سازم که توجه را به اقدام تبدیل کند و بازدیدکننده را به مشتری.",
  },
  {
    num: "03",
    title: "ساخته‌شده برای ماندن",
    desc: "کد سریع، دسترس‌پذیر و قابل‌نگهداری روی فریم‌ورک‌های مدرن — تا سرمایه‌ات سال‌ها کار کند.",
  },
  {
    num: "04",
    title: "همیشه در حال بهینه‌سازی",
    desc: "لانچ فقط خط شروع است. تست، اندازه‌گیری و اصلاح می‌کنم تا نتیجه ماه‌به‌ماه رشد کند.",
  },
] as const;

function ApproachStep({
  progress,
  index,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  step: (typeof APPROACH_STEPS)[number];
}) {
  /* ورود آبشاری از پایین — از همان شروع پین دیده می‌شود */
  const enter = 0.02 + index * 0.035;
  const settled = enter + 0.045;

  /*
   * هر گزینه حدود دو اسکرول: بزرگ → کوچک
   * بعد از سفید شدن، سفید می‌ماند (دیگر طوسی نمی‌شود)
   */
  const stepSpan = 0.17;
  const focus0 = 0.18 + index * stepSpan;
  const grow = focus0 + 0.07;
  const shrink = focus0 + 0.15;

  const opacity = useTransform(
    progress,
    [0, enter, settled, focus0, grow],
    [index === 0 ? 0.35 : 0, index === 0 ? 0.45 : 0, 0.5, 0.5, 1],
  );
  const y = useTransform(progress, [0, enter, settled], [40, 40, 0]);
  const scale = useTransform(
    progress,
    [focus0, grow, shrink],
    [1, 1.1, 1],
  );
  const titleColor = useTransform(
    progress,
    [settled, focus0, grow, 1],
    [
      "rgba(245,245,245,0.4)",
      "rgba(245,245,245,0.4)",
      "rgba(245,245,245,1)",
      "rgba(245,245,245,1)",
    ],
  );
  const descColor = useTransform(
    progress,
    [settled, focus0, grow, 1],
    [
      "rgba(245,245,245,0.3)",
      "rgba(245,245,245,0.3)",
      "rgba(245,245,245,0.75)",
      "rgba(245,245,245,0.75)",
    ],
  );
  const numColor = useTransform(
    progress,
    [settled, focus0, grow, 1],
    [
      "rgba(200,240,45,0.45)",
      "rgba(200,240,45,0.45)",
      "rgba(200,240,45,1)",
      "rgba(200,240,45,1)",
    ],
  );

  return (
    <motion.article
      style={{ opacity, y, scale }}
      className="origin-right border-t border-white/10 py-2.5 md:py-3"
    >
      <div className="flex items-baseline gap-3 text-right md:gap-4">
        <motion.span
          style={{ color: numColor }}
          className="shrink-0 font-sans text-sm font-bold md:text-base"
        >
          {step.num}
        </motion.span>
        <div className="min-w-0 flex-1">
          <motion.h3
            style={{ color: titleColor }}
            className="font-sans text-base font-extrabold tracking-tight md:text-lg lg:text-xl"
          >
            {step.title}
          </motion.h3>
          <motion.p
            style={{ color: descColor }}
            className="mt-1 max-w-md font-sans text-xs leading-5 md:text-sm md:leading-6"
          >
            {step.desc}
          </motion.p>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * ورود آبشاری؛ هر گزینه ~۲ اسکرول بزرگ→کوچک و سفید می‌ماند.
 */
export function About() {
  const ref = useRef<HTMLElement>(null);
  const progress = useLenisProgress(ref);

  /* از لحظهٔ پین نیمه‌پیدا تا handoff مشکی نباشد */
  const rightOp = useTransform(progress, [0, 0.08], [0.55, 1]);
  const rightY = useTransform(progress, [0, 0.08], [48, 0]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative z-20 -mt-[120dvh] h-[460vh] bg-bg"
    >
      <div className="sticky top-0 flex h-dvh items-stretch overflow-hidden bg-bg pt-[4.75rem]">
        <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 lg:grid-cols-2">
          <motion.div
            style={{ opacity: rightOp, y: rightY }}
            className="flex flex-col justify-center px-5 py-6 text-right md:px-12 lg:px-16 lg:py-10"
          >
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-fg md:text-4xl lg:text-5xl">
              Codexify یعنی طراحی وب که خودش مدرک مهارته.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-muted">
              من آژانس نیستم. طراح وبسایت‌ام — و سایتی که می‌بینی همان چیزی است که
              برای کسب‌وکار تو هم می‌سازم: دقیق، با موشن معنادار، و متمرکز روی تبدیل
              بازدیدکننده به مشتری.
            </p>
            <div className="mt-7">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-3 text-sm font-bold text-lime-ink transition hover:bg-white"
              >
                دربارهٔ همکاری
                <span aria-hidden>↗</span>
              </a>
            </div>
          </motion.div>

          <div className="relative flex min-h-0 flex-col justify-center px-5 py-6 md:px-12 lg:px-16 lg:py-10">
            <div className="flex flex-col">
              {APPROACH_STEPS.map((step, i) => (
                <ApproachStep
                  key={step.num}
                  progress={progress}
                  index={i}
                  step={step}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
