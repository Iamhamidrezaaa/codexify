import { cn } from "@/design/utilities/cn";

type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-[var(--space-3)]", className)}>
      <span className="type-number">{index}</span>
      <span className="h-px w-5 bg-border" aria-hidden />
      <span className="type-overline">{label}</span>
    </div>
  );
}
