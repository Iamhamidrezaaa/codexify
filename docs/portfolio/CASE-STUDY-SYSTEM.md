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
  types.ts        # Includes publication.theme + imageFamily
```

Route: `src/app/work/[slug]/page.tsx`

## Adding Case Study 02

1. Create `content/sora-residence.ts` with `publication` block  
2. Register in `registry.ts`  
3. Choose one `imageFamily`  
4. Do not fork the view — extend motifs only if needed  

See also:

- [PROCESS-PHILOSOPHY.md](./PROCESS-PHILOSOPHY.md) — Sprint 6 process publication  
- [STUDIO-PHILOSOPHY.md](./STUDIO-PHILOSOPHY.md) — Sprint 7 studio manifesto  

