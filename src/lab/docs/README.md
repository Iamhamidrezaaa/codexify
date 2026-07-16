# Codexify Interaction Laboratory

Internal R&D environment. Not part of the public site.

## Purpose

Invent, isolate, benchmark, and refine interactions before they ship to client work.

## Structure

```
src/lab/
  interactions/     # Interaction001… modules
  playground/       # Demo chrome
  docs/             # Lab documentation
  registry.ts       # Catalog
  types.ts
```

## Public demo route

`/lab` — `robots: noindex`

## Adding Interaction011+

1. Create `src/lab/interactions/InteractionNNN/`
2. Export component + `meta.ts` + `docs.md`
3. Register in `registry.ts` and `index.ts`
4. Mount a demo block in `src/app/lab/page.tsx`

## Standards

- 60 FPS target
- Prefer `transform` / `opacity`
- Always honor `prefers-reduced-motion`
- Document when to use / when not
