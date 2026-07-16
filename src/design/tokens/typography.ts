/**
 * Typography tokens — sizes, weights, leading, tracking.
 * CSS source of truth: design/typography/
 */
export const fontSize = {
  display: "var(--text-display)",
  heading: "var(--text-heading)",
  title: "var(--text-title)",
  bodyLg: "var(--text-body-lg)",
  body: "var(--text-body)",
  caption: "var(--text-caption)",
  overline: "var(--text-overline)",
  label: "var(--text-label)",
  button: "var(--text-button)",
  number: "var(--text-number)",
  nav: "var(--text-nav)",
} as const;

export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const lineHeight = {
  display: "var(--leading-display)",
  heading: "var(--leading-heading)",
  title: "var(--leading-title)",
  body: "var(--leading-body)",
  tight: "var(--leading-tight)",
  caption: "var(--leading-caption)",
} as const;

export const letterSpacing = {
  display: "var(--tracking-display)",
  heading: "var(--tracking-heading)",
  body: "var(--tracking-body)",
  overline: "var(--tracking-overline)",
  number: "var(--tracking-number)",
} as const;

export const typeRole = {
  display: "type-display",
  heading: "type-heading",
  title: "type-title",
  bodyLg: "type-body-lg",
  body: "type-body",
  caption: "type-caption",
  overline: "type-overline",
  label: "type-label",
  button: "type-button",
  number: "type-number",
  nav: "type-nav",
} as const;
