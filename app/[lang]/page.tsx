import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { HeroSection } from "@/components/hero-section";
import { ServicesGrid } from "@/components/services-grid";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  return createPageMetadata({
    lang: langKey,
    title: lang === "fr"
      ? "Ingénieur Logiciel Freelance & Architecte Solutions — Douala"
      : "Freelance Software Engineer & Solution Architect — Douala",
    description: lang === "fr"
      ? "Je conçois, sécurise et automatise des systèmes logiciels pour des entreprises qui ont besoin que ça fonctionne en production. Ingénierie logicielle, architecture cloud, pentest applicatif, automatisation IA."
      : "I design, secure, and automate software systems for companies that need things to work in production. Software engineering, cloud architecture, application pentesting, AI automation.",
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
      <section className="py-24 md:py-32 bg-paper transition-all duration-300 border-t border-line/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-line/30">
            <div className="max-w-2xl">
              <ScrollReveal>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-accent">
                  {lang === "fr" ? "Méthodologie" : "Methodology"}
                </span>
              </ScrollReveal>
              <ScrollReveal delay={60} className="mt-4">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.1]">
                  {t.process.title}
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={120} className="shrink-0">
              <Link
                href={`/${lang}/comment-ca-marche`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper-raised px-5 py-2.5 font-mono text-[10px] uppercase font-bold tracking-widest text-ink hover:border-accent/40 hover:text-accent transition duration-200"
              >
                {lang === "fr" ? "Voir le processus détaillé" : "View detailed process"}
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
      <section className="py-20 bg-paper transition-all duration-300 relative overflow-hidden border-t border-line">
        {/* Horizontal Line across viewport (behind the box) */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-line -translate-y-1/2 pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-8 relative flex items-center justify-center">
          {/* Centered Box with vertical borders */}
          <div className="w-full max-w-2xl bg-paper px-6 sm:px-10 py-10 border-l border-r border-line relative z-10 flex flex-col items-start text-left">
            
            {/* Emerald Quote Icon */}
            <div className="mb-5 flex h-7 w-7 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-sans text-sm sm:text-base leading-relaxed text-ink/90 font-medium">
              &ldquo;{featuredTestimonial.quote}&rdquo;
            </blockquote>

            {/* Author Block */}
            <div className="mt-8 flex items-center gap-3">
              {/* Initials Avatar */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-mono text-[10px] font-bold border border-accent/20">
                JN
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-bold text-ink leading-none">
                  {featuredTestimonial.author}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-ink-soft/75">
                  {featuredTestimonial.role} · {featuredTestimonial.company}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 md:py-32 border-t border-line/40 transition-all duration-300">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 text-center">
          <ScrollReveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-6 block">
              {lang === "fr" ? "Prêt à lancer ?" : "Ready to Start?"}
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.1]">
              {lang === "fr" ? "Besoin de construire, sécuriser ou automatiser ?" : "Need to build, secure, or automate?"}
            </h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-ink-soft max-w-2xl mx-auto">
              {lang === "fr"
                ? "Décrivez-moi votre projet. Je reviens sous 24h avec une analyse technique et une proposition concrète."
                : "Tell me about your project. I'll get back to you within 24h with a technical analysis and a concrete proposal."}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${lang}/demarrer-un-projet`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96] hover:shadow-lg hover:shadow-accent/20 w-full sm:w-auto"
            >
              {t.nav.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:contact@samensteeve.com"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line bg-paper-raised px-7 py-4 font-sans text-sm font-medium text-ink hover:border-accent/40 hover:text-accent transition duration-200 hover:scale-105 w-full sm:w-auto"
            >
              <Mail className="h-4 w-4 text-ink-soft" />
              <span>{t.nav.contactShort}</span>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
