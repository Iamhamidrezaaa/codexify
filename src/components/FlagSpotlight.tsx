"use client";

type Props = {
  x: number;
  y: number;
  active: boolean;
  className?: string;
};

/**
 * Reveals / brightens the flag + "I R A N" under the cursor.
 * No white light overlay — only the background image becomes more visible.
 */
export function FlagSpotlight({ x, y, active, className = "" }: Props) {
  const cx = `${x * 100}%`;
  const cy = `${y * 100}%`;
  const mask = `radial-gradient(circle 42vmin at ${cx} ${cy}, #000 0%, #000 15%, transparent 72%)`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Always-on faint base */}
      <FlagGraphic className="absolute inset-0 opacity-[0.025]" />

      {/* Brighter reveal under cursor — soft fade, readable IRAN */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <FlagGraphic className="absolute inset-0 opacity-[0.2]" />
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
            className="select-none text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold tracking-[0.55em] text-[#2a2a2a]"
          >
            I R A N
          </span>
        </div>
        <div className="flex-1 bg-[var(--flag-red)]" />
      </div>
    </div>
  );
}
