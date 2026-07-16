# Motion Rules

Character: elegant · calm · confident · invisible · natural.

## Presets

Import from `@/design/motion`:

`fadeIn` · `fadeUp` · `fadeDown` · `staggerContainer` · `textReveal` · `maskReveal` · `imageReveal` · `lineReveal` · `pageTransition` · `hoverScale` · `hoverLift`

## Timing

| Context | Token |
|---------|--------|
| Hover | `--duration-fast` (280ms) |
| UI | `--duration-base` (480ms) |
| Section | `--duration-slow` (800ms) |
| Reveal | `--duration-reveal` (1400ms) |

Easing: `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`).

Respect `prefers-reduced-motion`. No bounce. No elastic. No flashy cursor.
