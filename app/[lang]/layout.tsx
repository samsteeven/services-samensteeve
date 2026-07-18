import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Language } from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function LanguageLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  // Validation de la langue supportée
  if (lang !== "en" && lang !== "fr") {
    notFound();
  }

  const langKey = lang as Language;

  return (
    <>
      <SiteHeader lang={langKey} />
      <main className="flex-1 flex flex-col">{children}</main>
      <SiteFooter lang={langKey} />
    </>
  );
}
