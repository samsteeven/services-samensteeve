import Link from "next/link";
import { getT, type Language } from "@/lib/translations";
import { servicesList } from "@/lib/services";
import { Code2, Cloud, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Cloud,
  ShieldCheck,
  Cpu,
};

export function ServicesGrid({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <section id="services" className="py-20 md:py-32 bg-paper-raised/30 transition-all duration-300 border-t border-line/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal delay={0}>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {t.services.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-4">
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              {t.services.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesList.map((service, i) => {
            const itemTrans = t.services.items[service.slug];
            const IconComponent = iconMap[service.iconName] || Code2;

            return (
              <ScrollReveal key={service.slug} delay={i * 80}>
                <div className="group flex flex-col justify-between h-full rounded-2xl border border-line bg-paper-raised/40 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-paper-raised hover:shadow-md">
                  <div>
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/5 text-accent border border-accent/10 transition-colors group-hover:bg-accent group-hover:text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 font-display text-lg font-bold text-ink sm:text-xl">
                      {itemTrans.title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-soft">
                      {itemTrans.shortDesc}
                    </p>

                    {/* Stack Badges Preview */}
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {itemTrans.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[9px] uppercase tracking-wider text-ink-soft/75 bg-paper px-2 py-0.5 rounded border border-line/45"
                        >
                          {tech}
                        </span>
                      ))}
                      {itemTrans.stack.length > 4 && (
                        <span className="font-mono text-[9px] text-ink-soft/50 px-1 py-0.5">
                          +{itemTrans.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-4 border-t border-line/30 flex justify-end">
                    <Link
                      href={`/${lang}/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest text-ink hover:text-accent transition duration-200"
                    >
                      {t.services.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
