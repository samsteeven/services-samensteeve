import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { caseStudies } from "@/lib/case-studies";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);
  return createPageMetadata({
    lang: langKey,
    title: t.metadata.realisationsTitle,
    description: t.metadata.realisationsDescription,
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
            {caseStudies.map((cs, i) => {
              const locale = lang === "fr" ? cs.fr : cs.en;

              return (
                <ScrollReveal key={cs.slug} delay={i * 80}>
                  <Link
                    href={`/${lang}/realisations/${cs.slug}`}
                    className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-line bg-paper-raised/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
                  >
                    {/* Numeration or Logo Block */}
                    {cs.slug === "tribunejustice" ? (
                      <div className="md:w-64 shrink-0 bg-paper-raised/80 border-b md:border-b-0 md:border-r border-line/40 p-8 flex items-center justify-center h-48 md:h-auto min-h-[190px] relative overflow-hidden">
                        {/* Grid background effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none" />
                        <Image
                          src={cs.coverImage}
                          alt={locale.title}
                          width={320}
                          height={120}
                          className="max-h-20 max-w-full object-contain filter dark:brightness-110 group-hover:scale-105 transition-all duration-350 ease-out z-10"
                        />
                      </div>
                    ) : (
                      <div className="md:w-64 shrink-0 bg-paper-raised/35 border-b md:border-b-0 md:border-r border-line/40 p-8 flex items-center justify-center font-display text-6xl font-extrabold text-ink/15 group-hover:text-accent/25 transition-all duration-350 ease-out h-48 md:h-auto min-h-[190px] relative select-none">
                        {/* Grid background effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:16px_16px] opacity-15 pointer-events-none" />
                        <span className="z-10 font-mono tracking-tighter">0{i + 1}</span>
                      </div>
                    )}

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
