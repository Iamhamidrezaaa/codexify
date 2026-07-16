import { cn } from "@/design/utilities/cn";
import type { CaseStudyPaletteColor } from "../types";

type ColorPaletteProps = {
  colors: CaseStudyPaletteColor[];
  className?: string;
};

export function ColorPalette({ colors, className }: ColorPaletteProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-5",
        className,
      )}
    >
      {colors.map((color) => (
        <li key={color.hex} className="flex flex-col gap-[var(--space-3)]">
          <div
            className="aspect-[4/5] w-full border border-border"
            style={{ backgroundColor: color.hex }}
            role="img"
            aria-label={`${color.name} ${color.hex}`}
          />
          <div>
            <p className="type-nav text-ink">{color.name}</p>
            <p className="font-latin type-caption mt-1">{color.hex}</p>
            <p className="type-caption mt-1">{color.role}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
