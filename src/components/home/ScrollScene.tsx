"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

/**
 * RTL phrase «بیا بسازیم»:
 * - بیا (white) on the RIGHT — enters from right
 * - بسازیم (lime) on the LEFT — enters from left
 * Reads correctly right-to-left.
 */
const WORD_RIGHT = "بیا";
const WORD_LEFT = "بسازیم";
const PHRASE = `${WORD_RIGHT} ${WORD_LEFT}`;

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

/** Horizontal glitch slices — Navbar Digital shatter look */
const SLICES = [
  { y: 0, h: 14, x: -70, color: "white" as const },
  { y: 14, h: 12, x: 55, color: "lime" as const },
  { y: 26, h: 16, x: -40, color: "white" as const },
  { y: 42, h: 11, x: 80, color: "lime" as const },
  { y: 53, h: 15, x: -95, color: "white" as const },
  { y: 68, h: 13, x: 45, color: "lime" as const },
  { y: 81, h: 19, x: -30, color: "white" as const },
];

function RingBurst({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0.42, 0.46, 0.5, 0.55],
    [0, 1, 0.75, 0],
  );
  const s1 = useTransform(progress, [0.42, 0.55], [0.2, 2.8]);
  const s2 = useTransform(progress, [0.43, 0.56], [0.15, 3.6]);
  const s3 = useTransform(progress, [0.44, 0.57], [0.1, 4.4]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
    >
      {[s1, s2, s3].map((scale, i) => (
        <motion.div
          key={i}
          style={{ scale, width: 110 + i * 50, height: 110 + i * 50 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lime"
        />
      ))}
    </motion.div>
  );
}

function SliceLayer({
  progress,
  slice,
  index,
}: {
  progress: MotionValue<number>;
  slice: (typeof SLICES)[number];
  index: number;
}) {
  const start = 0.52 + index * 0.008;
  const opacity = useTransform(
    progress,
    [start, start + 0.03, 0.72, 0.84],
    [0, 1, 1, 0],
  );
  const x = useTransform(progress, [start, 0.78], [slice.x * 0.15, slice.x]);
  const y = useTransform(progress, [start, 0.86], [0, 520 + index * 40]);
  const rotate = useTransform(
    progress,
    [start, 0.86],
    [0, slice.x > 0 ? 8 : -10],
  );

  return (
    <motion.div
      aria-hidden
      style={{ opacity, x, y, rotate }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <p
        dir="rtl"
        className={`text-5xl font-extrabold italic tracking-tight md:text-8xl lg:text-[9rem] ${
          slice.color === "lime" ? "text-lime" : "text-fg"
        }`}
        style={{
          clipPath: `inset(${slice.y}% 0 ${100 - slice.y - slice.h}% 0)`,
        }}
      >
        {WORD_RIGHT} {WORD_LEFT}
      </p>
    </motion.div>
  );
}

export function ScrollScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /**
   * Offset of each word's CENTER from stage center.
   * Must stay large enough that wide Persian glyphs never overlap.
   * Meet → small bounce back along the same path.
   */
  const MEET = 280;
  const BOUNCE = 340;
  const REST = 310;
  const leftX = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.36, 0.4, 0.44],
    [-620, -MEET, -MEET + 16, -BOUNCE, -REST],
  );
  const rightX = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.36, 0.4, 0.44],
    [620, MEET, MEET - 16, BOUNCE, REST],
  );

  const wordsOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.14, 0.5, 0.56],
    [0, 1, 1, 0],
  );
  const shakeX = useTransform(
    scrollYProgress,
    [0.44, 0.455, 0.47, 0.485, 0.5, 0.52],
    [0, -12, 14, -9, 7, 0],
  );

  const keepOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.1, 0.26, 0.36],
    [0, 1, 1, 0],
  );

  const stageFadeIn = useTransform(scrollYProgress, [0, 0.1], [0.3, 1]);

  const marqueeOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.8, 0.96, 1],
    [0, 1, 1, 1],
  );
  const marqueeY = useTransform(scrollYProgress, [0.7, 0.82], [48, 0]);

  const line1Op = useTransform(scrollYProgress, [0.8, 0.88], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.8, 0.9], [32, 0]);
  const line2Op = useTransform(scrollYProgress, [0.86, 0.94], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.86, 0.96], [40, 0]);

  const marquee = [...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <section ref={ref} className="relative -mt-28 h-[440vh] bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-bg via-bg/80 to-transparent"
      />

      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: stageFadeIn }}
          className="absolute inset-0 bg-bg"
        />

        <motion.p
          style={{ opacity: keepOpacity }}
          className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 font-mono text-xs tracking-[0.2em] text-muted uppercase"
        >
          ( Keep scrolling )
        </motion.p>

        <div className="relative z-10 h-56 w-full max-w-[1200px]">
          <RingBurst progress={scrollYProgress} />

          {/* Intact words — collide with gap, bounce back */}
          <motion.div
            style={{ x: shakeX, opacity: wordsOpacity }}
            className="absolute inset-0"
          >
            <motion.span
              style={{ x: leftX }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold italic tracking-tight text-lime md:text-8xl lg:text-[9rem]"
            >
              {WORD_LEFT}
            </motion.span>
            <motion.span
              style={{ x: rightX }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold italic tracking-tight text-fg md:text-8xl lg:text-[9rem]"
            >
              {WORD_RIGHT}
            </motion.span>
          </motion.div>

          {/* Navbar-style horizontal shatter slices */}
          {SLICES.map((slice, i) => (
            <SliceLayer
              key={i}
              progress={scrollYProgress}
              slice={slice}
              index={i}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: marqueeOpacity, y: marqueeY }}
          className="absolute inset-x-0 top-[46%] z-20 overflow-hidden py-5"
        >
          <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
            {marquee.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-8 text-sm font-medium tracking-[0.14em] text-muted uppercase md:text-base"
              >
                {item}
                <span className="text-lime" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-[14%] z-20 px-6 text-center md:px-16">
          <motion.p
            style={{ opacity: line1Op, y: line1Y }}
            className="mb-4 font-mono text-xs tracking-[0.2em] text-lime uppercase"
          >
            ( چی می‌سازیم )
          </motion.p>
          <motion.p
            style={{ opacity: line2Op, y: line2Y }}
            className="mx-auto max-w-4xl text-2xl font-semibold leading-snug text-balance text-fg md:text-4xl lg:text-5xl"
          >
            وبسایت، اپ و سیستم رشدی که برندت را جلو می‌برد
          </motion.p>
        </div>
      </div>

      <span className="sr-only">{PHRASE}</span>
    </section>
  );
}
