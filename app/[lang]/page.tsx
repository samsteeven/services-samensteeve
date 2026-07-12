import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { HeroSection } from "@/components/hero-section";
import { ServicesGrid } from "@/components/services-grid";
import { ProcessTimeline } from "@/components/process-timeline";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
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
    title: lang === "fr"
      ? "Ingénieur Logiciel Freelance & Architecte Solutions — Douala"
      : "Freelance Software Engineer & Solution Architect — Douala",
    description: lang === "fr"
      ? "Je conçois, sécurise et automatise des systèmes logiciels pour des entreprises qui ont besoin que ça fonctionne en production. Développement web, architecture cloud, audit sécurité, agents IA."
      : "I design, secure, and automate software systems for companies that need things to work in production. Full-stack development, cloud architecture, security audit, AI agents.",
    path: "",
  });
}

// Témoignage unique mis en avant sur la homepage
const featuredTestimonial = {
  quote:
    "Steeve a conçu notre infrastructure microservices hybride depuis zéro. La synchronisation offline-first a résolu des années d'échecs de sync pour nos agents terrain. Une approche technique rigoureuse qui a tenu toutes ses promesses.",
  author: "Jean-Pierre Ndongo",
  role: "Directeur des Systèmes d'Information",
  company: "AGROCAM S.A.",
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  return (
    <>
      {/* Hero */}
      <HeroSection lang={langKey} />

      {/* Services Grid */}
      <ServicesGrid lang={langKey} />

      {/* Process Preview Section */}
      <section className="py-20 md:py-28 bg-paper transition-all duration-300 border-t border-line/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <ScrollReveal>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {t.process.title}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={80} className="mt-4">
                <p className="text-sm leading-relaxed text-ink-soft">
                  {t.process.subtitle}
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={160}>
              <Link
                href={`/${lang}/comment-ca-marche`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper-raised px-5 py-2.5 font-mono text-[10px] uppercase font-bold tracking-widest text-ink hover:border-accent/40 hover:text-accent transition duration-200"
              >
                {lang === "fr" ? "Voir le processus" : "View the process"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </ScrollReveal>
          </div>

          {/* 4 phase numbers preview */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.process.phases.map((phase, i) => (
              <ScrollReveal key={phase.num} delay={i * 60}>
                <div className="rounded-xl border border-line bg-paper-raised/40 p-5 hover:border-accent/30 hover:bg-paper-raised transition duration-200">
                  <span className="font-mono text-3xl font-extrabold text-accent/20 leading-none">{phase.num}</span>
                  <h3 className="mt-3 font-display text-sm font-bold text-ink">{phase.title}</h3>
                  <p className="mt-1 font-mono text-[9px] text-ink-soft/60 uppercase tracking-wider">{phase.duration}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 md:py-28 bg-paper-raised/30 border-t border-line/40 transition-all duration-300">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 text-center">
          <ScrollReveal>
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="font-display text-lg sm:text-2xl font-medium leading-relaxed text-ink">
              &ldquo;{featuredTestimonial.quote}&rdquo;
            </blockquote>
            <footer className="mt-8">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                {featuredTestimonial.author}
              </p>
              <p className="mt-1 font-mono text-[10px] text-ink-soft/70">
                {featuredTestimonial.role} · {featuredTestimonial.company}
              </p>
            </footer>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 border-t border-line/40 transition-all duration-300">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {lang === "fr" ? "Besoin de construire, sécuriser ou automatiser ?" : "Need to build, secure, or automate?"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {lang === "fr"
                ? "Décrivez-moi votre projet. Je reviens sous 24h avec une analyse technique et une proposition concrète."
                : "Tell me about your project. I'll get back to you within 24h with a technical analysis and a concrete proposal."}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/demarrer-un-projet`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96] hover:shadow-lg hover:shadow-accent/20"
            >
              {t.nav.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/realisations`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper-raised px-7 py-4 font-mono text-xs uppercase font-bold tracking-widest text-ink hover:border-accent/40 hover:text-accent transition duration-200 hover:scale-105"
            >
              {t.nav.realisations}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
