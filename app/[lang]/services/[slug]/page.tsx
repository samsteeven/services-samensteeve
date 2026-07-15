import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { services, getServiceBySlug } from "@/lib/services";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
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
  const IconComponent = service.icon;
  const relatedSlug = service.relatedCaseStudy;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <header className="relative py-16 md:py-24 border-b border-line/40 bg-paper-raised/20 overflow-hidden transition-all duration-300">
        <div className="absolute inset-0 bg-radial from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          {/* Breadcrumb */}
          <ScrollReveal>
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft hover:text-accent transition duration-200"
            >
              <ArrowLeft className="h-3 w-3" />
              {t.services.back}
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={60} className="mt-6 flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
              <IconComponent className="h-7 w-7" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">
                {t.nav.services}
              </p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-tight">
                {item.title}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-8 max-w-2xl">
            <p className="text-base md:text-lg leading-relaxed text-ink-soft">
              {item.longDesc}
            </p>
          </ScrollReveal>

          {/* Stack badges */}
          <ScrollReveal delay={160} className="mt-8 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-wider font-medium text-ink-soft bg-paper px-3 py-1 rounded-full border border-line hover:border-accent/40 hover:text-accent transition duration-200"
              >
                {tech}
              </span>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={200} className="mt-10">
            <Link
              href={`/${lang}/demarrer-un-projet?service=${service.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96]"
            >
              {t.services.contactCTA}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Deliverables */}
          <ScrollReveal>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                {t.services.deliverables}
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {item.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                    <span className="text-sm leading-relaxed text-ink-soft">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Use Cases */}
          <ScrollReveal delay={100}>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                {t.services.cases}
              </h2>
              <ul className="mt-8 flex flex-col gap-4">
                {item.cases.map((c, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-line bg-paper-raised/40 p-4 text-sm leading-relaxed text-ink-soft hover:border-accent/30 hover:bg-paper-raised transition duration-200"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Related case study */}
        {relatedSlug && (
          <ScrollReveal delay={200} className="mt-20 border-t border-line/40 pt-12">
            <h2 className="font-display text-xl font-bold text-ink">
              {t.services.relatedProject}
            </h2>
            <div className="mt-6">
              <Link
                href={`/${lang}/realisations/${relatedSlug}`}
                className="group inline-flex items-center gap-3 rounded-2xl border border-line bg-paper-raised/40 px-6 py-4 text-sm font-medium text-ink hover:border-accent/40 hover:bg-paper-raised hover:text-accent transition duration-200"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft/60">Case study →</span>
                <span className="font-display font-bold capitalize">
                  {relatedSlug.replace(/-/g, " ")}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </ScrollReveal>
        )}

        {/* Bottom CTA */}
        <ScrollReveal delay={300} className="mt-16 rounded-2xl border border-accent/20 bg-accent/5 p-8 md:p-10 text-center">
          <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
            {lang === "fr" ? "Ce service correspond à votre besoin ?" : "Does this service match your need?"}
          </h3>
          <p className="mt-3 text-sm text-ink-soft">
            {lang === "fr"
              ? "Décrivez-moi votre projet en 2 minutes. Je reviens avec une analyse concrète sous 24h."
              : "Describe your project in 2 minutes. I'll get back with a concrete analysis within 24h."}
          </p>
          <Link
            href={`/${lang}/demarrer-un-projet?service=${service.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96]"
          >
            {t.services.contactCTA}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
