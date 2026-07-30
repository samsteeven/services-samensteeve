import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { ToolsIUse } from "@/components/tools-i-use";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  return createPageMetadata({
    lang: langKey,
    title: t.metadata.toolsTitle,
    description: t.metadata.toolsDescription,
    path: "/tools-i-use",
  });
}

export default async function ToolsIUsePage({ params }: PageProps) {
  const { lang } = await params;

  return <ToolsIUse lang={lang as Language} />;
}
