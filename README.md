# Codexify / کدکسیفای

استودیوی طراحی دیجیتال پرمیوم — Sprint 0.5 · Art Direction (Persian / RTL)

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion · Lenis
- Peyda (local, `next/font/local`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design System

- [`docs/ART-DIRECTION.md`](docs/ART-DIRECTION.md) — source of truth for visual language
- [`docs/CREATIVE-DIRECTION.md`](docs/CREATIVE-DIRECTION.md) — Sprint 0 brand brief
- Tokens: `src/app/globals.css`
- Font: `src/fonts/` (Peyda)

## Project Structure

```
src/
├── app/                 # App Router · tokens · RTL layout
├── fonts/peyda/         # Local Peyda weights
├── components/
│   ├── layout/          # Header, Footer, Grid
│   ├── providers/       # Lenis
│   ├── sections/        # Hero, Marquee, Philosophy, Services
│   └── ui/              # TextReveal, FadeIn, LinkArrow, Marquee
└── lib/                 # motion · utils
```

## Sprint Status

- [x] Sprint 0 — Technical foundation
- [x] Sprint 0.5 — Art Direction · Peyda · RTL · Design tokens
- [ ] Sprint 1 — Work / case studies
