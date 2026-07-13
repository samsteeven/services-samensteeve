import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string; catchAll: string[] }>;
}

export const metadata: Metadata = {
  title: "Page introuvable — Samen Steeve",
};

export default async function NotFoundPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-32 px-4 text-center">
      <p className="font-mono text-6xl font-extrabold text-accent/20">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
        {lang === "fr" ? "Page introuvable" : "Page not found"}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft max-w-sm">
        {lang === "fr"
          ? "Cette page n'existe pas ou a été déplacée."
          : "This page doesn't exist or has moved."}
      </p>
      <Link
        href={`/${lang}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-widest text-ink hover:border-accent/40 hover:text-accent transition duration-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
      </Link>
    </div>
  );
}
