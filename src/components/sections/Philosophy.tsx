import { Grid } from "@/components/layout/Grid";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Philosophy() {
  return (
    <section className="py-section" aria-labelledby="philosophy-heading">
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          <FadeIn>
            <SectionLabel index="02" label="Philosophy" />
          </FadeIn>
        </div>

        <div className="col-span-4 mt-10 md:col-span-7 md:col-start-2 md:mt-0 lg:col-span-7 lg:col-start-5">
          <FadeIn delay={0.1}>
            <blockquote>
              <p
                id="philosophy-heading"
                className="font-serif text-display-lg leading-[1.1] tracking-tight text-ink"
              >
                The website itself
                <br />
                is the portfolio.
                <span className="text-muted">
                  {" "}
                  Every detail — typography, motion, silence — must prove we
                  know design before a single case study loads.
                </span>
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12 max-w-lg">
            <p className="font-sans text-body-lg leading-relaxed text-muted">
              We work with founders, luxury brands, and agencies who understand
              that exceptional digital presence is not decoration — it is
              strategy made visible.
            </p>
          </FadeIn>
        </div>
      </Grid>
    </section>
  );
}
