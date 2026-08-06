import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { ProjectForm } from "@/components/project-form";
import { FormSkeleton } from "@/components/form-skeleton";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ParticlesBackground } from "@/components/particles-background";
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
    <div className="relative isolate overflow-hidden flex flex-col min-h-[70vh] justify-center py-16 md:py-24">
      <ParticlesBackground className="absolute inset-0 -z-10" quantity={100} ease={80} />
      {/* Form Section */}
      <div className="mx-auto max-w-3xl w-full px-4 sm:px-8">
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {t.contact.title}
            </h1>
          </ScrollReveal>
        </div>

        <div className="w-full mt-4">
          <Suspense fallback={<FormSkeleton lang={langKey} />}>
            <ProjectForm lang={langKey} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
