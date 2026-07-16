/**
 * Spacing scale — 8px base.
 * CSS source of truth: design/spacing/spacing.css
 */
export const space = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.5rem",
  6: "2rem",
  7: "2.5rem",
  8: "3rem",
  9: "4rem",
  10: "5rem",
  11: "6rem",
  12: "8rem",
} as const;

export const spaceSemantic = {
  section: "var(--space-section)",
  block: "var(--space-block)",
  stack: "var(--space-stack)",
  inline: "var(--space-inline)",
  text: "var(--space-text)",
} as const;

export type SpaceScale = keyof typeof space;
