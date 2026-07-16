    # Work Exhibition — Design Decisions
    ## Sprint 2

    Route: `/work`

    ---

    ## Why an exhibition, not a gallery

    Card grids invite skimming.  
    Full-viewport bays force pacing.  
    The visitor meets one project at a time — like rooms in a museum.

    ## Layout decisions

    | Choice | Reason |
    |--------|--------|
    | No 3-column / masonry | Flattens hierarchy; feels Behance |
    | ~100svh per project (desktop) | Each project gets a room |
    | Asymmetric Grid (4 + 7) | Typography and visual in dialogue, not stacked cards |
    | Abstract CSS motifs | Brand personality without device mockups |
    | Whole bay is one link | Project is the navigation — no “View” buttons |

    ## The one memorable interaction

    **Sticky morphing index (۰۱–۰۶)** on the trailing edge:

    - Quiet number list for jump links
    - Large watermark numeral crossfades as the optical-center project changes

    This is wayfinding as craft — not a floating progress widget.

    ## Reveal variety

    | Project | Reveal |
    |---------|--------|
    | Atelier Noir | fade |
    | Sora Residence | rise |
    | Velora | mask |
    | Nexa Capital | settle |
    | Auren Clinic | fade |
    | Forma Studio | rise |

    Identical staggers would feel templated.

    ## Hover

    - Title weight softens upward
    - Motif micro-moves (translate/scale)
    - Inactive projects sit at reduced opacity until they become the optical center

    Never: lift shadows, glow, badge pop.

    ## Accessibility

    - `prefers-reduced-motion`: no morph, no stagger, full opacity
    - Keyboard: each bay is a focusable link with visible ring
    - Side index uses `aria-current`

    ## What we deliberately omitted

    - Case study pages (Sprint 3+)
    - Fake metrics / testimonials
    - Technology stacks
    - Tags and filters

    ## Components

    | Component | Role |
    |-----------|------|
    | `ExhibitionLayout` | Shell + active tracking |
    | `ExhibitionNavigation` | Memorable index |
    | `ExhibitionIntro` | Quiet threshold |
    | `ProjectPreview` | One bay |
    | `ProjectVisual` | Brand motif |
    | `ProjectTransition` | Per-project entrance |
