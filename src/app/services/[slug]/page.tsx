import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getServiceBySlug, SERVICES, WHATSAPP_URL } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="min-h-dvh bg-bg">
      <Header />
      <section className="px-5 pb-24 pt-32 md:px-16 lg:px-20">
        <div className="mx-auto max-w-[900px] text-right">
          <p className="text-sm font-semibold text-lime">
            {service.num} / SERVICE
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            {service.desc}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-lime px-6 py-3.5 text-sm font-bold text-lime-ink transition hover:bg-white"
            >
              شروع کنیم
            </a>
            <Link
              href="/#services"
              className="inline-flex rounded-full border border-line px-6 py-3.5 text-sm font-medium text-white transition hover:border-lime hover:text-lime"
            >
              همه خدمات
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
