import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";

type EditorialQuoteProps = {
  children: React.ReactNode;
  className?: string;
};

export function EditorialQuote({ children, className }: EditorialQuoteProps) {
  return (
    <Reveal variants={editorialDissolve} as="blockquote" className={cn("my-[var(--space-9)]", className)}>
      <p className="type-heading text-ink">{children}</p>
    </Reveal>
  );
}
