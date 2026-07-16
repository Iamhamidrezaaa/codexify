import { cn } from "@/design/utilities/cn";
import { ColorPalette } from "./ColorPalette";
import { TypographyShowcase } from "./TypographyShowcase";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyContent } from "../types";

type DesignSystemBlockProps = {
  system: CaseStudyContent["system"];
  className?: string;
};

export function DesignSystemBlock({ system, className }: DesignSystemBlockProps) {
  return (
    <div className={cn("space-y-[var(--space-10)]", className)}>
      <Reveal>
        <p className="type-body-lg max-w-[var(--measure)] text-muted">{system.grid}</p>
        <p className="type-body-lg mt-[var(--space-5)] max-w-[var(--measure)] text-muted">
          {system.spacing}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="type-overline mb-[var(--space-4)]">رنگ</p>
        <ColorPalette colors={system.colors} />
      </Reveal>

      <Reveal delay={0.1}>
        <p className="type-overline mb-[var(--space-4)]">تایپوگرافی</p>
        <TypographyShowcase roles={system.typeRoles} />
      </Reveal>

      <div className="grid gap-[var(--space-8)] md:grid-cols-2">
        <Reveal delay={0.12}>
          <p className="type-overline mb-[var(--space-4)]">اجزا</p>
          <ul className="space-y-3">
            {system.components.map((item) => (
              <li key={item} className="type-body text-muted">
                — {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="type-overline mb-[var(--space-4)]">اصول تعامل</p>
          <ul className="space-y-3">
            {system.interaction.map((item) => (
              <li key={item} className="type-body text-muted">
                — {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
