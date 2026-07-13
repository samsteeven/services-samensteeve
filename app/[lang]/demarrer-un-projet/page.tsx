import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { ProjectForm } from "@/components/project-form";
import { ScrollReveal } from "@/components/scroll-reveal";

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
          <ProjectForm lang={langKey} />
        </div>
      </div>
    </div>
  );
}
