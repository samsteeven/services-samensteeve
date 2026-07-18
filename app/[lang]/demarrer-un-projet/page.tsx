import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { ProjectForm } from "@/components/project-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);
  return createPageMetadata({
    lang: langKey,
    title: t.metadata.contactTitle,
    description: t.metadata.contactDescription,
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
    <div className="flex flex-col min-h-[70vh] justify-center py-16 md:py-24">
      {/* Form Section */}
      <div className="mx-auto max-w-3xl w-full px-4 sm:px-8">
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {t.contact.title}
            </h1>
          </ScrollReveal>
        </div>

        <div className="flex justify-center mt-8">
          <Suspense fallback={
            <div className="w-full max-w-2xl flex items-center justify-center py-20">
              <span className="font-mono text-xs text-ink-soft/40 animate-pulse">
                {t.contact.recapLabels.loading}
              </span>
            </div>
          }>
            <ProjectForm lang={langKey} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
