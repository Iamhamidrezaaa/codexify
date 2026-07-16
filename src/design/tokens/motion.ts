/**
 * Motion timing tokens (seconds for Framer Motion).
 * CSS durations live in design/motion/motion.css
 */
export const duration = {
  instant: 0.1,
  fast: 0.28,
  base: 0.48,
  slow: 0.8,
  slower: 1.2,
  reveal: 1.4,
} as const;

export const durationCss = {
  instant: "var(--duration-instant)",
  fast: "var(--duration-fast)",
  base: "var(--duration-base)",
  slow: "var(--duration-slow)",
  slower: "var(--duration-slower)",
  reveal: "var(--duration-reveal)",
  marquee: "var(--duration-marquee)",
} as const;

export const easing = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  linear: "linear" as const,
};

export const stagger = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
} as const;
