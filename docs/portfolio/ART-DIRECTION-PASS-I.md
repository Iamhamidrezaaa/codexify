# Art Direction Pass I
## Sprint 9 — visual craft only

No new routes. No new features. No new copy.  
Atmosphere, materiality, depth, presence.

---

## What changed

### Global material layer
- `src/design/material/material.css` — paper grain, hairlines, emboss/deboss, plate elevation, crop-mark frames
- Body mounts `.paper-grain` (multiply, ~4% opacity)

### Heroes (poster-ready without motion)
- Home — architectural datum + side plate
- Work intro — registration lines + hairline aside
- Process / Studio / Case Study — atmosphere-specific fields (light plan vs dark salon)

### Editorial plates
- `ImageComposition` — denser material motifs, solid planes, crop marks, architectural shadow; bezel no longer uses conic gradients
- `ProjectVisual` — richer exhibition plates + number registration
- `EditorialDiagram` / screen plates — same plate language

### Micro typography
- Figure captions — hairline top, tracking on شکل labels
- Margin notes — hairline rule
- Pull quotes — hairline (not thick accent bar)
- Marquee — hairline band, rule separators (no bullets)

---

## Quality bar

Would this viewport still feel premium with animation disabled?  
Would a still screenshot sit in an architecture magazine?

If either answer is no — refine composition, not motion.

---

## Still deferred

- Full CSS `filter: url(#noise)` per-section variants (global grain is enough for Pass I)
- Photography assets (still composition-led)
- Merging chapter shells (structure sprint, not art direction)
