"use client";

type Props = {
  x: number;
  y: number;
  active: boolean;
  className?: string;
};

/**
 * Full-bleed Iran tricolor:
 * - base layer ~1.5% opacity
 * - brighter layer revealed only around the cursor (spotlight)
 * Center band shows spaced "I R A N" instead of emblem.
 * x/y are 0–1 relative to the hero.
 */
export function FlagSpotlight({ x, y, active, className = "" }: Props) {
  const cx = `${x * 100}%`;
  const cy = `${y * 100}%`;
  const mask = `radial-gradient(circle 240px at ${cx} ${cy}, #000 0%, #000 32%, transparent 72%)`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <FlagGraphic className="absolute inset-0 opacity-[0.015]" />

      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <FlagGraphic className="absolute inset-0 opacity-[0.22]" />
      </div>
    </div>
  );
}

function FlagGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 bg-[var(--flag-green)]" />
        <div className="relative flex flex-1 items-center justify-center bg-white">
          <span
            dir="ltr"
            className="select-none text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold tracking-[0.55em] text-[#1a1a1a]"
          >
            I R A N
          </span>
        </div>
        <div className="flex-1 bg-[var(--flag-red)]" />
      </div>
    </div>
  );
}
