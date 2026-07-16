import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pb-[var(--space-8)] pt-section">
      <Grid className="gap-y-[var(--space-9)]">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <p className="type-heading text-ink">
            چیزی
            <br />
            استثنایی
            <br />
            <span className="text-muted">بسازیم.</span>
          </p>
        </div>

        <div className="col-span-4 flex flex-col gap-[var(--space-5)] md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-8">
          <LinkArrow href="mailto:hello@codexify.studio">
            hello@codexify.studio
          </LinkArrow>
          <LinkArrow href="/contact">شروع پروژه</LinkArrow>
        </div>

        <div className="col-span-2 flex flex-col gap-[var(--space-3)] md:col-span-2 lg:col-span-2">
          <span className="type-overline">شبکه‌ها</span>
          <Link
            href="https://instagram.com"
            className="type-body text-sm text-ink transition-colors duration-base ease-out hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            اینستاگرام
          </Link>
          <Link
            href="https://linkedin.com"
            className="type-body text-sm text-ink transition-colors duration-base ease-out hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            لینکدین
          </Link>
        </div>

        <div className="col-span-2 flex flex-col justify-end md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9">
          <p className="type-caption">
            © {year} استودیو کدکسیفای
          </p>
          <p className="mt-[var(--space-2)] type-caption">
            طراحی دیجیتال پرمیوم
          </p>
        </div>
      </Grid>
    </footer>
  );
}
