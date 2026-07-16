# Global Experience Audit
## Sprint 8

No new pages. No new features.  
One continuous publication — Home → Work → Case Study → Process → Studio.

---

## Verdict

After refinement, the site reads as **one studio voice** with **related but distinct page rhythms**:

| Page | Rhythm |
|------|--------|
| Home | Varied section identities (hero / dissolve / settle) |
| Work | Exhibition scroll + sticky index |
| Case studies | `chapterArrive` + theme atmosphere |
| Process | `processSettle` + monumental sticky numbers |
| Studio | `editorialDissolve` + opening word-reveal |

---

## Findings applied

### Navigation
- Dead `/contact` links → `mailto:hello@codexify.studio` (no new Contact page)
- Header `aria-current="page"` + persistent underline for current route
- Footer: server component; studio/work links; no fake social placeholders
- Case atmosphere via lightweight `atmosphere.ts` (Header no longer imports full registry)

### Typography
- New roles: `.type-essay`, `.type-statement` + `--leading-essay` / `--leading-statement`
- Removed ad-hoc `leading-[…]` / clamp overrides on publications
- `.type-number` defaults to muted; `.type-number-accent` when emphasis is intentional

### Spacing
- `--scroll-margin-header` + `.scroll-mt-header`
- `.pt-publication-chrome` unifies hero top padding across Home / Process / Studio / Case

### Motion
- Split monoculture: `processSettle`, `chapterArrive`, keep `editorialDissolve` for manifesto/philosophy
- Removed unused `FadeIn` component
- Footer motion removed (shell stays still)

### Components
- Unified `PrincipleBlock` at `src/components/editorial/` (`plate` | `manifesto`)
- Process + Studio re-export the shared block — no divergent v1/v2 implementations

### Content
- Philosophy / Services / meta shortened; less marketing diction
- Footer line: «دقیق» بدل از تکرار «استثنایی»

### Accessibility
- Philosophy title is a real `<h2>`
- Nav current page announced
- Reduced-motion paths preserved on opening statement & essays

---

## Deferred (intentional)

| Item | Why deferred |
|------|----------------|
| Merge Process/Manifesto/CaseStudy sections into one `PublicationChapter` | High risk; rhythms now differ by motion preset — enough for Sprint 8 |
| Focus trap in mobile menu | Polish pass; menu still closes on navigate |
| Delete unused Framer presets (`heroPresence`, `maskReveal`, …) | May be used by Lab / future; not shipping dead UI |
| Full Contact page | Explicitly out of scope — mailto is the bridge |

---

## Quality bar for future sprints

Before adding a page or feature:

1. Does it share typography roles (no one-off clamps)?  
2. Does it pick a motion preset from the family (not a new dissolve clone)?  
3. Does navigation still explain where / from / next?  
4. Would it survive side-by-side with Atelier and Sora without feeling like another site?

---

## Related docs

- [PUBLICATION-ENGINE.md](./PUBLICATION-ENGINE.md)  
- [PROCESS-PHILOSOPHY.md](./PROCESS-PHILOSOPHY.md)  
- [STUDIO-PHILOSOPHY.md](./STUDIO-PHILOSOPHY.md)  
