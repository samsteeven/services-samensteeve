import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { caseStudiesList, caseStudiesContent } from "@/lib/case-studies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  return createPageMetadata({
    lang: langKey,
    title: lang === "fr" ? "Réalisations" : "Case Studies",
    description: lang === "fr"
      ? "Études de cas de projets conçus, développés et déployés en production : plateforme legaltech, architecture cloud hybride, microservices agro-industriels."
      : "Case studies of projects designed, built, and shipped to production: legaltech platform, hybrid cloud architecture, agro-industrial microservices.",
    path: "/realisations",
  });
}

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function RealisationsPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <header className="py-16 md:py-24 border-b border-line/40 bg-paper-raised/20 transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">
              {t.nav.realisations}
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {t.realisations.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-6 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              {t.realisations.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-8">
            {caseStudiesList.map((cs, i) => {
              const content = caseStudiesContent.find((c) => c.slug === cs.slug);
              if (!content) return null;
              const locale = lang === "fr" ? content.fr : content.en;

              return (
                <ScrollReveal key={cs.slug} delay={i * 80}>
                  <Link
                    href={`/${lang}/realisations/${cs.slug}`}
                    className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-line bg-paper-raised/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
                  >
                    {/* Cover Placeholder */}
                    <div
                      className="h-48 md:h-auto md:w-64 shrink-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${cs.coverPlaceholder}, ${cs.coverPlaceholder}cc)` }}
                    >
                      <span className="font-display text-4xl font-extrabold text-white/20 select-none">
                        {locale.title.slice(0, 2).toUpperCase()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between p-6 sm:p-8">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {locale.services.map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[9px] uppercase tracking-wider font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <h2 className="font-display text-xl font-bold text-ink group-hover:text-accent transition-colors duration-200 sm:text-2xl">
                          {locale.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {locale.tagline}
                        </p>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                          <span className="font-mono text-[10px] text-ink-soft/70">
                            <span className="font-bold text-ink/60">{t.realisations.role}</span> : {locale.role}
                          </span>
                          <span className="font-mono text-[10px] text-ink-soft/70">
                            <span className="font-bold text-ink/60">{t.realisations.period}</span> : {locale.period}
                          </span>
                        </div>

                        {/* Stack preview */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {locale.stack.slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[9px] uppercase tracking-wider text-ink-soft/65 bg-paper px-2 py-0.5 rounded border border-line/45"
                            >
                              {tech}
                            </span>
                          ))}
                          {locale.stack.length > 6 && (
                            <span className="font-mono text-[9px] text-ink-soft/40 px-1 py-0.5">
                              +{locale.stack.length - 6}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-line/30 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-ink group-hover:text-accent transition-colors duration-200">
                          {t.realisations.cta}
                        </span>
                        <ArrowRight className="h-4 w-4 text-ink-soft group-hover:text-accent transition-all duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
