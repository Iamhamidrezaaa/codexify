# Case Study System

> Superseded in detail by [PUBLICATION-ENGINE.md](./PUBLICATION-ENGINE.md) (Sprint 4).

## Gold standard

**Atelier Noir** (`/work/atelier-noir`) remains the reference story.  
Publication Engine v2 is the reference **system**.

## Architecture

```
src/features/work/case-study/
  components/     # Publication primitives + blocks
  content/        # Per-project editorial copy
  chapters.ts     # Canonical chapter spine
  CaseStudyView.tsx
  registry.ts
  atmosphere.ts   # Header chrome map
  types.ts
```

Route: `src/app/work/[slug]/page.tsx`

## Published studies

| # | Slug | Atmosphere | Family |
|---|------|------------|--------|
| ۰۱ | `atelier-noir` | dark | macro |
| ۰۲ | `sora-residence` | light | architecture |
| ۰۵ | `auren-clinic` | light | negative-space |

## Adding a case study

1. Create `content/[slug].ts` with `publication` block  
2. Register in `registry.ts` **and** `atmosphere.ts`  
3. Choose one `imageFamily`  
4. Wire prev/next among **published** studies only  
5. Do not fork the view — extend motifs only if reusable  

See also:

- [PROCESS-PHILOSOPHY.md](./PROCESS-PHILOSOPHY.md) — Sprint 6 process publication  
- [STUDIO-PHILOSOPHY.md](./STUDIO-PHILOSOPHY.md) — Sprint 7 studio manifesto  
- [GLOBAL-EXPERIENCE-AUDIT.md](./GLOBAL-EXPERIENCE-AUDIT.md) — Sprint 8 continuity audit  
- [ART-DIRECTION-PASS-I.md](./ART-DIRECTION-PASS-I.md) — Sprint 9 visual craft  
