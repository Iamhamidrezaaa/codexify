import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";

type OutcomeBlockProps = {
  items: { label: string; text: string }[];
  className?: string;
};

export function OutcomeBlock({ items, className }: OutcomeBlockProps) {
  return (
    <ul className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, i) => (
        <Reveal key={item.label} delay={i * 0.05} as="li">
          <div className="grid gap-[var(--space-3)] py-[var(--space-6)] md:grid-cols-12">
            <p className="type-overline md:col-span-3">{item.label}</p>
            <p className="type-body-lg text-muted md:col-span-8">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
