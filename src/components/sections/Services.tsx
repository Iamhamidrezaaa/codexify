import { Grid } from "@/components/layout/Grid";
import { FadeIn } from "@/components/ui/FadeIn";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SERVICES = [
  {
    index: "01",
    title: "Website Design",
    description: "Editorial layouts, bespoke compositions, timeless aesthetics.",
  },
  {
    index: "02",
    title: "Web Development",
    description: "Performance-first engineering with meticulous attention to detail.",
  },
  {
    index: "03",
    title: "UI / UX",
    description: "Intuitive interfaces rooted in research and human behavior.",
  },
  {
    index: "04",
    title: "Branding",
    description: "Visual identity systems that translate seamlessly to digital.",
  },
  {
    index: "05",
    title: "Motion Design",
    description: "Slow, elegant animation that elevates — never distracts.",
  },
  {
    index: "06",
    title: "Interactive Experiences",
    description: "Immersive web experiences that reward exploration.",
  },
] as const;

export function Services() {
  return (
    <section className="py-section" aria-labelledby="services-heading">
      <Grid className="mb-16">
        <div className="col-span-4 md:col-span-6 lg:col-span-4">
          <FadeIn>
            <SectionLabel index="03" label="Services" />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-8">
            <h2
              id="services-heading"
              className="font-serif text-display-md tracking-tight text-ink"
            >
              What we do
            </h2>
          </FadeIn>
        </div>

        <div className="col-span-4 mt-6 md:col-span-6 md:mt-0 lg:col-span-4 lg:col-start-9 lg:flex lg:items-end lg:justify-end">
          <FadeIn delay={0.15}>
            <LinkArrow href="/contact">Discuss your project</LinkArrow>
          </FadeIn>
        </div>
      </Grid>

      <Grid as="ul" className="border-t border-border">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.index}
            as="li"
            delay={i * 0.05}
            className="group col-span-4 grid grid-cols-4 gap-x-4 border-b border-border py-8 transition-colors duration-400 hover:bg-ink/[0.02] md:col-span-8 md:grid-cols-8 lg:col-span-12 lg:grid-cols-12"
          >
            <span className="col-span-1 font-mono text-caption text-accent">
              {service.index}
            </span>
            <h3 className="col-span-3 font-serif text-2xl tracking-tight text-ink md:col-span-3 lg:col-span-4">
              {service.title}
            </h3>
            <p className="col-span-4 mt-3 font-sans text-sm leading-relaxed text-muted md:col-span-4 md:mt-0 lg:col-span-5">
              {service.description}
            </p>
            <span
              className="col-span-4 mt-4 font-mono text-caption text-muted opacity-0 transition-opacity duration-400 group-hover:opacity-100 md:col-span-1 md:mt-0 md:text-right lg:col-span-2"
              aria-hidden
            >
              →
            </span>
          </FadeIn>
        ))}
      </Grid>
    </section>
  );
}
