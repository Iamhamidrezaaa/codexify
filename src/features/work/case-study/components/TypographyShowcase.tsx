import { cn } from "@/design/utilities/cn";

type TypographyShowcaseProps = {
  roles: { role: string; sample: string; note: string }[];
  className?: string;
};

export function TypographyShowcase({ roles, className }: TypographyShowcaseProps) {
  return (
    <ul className={cn("divide-y divide-border border-y border-border", className)}>
      {roles.map((item) => (
        <li
          key={item.role}
          className="grid gap-[var(--space-3)] py-[var(--space-6)] md:grid-cols-12 md:items-end"
        >
          <p className="type-overline md:col-span-2">{item.role}</p>
          <p
            className={cn(
              "font-latin text-ink md:col-span-6",
              item.role === "Display" && "type-heading",
              item.role === "Body" && "type-body-lg",
              item.role === "Numeral" && "type-title tabular-nums",
            )}
          >
            {item.sample}
          </p>
          <p className="type-caption md:col-span-4 md:text-start">{item.note}</p>
        </li>
      ))}
    </ul>
  );
}
