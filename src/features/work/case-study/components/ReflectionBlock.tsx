import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";

type ReflectionBlockProps = {
  paragraphs: string[];
  className?: string;
};

export function ReflectionBlock({ paragraphs, className }: ReflectionBlockProps) {
  return (
    <div className={cn("space-y-[var(--space-6)]", className)}>
      {paragraphs.map((p, i) => (
        <Reveal key={p.slice(0, 24)} delay={i * 0.08}>
          <p className="type-body-lg max-w-[var(--measure)] text-muted">{p}</p>
        </Reveal>
      ))}
    </div>
  );
}
