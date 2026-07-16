import { Grid } from "@/components/layout/Grid";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Philosophy() {
  return (
    <section className="py-section" aria-labelledby="philosophy-heading">
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          <FadeIn>
            <SectionLabel index="۰۲" label="فلسفه" />
          </FadeIn>
        </div>

        <div className="col-span-4 mt-[var(--space-8)] md:col-span-7 md:col-start-2 md:mt-0 lg:col-span-7 lg:col-start-5">
          <FadeIn delay={0.1}>
            <blockquote>
              <p
                id="philosophy-heading"
                className="type-heading text-ink"
              >
                خودِ وب‌سایت
                <br />
                پورتفولیو است.
                <span className="text-muted">
                  {" "}
                  هر جزئیات — تایپوگرافی، حرکت، سکوت — باید پیش از بارگذاری
                  اولین اثر ثابت کند که طراحی را می‌شناسیم.
                </span>
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-[var(--space-9)] max-w-lg">
            <p className="type-body-lg text-muted">
              با بنیان‌گذاران، برندهای لوکس و آژانس‌هایی کار می‌کنیم که می‌دانند
              حضور دیجیتال استثنایی تزئین نیست — استراتژیِ دیده‌شدنی است.
            </p>
          </FadeIn>
        </div>
      </Grid>
    </section>
  );
}
