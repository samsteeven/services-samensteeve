import Link from "next/link";
import { getT, type Language } from "@/lib/translations";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

// 👉 Remplacer par l'URL Cal.com réelle
const CAL_URL = "https://cal.com/samensteeve/30min";

// Grain SVG en data-URL — aucun appel réseau
const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E";

export function HeroSection({ lang }: { lang: Language }) {
  const t = getT(lang);

  const heroSub =
    lang === "fr"
      ? "Ingénieur logiciel indépendant et Tech Lead basé à Douala. Je conçois des backends robustes, déploie des infrastructures cloud hybrides et intègre des agents IA autonomes dans vos workflows d'entreprise."
      : "Freelance Software Engineer and Tech Lead based in Douala. I design robust backends, deploy hybrid cloud infrastructures, and integrate autonomous AI agents into your business workflows.";

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-line/40 bg-paper">
      {/* ── Background ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
        {/* Grille animée */}
        <div className="hero-grid-pan absolute inset-[-40px]">
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.055] dark:opacity-[0.07]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  className="text-ink"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Grain neutre */}
        <div
          className="absolute inset-0 opacity-[0.028] dark:opacity-[0.045] mix-blend-multiply dark:mix-blend-screen"
          style={{ backgroundImage: `url("${GRAIN_URL}")`, backgroundSize: "200px 200px" }}
        />

        {/* Blob accent — top-left, très subtil */}
        <div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 70%)",
          }}
        />

        {/* Blob accent — bottom-right, encore plus discret */}
        <div
          className="absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Contenu ── */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-8 flex flex-col items-center text-center">

        {/* Badge disponibilité */}
        <ScrollReveal delay={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest font-bold text-accent mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse inline-block" />
            {lang === "fr" ? "Disponible · Douala, Cameroun" : "Available · Douala, Cameroon"}
          </span>
        </ScrollReveal>

        {/* H1 */}
        <ScrollReveal delay={70}>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] leading-[1.15] md:leading-[1.1]">
            {lang === "fr" ? (
              <>
                Vos systèmes tiennent en{" "}
                <span className="relative inline-block px-4 py-1 mx-1 bg-accent text-white rounded-md transform -rotate-1 select-none">
                  {/* Pink Dot */}
                  <span className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-pink-500 border-2 border-white dark:border-zinc-950 animate-pulse" />
                  production
                </span>
                {". C'est mon seul critère."}
              </>
            ) : (
              <>
                Your systems hold in{" "}
                <span className="relative inline-block px-4 py-1 mx-1 bg-accent text-white rounded-md transform -rotate-1 select-none">
                  {/* Pink Dot */}
                  <span className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-pink-500 border-2 border-white dark:border-zinc-950 animate-pulse" />
                  production
                </span>
                {". That's my only standard."}
              </>
            )}
          </h1>
        </ScrollReveal>

        {/* Sous-titre */}
        <ScrollReveal delay={160} className="mt-5 max-w-2xl">
          <p className="text-sm md:text-base leading-relaxed text-ink-soft">
            {heroSub}
          </p>
        </ScrollReveal>

        {/* CTAs principaux */}
        <ScrollReveal delay={250} className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center">
          {/* Primaire — noir */}
          <Link
            href={`/${lang}/demarrer-un-projet`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-[10px] uppercase font-bold tracking-widest text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 active:scale-[0.96]"
          >
            {t.hero.startProject}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Secondaire — accent */}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[10px] uppercase font-bold tracking-widest text-white transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.96]"
          >
            {lang === "fr" ? "Réserver un appel de 30 min" : "Book a 30-min call"}
          </a>
        </ScrollReveal>

        {/* Lien tertiaire — explorer les offres */}
        <ScrollReveal delay={330} className="mt-5">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft/55 hover:text-accent transition-colors duration-200 group"
          >
            {lang === "fr" ? "ou explorez les offres" : "or explore the services"}
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal delay={420} className="mt-10">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft/35">
              {lang === "fr" ? "Découvrir" : "Explore"}
            </span>
            <ChevronDown className="h-4 w-4 text-ink-soft/30 animate-bounce" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
