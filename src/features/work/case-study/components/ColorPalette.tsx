import { cn } from "@/design/utilities/cn";
import type { CaseStudyPaletteColor } from "../types";

type ColorPaletteProps = {
  colors: CaseStudyPaletteColor[];
  className?: string;
};

/**
 * Collectible swatches — large enough to screenshot.
 */
export function ColorPalette({ colors, className }: ColorPaletteProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {colors.map((color) => (
        <li
          key={color.hex}
          className="group border border-border bg-canvas-subtle/30 p-[var(--space-3)]"
        >
          <div
            className="aspect-[5/4] w-full"
            style={{ backgroundColor: color.hex }}
            role="img"
            aria-label={`${color.name} ${color.hex}`}
          />
          <div className="mt-[var(--space-4)] flex items-baseline justify-between gap-3">
            <div>
              <p className="type-nav text-ink">{color.name}</p>
              <p className="type-caption mt-1">{color.role}</p>
            </div>
            <p className="font-latin type-caption tabular-nums">{color.hex}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
