import { PROJECTS } from "@/lib/constants";

export function Work() {
  return (
    <section id="work" className="bg-bg px-5 py-24 md:px-16 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <p className="text-sm text-muted">( Selected work )</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
          اثبات، نه وعده
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const Card = (
              <article className="group flex h-full flex-col rounded-[20px] border border-line bg-card p-5 transition hover:border-lime/40">
                <div className="relative mb-4 h-28 overflow-hidden rounded-xl bg-[#141614]">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-lime" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--lime)_18%,transparent),transparent_55%)]" />
                </div>
                <p className="text-xs font-medium text-lime">{project.tag}</p>
                <h3 className="mt-1 text-xl font-bold text-fg">{project.name}</h3>
                <p className="mt-1 text-sm text-muted" dir="ltr">
                  {project.host}
                  {!project.live && (
                    <span className="mr-2 text-[11px] text-muted/70">
                      (فعلاً آفلاین)
                    </span>
                  )}
                </p>
              </article>
            );

            return project.live ? (
              <a
                key={project.host}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {Card}
              </a>
            ) : (
              <div key={project.host} className="h-full opacity-80">
                {Card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
