"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

/** RTL: بسازیم (lime, left) · بیا (white, right) */
const WORD_LEFT = "بسازیم";
const WORD_RIGHT = "بیا";
const TAGLINE = "( جایی که ایده به اجرا می‌رسد )";
/* Shared timeline (progress 0 = slide 2 fully pinned) */

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

const titleClass =
  "text-5xl font-extrabold italic tracking-tight md:text-8xl lg:text-[8.5rem] whitespace-nowrap";

/**
 * Thin crack bands (screen 1–2) — letters stay readable, thin black seams.
 * Later the same bands open into wide geometric gaps (screen 3–4).
 */
const BANDS = [
  { y: 0, h: 14, jag: -10 },
  { y: 14, h: 11, jag: 14 },
  { y: 25, h: 13, jag: -18 },
  { y: 38, h: 10, jag: 11 },
  { y: 48, h: 12, jag: -8 },
  { y: 60, h: 11, jag: 16 },
  { y: 71, h: 13, jag: -14 },
  { y: 84, h: 16, jag: 9 },
] as const;

/**
 * Diagonal geometric shards (Navbar screen 3–4) — clean slices, not pixels.
 */
const DIAGONALS = [
  {
    clip: "polygon(0% 0%, 100% 0%, 100% 16%, 0% 28%)",
    ox: -6,
    oy: -4,
  },
  {
    clip: "polygon(0% 20%, 100% 8%, 100% 34%, 0% 46%)",
    ox: 18,
    oy: 2,
  },
  {
    clip: "polygon(0% 38%, 100% 26%, 100% 52%, 0% 64%)",
    ox: -22,
    oy: 6,
  },
  {
    clip: "polygon(0% 56%, 100% 44%, 100% 70%, 0% 82%)",
    ox: 14,
    oy: 10,
  },
  {
    clip: "polygon(0% 74%, 100% 62%, 100% 100%, 0% 100%)",
    ox: -10,
    oy: 14,
  },
] as const;

function RingBurst({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0.3, 0.315, 0.335, 0.355],
    [0, 1, 0.45, 0],
  );
  const s1 = useTransform(progress, [0.3, 0.355], [0.45, 2.0]);
  const s2 = useTransform(progress, [0.305, 0.36], [0.35, 2.6]);
  const s3 = useTransform(progress, [0.31, 0.365], [0.25, 3.2]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute left-1/2 top-[42%] z-[1] -translate-x-1/2 -translate-y-1/2"
    >
      {[s1, s2, s3].map((scale, i) => (
        <motion.div
          key={i}
          style={{ scale, width: 100 + i * 52, height: 100 + i * 52 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/90"
        />
      ))}
    </motion.div>
  );
}

/** Full-slide white flash on impact */
function ImpactFlash({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0.295, 0.308, 0.322, 0.345],
    [0, 0.85, 0.25, 0],
  );
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-40 bg-white"
    />
  );
}

/**
 * Crack phase: thin horizontal seams (readable words).
 * Then opens: larger jags + gaps, drifts side + down + fades.
 */
function CrackBand({
  progress,
  word,
  color,
  side,
  band,
  index,
}: {
  progress: MotionValue<number>;
  word: string;
  color: "lime" | "white";
  side: "left" | "right";
  band: (typeof BANDS)[number];
  index: number;
}) {
  const dir = side === "left" ? -1 : 1;
  const base = side === "left" ? -168 : 168;

  /* Crack phase — longer hold before shatter */
  const opacity = useTransform(
    progress,
    [0.34, 0.36, 0.52, 0.58],
    [0, 1, 1, 0],
  );

  const x = useTransform(
    progress,
    [0.34, 0.42, 0.54],
    [base + band.jag * 0.35, base + band.jag, base + band.jag * 1.4 + dir * 8],
  );
  const y = useTransform(
    progress,
    [0.34, 0.42, 0.55],
    [0, index % 2 ? 5 : -4, 40 + index * 5],
  );
  const rotate = useTransform(
    progress,
    [0.34, 0.54],
    [0, band.jag > 0 ? 2.5 : -2.5],
  );

  const clipPath = useTransform(progress, (p) => {
    const open = Math.min(1, Math.max(0, (p - 0.36) / 0.2));
    const shrink = open * 1.6;
    const top = Math.max(0, band.y + shrink);
    const bottom = Math.max(0, 100 - band.y - band.h + shrink);
    return `inset(${top}% -4% ${bottom}% -4%)`;
  });

  return (
    <motion.div
      aria-hidden
      style={{ opacity, x, y, rotate }}
      className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <motion.div style={{ clipPath }}>
        <span
          className={`${titleClass} ${color === "lime" ? "text-lime" : "text-fg"}`}
        >
          {word}
        </span>
      </motion.div>
    </motion.div>
  );
}

/**
 * Bold diagonal geometric shards — Navbar screen 3/4 look.
 * Replaces pixel crumbs.
 */
function DiagonalShard({
  progress,
  word,
  color,
  side,
  shard,
  index,
}: {
  progress: MotionValue<number>;
  word: string;
  color: "lime" | "white";
  side: "left" | "right";
  shard: (typeof DIAGONALS)[number];
  index: number;
}) {
  const dir = side === "left" ? -1 : 1;
  const base = side === "left" ? -168 : 168;

  const opacity = useTransform(
    progress,
    [0.54, 0.58, 0.72, 0.86],
    [0, 1, 0.75, 0],
  );
  const x = useTransform(
    progress,
    [0.54, 0.64, 0.76, 0.88],
    [
      base + shard.ox,
      base + shard.ox * 1.8 + dir * 40,
      base + dir * (120 + index * 28) + shard.ox,
      base + dir * (220 + index * 36),
    ],
  );
  const y = useTransform(
    progress,
    [0.54, 0.66, 0.78, 0.9],
    [shard.oy, 40 + index * 18, 220 + index * 50, 520 + index * 55],
  );
  const rotate = useTransform(
    progress,
    [0.54, 0.88],
    [0, dir * (10 + index * 4)],
  );

  return (
    <motion.div
      aria-hidden
      style={{ opacity, x, y, rotate }}
      className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <div style={{ clipPath: shard.clip }}>
        <span
          className={`${titleClass} ${color === "lime" ? "text-lime" : "text-fg"}`}
        >
          {word}
        </span>
      </div>
    </motion.div>
  );
}

export function ScrollScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    /* 0 = slide 2 fully pinned — words must not appear before this */
    offset: ["start start", "end end"],
  });

  const HIT = 148;
  const REST = 168;

  /*
   * Longer dwell: enter → approach slowly → collide late
   * so explosion doesn't fire right after arriving.
   */
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.06, 0.24, 0.3, 0.34, 0.38],
    [-520, -320, -HIT - 30, -HIT, -REST, -REST],
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.06, 0.24, 0.3, 0.34, 0.38],
    [520, 320, HIT + 30, HIT, REST, REST],
  );

  const wordsOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.33, 0.37],
    [0, 1, 1, 0],
  );

  const shakeX = useTransform(
    scrollYProgress,
    [0.295, 0.305, 0.315, 0.325, 0.34, 0.355],
    [0, -16, 18, -12, 8, 0],
  );
  const shakeY = useTransform(
    scrollYProgress,
    [0.295, 0.31, 0.325, 0.34, 0.355],
    [0, 8, -10, 5, 0],
  );

  const keepOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.08, 0.2, 0.28],
    [0, 1, 1, 0],
  );

  const tagOp = useTransform(
    scrollYProgress,
    [0.36, 0.4, 0.48, 0.56],
    [0, 1, 0.7, 0],
  );
  const tagY = useTransform(
    scrollYProgress,
    [0.36, 0.44, 0.56],
    [0, 48, 140],
  );

  const marqueeOpacity = useTransform(
    scrollYProgress,
    [0.78, 0.86, 0.96, 1],
    [0, 1, 1, 1],
  );
  const marqueeY = useTransform(scrollYProgress, [0.76, 0.88], [48, 0]);

  const line1Op = useTransform(scrollYProgress, [0.84, 0.9], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.84, 0.92], [32, 0]);
  const line2Op = useTransform(scrollYProgress, [0.88, 0.94], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.88, 0.96], [40, 0]);

  const marquee = [...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <section ref={ref} className="relative h-[520vh] bg-bg">
      <motion.div
        style={{ x: shakeX, y: shakeY }}
        className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden bg-bg"
      >
        <ImpactFlash progress={scrollYProgress} />

        <motion.p
          style={{ opacity: keepOpacity }}
          className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 font-mono text-xs tracking-[0.2em] text-muted uppercase"
        >
          ( Keep scrolling )
        </motion.p>

        <div className="relative z-10 flex h-[55vh] w-full max-w-[1200px] flex-col items-center justify-center">
          <RingBurst progress={scrollYProgress} />

          {/* Intact words — collide → separate */}
          <motion.div
            style={{ opacity: wordsOpacity }}
            className="absolute inset-0"
          >
            <motion.span
              style={{ x: leftX }}
              className={`absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-lime ${titleClass}`}
            >
              {WORD_LEFT}
            </motion.span>
            <motion.span
              style={{ x: rightX }}
              className={`absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-fg ${titleClass}`}
            >
              {WORD_RIGHT}
            </motion.span>
          </motion.div>

          {/* Crack lines on words (screen 1–2) then open + drift */}
          <div className="pointer-events-none absolute inset-0 z-[2]">
            {BANDS.map((band, i) => (
              <CrackBand
                key={`L-c-${i}`}
                progress={scrollYProgress}
                word={WORD_LEFT}
                color="lime"
                side="left"
                band={band}
                index={i}
              />
            ))}
            {BANDS.map((band, i) => (
              <CrackBand
                key={`R-c-${i}`}
                progress={scrollYProgress}
                word={WORD_RIGHT}
                color="white"
                side="right"
                band={band}
                index={i}
              />
            ))}
          </div>

          {/* Geometric diagonal shatter (screen 3–4) — not pixels */}
          <div className="pointer-events-none absolute inset-0 z-[3]">
            {DIAGONALS.map((shard, i) => (
              <DiagonalShard
                key={`L-d-${i}`}
                progress={scrollYProgress}
                word={WORD_LEFT}
                color="lime"
                side="left"
                shard={shard}
                index={i}
              />
            ))}
            {DIAGONALS.map((shard, i) => (
              <DiagonalShard
                key={`R-d-${i}`}
                progress={scrollYProgress}
                word={WORD_RIGHT}
                color="white"
                side="right"
                shard={shard}
                index={i}
              />
            ))}
          </div>

          {/* Same Estedad/sans as site — more air below title */}
          <motion.p
            style={{ opacity: tagOp, y: tagY }}
            className="absolute top-[68%] z-[5] font-sans text-sm font-medium tracking-wide text-lime md:top-[70%] md:text-base"
          >
            {TAGLINE}
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: marqueeOpacity, y: marqueeY }}
          className="absolute inset-x-0 top-[48%] z-20 overflow-hidden py-5"
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

        <div className="absolute inset-x-0 bottom-[12%] z-20 px-6 text-center md:px-16">
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
      </motion.div>
    </section>
  );
}
