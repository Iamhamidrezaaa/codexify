# Case Study System — Sprint 3

## Gold standard

**Atelier Noir** (`/work/atelier-noir`) is the reference implementation.  
Future studies reuse the same components and narrative spine — only content and visual motifs change.

## Architecture

```
src/features/work/case-study/
  components/     # Reusable publication blocks
  content/        # Per-project editorial copy
  CaseStudyView.tsx
  registry.ts
  types.ts
```

Route: `src/app/work/[slug]/page.tsx`  
`generateStaticParams` expands as new studies are registered.

## Components

| Component | Role |
|-----------|------|
| `CaseStudyHero` | Monumental opening, no CTA |
| `CaseStudySection` | Indexed editorial chapter |
| `EditorialQuote` | Pull quote |
| `ImageComposition` | Geometry / material art — no devices |
| `DesignSystemBlock` | Grid, color, type, principles |
| `ColorPalette` | Swatches + roles |
| `TypographyShowcase` | Type roles |
| `ScreenComposition` | Selected frames without chrome |
| `ReflectionBlock` | Lessons |
| `OutcomeBlock` | Qualitative outcomes |
| `CaseStudyNav` | Back / prev / next |

## Writing rules (enforced in Atelier Noir)

- Persian, editorial, quiet
- No fake KPIs
- No marketing buzzwords
- Explain *why* on interactions, not *how*

## Visual rules

- Immersive dark field in hero (brand atmosphere)
- Codexify Header/Footer remain for studio authorship
- Abstract compositions stand in for photography until real assets exist

## Adding Case Study 02

1. Create `content/sora-residence.ts`
2. Register in `registry.ts`
3. Optionally add project-specific motifs to `ImageComposition` / `ScreenComposition`
4. Rebuild — static param appears automatically
