import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Github, Sparkles, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ZoomableImage } from "@/components/zoomable-image";
import { CopyButtons } from "@/components/copy-buttons";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.flatMap((cs) =>
    ["fr", "en"].map((lang) => ({ lang, slug: cs.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const langKey = lang as Language;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  const locale = lang === "fr" ? cs.fr : cs.en;
  
  const metadata = createPageMetadata({
    lang: langKey,
    title: locale.title,
    description: locale.tagline,
    path: `/realisations/${slug}`,
    type: "article",
  });
  
  const portfolioCanonical = `https://samensteeve.com/${lang}/work/${slug}`;
  
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: portfolioCanonical,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const locale = lang === "fr" ? cs.fr : cs.en;
  const portfolioCanonical = `https://samensteeve.com/${lang}/work/${slug}`;

  // ── Prev / Next navigation ──
  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);
  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;
  const prevLocale = prevCs ? (lang === "fr" ? prevCs.fr : prevCs.en) : null;
  const nextLocale = nextCs ? (lang === "fr" ? nextCs.fr : nextCs.en) : null;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <header
        className="relative py-16 md:py-24 border-b border-line/40 overflow-hidden transition-all duration-300"
        style={{ background: `linear-gradient(135deg, ${cs.coverPlaceholder}22, var(--paper))` }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <ScrollReveal>
            <Link
              href={`/${lang}/realisations`}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft hover:text-accent transition duration-200"
            >
              <ArrowLeft className="h-3 w-3" />
              {t.realisations.back}
            </Link>
          </ScrollReveal>

          {cs.coverImage && (
            <ScrollReveal delay={40} className="mt-8">
              {cs.slug === "tribunejustice" ? (
                <div className="overflow-hidden rounded-2xl border border-line max-w-3xl relative bg-paper-raised/30" style={{ aspectRatio: '16/9' }}>
                  <div className="flex items-center justify-center w-full h-full p-12">
                    <Image
                      src={cs.coverImage}
                      alt={locale.title}
                      width={640}
                      height={200}
                      className="max-h-32 max-w-full object-contain filter dark:brightness-110"
                    />
                  </div>
                </div>
              ) : (
                <ZoomableImage
                  src={cs.coverImage}
                  alt={locale.title}
                  priority
                />
              )}
            </ScrollReveal>
          )}

          <ScrollReveal delay={60} className="mt-8">
            {/* Service tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {locale.services.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[9px] uppercase tracking-wider font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-tight">
              {locale.title}
            </h1>
            <p className="mt-4 text-base md:text-xl leading-relaxed text-ink-soft max-w-3xl">
              {locale.tagline}
            </p>
          </ScrollReveal>

          {/* Meta grid */}
          <ScrollReveal delay={120} className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: t.realisations.role, value: locale.role },
              { label: t.realisations.period, value: locale.period },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-line bg-paper-raised/40 p-4">
                <p className="font-mono text-[9px] uppercase tracking-wider font-bold text-ink-soft">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{item.value}</p>
              </div>
            ))}
          </ScrollReveal>

          {/* Stack */}
          <ScrollReveal delay={160} className="mt-6 flex flex-wrap gap-2">
            {locale.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-wider font-medium text-ink-soft bg-paper px-3 py-1 rounded-full border border-line hover:border-accent/40 hover:text-accent transition duration-200"
              >
                {tech}
              </span>
            ))}
          </ScrollReveal>

          {/* External links & Copy Buttons */}
          <ScrollReveal delay={200} className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4">
              {locale.repoUrl && (
                <a
                  href={locale.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-widest text-ink hover:border-accent/40 hover:text-accent transition duration-200"
                >
                  <Github className="h-3.5 w-3.5" />
                  {t.realisations.visitRepo}
                </a>
              )}
              {locale.siteUrl && (
                <a
                  href={locale.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-widest text-ink hover:border-accent/40 hover:text-accent transition duration-200"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t.realisations.visitSite}
                </a>
              )}
            </div>
            <CopyButtons
              url={portfolioCanonical}
              shareText={[
                locale.title,
                "",
                locale.tagline,
                "",
                locale.services.map((s) => `#${s.replace(/\s+/g, "")}`).join(" "),
                "",
                portfolioCanonical,
              ].join("\n").trim()}
              lang={langKey}
            />
          </ScrollReveal>
        </div>
      </header>

      {/* Case Study Body */}
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-8 py-12 md:py-20">
        
        {/* ── Key Impact Metrics Stat Banner ── */}
        {locale.metrics && locale.metrics.length > 0 && (
          <ScrollReveal className="mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl border border-accent/20 bg-accent/5 backdrop-blur-sm">
              {locale.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col justify-between p-3 rounded-xl bg-paper/60 border border-line/50">
                  <span className="font-display text-2xl sm:text-3xl font-black text-accent tracking-tight">
                    {metric.value}
                  </span>
                  <div className="mt-2">
                    <p className="text-xs font-bold text-ink leading-snug">{metric.label}</p>
                    {metric.description && (
                      <p className="text-[11px] text-ink-soft leading-tight mt-1 opacity-80">{metric.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Executive Summary */}
        <ScrollReveal>
          <div className="rounded-2xl border border-line bg-paper-raised/30 p-6 md:p-8 mb-16 relative overflow-hidden">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-accent mb-3">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {lang === "fr" ? "Synthèse Exécutive" : "Executive Summary"}
            </div>
            <p className="text-base md:text-lg leading-relaxed text-ink font-medium">
              {locale.summary}
            </p>
          </div>
        </ScrollReveal>

        {/* ── Rich Editorial Article Stream ── */}
        {locale.sections && locale.sections.length > 0 ? (
          <div className="flex flex-col gap-16">
            {locale.sections.map((section, idx) => (
              <ScrollReveal key={section.id || idx} delay={idx * 40}>
                <section className="prose prose-neutral dark:prose-invert max-w-none">
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink tracking-tight mb-6 pb-3 border-b border-line/40 flex items-center justify-between">
                    <span>{section.title}</span>
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-ink-soft font-normal whitespace-pre-line">
                    {section.content}
                  </p>

                  {/* Optional Pull Quote */}
                  {section.quote && (
                    <blockquote className="my-8 rounded-2xl border border-line bg-paper-raised/40 p-6 md:p-8 text-ink font-medium leading-relaxed shadow-sm flex items-start gap-4 not-italic">
                      <Quote className="h-6 w-6 text-accent shrink-0 mt-1 opacity-80" />
                      <div className="text-base md:text-lg text-ink font-medium leading-relaxed">
                        "{section.quote}"
                      </div>
                    </blockquote>
                  )}

                  {/* Optional Section Image */}
                  {section.image && (
                    <div className="my-8 not-prose">
                      <ZoomableImage
                        src={section.image}
                        alt={section.imageAlt ?? section.title}
                      />
                      {section.imageAlt && (
                        <p className="mt-2 text-center text-[11px] font-mono text-ink-soft/70 uppercase tracking-wider">
                          {section.imageAlt}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Optional Highlights Grid */}
                  {section.highlights && section.highlights.length > 0 && (
                    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                      {section.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="rounded-xl border border-line bg-paper-raised/40 p-5 hover:border-accent/40 transition duration-200 flex flex-col justify-between"
                        >
                          <div>
                            <h4 className="font-display text-sm font-bold text-ink mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                              {h.title}
                            </h4>
                            <p className="text-xs text-ink-soft leading-relaxed">
                              {h.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Legacy Fallback Grid if sections not present */
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {locale.challenges && (
              <ScrollReveal>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">
                    {t.caseStudy.challenges}
                  </h2>
                  <ul className="mt-6 flex flex-col gap-4">
                    {locale.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                        <span className="font-mono text-xs font-bold text-accent/60 shrink-0 mt-0.5">0{i + 1}</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {locale.solutions && (
              <ScrollReveal delay={80}>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">
                    {t.caseStudy.solutions}
                  </h2>
                  <ul className="mt-6 flex flex-col gap-4">
                    {locale.solutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {locale.results && (
              <ScrollReveal delay={160}>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">
                    {t.caseStudy.results}
                  </h2>
                  <ul className="mt-6 flex flex-col gap-4">
                    {locale.results.map((r, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm leading-relaxed font-medium text-ink"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Bottom CTA */}
        <ScrollReveal delay={300} className="mt-20 rounded-2xl border border-line bg-paper-raised/40 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-ink">
              {t.bottomCta.similarProject}
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              {t.bottomCta.similarDescription}
            </p>
          </div>
          <Link
            href={`/${lang}/demarrer-un-projet`}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96]"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        {/* ── Prev / Next case study navigation ── */}
        {(prevCs || nextCs) && (
          <nav
            aria-label={lang === "fr" ? "Continuer la lecture" : "Continue reading"}
            className="mt-12 pt-10 border-t border-line/40"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Prev */}
              {prevCs && prevLocale ? (
                <Link
                  href={`/${lang}/realisations/${prevCs.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-line bg-paper-raised/30 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-paper-raised/60 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest text-accent mb-2">
                      <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-1" />
                      {lang === "fr" ? "Projet précédent" : "Previous project"}
                    </div>
                    <h3 className="font-display text-base font-bold text-ink group-hover:text-accent transition-colors duration-200 leading-snug">
                      {prevLocale.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-ink-soft line-clamp-2 leading-relaxed">
                      {prevLocale.tagline}
                    </p>
                  </div>
                </Link>
              ) : <div />}

              {/* Next */}
              {nextCs && nextLocale ? (
                <Link
                  href={`/${lang}/realisations/${nextCs.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-line bg-paper-raised/30 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-paper-raised/60 hover:shadow-md sm:text-right"
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest text-accent mb-2 sm:justify-end">
                      {lang === "fr" ? "Projet suivant" : "Next project"}
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                    <h3 className="font-display text-base font-bold text-ink group-hover:text-accent transition-colors duration-200 leading-snug">
                      {nextLocale.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-ink-soft line-clamp-2 leading-relaxed">
                      {nextLocale.tagline}
                    </p>
                  </div>
                </Link>
              ) : <div />}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
