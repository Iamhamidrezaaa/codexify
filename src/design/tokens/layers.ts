/**
 * Opacity + z-index tokens.
 */
export const opacity = {
  muted: "var(--opacity-muted)",
  subtle: "var(--opacity-subtle)",
  disabled: "var(--opacity-disabled)",
  hover: "var(--opacity-hover)",
} as const;

export const zIndex = {
  base: "var(--z-base)",
  content: "var(--z-content)",
  sticky: "var(--z-sticky)",
  header: "var(--z-header)",
  overlay: "var(--z-overlay)",
  modal: "var(--z-modal)",
  toast: "var(--z-toast)",
  skip: "var(--z-skip)",
} as const;
