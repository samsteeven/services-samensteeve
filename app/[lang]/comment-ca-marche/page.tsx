import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { ProcessTimeline } from "@/components/process-timeline";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  return createPageMetadata({
    lang: langKey,
    title: lang === "fr" ? "Comment ça marche" : "How It Works",
    description: lang === "fr"
      ? "Une méthodologie transparente en 4 phases : cadrage, architecture, développement itératif et livraison. Pas de boîte noire, des livrables concrets à chaque étape."
      : "A transparent 4-phase methodology: scoping, architecture, iterative development, and delivery. No black box, concrete deliverables at each stage.",
    path: "/comment-ca-marche",
  });
}

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function ProcessPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;

  return (
    <div className="flex flex-col">
      <ProcessTimeline lang={langKey} />
    </div>
  );
}
