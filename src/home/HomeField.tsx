/**
 * Persistent spatial field — axis + planes that ignore room boundaries.
 */
export function HomeField() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full" aria-hidden>
      {/* Continuous ground wash — one material, long falloff */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #C9C2B6 0%,
              #C9C2B6 12%,
              #E8E3D9 22%,
              #E8E3D9 38%,
              #12110F 48%,
              #12110F 68%,
              #DCD6CB 78%,
              #F1EDE6 88%,
              #F1EDE6 100%
            )
          `,
        }}
      />

      {/* Shared vertical axis — survives every room */}
      <div className="absolute inset-y-0 start-[38%] w-px bg-[#1A1816]/[0.1] max-md:start-[18%] md:bg-[#1A1816]/[0.12]" />

      {/* Pale corridor plane crossing night into index */}
      <div
        className="absolute start-[18%] top-[46%] h-[32%] w-[min(26vw,18rem)] bg-[#EDE8DF]/[0.035] max-md:hidden"
      />
    </div>
  );
}
