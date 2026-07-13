import Link from "next/link";
import { getT, type Language } from "@/lib/translations";
import { ScrollReveal } from "./scroll-reveal";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessTimeline({ lang, hideHeader = false }: { lang: Language; hideHeader?: boolean }) {
  const t = getT(lang);

  return (
    <section id="process" className={`py-16 md:py-24 transition-all duration-300 ${hideHeader ? "" : "border-t border-line/40"}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Header */}
        {!hideHeader && (
          <div className="text-center max-w-2xl mx-auto mb-20">
            <ScrollReveal delay={0}>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.1]">
                {t.process.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80} className="mt-4">
              <p className="text-sm md:text-base leading-relaxed text-ink-soft">
                {t.process.subtitle}
              </p>
            </ScrollReveal>
          </div>
        )}

        {/* Timeline container */}
        <div className={`relative ${hideHeader ? "mt-8" : "mt-0"}`}>
          {/* Vertical Center Line for Desktop */}
          <div className="absolute left-[39px] md:left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line/60 pointer-events-none" />

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-24">
            {t.process.phases.map((phase, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={phase.num}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[39px] md:left-1/2 top-4 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-paper bg-accent shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-125 z-10" />

                  {/* Left Column (Phase Details) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:text-left" : "md:text-right"}`}>
                    <ScrollReveal delay={100}>
                      <span className="font-mono text-3xl md:text-5xl font-extrabold text-accent/15 leading-none block">
                        {phase.num}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold text-ink sm:text-xl">
                        {phase.title}
                      </h3>
                      <span className="mt-1 inline-block font-mono text-[9px] uppercase tracking-wider font-bold text-accent bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-full">
                        {phase.duration}
                      </span>
                      <p className={`mt-4 text-xs sm:text-sm leading-relaxed text-ink-soft max-w-md ${isEven ? "mr-auto" : "md:ml-auto"}`}>
                        {phase.desc}
                      </p>
                    </ScrollReveal>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden md:block w-[10%]" />

                  {/* Right Column (Deliverables Card) */}
                  <div className="w-full md:w-[45%] pl-16 md:pl-0 mt-6 md:mt-0">
                    <ScrollReveal delay={200}>
                      <div className="rounded-xl border border-line bg-paper-raised/40 p-5 sm:p-6 shadow-sm hover:border-line/80 hover:bg-paper-raised transition duration-200">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/75 border-b border-line/40 pb-2">
                          Livrables clés / Key deliverables
                        </h4>
                        <ul className="mt-4 flex flex-col gap-2.5">
                          {phase.deliverables.map((item, index) => (
                            <li key={index} className="flex items-start gap-2.5 text-xs text-ink-soft">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent/75 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <ScrollReveal delay={300}>
            <Link
              href={`/${lang}/demarrer-un-projet`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96]"
            >
              {t.process.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
