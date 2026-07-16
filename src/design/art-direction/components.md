# Component Philosophy

Components consume design tokens. They do not invent visual values.

## Rules

1. No magic numbers for color, space, duration, radius
2. Prefer composition of small primitives over mega-components
3. Keep files under ~250 lines when reasonable
4. Lists over cards; hairline borders over shadows
5. Images: geometry, architecture, negative space — never stock/AI filler

## Layers

| Layer | Path | Owns |
|-------|------|------|
| Design | `src/design/` | Tokens, motion, art direction |
| UI | `src/components/ui/` | Reusable primitives |
| Layout | `src/components/layout/` | Chrome + grid |
| Sections | `src/sections/` | Page compositions |
| Features | `src/features/` | Domain features (future) |
| App | `src/app/` | Routes only |
