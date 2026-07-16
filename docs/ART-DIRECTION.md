# Codexify — Art Direction
## Sprint 0.5 · Persian / RTL Edition

> The website is a handcrafted digital magazine.  
> Typography is the primary material. RTL is native, not mirrored.

---

## 1. Design Philosophy

| Principle | Meaning |
|-----------|---------|
| Restraint | If it can be removed without losing meaning, remove it |
| Hierarchy | Size, weight, and silence — never color noise |
| Intention | Every asymmetry is planned on the 12-column grid |
| Craft | Feels designed by humans who understand Persian type |

**Anti-patterns:** SaaS heroes, glassmorphism, gradients, glow, floating cards, AI illustrations, flashy cursors, LTR mirror layouts.

---

## 2. Typography System (Peyda)

Single family. Nine weights. Local files via `next/font/local`. No Google Fonts.

| Role | Class | Size token | Weight | Use |
|------|-------|------------|--------|-----|
| Display | `.type-display` | `--text-display` | 800 | Hero headlines |
| Heading | `.type-heading` | `--text-heading` | 700 | Section titles |
| Title | `.type-title` | `--text-title` | 600 | Subheads, list titles |
| Body LG | `.type-body-lg` | `--text-body-lg` | 400 | Lead paragraphs |
| Body | `.type-body` | `--text-body` | 400 | Default copy |
| Caption | `.type-caption` | `--text-caption` | 400 | Secondary notes |
| Overline | `.type-overline` | `--text-overline` | 500 | Section intros |
| Label | `.type-label` | `--text-label` | 500 | Form labels |
| Button | `.type-button` | `--text-button` | 500 | CTAs |
| Number | `.type-number` | `--text-number` | 500 | Indexes `۰۱` |
| Navigation | `.type-nav` | `--text-nav` | 500 | Header links |

**Persian notes:**
- Avoid heavy Latin-style letter-spacing on body text
- Prefer intentional line breaks over automatic wrapping for display
- Use Persian digits (`۰۱۲`) for editorial indexes
- Line-height for body is generous (`1.85`) for Arabic-script comfort

---

## 3. Spacing System

Base unit: **8px** (`--space-2`).

| Token | Value | Role |
|-------|-------|------|
| `--space-1` … `--space-12` | 4px → 128px | Component scale |
| `--space-section` | `clamp(5rem, 14vh, 11rem)` | Between major sections |
| `--space-block` | `clamp(2.5rem, 6vh, 5rem)` | Within sections |
| `--space-stack` | 24px | Vertical stacks |
| `--space-text` | `0.65em` | Between related text |

**Rule:** Never hardcode spacing. Use tokens or Tailwind mapped to tokens.

---

## 4. Grid System

| Breakpoint | Columns | Gutter | Side margin |
|------------|---------|--------|-------------|
| Mobile | 4 | 16px | 24px |
| Tablet | 8 | 24px | 48px |
| Desktop | 12 | 32px | 64px |

- Max width: `--container-wide` (1600px)
- Asymmetry is intentional (e.g. headline cols 1–8, meta cols 10–12 in RTL reading order)
- Component: `<Grid />`

---

## 5. Color System

| Token | Hex | Role |
|-------|-----|------|
| Canvas | `#F7F6F2` | Paper white |
| Ink | `#0A0A0A` | Primary text |
| Muted | `#7A7972` | Secondary text |
| Border | `#D0CFC8` | Dividers |
| Accent | `#B8472A` | Single accent (terracotta) |

No gradients. No decorative shadows. Accent is rare: indexes, underlines, focus.

---

## 6. Motion System

**Character:** elegant · calm · confident · invisible · natural

| Context | Duration | Easing |
|---------|----------|--------|
| Hover / micro | 280ms | `--ease-out` |
| UI transition | 480ms | `--ease-out` |
| Section / line | 800ms | `--ease-out` |
| Reveal / text | 1400ms | `--ease-out` |
| Marquee loop | 55s | linear |

**Patterns:**
- Reveal: opacity + slight Y (20px)
- Text: mask + stagger (80ms)
- Line: scaleX from inline-start (right in RTL)
- Parallax: ≤ 80px, scroll-linked
- Hover underline: grows from inline-start

Respect `prefers-reduced-motion`. No bounce. No elastic. No flashy cursor.

---

## 7. RTL Rules

1. `lang="fa"` + `dir="rtl"` on `<html>` — always
2. Design compositions for RTL first; never mirror an LTR mock
3. Use logical properties: `inline-start/end`, `ms/me`, `ps/pe`
4. Indexes and overlines sit at the **start** edge (right)
5. CTAs: text then arrow in DOM → arrow appears at reading end (left); hover moves arrow further left
6. Marquee scrolls in RTL-native direction
7. Persian copy is authored, not translated machine-style

---

## 8. Component Language

| Element | Rule |
|---------|------|
| Buttons / links | Text + underline grow; no filled pills by default |
| Navigation | Quiet overlines; accent line on hover |
| Lists | Horizontal rules + numbers; not cards |
| Images | Geometry, architecture, negative space — never stock/AI |
| Forms | Hairline borders, large labels, generous focus |
| Cards | Avoid; use only when interaction requires a container |

---

## 9. Cursor

No custom flashy cursor. Native pointer. Subtle link underlines and opacity only.

---

## 10. Token Source of Truth

All tokens live in `src/app/globals.css` (`:root` + `@theme inline`).  
Motion constants mirrored in `src/lib/motion.ts`.  
Font registration: `src/fonts/index.ts` (Peyda via `next/font/local`).
