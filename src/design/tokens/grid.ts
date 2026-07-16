/**
 * Grid + container tokens.
 * CSS source of truth: design/grid/grid.css
 */
export const container = {
  max: "var(--container-max)",
  wide: "var(--container-wide)",
} as const;

export const grid = {
  colsMobile: 4,
  colsTablet: 8,
  colsDesktop: 12,
  gutterMobile: "var(--gutter-mobile)",
  gutterTablet: "var(--gutter-tablet)",
  gutterDesktop: "var(--gutter-desktop)",
  marginMobile: "var(--margin-mobile)",
  marginTablet: "var(--margin-tablet)",
  marginDesktop: "var(--margin-desktop)",
} as const;

export const breakpoint = {
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
