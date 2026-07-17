import Link from "next/link";
import { getT, type Language } from "@/lib/translations";
import { services } from "@/lib/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function ServicesGrid({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <section id="services" className="border-t border-line/40 bg-paper py-24 transition-colors duration-300 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid gap-8 border-b border-line/30 pb-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div className="max-w-3xl">
            <ScrollReveal>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {t.services.title}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={60} className="mt-4">
              <h2 className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {t.services.tagline}
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={120}>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
              {t.services.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {services.map((service, i) => {
            const item = t.services.items[service.slug];
            const Icon = service.icon;
            const primaryOutcome = item.outcomes[0];

            return (
              <ScrollReveal key={service.slug} delay={i * 80}>
                <Link
                  href={`/${lang}/services/${service.slug}`}
                  className="group flex h-full min-h-[420px] flex-col bg-paper-raised p-6 transition-[background-color,box-shadow] duration-300 hover:bg-paper sm:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-[background-color,color] duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 text-balance font-display text-2xl font-extrabold leading-tight text-ink transition-colors duration-300 group-hover:text-accent">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-ink-soft/40 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>

                  <p className="mt-6 text-pretty text-sm leading-relaxed text-ink-soft">
                    {item.punchline}
                  </p>

                  <div className="mt-8 rounded-xl bg-paper px-5 py-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                      {lang === "fr" ? "Résultat visé" : "Target outcome"}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-ink">
                      {primaryOutcome}
                    </p>
                  </div>

                  <div className="mt-7 grid gap-3">
                    {item.scope.slice(0, 3).map((scopeItem) => (
                      <div key={scopeItem} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-sm leading-relaxed text-ink-soft">{scopeItem}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <div className="flex flex-wrap gap-2">
                      {item.stack.slice(0, 5).map((capability) => (
                        <span
                          key={capability}
                          className="rounded-full bg-paper px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-soft shadow-[inset_0_0_0_1px_var(--color-line)]"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-line/40 pt-5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink transition-colors duration-300 group-hover:text-accent">
                        {lang === "fr" ? "Voir le détail" : "View details"}
                      </span>
                      <span className="h-px w-12 bg-line transition-colors duration-300 group-hover:bg-accent" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
