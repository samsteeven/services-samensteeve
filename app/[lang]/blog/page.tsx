import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getT } from "@/lib/i18n";
import { blogMetadata } from "@/content/blog/index";
import { BlogListing } from "@/components/blog-listing";
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
    title: t.metadata.blogTitle,
    description: t.metadata.blogDescription,
    path: "/blog",
  });
}

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function BlogListingPage({ params }: PageProps) {
  const { lang } = await params;
  const langKey = lang as Language;

  const t = getT(langKey);

  // Filter posts by language
  const langPosts = blogMetadata.filter((post) => post.lang === langKey);

  const blogTitle = t.blog.heading;
  const blogSubtitle = t.blog.subtitle;

  const categoryLabel = t.blog.eyebrow;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <header className="relative overflow-hidden py-16 md:py-32 border-b border-line/40 bg-paper-raised/20 transition-all duration-300">
        {/* Giant Background Text Effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap">
          <span className="font-display text-[100px] font-extrabold leading-none tracking-tighter text-ink/[0.04] dark:text-ink/[0.03] sm:text-[160px] md:text-[220px] lg:text-[280px]">
            {blogTitle}
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8">
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
