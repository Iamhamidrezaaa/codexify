import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pb-8 pt-section">
      <Grid className="gap-y-12">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <p className="font-serif text-display-md leading-tight tracking-tight text-ink">
            Let&apos;s create
            <br />
            something
            <br />
            <span className="text-muted">exceptional.</span>
          </p>
        </div>

        <div className="col-span-4 flex flex-col gap-6 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-8">
          <LinkArrow href="mailto:hello@codexify.studio">
            hello@codexify.studio
          </LinkArrow>
          <LinkArrow href="/contact">Start a project</LinkArrow>
        </div>

        <div className="col-span-2 flex flex-col gap-3 md:col-span-2 lg:col-span-2">
          <span className="font-mono text-caption uppercase tracking-widest text-muted">
            Social
          </span>
          <Link
            href="https://instagram.com"
            className="font-sans text-sm text-ink transition-colors duration-400 hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </Link>
          <Link
            href="https://linkedin.com"
            className="font-sans text-sm text-ink transition-colors duration-400 hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
        </div>

        <div className="col-span-2 flex flex-col justify-end md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9">
          <p className="font-mono text-caption text-muted">
            © {year} Codexify Studio
          </p>
          <p className="mt-2 font-mono text-caption text-muted">
            Premium Digital Design
          </p>
        </div>
      </Grid>
    </footer>
  );
}
