import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { cn } from "@/design/utilities/cn";

type FooterProps = {
  /** Home colophon — sparse, no second hero. Other pages keep default close. */
  variant?: "default" | "colophon";
};

/**
 * Footer — quiet closing gesture / book colophon.
 * Server component; no motion chrome in the global shell.
 */
export function Footer({ variant = "default" }: FooterProps) {
  const year = new Date().getFullYear();

  if (variant === "colophon") {
    return (
      <footer
        className={cn(
          "border-t border-[color:var(--hairline)]",
          "pb-[var(--space-10)] pt-[clamp(3.5rem,10vh,5.5rem)]",
        )}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-wide)] flex-col gap-[var(--space-9)] px-[var(--margin-mobile)] md:flex-row md:items-end md:justify-between md:px-[var(--margin-desktop)]">
          <div className="flex flex-col gap-[var(--space-5)]">
            <p className="type-wordmark text-ink/80">کدکسیفای</p>
            <nav
              className="flex flex-wrap gap-x-[var(--space-7)] gap-y-[var(--space-3)]"
              aria-label="پیوندهای پایانی"
            >
              <Link
                href="/work"
                className="type-nav text-ink/55 transition-colors duration-fast ease-out hover:text-ink"
              >
                آثار
              </Link>
              <Link
                href="/process"
                className="type-nav text-ink/55 transition-colors duration-fast ease-out hover:text-ink"
              >
                فرآیند
              </Link>
              <Link
                href="/studio"
                className="type-nav text-ink/55 transition-colors duration-fast ease-out hover:text-ink"
              >
                استودیو
              </Link>
              <Link
                href="mailto:hello@codexify.studio"
                className="type-nav font-latin text-ink/55 transition-colors duration-fast ease-out hover:text-ink"
              >
                hello@codexify.studio
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-[var(--space-2)] md:items-end">
            <p className="type-caption text-ink/40">© {year}</p>
            <p className="type-caption text-ink/35">طراحی دیجیتال</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[color:var(--hairline)] pb-[var(--space-10)] pt-[clamp(7rem,20vh,14rem)]">
      <Grid className="gap-y-[var(--space-11)]">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <p className="type-heading text-ink">
            چیزی
            <br />
            دقیق
            <br />
            <span className="text-muted">بسازیم.</span>
          </p>
        </div>

        <div className="col-span-4 flex flex-col gap-[var(--space-6)] md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-8">
          <LinkArrow href="mailto:hello@codexify.studio" className="font-latin">
            hello@codexify.studio
          </LinkArrow>
          <LinkArrow href="mailto:hello@codexify.studio">شروع گفتگو</LinkArrow>
          <LinkArrow href="/process">فرآیند کار</LinkArrow>
        </div>

        <div className="col-span-2 flex flex-col gap-[var(--space-4)] md:col-span-2 lg:col-span-2">
          <span className="type-overline">مرور</span>
          <Link
            href="/work"
            className="type-nav text-ink transition-colors duration-fast ease-out hover:text-muted"
          >
            آثار
          </Link>
          <Link
            href="/studio"
            className="type-nav text-ink transition-colors duration-fast ease-out hover:text-muted"
          >
            استودیو
          </Link>
        </div>

        <div className="col-span-2 flex flex-col justify-end gap-[var(--space-2)] md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10">
          <p className="type-caption">© {year} کدکسیفای</p>
          <p className="type-caption">طراحی دیجیتال</p>
        </div>
      </Grid>
    </footer>
  );
}
