import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { servicesList } from "@/lib/services";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  return createPageMetadata({
    lang: langKey,
    title: lang === "fr" ? "Mes Services" : "My Services",
    description: lang === "fr"
      ? "Vue d'ensemble des 4 prestations : développement web full-stack, architecture cloud, audit sécurité et automatisation IA."
      : "Overview of the 4 services: full-stack web development, cloud architecture, security audit, and AI automation.",
    path: "/services",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  return (
    <div className="flex flex-col">
      {/* Page Header — editorial */}
      <header className="py-16 md:py-24 border-b border-line/40 bg-paper-raised/20 transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">
              {t.nav.services}
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.1] max-w-3xl">
              {t.services.tagline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-6 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              {t.services.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* Services — bento layout */}
      <section className="py-16 md:py-24 transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[1fr]">
            {servicesList.map((service, i) => {
              const itemTrans = t.services.items[service.slug];
              const isFirst = i === 0;

              return (
                <ScrollReveal key={service.slug} delay={i * 80}>
                  <Link
                    href={`/${lang}/services/${service.slug}`}
                    className={`group relative flex flex-col justify-between h-full rounded-2xl border border-line p-6 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 ${
                      isFirst
                        ? "md:col-span-2 bg-ink text-paper hover:bg-accent"
                        : "bg-paper-raised/40 hover:-translate-y-1"
                    }`}
                  >
                    {/* Number watermark */}
                    <span className={`absolute top-4 right-5 font-mono text-[10px] font-bold tracking-wider ${
                      isFirst ? "text-paper/30" : "text-ink/10"
                    }`}>
                      0{i + 1}
                    </span>

                    <div className="relative">
                      {/* Title */}
                      <h2 className={`font-display text-xl font-bold sm:text-2xl ${
                        isFirst ? "text-paper" : "text-ink group-hover:text-accent"
                      } transition-colors duration-200`}>
                        {itemTrans.title}
                      </h2>

                      {/* Punchline */}
                      <p className={`mt-3 text-sm leading-relaxed ${
                        isFirst ? "text-paper/70" : "text-ink-soft"
                      }`}>
                        {itemTrans.punchline}
                      </p>

                      {/* Stack badges */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {itemTrans.stack.slice(0, isFirst ? 5 : 3).map((tech) => (
                          <span
                            key={tech}
                            className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                              isFirst
                                ? "text-paper/60 border-paper/15 bg-paper/5"
                                : "text-ink-soft/75 border-line/45 bg-paper"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {(isFirst ? itemTrans.stack.length > 5 : itemTrans.stack.length > 3) && (
                          <span className={`font-mono text-[9px] px-1 py-0.5 ${
                            isFirst ? "text-paper/40" : "text-ink-soft/50"
                          }`}>
                            +{isFirst ? itemTrans.stack.length - 5 : itemTrans.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className={`mt-8 pt-4 border-t flex items-center justify-between ${
                      isFirst ? "border-paper/15" : "border-line/30"
                    }`}>
                      <span className={`font-mono text-[10px] uppercase font-bold tracking-widest ${
                        isFirst ? "text-paper/60" : "text-ink-soft"
                      }`}>
                        {t.services.cta}
                      </span>
                      <ArrowUpRight className={`h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isFirst ? "text-paper/60 group-hover:text-paper" : "text-ink-soft group-hover:text-accent"
                      }`} />
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-line/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 text-center">
          <ScrollReveal>
            <p className="text-sm text-ink-soft">
              {lang === "fr"
                ? "Vous ne savez pas encore par où commencer ?"
                : "Not sure where to start?"}
            </p>
            <Link
              href={`/${lang}/demarrer-un-projet`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96]"
            >
              {t.nav.cta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
