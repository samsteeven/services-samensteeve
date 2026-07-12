import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { ProjectForm } from "@/components/project-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MessageCircle, Mail, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  return createPageMetadata({
    lang: langKey,
    title: lang === "fr" ? "Démarrer un projet" : "Start a project",
    description: lang === "fr"
      ? "Décrivez votre projet en 4 étapes simples. Réponse sous 24h avec une analyse technique et une proposition concrète."
      : "Describe your project in 4 simple steps. Response within 24h with a technical analysis and a concrete proposal.",
    path: "/demarrer-un-projet",
  });
}

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function StartProjectPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <header className="py-16 md:py-20 border-b border-line/40 bg-paper-raised/20 transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Title + context */}
            <div>
              <ScrollReveal>
                <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">
                  {t.nav.cta}
                </p>
                <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {t.contact.title}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={80} className="mt-6">
                <p className="text-sm md:text-base leading-relaxed text-ink-soft">
                  {t.contact.subtitle}
                </p>
              </ScrollReveal>

              {/* Alternative contact */}
              <ScrollReveal delay={160} className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink-soft/60 mb-4">
                  {lang === "fr" ? "Ou contactez-moi directement" : "Or reach out directly"}
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "samendjiaha@gmail.com",
                      href: "mailto:samendjiaha@gmail.com",
                    },
                    {
                      icon: MessageCircle,
                      label: "WhatsApp",
                      value: "+237 654 557 446",
                      href: "https://wa.me/237654557446",
                    },
                    {
                      icon: Calendar,
                      label: lang === "fr" ? "Réserver un appel (30 min)" : "Book a call (30 min)",
                      value: "cal.com/samen-steeve/30min",
                      href: "https://cal.com/samen-steeve/30min",
                    },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-ink-soft hover:text-accent transition duration-200"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-accent/70" />
                      <span>{item.value}</span>
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Reassurance block */}
            <ScrollReveal delay={200}>
              <div className="rounded-2xl border border-line bg-paper-raised/40 p-6 sm:p-8">
                <h2 className="font-display text-base font-bold text-ink">
                  {lang === "fr" ? "Ce qui se passe après" : "What happens next"}
                </h2>
                <ul className="mt-6 flex flex-col gap-5">
                  {(lang === "fr" ? [
                    { num: "01", text: "Je lis votre demande et j'analyse le besoin technique en détail." },
                    { num: "02", text: "Sous 24h, je vous réponds avec une première analyse et des questions de cadrage si nécessaire." },
                    { num: "03", text: "Nous planifions un appel découverte de 30 minutes pour aligner la vision." },
                    { num: "04", text: "Je rédige une proposition concrète avec périmètre, approche et délai estimé." },
                  ] : [
                    { num: "01", text: "I read your request and analyze the technical requirements in detail." },
                    { num: "02", text: "Within 24h, I reply with an initial analysis and scoping questions if needed." },
                    { num: "03", text: "We schedule a 30-minute discovery call to align on the vision." },
                    { num: "04", text: "I write a concrete proposal with scope, approach, and estimated timeline." },
                  ]).map((item) => (
                    <li key={item.num} className="flex items-start gap-3">
                      <span className="font-mono text-xs font-extrabold text-accent/50 shrink-0 mt-0.5">{item.num}</span>
                      <span className="text-sm text-ink-soft leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* Form */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <ScrollReveal>
            <h2 className="font-display text-xl font-bold text-ink text-center mb-12">
              {lang === "fr" ? "Décrivez votre projet" : "Describe your project"}
            </h2>
          </ScrollReveal>
          <div className="flex justify-center">
            <ProjectForm lang={langKey} />
          </div>
        </div>
      </section>
    </div>
  );
}
