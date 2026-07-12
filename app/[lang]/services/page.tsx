import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { ServicesGrid } from "@/components/services-grid";
import { servicesList } from "@/lib/services";
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
      {/* Page Header */}
      <header className="py-16 md:py-24 border-b border-line/40 bg-paper-raised/20 transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">
              {t.nav.services}
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {t.services.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-6 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              {t.services.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* Services Grid — reuse the section component without its own header */}
      <section className="py-20 md:py-28 transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesList.map((service, i) => {
              const itemTrans = t.services.items[service.slug];
              return (
                <ScrollReveal key={service.slug} delay={i * 80}>
                  <Link
                    href={`/${lang}/services/${service.slug}`}
                    className="group flex flex-col justify-between h-full rounded-2xl border border-line bg-paper-raised/40 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-paper-raised hover:shadow-md"
                  >
                    <div>
                      <h2 className="font-display text-xl font-bold text-ink group-hover:text-accent transition-colors duration-200">
                        {itemTrans.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {itemTrans.longDesc}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {itemTrans.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] uppercase tracking-wider text-ink-soft/75 bg-paper px-2 py-0.5 rounded border border-line/45"
                          >
                            {tech}
                          </span>
                        ))}
                        {itemTrans.stack.length > 5 && (
                          <span className="font-mono text-[9px] text-ink-soft/50 px-1 py-0.5">
                            +{itemTrans.stack.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-line/30 flex justify-end">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest text-ink group-hover:text-accent transition duration-200">
                        {t.services.cta}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
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
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
