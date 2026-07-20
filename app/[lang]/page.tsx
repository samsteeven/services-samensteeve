import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/constants";
import { HeroSection } from "@/components/hero-section";
import { ServicesGrid } from "@/components/services-grid";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);
  
  const metadata = createPageMetadata({
    lang: langKey,
    title: t.metadata.homeTitle,
    description: t.metadata.homeDescription,
    path: "",
  });

  // Schema.org ProfessionalService pour la homepage
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Samen Steeve — Software Engineering Services",
    "description": t.metadata.homeDescription,
    "image": "https://services.samensteeve.com/profil.png",
    "provider": {
      "@type": "Person",
      "name": "Samen Steeve",
      "jobTitle": "Software Engineer & Solution Architect",
      "url": "https://samensteeve.com",
      "sameAs": [
        "https://linkedin.com/in/samensteeve",
        "https://github.com/samsteeven"
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Cameroon"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://services.samensteeve.com/${lang}`,
      "serviceLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CM"
        }
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Engineering",
            "description": "Custom software development with Laravel, React, and modern frameworks"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud Architecture",
            "description": "AWS/Azure cloud and hybrid infrastructure design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Application Security",
            "description": "Penetration testing and security audits"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation",
            "description": "Autonomous AI agents and workflow automation"
          }
        }
      ]
    }
  };

  return {
    ...metadata,
    other: {
      ...metadata.other,
      "application/ld+json": JSON.stringify(professionalServiceJsonLd)
    }
  };
}

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
                  {t.processPage.methodology}
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
                {t.processPage.viewProcess}
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
                  <p className="mt-1 font-mono text-[9px] text-ink-soft uppercase tracking-wider">{phase.duration}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel lang={langKey} />

      {/* Bottom CTA Banner */}
      <section className="py-24 md:py-32 border-t border-line/40 transition-all duration-300">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 text-center">
          <ScrollReveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-6 block">
              {t.bottomCta.ready}
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl leading-[1.1]">
              {t.bottomCta.needToBuild}
            </h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-ink-soft max-w-2xl mx-auto">
              {t.bottomCta.description}
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
              href={`mailto:${CONTACT_EMAIL}`}
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
