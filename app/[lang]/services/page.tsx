import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { services } from "@/lib/services";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  return createPageMetadata({
    lang: langKey,
    title: lang === "fr" ? "Services d'ingénierie logicielle" : "Software engineering services",
    description: lang === "fr"
      ? "Ingénierie logicielle, architecture cloud, pentest applicatif et automatisation IA pour systèmes de production."
      : "Software engineering, cloud architecture, application pentesting, and AI automation for production systems.",
    path: "/services",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  return (
    <div className="flex flex-col">
      <header className="border-b border-line/40 bg-paper py-16 transition-colors duration-300 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
              {t.nav.services}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {t.services.tagline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-6 max-w-3xl">
            <p className="text-pretty text-sm leading-relaxed text-ink-soft md:text-base">
              {t.services.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </header>

      <section className="py-16 transition-colors duration-300 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {services.map((service, i) => {
              const item = t.services.items[service.slug];
              const Icon = service.icon;

              return (
                <ScrollReveal key={service.slug} delay={i * 80}>
                  <Link
                    href={`/${lang}/services/${service.slug}`}
                    className="group grid gap-8 bg-paper-raised p-6 transition-[background-color] duration-300 hover:bg-paper md:grid-cols-[0.8fr_1.2fr_0.65fr] md:items-start md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-[background-color,color] duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-2 text-balance font-display text-2xl font-extrabold leading-tight text-ink transition-colors duration-300 group-hover:text-accent">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <div>
                      <p className="text-pretty text-sm leading-relaxed text-ink-soft">
                        {item.shortDesc}
                      </p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {item.outcomes.slice(0, 2).map((outcome) => (
                          <div key={outcome} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span className="text-sm leading-relaxed text-ink">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-5 md:items-end">
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {item.stack.slice(0, 4).map((capability) => (
                          <span
                            key={capability}
                            className="rounded-full bg-paper px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-soft shadow-[inset_0_0_0_1px_var(--color-line)]"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink transition-colors duration-300 group-hover:text-accent">
                        {t.services.cta}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line/40 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-8">
          <ScrollReveal>
            <p className="text-sm text-ink-soft">
              {lang === "fr"
                ? "Vous ne savez pas encore quelle prestation correspond à votre situation ?"
                : "Not sure which service fits your situation yet?"}
            </p>
            <Link
              href={`/${lang}/demarrer-un-projet`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-paper transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent hover:text-white active:scale-[0.96]"
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
