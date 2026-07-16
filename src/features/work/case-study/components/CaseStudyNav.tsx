import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";

type CaseStudyNavProps = {
  prev?: { slug: string; name: string };
  next?: { slug: string; name: string };
};

/**
 * Typographic prev/next — low chrome.
 */
export function CaseStudyNav({ prev, next }: CaseStudyNavProps) {
  return (
    <nav
      className="border-t border-border py-[var(--space-9)]"
      aria-label="پیمایش آثار"
    >
      <Grid className="items-start gap-y-[var(--space-6)]">
        <div className="col-span-4 md:col-span-3">
          <LinkArrow href="/work">بازگشت به آثار</LinkArrow>
        </div>
        <div className="col-span-4 flex flex-col gap-[var(--space-5)] md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-7">
          {prev ? (
            <div>
              <p className="type-overline mb-2">قبلی</p>
              <Link
                href={`/work/${prev.slug}`}
                className="font-latin type-title text-ink transition-opacity duration-fast hover:opacity-[var(--opacity-hover)]"
              >
                {prev.name}
              </Link>
            </div>
          ) : (
            <p className="type-caption">آغاز نمایشگاه</p>
          )}
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-10">
          {next ? (
            <div>
              <p className="type-overline mb-2">بعدی</p>
              <Link
                href={`/work/${next.slug}`}
                className="font-latin type-title text-ink transition-opacity duration-fast hover:opacity-[var(--opacity-hover)]"
              >
                {next.name}
              </Link>
            </div>
          ) : null}
        </div>
      </Grid>
    </nav>
  );
}
