# Codexify / کدکسیفای

استودیوی طراحی دیجیتال پرمیوم

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion · Lenis
- Peyda (Persian) + Geist (Latin) — local via `next/font/local`

## Getting Started

```bash
npm install
npm run dev
```

## Architecture

```
src/
├── app/                 # Routes (/ · /lab)
├── components/          # UI primitives + layout chrome
├── sections/            # Page compositions
├── features/            # Domain modules (future)
├── design/              # Design system
├── lab/                 # Internal Interaction Laboratory
├── fonts/               # Peyda + Geist
└── lib/                 # Shared non-visual utilities
```

### Design layer

Visual identity lives in `src/design/`.  
Art direction: `src/design/art-direction/`  
Public API: `import { … } from "@/design"`

### Interaction Lab

Internal R&D at `/lab` (`noindex`).  
Modules: `src/lab/interactions/` · Docs: `src/lab/docs/README.md`

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

## Sprint Status

- [x] Sprint 0 — Foundation
- [x] Sprint 0.5 — Persian / RTL art direction
- [x] Sprint 0.6 — Design system architecture
- [x] Sprint 0.7 — Creative polish
- [x] Sprint 0.8 — Experience language
- [x] Sprint 0.9 — Interaction Lab (R&D)
- [x] Sprint 1 — Portfolio strategy & case study architecture
- [x] Sprint 2 — Work exhibition experience
- [ ] Sprint 3 — Case study pages
