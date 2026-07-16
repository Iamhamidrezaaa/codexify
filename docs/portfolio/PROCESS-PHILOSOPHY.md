# Process Philosophy
## How Codexify thinks

Route: `/process`  
Feature: `src/features/process/`

This page is a **publication**, not a landing section.  
It sits beside the case-study engine: same editorial calm, different spine.

---

## Why it exists

Premium clients buy confidence that decisions are structured.  
The Process page shows the structure — without pitching, promising, or entertaining.

If the visitor finishes thinking *«می‌دانند چه می‌کنند»*, the page succeeded.

---

## Six equal stages

| # | Stage | Focus |
|---|--------|--------|
| ۰۱ | فهم | اهداف، مخاطب، بافت |
| ۰۲ | کشف | پژوهش، جایگاه، رقبا، فرصت |
| ۰۳ | طراحی | ساختار، تجربه، تایپ، هویت |
| ۰۴ | ساخت | فرانت، عملکرد، دسترسی، واکنش‌گرا |
| ۰۵ | پالایش | آزمون، تکرار، جزئیات، تنظیم |
| ۰۶ | انتشار | استقرار، پایش، تداوم |

No stage is a “hero.” No stage is a footnote.  
Layout weight is identical across all six.

---

## What we refuse

- Startup roadmaps and chevron timelines  
- Numbered feature boxes  
- Flowcharts and arrow diagrams  
- Stock photos of teams / handshakes  
- Marketing claims (“world-class”, “end-to-end magic”)

---

## Components

| Component | Role |
|-----------|------|
| `ProcessSection` | Chapter shell; **sticky monumental index** (the one memorable interaction) |
| `EditorialDiagram` | Abstract plates — grid, wireframe, paper, type, material, annotation |
| `PrincipleBlock` | Quiet principles after the six stages |
| `ProcessHero` / `ProcessView` | Publication assembly |

Shared from the case-study engine: `ReadingProgress`, `Prose`, `MarginNote`, `BreathingMoment`, `EditorialQuote`, `Figure`.

---

## Writing rules

- Persian, editorial, professional, quiet  
- Explain **how decisions are made**  
- No promises about outcomes  
- Notes in the margin are observations, not slogans  

Content lives in `src/features/process/content.ts`.

---

## Interaction budget

**One memorable interaction:** sticky stage numbers while the chapter is read.  

Everything else stays almost invisible (hairline reading progress, soft reveals).  
Nothing playful.

---

## Relation to portfolio

Process explains the method.  
`/work` shows the method applied.  
Do not conflate the two into a single marketing funnel page.

See also: [STUDIO-PHILOSOPHY.md](./STUDIO-PHILOSOPHY.md) for beliefs (Sprint 7).
