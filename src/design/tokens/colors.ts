/**
 * Primitive + semantic color tokens.
 * CSS source of truth: design/colors/colors.css
 */
export const colorPrimitive = {
  white: "#f7f6f2",
  black: "#0a0a0a",
  stone50: "#f0efeb",
  stone100: "#e4e3de",
  stone200: "#d0cfc8",
  stone300: "#a8a79f",
  stone400: "#7a7972",
  stone500: "#5a5954",
  stone600: "#3d3c38",
  terracotta: "#b8472a",
  terracottaSoft: "#c96a52",
} as const;

export const colorSemantic = {
  bg: "var(--bg)",
  bgSubtle: "var(--bg-subtle)",
  fg: "var(--fg)",
  fgMuted: "var(--fg-muted)",
  fgSubtle: "var(--fg-subtle)",
  border: "var(--border)",
  borderStrong: "var(--border-strong)",
  accent: "var(--accent)",
  accentHover: "var(--accent-hover)",
  focusRing: "var(--focus-ring)",
} as const;

export type ColorPrimitive = keyof typeof colorPrimitive;
export type ColorSemantic = keyof typeof colorSemantic;
