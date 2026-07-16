import Link from "next/link";
import { interactionRegistry } from "@/lab/registry";

export function LabShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-canvas/95">
        <div className="mx-auto flex max-w-[var(--container-wide)] items-center justify-between px-[var(--margin-mobile)] py-[var(--space-4)] md:px-[var(--margin-desktop)]">
          <div className="flex items-baseline gap-[var(--space-4)]">
            <Link href="/lab" className="type-wordmark text-ink">
              Codexify Lab
            </Link>
            <span className="type-caption hidden sm:inline">R&D · Internal</span>
          </div>
          <Link
            href="/"
            className="type-nav text-muted transition-colors duration-fast hover:text-ink"
          >
            ← سایت عمومی
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-[var(--container-wide)] md:grid-cols-12 md:px-[var(--margin-desktop)]">
        <aside className="border-b border-border px-[var(--margin-mobile)] py-[var(--space-6)] md:col-span-3 md:border-b-0 md:border-e md:px-0 md:pe-[var(--space-6)] md:pt-[var(--space-8)]">
          <p className="type-overline mb-[var(--space-4)]">Index</p>
          <nav aria-label="فهرست تعاملات" className="flex flex-col gap-2">
            {interactionRegistry.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-baseline justify-between gap-3 type-nav text-muted transition-colors duration-fast hover:text-ink"
              >
                <span className="type-number text-accent">
                  {item.id.replace("Interaction", "")}
                </span>
                <span className="flex-1 text-start">{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="px-[var(--margin-mobile)] md:col-span-9 md:px-[var(--space-8)]">
          {children}
        </div>
      </div>
    </div>
  );
}
