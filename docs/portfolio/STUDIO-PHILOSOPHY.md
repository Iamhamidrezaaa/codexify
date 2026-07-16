# Studio Philosophy
## Manifesto, not About Us

Route: `/studio`  
Feature: `src/features/studio/`

This page is the **opening essay** of Codexify as a design practice.  
It does not introduce people, offices, or a company story.

---

## Purpose

After portfolio and process, the remaining question is *why*.

The visitor should leave feeling the studio cares about design —  
because the sentences prove it, not because a slogan claims it.

Trust rises without persuasion.

---

## Spine

| # | Chapter | Intent |
|---|---------|--------|
| ۰۱ | Opening | One editorial statement. No slogan. No CTA. |
| ۰۲ | Why we design | Cost of poor design; value of clarity |
| ۰۳ | Principles | Five enduring rules (PrincipleBlock v2) |
| ۰۴ | How we work | Mindset; points to `/process` without repeating it |
| ۰۵ | What we believe | Short margin-like notes |
| ۰۶ | Closing | One thought. No sale. No invitation. |

---

## What we refuse

- Founder bios and portraits  
- Team / office photography  
- Stock metaphor imagery  
- Motivational language (passion, innovation, world-class…)  
- Closing CTAs and soft sales  

---

## Components

| Component | Role |
|-----------|------|
| `OpeningStatement` | **Memorable interaction** — words clarify into ink |
| `ManifestoSection` | Quiet chapter shell (sticky index, essay measure) |
| `EditorialEssay` | Long-form paragraphs with slow dissolve |
| `PrincipleBlock` | **v2** — manifesto scale (index, statement, body, aside) |
| `BeliefNotes` | Short reflections as margin marks |

## PrincipleBlock

One component: `src/components/editorial/PrincipleBlock.tsx`

| Variant | Used by | Scale |
|---------|---------|--------|
| `plate` | Process | Compact title + label |
| `manifesto` | Studio | Index + heading + aside |

Process and Studio folders re-export this module — do not fork again.


Shared from publication engine: `ReadingProgress`, `MarginNote`, `BreathingMoment`.  
Shared from process: `EditorialDiagram` (paper / type plates only).

---

## Writing rules

- Persian, editorial, calm, reflective  
- Explain beliefs — not who we are  
- No inspirational tone  
- Content: `src/features/studio/content.ts`

---

## Interaction budget

**One memorable interaction:** opening statement words rising from near-invisible to full ink.

Everything else stays almost still (progress hairline, soft essay dissolves).

---

## Relation to other publications

| Page | Question answered |
|------|-------------------|
| `/work` | What have we made? |
| `/process` | How do we decide? |
| `/studio` | What do we believe? |
