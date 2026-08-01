import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { ProcessTimeline } from "@/components/process-timeline";

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
    title: t.metadata.processTitle,
    description: t.metadata.processDescription,
    path: "/comment-ca-marche",
  });
}

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function ProcessPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <header className="relative overflow-hidden py-16 md:py-32 border-b border-line/40 bg-paper-raised/20 transition-all duration-300">
        {/* Giant Background Watermark — hachures DANS les lettres */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap">
          <span
            className="font-display text-[100px] font-extrabold leading-none tracking-tighter sm:text-[160px] md:text-[220px] lg:text-[280px]"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-ink) 0px, var(--color-ink) 1px, transparent 1px, transparent 6px)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              opacity: 0.12,
            }}
          >
            {t.process.title}
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">
              {t.nav.process}
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {t.process.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-6 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              {t.process.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* Timeline Section */}
      <ProcessTimeline lang={langKey} hideHeader={true} />
    </div>
  );
}
