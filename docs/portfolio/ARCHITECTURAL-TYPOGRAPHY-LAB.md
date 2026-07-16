# Codexify — Architectural Typography Lab
## Phase 9 · Persian Type as Architecture

**Home:** Remains frozen (`home-v3-freeze/`).  
**Status:** Direction only. No code. No CSS. No React. No SVG. No Figma.  
**Thesis:** The eventual homepage is built around a typography system — not UI, Objects, or layout templates.

Peyda remains the voice.  
This lab defines **how letters behave in space**, not which Google Font to buy.

---

# Doctrine

Persian typography is not decoration on a grid.  
It is **load-bearing structure**: mass, void, joint, façade, threshold.

| Western habit to refuse | Architectural substitute |
|-------------------------|--------------------------|
| “Big headline + subcopy” | Façade + inscription |
| Centered slogan | Bearing wall offset |
| Equal line stacks | Floor plates with unequal loads |
| Decorative ligature tricks | Structural joints |
| LTR template mirrored late | RTL gravity designed first |

**Reading direction** is always RTL.  
**Gravity** may still lead the eye to mass before script order — but line logic never pretends to be Latin.

---

# The Systems (28)

---

## T01 — Cropped Façade
| Field | Spec |
|-------|------|
| **Name** | Cropped Façade |
| **Visual philosophy** | Letters are a building elevation cropped by the viewport edge. Ascenders/descenders and word ends may leave the frame. The crop is the architecture. |
| **Reading behaviour** | Sense before full decode; completion happens in the mind. |
| **Eye movement** | Hits the densest remaining stroke → follows the cut edge → reconstructs the missing wing. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Culture, fashion, studio identity |
| **Worst industries** | Healthcare urgent, finance compliance, wayfinding |
| **Accessibility risks** | Partial words; screen readers must still announce full string; zoom may worsen crop |
| **Why memorable** | Feels like walking past a mural cut by a corner. |
| **Why Codexify** | Composition Language L2/L3 — type as mass that negotiates the frame. |

---

## T02 — Letter as Volume
| Field | Spec |
|-------|------|
| **Name** | Letter as Volume |
| **Visual philosophy** | Each major letter is a spatial volume — thick strokes read as walls, counters as rooms. Scale so large that a single word is a plan. |
| **Reading behaviour** | Spatial reading first; linguistic reading second. |
| **Eye movement** | Enters a counter (room) → exits through a stroke joint → next volume. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Studio, culture, architecture |
| **Worst industries** | Dense information services, SaaS docs |
| **Accessibility risks** | Huge type can overflow; must keep logical full text in DOM |
| **Why memorable** | Letters become places. |
| **Why Codexify** | Bible: typography is architecture. |

---

## T03 — Datum Baseline
| Field | Spec |
|-------|------|
| **Name** | Datum Baseline |
| **Visual philosophy** | One relentless architectural baseline (or RTL hanging line) organizes all type like a floor datum. Everything hangs from or sits on that line. |
| **Reading behaviour** | Orderly, institutional, calm. |
| **Eye movement** | Finds the datum → slides along it → drops to subordinate lines. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Architecture, education, finance (order), process |
| **Worst industries** | Playful consumer, chaotic fashion editorials |
| **Accessibility risks** | Low if sizes stay readable; thin datum must not be sole cue |
| **Why memorable** | The line becomes the building’s floor. |
| **Why Codexify** | Invisible structure made almost visible. |

---

## T04 — Broken Storey
| Field | Spec |
|-------|------|
| **Name** | Broken Storey |
| **Visual philosophy** | Line breaks are floor plates — unequal storey heights. A phrase is a section drawing: tall floor, short floor, void floor. |
| **Reading behaviour** | Poetic / sectional; pauses are structural. |
| **Eye movement** | Down the storeys with changing pace. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Studio, culture, hospitality manifesto |
| **Worst industries** | Legal, medical instructions |
| **Accessibility risks** | Unusual breaks can confuse if semantic HTML is wrong |
| **Why memorable** | Breaks feel designed, not wrapped. |
| **Why Codexify** | Home hero DNA — statement as building section. |

---

## T05 — Compressed Monument
| Field | Spec |
|-------|------|
| **Name** | Compressed Monument |
| **Visual philosophy** | Monumental weight in a deliberately tight measure — a stele. Few lines, heavy ink, narrow column of force. |
| **Reading behaviour** | Ceremonial vertical descent. |
| **Eye movement** | Top of stele → base inscription. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Luxury, studio, culture |
| **Worst industries** | Long-form education bodies as hero |
| **Accessibility risks** | Narrow columns of huge type; reflow on small screens |
| **Why memorable** | Feels carved, not typed. |
| **Why Codexify** | L5 + L3 — compression with monumentality. |

---

## T06 — Vertical Procession
| Field | Spec |
|-------|------|
| **Name** | Vertical Procession |
| **Visual philosophy** | Primary reading is a vertical rhythm of short RTL lines stacked as a procession — metronomic leading as structural bay spacing. |
| **Reading behaviour** | Ritual, paced, almost liturgical. |
| **Eye movement** | Steady downward pulse. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Culture, hospitality, studio |
| **Worst industries** | Data-heavy tech |
| **Accessibility risks** | Long processions tire; must limit line count |
| **Why memorable** | Rhythm becomes identity. |
| **Why Codexify** | Silence between lines is bay spacing. |

---

## T07 — Counter Chapel
| Field | Spec |
|-------|------|
| **Name** | Counter Chapel |
| **Visual philosophy** | Composition is built from **counters** (enclosed/open negative shapes inside letters). The ink is the wall; the void inside letters is the sacred space. |
| **Reading behaviour** | See voids, then read words. |
| **Eye movement** | Largest counter → chain of voids → linguistic close. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Studio, culture, education (design) |
| **Worst industries** | Small UI labels, dense apps |
| **Accessibility risks** | Ultra-light weights destroy counters; prefer solid display cuts |
| **Why memorable** | Teaches people to see Persian counters as architecture. |
| **Why Codexify** | Negative space as protagonist — aligns with L1. |

---

## T08 — Ink Load
| Field | Spec |
|-------|------|
| **Name** | Ink Load |
| **Visual philosophy** | Hierarchy = ink density, not only size. Primary = high black coverage; secondary = grey load; tertiary = hairline. Same size can differ by density. |
| **Reading behaviour** | Weight-led scanning. |
| **Eye movement** | Darkest patch first → greyer satellites. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Editorial, luxury, print-led brands |
| **Worst industries** | Low-contrast “soft UI” cultures |
| **Accessibility risks** | Grey text failing WCAG; density must still meet contrast |
| **Why memorable** | Feels letterpress-aware. |
| **Why Codexify** | Material truth of ink on paper. |

---

## T09 — Monograph Title Page
| Field | Spec |
|-------|------|
| **Name** | Monograph Title Page |
| **Visual philosophy** | Hero behaves like a book title page: generous margins, one title, one quiet credit line, ceremonial emptiness. |
| **Reading behaviour** | Slow opening of a volume. |
| **Eye movement** | Title mass → credit → margin rest. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Studio, publishing, culture, education |
| **Worst industries** | Performance marketing LPs |
| **Accessibility risks** | Low if type size adequate |
| **Why memorable** | Website as book, not product. |
| **Why Codexify** | Core studio metaphor since Creative Bible. |

---

## T10 — Museum Label
| Field | Spec |
|-------|------|
| **Name** | Museum Label |
| **Visual philosophy** | Primary field may be silence or image; type is a small scholarly label — accession tone, short measure, precise leading. |
| **Reading behaviour** | After looking, then reading. |
| **Eye movement** | Field → label → return. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Culture, luxury, architecture cases |
| **Worst industries** | When type must be the only hero |
| **Accessibility risks** | Micro type too small; enlarge carefully |
| **Why memorable** | Authority without shouting. |
| **Why Codexify** | Caption craft as identity layer. |

---

## T11 — RTL Cantilever
| Field | Spec |
|-------|------|
| **Name** | RTL Cantilever |
| **Visual philosophy** | Mass hangs from the RTL start edge like a cantilevered slab — heavy at start, releasing into silence toward the end side. Asymmetry is structural, not decorative. |
| **Reading behaviour** | Natural RTL entry with architectural drama. |
| **Eye movement** | Start edge strike → release into void. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Studio, architecture, editorial |
| **Worst industries** | Centered ceremonial brands that need symmetry |
| **Accessibility risks** | Low |
| **Why memorable** | Looks inevitably Persian, not mirrored Latin. |
| **Why Codexify** | RTL designed first — non-negotiable. |

---

## T12 — Ghost Grid
| Field | Spec |
|-------|------|
| **Name** | Ghost Grid |
| **Visual philosophy** | Alignments are felt, never drawn. Shared edges, hanging punctuation, repeated column origins — invisible columns of type. |
| **Reading behaviour** | Subconscious order; “everything snaps.” |
| **Eye movement** | Discovers shared edges across elements. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Architecture, finance order, systems, process |
| **Worst industries** | Expressive chaos fashion (unless contrast) |
| **Accessibility risks** | None inherent |
| **Why memorable** | Professional calm without grid wallpaper. |
| **Why Codexify** | L15 Invisible Grid spirit inside type. |

---

## T13 — Structural Overprint
| Field | Spec |
|-------|------|
| **Name** | Structural Overprint |
| **Visual philosophy** | Two typographic layers occupy the same territory with controlled transparency/overprint logic — like ink passes. Not messy stacking: registered passes. |
| **Reading behaviour** | Dual read: front phrase + ghost phrase. |
| **Eye movement** | Front ink → ghost → interference joint. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Culture, fashion, studio experimental chapters |
| **Worst industries** | Healthcare clarity, legal |
| **Accessibility risks** | Contrast failure; cognitive load; avoid for body |
| **Why memorable** | Print intelligence on screen. |
| **Why Codexify** | Archive / press metaphor without Object props. |

---

## T14 — Collision Joint
| Field | Spec |
|-------|------|
| **Name** | Collision Joint |
| **Visual philosophy** | Letters or words intentionally overlap at engineered joints — collision as connection detail, not error. |
| **Reading behaviour** | Tension then resolution. |
| **Eye movement** | Toward the overlap node → outward along words. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Fashion, culture, campaign |
| **Worst industries** | Clarity-critical |
| **Accessibility risks** | Overlap can ruin legibility; keep to display only |
| **Why memorable** | Feels custom-drawn. |
| **Why Codexify** | Joints over decoration. |

---

## T15 — Threshold Line
| Field | Spec |
|-------|------|
| **Name** | Threshold Line |
| **Visual philosophy** | Typography changes register across an invisible threshold: approach side quieter/smaller; interior side monumental (or reverse). Type performs arrival. |
| **Reading behaviour** | Crossing. |
| **Eye movement** | Approach type → seam → interior statement. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Hospitality, architecture, healthcare entry |
| **Worst industries** | Flat single-message ads |
| **Accessibility risks** | Small approach type |
| **Why memorable** | Space without drawing a door. |
| **Why Codexify** | Composition as place. |

---

## T16 — Edge Inscription
| Field | Spec |
|-------|------|
| **Name** | Edge Inscription |
| **Visual philosophy** | Primary type lives on the extreme edge — top, bottom, or start — like an inscription on a wall’s lip. The field is silence. |
| **Reading behaviour** | Peripheral then central void. |
| **Eye movement** | Edge type → void rest. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Luxury, studio, culture |
| **Worst industries** | Content-marketing heroes |
| **Accessibility risks** | Edge clipping on odd devices; safe areas |
| **Why memorable** | 90% air kinship — type as cornice. |
| **Why Codexify** | Phase 8 Concept 03 made typographic law. |

---

## T17 — Offset Register
| Field | Spec |
|-------|------|
| **Name** | Offset Register |
| **Visual philosophy** | A second line is offset by a fixed module from the first — print misregistration used as rhythm (controlled, repeating). |
| **Reading behaviour** | Echo / delay. |
| **Eye movement** | Primary → offset echo. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Studio, culture, music/art |
| **Worst industries** | Serious finance if it looks like a mistake |
| **Accessibility risks** | Echo must not be required for meaning |
| **Why memorable** | Print shop ghost. |
| **Why Codexify** | Registration marks as culture. |

---

## T18 — Void-First
| Field | Spec |
|-------|------|
| **Name** | Void-First |
| **Visual philosophy** | The composition’s hero is the shaped silence between blocks of type. Type exists to carve the void. |
| **Reading behaviour** | Feel the gap, then the words. |
| **Eye movement** | Into the void → to bounding type edges. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Luxury, studio, healthcare calm |
| **Worst industries** | Dense news |
| **Accessibility risks** | Low |
| **Why memorable** | Emptiness becomes signature. |
| **Why Codexify** | L1 as typographic practice. |

---

## T19 — Modular Bay
| Field | Spec |
|-------|------|
| **Name** | Modular Bay |
| **Visual philosophy** | Words occupy structural bays of equal width or equal leading modules — type as colonnade. |
| **Reading behaviour** | Measured, classical modern. |
| **Eye movement** | Bay to bay. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Architecture, education, process indexes |
| **Worst industries** | Emotional campaign chaos |
| **Accessibility risks** | Forced bay widths may over-break words — careful with Persian |
| **Why memorable** | Feels planned like a façade grid. |
| **Why Codexify** | Systems thinking without UI cards. |

---

## T20 — Hairline Scaffold
| Field | Spec |
|-------|------|
| **Name** | Hairline Scaffold |
| **Visual philosophy** | Ultra-thin rules and typographic hairlines act as scaffolding; display type hangs on them like cladding. |
| **Reading behaviour** | Technical calm. |
| **Eye movement** | Scaffold intersection → hanging type. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Architecture, industrial, process |
| **Worst industries** | Soft care if rules feel cold |
| **Accessibility risks** | Hairlines disappearing at 1px; contrast |
| **Why memorable** | Drawing-board intelligence. |
| **Why Codexify** | Atlas title-block spirit. |

---

## T21 — Whisper Cap
| Field | Spec |
|-------|------|
| **Name** | Whisper Cap |
| **Visual philosophy** | After a monumental mass, a single whisper line (caption scale) caps the structure like a coping stone — never a paragraph. |
| **Reading behaviour** | Thunder then hush. |
| **Eye movement** | Monument → whisper. |
| **Poster quality** | ★★★★★ |
| **Best industries** | All Codexify heroes |
| **Worst industries** | When legal needs body under hero |
| **Accessibility risks** | Whisper too light |
| **Why memorable** | Hierarchy with musical dynamics. |
| **Why Codexify** | Fixation 3 discipline from Viewport Directives. |

---

## T22 — Stack Shear
| Field | Spec |
|-------|------|
| **Name** | Stack Shear |
| **Visual philosophy** | Each line shifts horizontally by a decided shear (stepped cantilever) — a stair of RTL lines. |
| **Reading behaviour** | Descending staircase. |
| **Eye movement** | Zig along shears downward. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Fashion, culture, studio |
| **Worst industries** | Long essays |
| **Accessibility risks** | Can look disordered; keep module strict |
| **Why memorable** | Motion frozen as structure. |
| **Why Codexify** | Broken axis without chaos. |

---

## T23 — Single Glyph Anchor
| Field | Spec |
|-------|------|
| **Name** | Single Glyph Anchor |
| **Visual philosophy** | One Persian letter or numeral at extreme scale anchors the viewport; the statement is secondary constellation. |
| **Reading behaviour** | Symbol then sentence. |
| **Eye movement** | Glyph → statement. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Campaign, culture, index chapters |
| **Worst industries** | When letter lacks meaning |
| **Accessibility risks** | Decorative glyph must not replace real heading |
| **Why memorable** | Instant emblem without a logo mascot. |
| **Why Codexify** | Type as Object without Phase-4 object trap. |

---

## T24 — Measure Chamber
| Field | Spec |
|-------|------|
| **Name** | Measure Chamber |
| **Visual philosophy** | A strict measure (character width) creates a chamber — text never escapes the room. Outside = silence courtyard. |
| **Reading behaviour** | Contained, bookish. |
| **Eye movement** | Inside chamber only; courtyard is rest. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | Education, studio essays, philosophy |
| **Worst industries** | Billboard slogans that need full bleed |
| **Accessibility risks** | Low |
| **Why memorable** | Feels like entering a reading room. |
| **Why Codexify** | Monograph interiors. |

---

## T25 — Colophon Micro
| Field | Spec |
|-------|------|
| **Name** | Colophon Micro |
| **Visual philosophy** | Identity expressed through exquisite micro-typography — tracking, numerals, meta — while display is rare. Authority in the small. |
| **Reading behaviour** | Connoisseur scanning. |
| **Eye movement** | Micro cluster → surrounding air. |
| **Poster quality** | ★★★☆☆ (as hero) / ★★★★★ (as system layer) |
| **Best industries** | Luxury, publishing, studio chrome |
| **Worst industries** | Mass-market clarity |
| **Accessibility risks** | Tiny type |
| **Why memorable** | Quiet flex. |
| **Why Codexify** | Footer/colophon + museum label kinship. |

---

## T26 — Dual Register
| Field | Spec |
|-------|------|
| **Name** | Dual Register |
| **Visual philosophy** | Two type sizes only — monumental and micro. No middle “almost heading.” The missing middle is the system’s courage. |
| **Reading behaviour** | Binary hierarchy; instant clarity. |
| **Eye movement** | Monument ↔ micro oscillation. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Studio, luxury, culture |
| **Worst industries** | Complex IA pages needing 5 levels |
| **Accessibility risks** | Jump may feel stark; ensure micro meets contrast |
| **Why memorable** | Refuses mushy mid-sizes. |
| **Why Codexify** | Anti-SaaS typographic politics. |

---

## T27 — Black Court
| Field | Spec |
|-------|------|
| **Name** | Black Court |
| **Visual philosophy** | Pale type in a dark ink court — nocturne. Letters are lanterns in a courtyard of black. |
| **Reading behaviour** | Night reading; fewer words. |
| **Eye movement** | Lamp of type → black court. |
| **Poster quality** | ★★★★★ |
| **Best industries** | Luxury night, culture, fashion evening |
| **Worst industries** | Care/clinic daylight brands |
| **Accessibility risks** | Contrast pairs; avoid pure #000 with thin pale |
| **Why memorable** | Opposite of default light sites. |
| **Why Codexify** | Phase 8 Nocturne as type system. |

---

## T28 — Continuum Lead
| Field | Spec |
|-------|------|
| **Name** | Continuum Lead |
| **Visual philosophy** | Leading (line gap) is the primary design variable — a continuum from compressed monument to open care. Same size, different architecture via leading alone. |
| **Reading behaviour** | Mood via breath. |
| **Eye movement** | Pace set by leading rhythm. |
| **Poster quality** | ★★★★☆ |
| **Best industries** | All — as meta-system |
| **Worst industries** | None if used with discipline |
| **Accessibility risks** | Too-tight leading harms reading |
| **Why memorable** | Invisible parameter becoming signature. |
| **Why Codexify** | Silence between lines = designed material. |

---

# Ranking (all 28)

| Rank | System | Score | Verdict |
|------|--------|------:|---------|
| 1 | **T11 RTL Cantilever** | 96 | Inevitably Persian; structural asymmetry |
| 2 | **T07 Counter Chapel** | 95 | Counters as rooms — deepest architectural idea |
| 3 | **T26 Dual Register** | 94 | Political clarity; anti-mush hierarchy |
| 4 | **T09 Monograph Title Page** | 93 | Studio metaphor perfected |
| 5 | **T05 Compressed Monument** | 92 | Stele power; L5+L3 native |
| 6 | T01 Cropped Façade | 91 | Awards-friendly; a11y care |
| 7 | T18 Void-First | 90 | Silence as typographic act |
| 8 | T04 Broken Storey | 89 | Section-drawing breaks |
| 9 | T16 Edge Inscription | 88 | 90% air typographic law |
| 10 | T21 Whisper Cap | 87 | Essential companion layer |
| 11 | T02 Letter as Volume | 86 | Powerful; harder on mobile |
| 12 | T08 Ink Load | 85 | Print truth |
| 13 | T03 Datum Baseline | 84 | Systems backbone |
| 14 | T12 Ghost Grid | 83 | Professional invisible order |
| 15 | T15 Threshold Line | 82 | Spatial narrative |
| 16 | T06 Vertical Procession | 81 | Ritual rhythm |
| 17 | T27 Black Court | 80 | Strong dialect; not default |
| 18 | T22 Stack Shear | 79 | Fashion energy |
| 19 | T19 Modular Bay | 78 | Façade logic |
| 20 | T24 Measure Chamber | 77 | Essay rooms |
| 21 | T13 Structural Overprint | 76 | Special chapters |
| 22 | T20 Hairline Scaffold | 75 | Technical |
| 23 | T17 Offset Register | 74 | Easy to look broken |
| 24 | T14 Collision Joint | 73 | High risk |
| 25 | T10 Museum Label | 72 | Layer, not whole system |
| 26 | T23 Single Glyph Anchor | 71 | Emblem risk |
| 27 | T28 Continuum Lead | 70 | Meta — use inside others |
| 28 | T25 Colophon Micro | 68 | Essential chrome, weak solo hero |

---

# Strongest five

| # | System | Role in a possible family |
|---|--------|---------------------------|
| **1** | **T11 RTL Cantilever** | Primary spatial law — where mass hangs |
| **2** | **T07 Counter Chapel** | Optical law — what to see inside letters |
| **3** | **T26 Dual Register** | Hierarchy law — only two voices |
| **4** | **T09 Monograph Title Page** | Ceremonial page law |
| **5** | **T05 Compressed Monument** | Hero stele law |

These five are compatible as a **family**, but Phase 9 requires **one official system** — not a blend that becomes mush.

---

# Official Codexify Typography System

## **T11 — RTL Cantilever**

### Declaration

Codexify’s typography hangs from the **RTL start** like a cantilevered slab:  
heavy, inevitable, releasing into silence toward the opposite side.  
Persian is not mirrored Latin. The start edge is the bearing wall.

### Non-negotiable rules

1. **Primary mass originates at RTL start** (optical cantilever), not from a centered Latin habit.  
2. **Silence is the span** the cantilever releases into — measured, not leftover.  
3. **Hierarchy prefers Dual Register behaviour** (monument + micro) as *implementation ethic*, without renaming the system.  
4. **Counters must remain rooms** — display cuts stay solid enough that Counter Chapel seeing is possible.  
5. **No mid-size mush** on heroes — Compressed Monument energy when type is the mass.  
6. **Whisper Cap allowed** as the only secondary voice under a monument.  
7. **Cropped Façade allowed** only when the crop is structural, not accidental overflow.  
8. **Body/essay** may use Measure Chamber; heroes may not dilute into body.

### What this system is not

- Not “big Peyda in a corner” by accident  
- Not a UI type scale chart  
- Not an Object  
- Not a layout template  

### Why this one wins over T07 / T26 / T09 / T05

| Contender | Why it is not #1 |
|-----------|------------------|
| T07 Counter Chapel | Brilliant optical thesis; weaker as sole page-construction law |
| T26 Dual Register | Perfect hierarchy politics; doesn’t by itself place mass in space |
| T09 Monograph Title Page | Beautiful ceremony; can become generic “nice book site” without RTL structure |
| T05 Compressed Monument | Strong hero mode; narrower as full-site system |

**RTL Cantilever** is the only system that simultaneously:

- is **inevitably Persian**,  
- is **architectural** (bearing + span),  
- governs **Home and beyond**,  
- and aligns with Composition Language **L1 + L5 + L3** without requiring Objects.

### Success test

A stranger screenshots a Codexify frame.  
They should feel: *“This hangs from the right. The left (end) is air on purpose.”*  
If they feel “centered premium template,” the system failed.

---

# Handoff

| Artifact | Status |
|----------|--------|
| Home v3 | Frozen |
| This lab | Official typographic direction |
| Implementation | Future phase only — under RTL Cantilever law |

**Typography is the building.  
Everything else is furniture.**
