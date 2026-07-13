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
    <section id="services" className="py-24 md:py-32 bg-paper transition-all duration-300 border-t border-line/40 relative">
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,color-mix(in_srgb,var(--accent)_2%,transparent),transparent_50%)] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-line/30">
          <div className="max-w-2xl">
            <ScrollReveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-accent">
                {t.services.title}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={60} className="mt-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.1]">
                {t.services.tagline}
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={120} className="shrink-0">
            <p className="text-xs md:text-sm text-ink-soft max-w-xs leading-relaxed font-mono">
              {"// "}{lang === "fr" ? "Conçu pour la haute disponibilité et la tolérance aux pannes." : "Built for high availability and fault tolerance."}
            </p>
          </ScrollReveal>
        </div>

        {/* Services Matrix (2x2 grid with high visual detail) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {servicesList.map((service, i) => {
            const itemTrans = t.services.items[service.slug];
            const IconComponent = iconMap[service.iconName] || Code2;

            return (
              <ScrollReveal key={service.slug} delay={i * 80}>
                <Link
                  href={`/${lang}/services/${service.slug}`}
                  className="group relative flex flex-col justify-between h-full rounded-2xl border border-line bg-paper-raised/40 p-6 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:bg-paper-raised hover:shadow-xl hover:shadow-accent/5 overflow-hidden"
                >
                  {/* Subtle card highlight glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/3 rounded-full blur-3xl group-hover:bg-accent/8 transition-colors duration-300 pointer-events-none" />

                  <div>
                    {/* Header: Number, Icon, Title */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-ink sm:text-xl group-hover:text-accent transition-colors duration-200">
                          {itemTrans.title}
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-ink/20 group-hover:text-accent/30 transition-colors duration-300">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Punchline */}
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-ink-soft/90 font-medium">
                      {itemTrans.punchline}
                    </p>

                    {/* Interactive Blueprint Mini-Visuals */}
                    <div className="mt-6 border border-line/50 rounded-xl bg-paper/60 p-4 relative overflow-hidden font-mono text-[9px] leading-relaxed text-ink-soft/80 group-hover:border-accent/20 transition-all duration-300">
                      
                      {/* Web dev visual */}
                      {service.slug === "developpement-web" && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-[8px] border-b border-line/40 pb-1.5 mb-1 text-ink/40 uppercase tracking-wider">
                            <span>DB Lock & Safety</span>
                            <span className="text-emerald-500 animate-pulse font-bold">● SECURE</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-accent font-bold">1</span>
                            <span className="text-ink/60">DB::transaction(function() &#123;</span>
                          </div>
                          <div className="flex items-center gap-2 pl-4">
                            <span className="text-accent font-bold">2</span>
                            <span className="text-ink/80 font-semibold">$wallet = Wallet::lockForUpdate()-&gt;find($id);</span>
                          </div>
                          <div className="flex items-center gap-2 pl-4">
                            <span className="text-accent font-bold">3</span>
                            <span className="text-ink/60">$wallet-&gt;increment($amount);</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-accent font-bold">4</span>
                            <span className="text-ink/60">&#125;);</span>
                          </div>
                        </div>
                      )}

                      {/* Cloud visual */}
                      {service.slug === "architecture-cloud" && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-[8px] border-b border-line/40 pb-1.5 mb-1 text-ink/40 uppercase tracking-wider">
                            <span>Hybrid Sync Status</span>
                            <span className="text-emerald-500 font-bold">● CONNECTED</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-ink/80">AWS / Azure Hub</span>
                            <span className="h-0.5 flex-1 bg-line/80 mx-2 relative overflow-hidden">
                              <span className="absolute inset-0 bg-accent animate-[shimmer_2s_infinite] origin-left" style={{ backgroundImage: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }} />
                            </span>
                            <span className="text-ink/80">Douala On-Premise</span>
                          </div>
                          <div className="flex justify-between items-center text-[8px] mt-1 text-ink/50">
                            <span>SLA 99.95%</span>
                            <span>Latency: 42ms (MPLS Tunnel)</span>
                          </div>
                        </div>
                      )}

                      {/* Security visual */}
                      {service.slug === "audit-securite" && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-[8px] border-b border-line/40 pb-1.5 mb-1 text-ink/40 uppercase tracking-wider">
                            <span>Logic Pentest Analysis</span>
                            <span className="text-rose-500 font-bold">● AUDITING</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>[XSS / CSRF Defense]</span>
                            <span className="text-emerald-500 font-bold">PASSED</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>[Insecure Direct Object Reference]</span>
                            <span className="text-emerald-500 font-bold">PATCHED</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>[Race Condition Test]</span>
                            <span className="text-emerald-500 font-bold">MITIGATED</span>
                          </div>
                        </div>
                      )}

                      {/* AI visual */}
                      {service.slug === "automatisation-ia" && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-[8px] border-b border-line/40 pb-1.5 mb-1 text-ink/40 uppercase tracking-wider">
                            <span>MCP Server & LangGraph Flow</span>
                            <span className="text-accent animate-pulse font-bold">● AGENT ACTIVE</span>
                          </div>
                          <div className="flex items-center justify-between text-ink/70">
                            <span>Input Document</span>
                            <span>→</span>
                            <span className="text-accent font-bold">RouterAgent</span>
                            <span>→</span>
                            <span>SQL Tool Call</span>
                          </div>
                          <div className="flex justify-between items-center text-[8px] mt-1 text-ink/50">
                            <span>State: MemoryPersisted</span>
                            <span>Token Cost Optimisation: Active</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack tags */}
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {itemTrans.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[9px] uppercase tracking-wider text-ink-soft/75 border border-line/50 bg-paper-raised px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {itemTrans.stack.length > 4 && (
                        <span className="font-mono text-[9px] text-ink-soft/40 px-1 py-0.5">
                          +{itemTrans.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="mt-8 pt-4 border-t border-line/30 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-ink group-hover:text-accent transition-colors duration-200">
                      {lang === "fr" ? "Découvrir la prestation" : "Discover the service"}
                    </span>
                    <ArrowRight className="h-4 w-4 text-ink-soft group-hover:text-accent transition-all duration-300 group-hover:translate-x-1" />
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
