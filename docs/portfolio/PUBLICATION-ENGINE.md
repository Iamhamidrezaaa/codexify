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
Sora Residence dominant: **architecture** (with material / negative-space accents).  
Auren Clinic dominant: **negative-space** (with material / typography accents).

Architecture motifs: `plan` · `elevation` · `aperture` · `timber` · `shadow-cast` · `threshold`.  
Care / soft-space motifs: `veil` · `linen` · `mist` · `void`.

Screen frames (care): `suite` · `consult` — reusable for calm clinical / wellness publications.

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

## Atmosphere & editorial dials (Sprint 5)

| Field | Purpose |
|-------|---------|
| `publication.atmosphere` | `dark` inverts site header on hero; `light` keeps ink chrome |
| `publication.editorial.breath` | `open` = longer pauses, airier lists (Sora); `compact` = denser (Atelier) |
| `publication.editorial.marginNote` | Optional xl+ annotation — omit to hide |
| `publication.editorial.reflectionField` | `ground` or `surface` for inverse chapter |
| `publication.editorial.screensTitle` | Chapter label (e.g. قاب‌های فضایی) |
| `figures.*.family` | Per-plate override of dominant `imageFamily` |

**Proven set:**  
Atelier Noir = dark · macro.  
Sora Residence = light · architecture.  
Auren Clinic = light · negative-space (care).

---

## Authoring a new case study (easier path)

1. Copy an existing content file closest in atmosphere — not always Atelier  
2. Fill `meta` + `theme` + `imageFamily` + `atmosphere`  
3. Tune `editorial` for rhythm; omit features that don't serve the story  
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

## Motion family (Sprint 8)

| Context | Preset |
|---------|--------|
| Philosophy / Studio chapters | `editorialDissolve` |
| Process chapters | `processSettle` |
| Case study chapters | `chapterArrive` |
| Services / discovery lists | `discoverySettle` |
| Footer / quiet plates | `quietArrive` |

Do not invent a fourth dissolve. Pick from this family.

