import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";

/**
 * Footer — quiet closing gesture.
 * Server component; no motion chrome in the global shell.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pb-[var(--space-10)] pt-[clamp(7rem,20vh,14rem)]">
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
