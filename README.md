# Codexify

Premium digital design studio website — Sprint 0 foundation.

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion · Lenis

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Creative Direction

See [`docs/CREATIVE-DIRECTION.md`](docs/CREATIVE-DIRECTION.md) for the full design system, motion language, and component philosophy.

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/
│   ├── layout/       # Header, Footer, Grid
│   ├── providers/    # Lenis smooth scroll
│   ├── sections/     # Page sections (Hero, Philosophy, Services)
│   └── ui/           # Reusable primitives (TextReveal, FadeIn, Marquee)
├── lib/              # Utils, motion tokens
└── styles/           # (tokens in globals.css)
```

## Sprint 0 Deliverables

- [x] Creative direction document
- [x] Design token system (primitive → semantic)
- [x] Typography: Instrument Serif + IBM Plex Sans/Mono
- [x] 12-column asymmetric grid
- [x] Motion language with Framer Motion + Lenis
- [x] Home page foundation (Hero, Marquee, Philosophy, Services, Footer)
- [x] Accessibility: skip link, focus states, reduced motion
- [x] SEO metadata

## Next Sprints

- Work / case studies
- Studio / about page
- Contact flow
- Page transitions
- GSAP scroll sequences (where needed)
