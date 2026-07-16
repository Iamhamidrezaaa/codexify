# Work Page — Navigation & Exhibition Strategy

> The Work page is an exhibition.  
> Not a gallery. Not a card grid.

**Do not build this page in Sprint 1.** This document defines how it should behave when built.

---

## 1. Role of the page

The Work index is the **anteroom** of the portfolio.

It should:

- Establish seriousness in under five seconds
- Let projects breathe
- Guide toward a single deep read — not rapid skimming of six equals

It should not:

- Compete with case studies for detail
- Feel like a Dribbble row or SaaS “Our Work” block

---

## 2. Information architecture

```
/work                 → Exhibition index
/work/[project]       → Full case study (architecture shared)
```

Optional later (not Sprint 1):

- Filter by industry — only if it doesn’t collapse into tag chips
- Index by year — quiet, typographic

---

## 3. Exhibition composition

### Layout temperament

- **Asymmetric** list or stacked chapters — not equal cards
- **Large whitespace** between projects
- One project can dominate the first viewport; others follow with rhythm changes
- Mix of full-bleed media moments and typographic entries

### Entry per project (index)

Minimum:

| Field | Notes |
|-------|--------|
| Name | Display size |
| Industry | Overline / caption |
| Year | Quiet |
| One-line thesis | From case study Hero statement |
| Visual | Brand-led — type, material, product, architecture — **no laptop mockups** |

Avoid:

- Equal thumbnail grids
- Hover “View project →” stickers everywhere
- Category pills as decoration

---

## 4. Navigation within the exhibition

### Global

- Primary nav: **آثار** → `/work`
- From home: one calm link into the exhibition — not a teaser carousel of six

### On `/work`

- Vertical scroll is the primary navigator
- Optional: quiet side index (01–06) that jumps to project anchors — editorial, not sticky SaaS TOC
- No hamburger of project names on desktop unless space demands it

### From case study

- Previous / Next project — typographic, low chrome
- Back to Work — text link, not a floating button
- Related project — **at most one**, only if strategically meaningful (usually skip at launch)

---

## 5. Order of projects

Suggested exhibition order (narrative arc, not chronology):

1. **Atelier Noir** — precision object / desire  
2. **Sora Residence** — space / silence  
3. **Velora** — fashion / rhythm  
4. **Nexa Capital** — trust / clarity  
5. **Auren Clinic** — care / calm luxury  
6. **Forma Studio** — material / domestic architecture  

Arc: object → building → body/image → capital → wellness → interior.

Clients scanning for “people like us” still find range; the sequence feels intentional.

---

## 6. Motion & interaction (for later build)

- Index: slow reveals, not identical staggers on every block
- Prefer opacity and soft translation
- No project-card lift shadows
- Case study page may use project-specific motion language (defined per project)

---

## 7. Mobile

- Still an exhibition: stacked chapters with generous padding
- Do not collapse into a generic two-column thumbnail grid
- Type remains the hero; media secondary when needed

---

## 8. Success test

At 25% zoom, the Work page should still look like a magazine section — not a dashboard of tiles.
