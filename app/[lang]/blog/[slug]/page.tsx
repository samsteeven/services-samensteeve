import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/translations";
import { blogMetadata, getPostBySlug } from "@/content/blog/index";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight, ShieldCheck, Cpu, Code2, Cloud } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const langKey = lang as Language;
  const post = blogMetadata.find((p) => p.slug === slug && p.lang === langKey);

  if (!post) {
    return createPageMetadata({
      lang: langKey,
      title: "Page introuvable",
      description: "Page not found",
      path: "/blog",
    });
  }

  return createPageMetadata({
    lang: langKey,
    title: `${post.title} — Blog`,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export async function generateStaticParams() {
  return blogMetadata.map((post) => ({
    lang: post.lang,
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const langKey = lang as Language;
  const t = getT(langKey);

  const post = await getPostBySlug(slug, langKey);
  if (!post) {
    notFound();
  }

  const { meta, Content } = post;

  const formattedDate = new Date(meta.date).toLocaleDateString(
    langKey === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Contextual CTA mapping based on tags
  const isAI = meta.tags.some(t => ["IA", "AI"].includes(t));
  const isSecurity = meta.tags.some(t => ["Sécurité", "Security", "Audit"].includes(t));
  const isCloud = meta.tags.some(t => ["Cloud", "Réseau", "Network", "Terrain", "Field"].includes(t));

  let ctaTitle = langKey === "fr" ? "Un projet technique critique ?" : "A critical technical project?";
  let ctaDesc = langKey === "fr"
    ? "Vous cherchez un ingénieur expérimenté pour concevoir votre architecture, auditer votre code ou intégrer de l'IA ?"
    : "Looking for an experienced engineer to design your architecture, audit your code, or integrate AI?";
  let ctaIcon = Code2;
  const ctaPath = `/${langKey}/demarrer-un-projet`;

  if (isAI) {
    ctaTitle = langKey === "fr" ? "Besoin d'intégrer des agents IA ?" : "Need to integrate AI agents?";
    ctaDesc = langKey === "fr"
      ? "Sécurisons et orchestrons vos agents autonomes en production sans failles logiques."
      : "Let's secure and orchestrate your autonomous agents in production without logical flaws.";
    ctaIcon = Cpu;
  } else if (isSecurity) {
    ctaTitle = langKey === "fr" ? "Besoin d'un audit de sécurité offensif ?" : "Need an offensive security audit?";
    ctaDesc = langKey === "fr"
      ? "Identifions vos failles logiques, vos vulnérabilités BOLA et SSRF avant qu'elles ne soient exploitées."
      : "Let's uncover your logical bypasses, BOLA, and SSRF vulnerabilities before they are exploited.";
    ctaIcon = ShieldCheck;
  } else if (isCloud) {
    ctaTitle = langKey === "fr" ? "Planifiez-vous une migration cloud ?" : "Planning a cloud migration?";
    ctaDesc = langKey === "fr"
      ? "Concevons une infrastructure hybride redondante adaptée aux contraintes réelles du terrain."
      : "Let's build a redundant hybrid cloud infrastructure suited for real-world field constraints.";
    ctaIcon = Cloud;
  }

  const CtaIconComponent = ctaIcon;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner details */}
      <div className="border-b border-line bg-paper-raised/10 py-6 transition-all duration-300">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 flex items-center justify-between">
          <Link
            href={`/${langKey}/blog`}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-ink-soft hover:text-accent transition duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {langKey === "fr" ? "Retour au blog" : "Back to blog"}
          </Link>
          <div className="flex gap-1.5">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-wider font-bold text-accent bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-16 border-b border-line/40 bg-paper-raised/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 text-xs text-ink-soft/60 font-mono mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {meta.readTime} min {langKey === "fr" ? "de lecture" : "read"}
              </span>
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl leading-tight">
              {meta.title}
            </h1>
          </ScrollReveal>
        </div>
      </header>

      {/* Article Content */}
      <main className="py-12 md:py-16 flex-1 bg-paper/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <ScrollReveal delay={80}>
            <Content />
          </ScrollReveal>

          {/* Contextual CTA Footer */}
          <ScrollReveal delay={120} className="mt-16 pt-12 border-t border-line/50">
            <div className="rounded-2xl border border-line bg-paper-raised p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/5 text-accent">
                  <CtaIconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{ctaTitle}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft leading-relaxed max-w-md">{ctaDesc}</p>
                </div>
              </div>
              <Link
                href={ctaPath}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-[10px] uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 shrink-0 hover:scale-105 active:scale-[0.96]"
              >
                {t.nav.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
}
