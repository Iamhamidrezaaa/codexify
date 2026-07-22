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
    title: "از هدف شروع می‌کنیم",
    desc: "قبل از طراحی، مشخص می‌کنیم سایت قرار است چه کاری انجام دهد؛ فروش بیشتر، جذب مشتری یا ساختن اعتبار.",
  },
  {
    num: "02",
    title: "طراحی که مسیر را ساده می‌کند",
    desc: "کاربر نباید دنبال دکمه بگردد یا سردرگم شود. هر صفحه برای یک تصمیم مشخص طراحی می‌شود.",
  },
  {
    num: "03",
    title: "زیرساختی که روی آن می‌شود حساب کرد",
    desc: "کدنویسی تمیز، سرعت بالا و ساختاری که توسعه و نگهداری آن در آینده دردسرساز نباشد.",
  },
  {
    num: "04",
    title: "تحویل، پایان کار نیست",
    desc: "بعد از انتشار، رفتار کاربران را بررسی می‌کنیم، مشکلات را برطرف می‌کنیم و سایت را مرحله‌به‌مرحله بهتر می‌کنیم.",
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
      className={`origin-right py-2.5 md:py-3 ${
        index === 0
          ? "border-t-0 md:border-t md:border-white/10"
          : "border-t border-white/10"
      }`}
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

  return (
    <section
      ref={ref}
      className="relative z-20 -mt-[70dvh] h-[460vh] bg-bg"
    >
      {/* لنگر منو — همهٔ مراحل مسیر اجرا سفید و کامل */}
      <div
        id="about"
        className="pointer-events-none absolute inset-x-0 top-[78%] h-px"
        aria-hidden
      />
      <div className="sticky top-0 flex h-dvh items-stretch overflow-hidden bg-bg pt-[4.75rem] max-md:items-start">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 content-start max-md:h-auto lg:h-full lg:grid-cols-2">
          <motion.div
            style={{ opacity: rightOp }}
            className="flex shrink-0 flex-col justify-start px-5 pt-5 text-right md:h-full md:justify-center md:px-12 md:py-6 lg:px-16 lg:py-10"
          >
            <h2 className="max-w-xl text-right font-extrabold tracking-tight">
              <span className="text-2xl text-lime md:text-3xl lg:text-4xl">
                کدکسیفای؛
              </span>{" "}
              <span className="text-[1.35rem] leading-snug text-fg md:text-[1.65rem] md:leading-snug lg:text-[2rem] lg:leading-[1.35]">
                طراحی وب، برای کسب‌وکارهایی که رشد را جدی گرفته‌اند.
              </span>
            </h2>
            {/* موبایل: باند ثابت بین تیتر و خط — دکمه وسط عمودی همین باند */}
            <div className="flex h-[5.25rem] items-center md:mt-7 md:h-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-lime px-5 py-3 text-sm font-bold text-lime-ink transition hover:bg-white"
              >
                برآورد هزینه
              </a>
            </div>
          </motion.div>

          <div className="relative flex min-h-0 flex-col justify-center border-t border-white/10 px-5 pb-6 pt-1 md:border-t-0 md:px-12 md:py-6 lg:px-16 lg:py-10">
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
