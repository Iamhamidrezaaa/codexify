import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";

type EditorialQuoteProps = {
  children: React.ReactNode;
  className?: string;
  /** Optional attribution / margin cue */
  note?: string;
};

/**
 * Pull quote — hairline rule, monumental type, breathing margins.
 */
export function EditorialQuote({
  children,
  className,
  note,
}: EditorialQuoteProps) {
  return (
    <Reveal
      variants={editorialDissolve}
      as="blockquote"
      className={cn(
        "my-[var(--space-10)] border-s-2 border-accent ps-[var(--space-5)] md:ps-[var(--space-6)]",
        className,
      )}
    >
      <p className="type-heading text-ink">{children}</p>
      {note ? (
        <footer className="type-caption mt-[var(--space-4)] text-muted">
          {note}
        </footer>
      ) : null}
    </Reveal>
  );
}
