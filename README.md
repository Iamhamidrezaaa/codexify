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
├── app/                 # Routes only
├── components/          # UI primitives + layout chrome
├── sections/            # Page compositions
├── features/            # Domain modules (future)
├── design/              # Design system (tokens, motion, art direction)
├── fonts/               # Peyda + Geist
└── lib/                 # Shared non-visual utilities
```

### Design layer

Visual identity lives in `src/design/`.  
Art direction: `src/design/art-direction/`  
Public API: `import { … } from "@/design"`

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
- [ ] Sprint 1 — Work / case studies
