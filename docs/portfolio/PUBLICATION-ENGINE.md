# Publication Engine v2
## Sprint 4

Atelier Noir remains the benchmark story.  
This sprint refined the **publishing house** behind it — not the plot.

---

## What changed

| Area | v1 (Sprint 3) | v2 (Sprint 4) |
|------|---------------|---------------|
| Theming | Hardcoded Atelier hex in places | `publication.theme` drives hero, inverse chapters, screens |
| Images | Ad-hoc variants | `ImageFamily` + motif system |
| Figures | Plain captions | Numbered `شکل ۰۱` via `Figure` |
| Reading | Flat scroll | `ReadingProgress` + `ChapterRail` |
| Prose | Raw paragraphs | `Prose` with measure + rhythm |
| Design system | Lists | Collectible plates (grid/spacing diagrams, larger swatches) |
| Navigation | Prev/next only | Exhibition close + prev/next + study name |

---

## Editorial principles

1. **Chapter openings** — sticky index + overline title; expansive padding on key chapters  
2. **Section numbering** — ۰۱–۰۹ consistent across studies (`publication.chapters`)  
3. **Pull quotes** — hairline rule + optional note (`EditorialQuote`)  
4. **Margin notes** — desktop annotations (`MarginNote`)  
5. **Figure numbering** — every plate can be a cited figure  
6. **Breathing moments** — intentional blank between chapters (`BreathingMoment`)  
7. **Reading progress** — hairline top bar; disabled under reduced motion  
8. **Chapter rail** — quiet jump index (xl+)  

No drop caps — they fought Persian display rhythm. Revisit only if a study demands it.

---

## Image families

Every study picks **one dominant family**:

`material` · `geometry` · `typography` · `architecture` · `macro` · `texture` · `negative-space`

Atelier Noir dominant: **macro** (with material/geometry accents).

Authoring:

```ts
<ImageComposition
  family="macro"
  motif="bezel"
  figure="۰۱"
  caption="…"
  ground={theme.ground}
  accent={theme.accent}
  ink={theme.ink}
/>
```

---

## Authoring a new case study (easier path)

1. Copy `content/atelier-noir.ts` → `content/[slug].ts`  
2. Fill `meta` + `publication.theme` + `publication.imageFamily`  
3. Keep chapter titles aligned with the spine  
4. Register in `registry.ts`  
5. Do **not** fork `CaseStudyView` — extend motifs only if the family needs a new plate  

---

## Accessibility

- Progressbar semantics on reading bar  
- Chapter rail `aria-current`  
- Heading hierarchy via `CaseStudySection`  
- Inverse chapters set `--fg-muted` for contrast  
- `prefers-reduced-motion` skips progress animation and softens reveals  

---

## Files to know

```
case-study/
  chapters.ts
  types.ts              # publication contract
  CaseStudyView.tsx     # magazine assembly
  components/
    Prose · Figure · MarginNote · BreathingMoment
    ReadingProgress · ChapterRail
    ImageComposition (families)
    DesignSystemBlock (collectible plates)
    …
```

---

## Quality bar for Sprint 5+

If building Sora Residence takes mostly **content authoring** and almost no layout invention, this sprint succeeded.
