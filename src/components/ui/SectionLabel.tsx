import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-caption text-accent">{index}</span>
      <span className="h-px w-8 bg-border" aria-hidden />
      <span className="font-mono text-caption uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}
