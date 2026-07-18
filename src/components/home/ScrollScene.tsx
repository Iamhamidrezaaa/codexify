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

const titleClass =
  "text-5xl font-extrabold italic tracking-tight md:text-8xl lg:text-[8.5rem] whitespace-nowrap";

/**
 * One continuous shatter: thin cracks → open → soft tilt → drift away.
 * No hard cut to a second shard system.
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

function RingBurst({ progress }: { progress: MotionValue<number> }) {
  /* Wider window so burst is readable while scrolling */
  const opacity = useTransform(
    progress,
    [0.38, 0.41, 0.46, 0.52],
    [0, 1, 0.5, 0],
  );
  const s1 = useTransform(progress, [0.38, 0.52], [0.45, 2.0]);
  const s2 = useTransform(progress, [0.39, 0.53], [0.35, 2.6]);
  const s3 = useTransform(progress, [0.4, 0.54], [0.25, 3.2]);

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
    [0.38, 0.4, 0.44, 0.5],
    [0, 0.9, 0.35, 0],
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
 * Continuous shatter on the same bands:
 * thin cracks → open seams → soft tilt (کج شدن) → drift + fade.
 */
function ShatterBand({
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
  const tiltSign = band.jag >= 0 ? 1 : -1;

  const opacity = useTransform(
    progress,
    [0.48, 0.52, 0.78, 0.9],
    [0, 1, 1, 0],
  );

  const x = useTransform(
    progress,
    [0.48, 0.56, 0.66, 0.78, 0.9],
    [
      base + band.jag * 0.25,
      base + band.jag * 0.7,
      base + band.jag * 1.15 + dir * 12,
      base + dir * (70 + index * 14) + band.jag,
      base + dir * (180 + index * 28),
    ],
  );
  const y = useTransform(
    progress,
    [0.48, 0.56, 0.66, 0.78, 0.9],
    [0, index % 2 ? 4 : -3, 12 + index * 3, 80 + index * 22, 280 + index * 40],
  );
  const rotate = useTransform(
    progress,
    [0.48, 0.58, 0.68, 0.82, 0.92],
    [0, tiltSign * 1.5, tiltSign * 5, dir * (8 + index * 1.2), dir * (14 + index * 2)],
  );

  const clipPath = useTransform(progress, (p) => {
    const open = Math.min(1, Math.max(0, (p - 0.5) / 0.24));
    const skew = Math.min(1, Math.max(0, (p - 0.62) / 0.24));
    const shrink = open * 1.4 + skew * 2.2;
    const slant = skew * (6 + index * 0.8) * tiltSign;
    const top = Math.max(0, band.y + shrink);
    const bottom = Math.max(0, 100 - band.y - band.h + shrink);
    const left = Math.max(0, slant > 0 ? slant : 0);
    const right = Math.max(0, slant < 0 ? -slant : 0);
    return `inset(${top}% ${right}% ${bottom}% ${left}%)`;
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
   * Slow timeline (~3× scroll budget via section height):
   * enter → long approach → hit → shake/flash → shatter → handoff
   */
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.34, 0.4, 0.46, 0.52],
    [-520, -360, -HIT - 30, -HIT, -REST, -REST],
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.34, 0.4, 0.46, 0.52],
    [520, 360, HIT + 30, HIT, REST, REST],
  );

  const wordsOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.46, 0.52],
    [0, 1, 1, 0],
  );

  const shakeX = useTransform(
    scrollYProgress,
    [0.38, 0.4, 0.42, 0.44, 0.47, 0.5],
    [0, -18, 20, -14, 10, 0],
  );
  const shakeY = useTransform(
    scrollYProgress,
    [0.38, 0.41, 0.44, 0.47, 0.5],
    [0, 10, -12, 6, 0],
  );

  const keepOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.12, 0.3, 0.38],
    [0, 1, 1, 0],
  );

  const tagOp = useTransform(
    scrollYProgress,
    [0.5, 0.56, 0.7, 0.82],
    [0, 1, 0.55, 0],
  );
  const tagY = useTransform(
    scrollYProgress,
    [0.5, 0.64, 0.82],
    [0, 36, 100],
  );

  /* Handoff to ServicesReveal */
  const sceneFade = useTransform(scrollYProgress, [0.88, 0.97], [1, 0]);

  return (
    <section ref={ref} className="relative z-10 h-[720vh] bg-bg">
      <motion.div
        style={{ x: shakeX, y: shakeY, opacity: sceneFade }}
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

          {/* One continuous shatter: crack → soft tilt → drift */}
          <div className="pointer-events-none absolute inset-0 z-[2]">
            {BANDS.map((band, i) => (
              <ShatterBand
                key={`L-${i}`}
                progress={scrollYProgress}
                word={WORD_LEFT}
                color="lime"
                side="left"
                band={band}
                index={i}
              />
            ))}
            {BANDS.map((band, i) => (
              <ShatterBand
                key={`R-${i}`}
                progress={scrollYProgress}
                word={WORD_RIGHT}
                color="white"
                side="right"
                band={band}
                index={i}
              />
            ))}
          </div>

          <motion.p
            style={{ opacity: tagOp, y: tagY }}
            className="absolute top-[68%] z-[5] font-sans text-sm font-medium tracking-wide text-lime md:top-[70%] md:text-base"
          >
            {TAGLINE}
          </motion.p>
        </div>

      </motion.div>
    </section>
  );
}
