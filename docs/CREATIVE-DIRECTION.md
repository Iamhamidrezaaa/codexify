# Codexify — Creative Direction
## Sprint 0 Foundation

> **Sprint 0.6:** Design system lives in `src/design/`.  
> Art direction: `src/design/art-direction/`  
> Legacy summary: [`ART-DIRECTION.md`](./ART-DIRECTION.md)

---

## Brand Essence

**Codexify** is a premium digital design studio. The website is not a brochure — it is the portfolio. Every pixel must communicate mastery of craft, restraint, and intention.

**One-line positioning:**  
*We design and build digital experiences that feel inevitable.*

---

## Visual Language

### Philosophy
Inspired by Dieter Rams, Swiss editorial design, Japanese minimalism, and Awwwards-winning studios (Basic Agency, Locomotive, Dogstudio, Resn). The aesthetic is **quiet confidence** — nothing shouts, everything resonates.

### Anti-Patterns (Never)
- AI startup aesthetics (glassmorphism, purple gradients, neon glow)
- Template SaaS heroes with floating cards
- Decorative elements without purpose
- Inter/Geist as primary display type
- Centered everything layouts
- Bouncy or flashy motion

### Color System

| Token | Value | Role |
|-------|-------|------|
| Canvas | `#F8F7F4` | Warm paper white — primary background |
| Ink | `#0C0C0C` | Near-black — primary text |
| Muted | `#8A8A86` | Secondary text, captions |
| Border | `#D4D4D0` | Structural lines, dividers |
| Accent | `#C24E2E` | **Single accent** — terracotta, architectural warmth |

No gradients. No secondary accent colors. Accent used sparingly: underlines, hover states, index markers.

### Typography

| Role | Family | Character |
|------|--------|-----------|
| Display | Instrument Serif | Editorial, timeless, oversized headlines |
| Body | IBM Plex Sans | Swiss functional clarity |
| Label | IBM Plex Mono | Index numbers, metadata, navigation |

**Scale (fluid):**
- Display XL: `clamp(4rem, 11vw, 10rem)` — hero headlines
- Display LG: `clamp(2.5rem, 6vw, 5.5rem)` — section titles
- Display MD: `clamp(1.75rem, 3vw, 3rem)` — subheadings
- Body LG: `clamp(1.125rem, 1.4vw, 1.375rem)` — lead paragraphs
- Body: `1rem` — standard copy
- Caption: `0.6875rem` — uppercase labels, tracking `0.12em`

**Rhythm:** Tight letter-spacing on display (`-0.03em` to `-0.04em`). Generous line-height on body (`1.6`). Intentional line breaks in headlines.

### Spacing

Base unit: **8px**. Editorial whitespace is a primary design element.

| Token | Value | Usage |
|-------|-------|-------|
| space-section | `clamp(6rem, 15vh, 12rem)` | Between major sections |
| space-block | `clamp(3rem, 8vh, 6rem)` | Within sections |
| space-inline | `clamp(1.5rem, 4vw, 3rem)` | Page margins |

### Grid

**12-column asymmetric grid.** Not centered templates.

```
Mobile:  4 columns, 16px gutter, 20px margin
Tablet:  8 columns, 24px gutter, 32px margin
Desktop: 12 columns, 32px gutter, 48px margin
```

Columns are used asymmetrically — e.g., headline spans cols 1–8, meta spans cols 10–12.

---

## Motion Language

Motion must feel **expensive**: slow, elegant, natural.

### Principles
1. Every animation has purpose (reveal, guide attention, confirm interaction)
2. No bounce, no elastic, no exaggerated scale
3. Respect `prefers-reduced-motion`
4. Scroll-driven reveals over autoplay loops

### Timing
| Token | Value | Usage |
|-------|-------|-------|
| duration-slow | `1.4s` | Hero reveals, section entrances |
| duration-medium | `0.8s` | UI transitions |
| duration-fast | `0.4s` | Hover, micro-interactions |
| ease-premium | `cubic-bezier(0.16, 1, 0.3, 1)` | All primary motion |

### Patterns
- **Reveal:** Clip-path mask from bottom, opacity 0→1, y: 24px→0
- **Parallax:** Subtle (5–15%), scroll-linked via Lenis
- **Text split:** Word or line stagger, 0.08s delay between units
- **Marquee:** Slow horizontal drift, 40–60s loop
- **Link hover:** Underline grows from left, accent color

### Tech
- **Lenis** — smooth scrolling foundation
- **Framer Motion** — component animations, scroll triggers
- **GSAP** — reserved for complex scroll sequences (future sprints)

---

## Component Philosophy

### Reusable UI
Components are **structural**, not decorative:
- `TextReveal` — scroll-triggered text mask
- `FadeIn` — generic entrance wrapper
- `LinkArrow` — editorial CTA with arrow transition
- `Marquee` — slow horizontal band
- `Grid` — 12-column layout container
- `SectionLabel` — mono index numbers (01, 02…)

### No
- Card components with shadows
- Button variants with gradients
- Icon libraries as decoration
- Stock illustrations

---

## Page Architecture (Sprint 0)

### Home — Foundation Sections
1. **Hero** — Asymmetric headline, studio positioning, primary CTA
2. **Marquee Band** — Services in slow horizontal scroll
3. **Philosophy** — Large editorial quote
4. **Services Index** — Numbered list, not cards
5. **Footer** — Minimal contact, copyright

### Future Sprints
- Work / Case studies
- Studio / About
- Contact flow
- Page transitions
- Case study templates

---

## Accessibility & Performance

- Semantic HTML (`header`, `main`, `section`, `nav`, `footer`)
- Focus-visible states on all interactive elements
- Color contrast ≥ 4.5:1 (WCAG AA)
- `prefers-reduced-motion` disables scroll smoothing and animations
- Next.js Image optimization for all media
- Font subsetting via `next/font`
- Target Lighthouse: Performance 90+, Accessibility 100

---

## Success Criteria

When a visitor lands on Codexify, they should think:

> *"These people know design."*

Not:

> *"This website was generated by AI."*

The foundation must be capable of earning an **Awwwards Honorable Mention**.
