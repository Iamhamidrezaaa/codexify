# RTL Rules

RTL is the **default**, not a patch.

1. `lang="fa"` + `dir="rtl"` on `<html>`
2. Design compositions for RTL first — never mirror LTR mocks
3. Logical properties: `inline-start/end`, `ms/me`, `ps/pe`
4. Indexes and overlines at the **start** edge (right)
5. CTAs: text then `←` in DOM; hover moves arrow further left
6. Marquee uses RTL-native direction
7. Persian copy is authored, not machine-translated tone
