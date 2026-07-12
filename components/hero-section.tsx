import Link from "next/link";
import { getT, type Language } from "@/lib/translations";
import { ArrowRight, Mail, MessageCircle, Linkedin, Github } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function HeroSection({ lang }: { lang: Language }) {
  const t = getT(lang);

  const socialLinks = [
    {
      href: "mailto:samendjiaha@gmail.com",
      icon: Mail,
      label: "Email",
    },
    {
      href: "https://wa.me/237654557446",
      icon: MessageCircle,
      label: "WhatsApp",
    },
    {
      href: "https://linkedin.com/in/samensteeve",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/samsteeven",
      icon: Github,
      label: "GitHub",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-radial from-paper-raised/10 via-paper to-paper">
      {/* Glow Effect */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised/80 px-4 py-1.5 shadow-sm backdrop-blur transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
              {t.hero.status}
            </span>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={100} className="mt-8">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl leading-[1.1] max-w-3xl">
            {t.hero.title}
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={200} className="mt-6">
          <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-ink-soft/90">
            {t.hero.subtitle}
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal delay={300} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper-raised px-6 py-3.5 font-mono text-xs uppercase font-bold tracking-widest text-ink transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:text-accent hover:shadow-md active:scale-[0.96]"
          >
            {t.hero.viewServices}
          </Link>
          <Link
            href={`/${lang}/demarrer-un-projet`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase font-bold tracking-widest text-paper transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 active:scale-[0.96]"
          >
            {t.hero.startProject}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        {/* Social / Direct contact links */}
        <ScrollReveal delay={400} className="mt-16 pt-8 border-t border-line/40 w-full max-w-md">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft/60">
            {t.hero.connect}
          </p>
          <div className="mt-4 flex justify-center gap-6 text-ink-soft">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:text-accent hover:scale-110 active:scale-[0.96]"
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
