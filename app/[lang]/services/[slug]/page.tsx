import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { services, getServiceBySlug } from "@/lib/services";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return services.flatMap((s) =>
    ["fr", "en"].map((lang) => ({ lang, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const item = t.services.items[service.slug];
  return createPageMetadata({
    lang: langKey,
    title: item.title,
    description: item.shortDesc,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const item = t.services.items[service.slug];
  const Icon = service.icon;
  const relatedSlug = service.relatedCaseStudy;

  return (
    <div className="flex flex-col">
      <header className="border-b border-line/40 bg-paper py-16 transition-colors duration-300 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <ScrollReveal>
            <Link
              href={`/${lang}/services`}
              className="inline-flex min-h-10 items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft transition-colors duration-200 hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t.services.back}
            </Link>
          </ScrollReveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <ScrollReveal delay={60}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                  {t.nav.services}
                </p>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                {item.title}
              </h1>
              <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-ink-soft md:text-lg">
                {item.longDesc}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="rounded-2xl bg-paper-raised p-6 shadow-[inset_0_0_0_1px_var(--color-line)]">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                  {t.serviceDetail.bestFit}
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-ink">
                  {item.cases[0]}
                </p>
                <Link
                  href={`/${lang}/demarrer-un-projet?service=${service.slug}`}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-paper transition-[transform,background-color,color] duration-200 hover:scale-[1.02] hover:bg-accent hover:text-white active:scale-[0.96]"
                >
                  {t.services.contactCTA}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
          <ScrollReveal>
            <aside className="lg:sticky lg:top-28">
              <h2 className="font-display text-xl font-bold text-ink">
                {t.serviceDetail.capabilities}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.stack.map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full bg-paper-raised px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-soft shadow-[inset_0_0_0_1px_var(--color-line)]"
                  >
                    {capability}
                  </span>
                ))}
              </div>

              {relatedSlug && (
                <Link
                  href={`/${lang}/realisations/${relatedSlug}`}
                  className="group mt-8 flex items-center justify-between gap-4 rounded-2xl bg-paper-raised p-5 text-sm font-medium text-ink shadow-[inset_0_0_0_1px_var(--color-line)] transition-[background-color,color] duration-200 hover:bg-paper hover:text-accent"
                >
                  <span>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                      {t.services.relatedProject}
                    </span>
                    <span className="mt-2 block font-display text-lg font-bold capitalize">
                      {relatedSlug.replace(/-/g, " ")}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              )}
            </aside>
          </ScrollReveal>

          <div className="grid gap-12">
            <ScrollReveal delay={80}>
              <section>
                <h2 className="font-display text-2xl font-bold text-ink">
                  {t.serviceDetail.expectedOutcomes}
                </h2>
                <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {item.outcomes.map((outcome) => (
                    <div key={outcome} className="bg-paper-raised p-5">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <p className="mt-4 text-sm font-semibold leading-relaxed text-ink">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <section>
                <h2 className="font-display text-2xl font-bold text-ink">
                  {t.serviceDetail.engagementScope}
                </h2>
                <div className="mt-6 grid gap-4">
                  {item.scope.map((scopeItem) => (
                    <div key={scopeItem} className="flex items-start gap-4 border-b border-line/40 pb-4 last:border-b-0">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <p className="text-sm leading-relaxed text-ink-soft">{scopeItem}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <section className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {t.services.deliverables}
                  </h2>
                  <ul className="mt-6 grid gap-3">
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable} className="rounded-xl bg-paper-raised p-4 text-sm leading-relaxed text-ink-soft shadow-[inset_0_0_0_1px_var(--color-line)]">
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {t.services.cases}
                  </h2>
                  <ul className="mt-6 grid gap-3">
                    {item.cases.map((useCase) => (
                      <li key={useCase} className="rounded-xl bg-paper-raised p-4 text-sm leading-relaxed text-ink-soft shadow-[inset_0_0_0_1px_var(--color-line)]">
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={220} className="mt-20 rounded-2xl bg-ink p-8 text-center md:p-10">
          <h3 className="text-balance font-display text-2xl font-bold text-paper">
            {t.bottomCta.clarify}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-paper/65">
            {t.bottomCta.clarifyDescription}
          </p>
          <Link
            href={`/${lang}/demarrer-un-projet?service=${service.slug}`}
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent hover:text-white active:scale-[0.96]"
          >
            {t.services.contactCTA}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </main>
    </div>
  );
}
