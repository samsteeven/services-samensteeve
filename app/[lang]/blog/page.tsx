import type { Metadata } from "next";
import type { Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { blogMetadata } from "@/content/blog/index";
import { BlogListing } from "@/components/blog-listing";
import { ScrollReveal } from "@/components/scroll-reveal";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const langKey = lang as Language;
  return createPageMetadata({
    lang: langKey,
    title: lang === "fr" ? "Notes de terrain — Blog" : "Field Notes — Blog",
    description: lang === "fr"
      ? "Analyses techniques et retours d'expérience réels sur l'IA, le cloud, la sécurité et le développement logiciel en production par Samen Steeve."
      : "Technical deep dives and real-world post-mortems on AI, cloud, security, and software engineering in production by Samen Steeve.",
    path: "/blog",
  });
}

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function BlogListingPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;

  // Filter posts by language
  const langPosts = blogMetadata.filter((post) => post.lang === langKey);

  const blogTitle = langKey === "fr" ? "Notes de terrain" : "Field Notes";
  const blogSubtitle = langKey === "fr"
    ? "Analyses techniques et retours d'expérience réels sur l'IA, le cloud, la sécurité et le développement logiciel en production."
    : "Technical deep dives and real-world post-mortems on AI, cloud, security, and software engineering in production.";

  const categoryLabel = langKey === "fr" ? "BLOG & RETOURS D'EXPÉRIENCE" : "BLOG & FIELD NOTES";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <header className="py-16 md:py-24 border-b border-line/40 bg-paper-raised/20 transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-accent">
              {categoryLabel}
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {blogTitle}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-6 max-w-2xl">
            <p className="text-sm md:text-base leading-relaxed text-ink-soft">
              {blogSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* Listing Content */}
      <main className="py-16 md:py-24 flex-1">
        <BlogListing posts={langPosts} lang={langKey} />
      </main>
    </div>
  );
}
