import { cn } from "@/design/utilities/cn";
import type { InteractionMeta } from "@/lab/types";

type InteractionCardProps = {
  meta: InteractionMeta;
  children: React.ReactNode;
};

const scoreTone: Record<InteractionMeta["performance"]["score"], string> = {
  A: "text-ink",
  B: "text-muted",
  C: "text-accent",
};

/**
 * Lab experiment block — industrial editorial worksheet, not a component gallery card.
 */
export function InteractionCard({ meta, children }: InteractionCardProps) {
  return (
    <article
      id={meta.id}
      className="scroll-mt-28 border-t border-border py-[var(--space-10)]"
    >
      <header className="mb-[var(--space-8)] grid gap-[var(--space-6)] md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="type-number mb-[var(--space-2)]">{meta.id.replace("Interaction", "")}</p>
          <h2 className="type-title text-ink">{meta.name}</h2>
          <p className="type-caption mt-[var(--space-2)]">{meta.nameFa}</p>
        </div>

        <div className="md:col-span-5">
          <p className="type-body max-w-[var(--measure)] text-muted">
            {meta.purpose}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-[var(--space-4)] gap-y-[var(--space-3)] md:col-span-4">
          <MetaItem label="Category" value={meta.category} />
          <MetaItem label="Code" value={meta.codeStatus} />
          <MetaItem
            label="Performance"
            value={meta.performance.score}
            className={scoreTone[meta.performance.score]}
          />
          <MetaItem label="A11y" value={meta.accessibility.status} />
        </dl>
      </header>

      <div className="mb-[var(--space-8)] min-h-[12rem] border border-border bg-canvas-subtle/40 p-[var(--space-6)] md:p-[var(--space-8)]">
        <p className="type-overline mb-[var(--space-5)]">Live Demo</p>
        {children}
      </div>

      <div className="grid gap-[var(--space-6)] md:grid-cols-12">
        <Notes
          className="md:col-span-4"
          title="When to use"
          items={meta.whenToUse}
        />
        <Notes
          className="md:col-span-4"
          title="When not"
          items={meta.whenNotToUse}
        />
        <div className="md:col-span-4 space-y-[var(--space-4)]">
          <p className="type-overline">Notes</p>
          <p className="type-caption">{meta.performance.notes}</p>
          <p className="type-caption">{meta.accessibility.notes}</p>
        </div>
      </div>
    </article>
  );
}

function MetaItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <dt className="type-overline">{label}</dt>
      <dd className={cn("type-nav mt-1 capitalize text-ink", className)}>
        {value}
      </dd>
    </div>
  );
}

function Notes({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="type-overline mb-[var(--space-3)]">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="type-caption">
            — {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
