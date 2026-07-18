"use client";

import { useState } from "react";
import { type Language } from "@/lib/i18n";
import { getT } from "@/lib/i18n";
import { type PostMeta } from "@/content/blog/types";
import { BlogCard } from "@/components/blog-card";
import { ScrollReveal } from "@/components/scroll-reveal";

interface BlogListingProps {
  posts: PostMeta[];
  lang: Language;
}

export function BlogListing({ posts, lang }: BlogListingProps) {
  const [activeTag, setActiveTag] = useState<string>("all");
  const t = getT(lang);

  // Get unique tags across all posts of this language
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  // Filter posts by active tag
  const filteredPosts = activeTag === "all"
    ? posts
    : posts.filter((post) => post.tags.includes(activeTag));

  // Sort by date desc
  const sortedPosts = [...filteredPosts].sort((a, b) => b.date.localeCompare(a.date));

  const allTagLabel = t.blog.allTags;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8">
      {/* Tags Filtering */}
      <ScrollReveal>
        <div className="relative mb-12 border-b border-line/30 pb-6">
          <div className="flex overflow-x-auto gap-2 pr-16 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-nowrap py-1">
            <button
              onClick={() => setActiveTag("all")}
              className={`font-mono text-[10px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 border shrink-0 ${
                activeTag === "all"
                  ? "bg-ink text-paper border-ink animate-none"
                  : "bg-paper-raised/40 text-ink-soft border-line hover:border-ink-soft hover:text-ink"
              }`}
            >
              {allTagLabel}
            </button>

            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`font-mono text-[10px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 border shrink-0 ${
                  activeTag === tag
                    ? "bg-accent text-white border-accent"
                    : "bg-paper-raised/40 text-ink-soft border-line hover:border-accent/40 hover:text-accent"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Subtle fade overlay to indicate horizontal scrolling on the right */}
          <div className="absolute right-0 top-0 bottom-6 w-20 bg-gradient-to-l from-paper via-paper/80 to-transparent pointer-events-none" />
        </div>
      </ScrollReveal>

      {/* Posts Grid */}
      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {sortedPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 60}>
              <BlogCard post={post} lang={lang} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-line border-dashed rounded-2xl bg-paper-raised/20">
          <p className="font-mono text-xs text-ink-soft">
            {t.blog.emptyState}
          </p>
        </div>
      )}
    </div>
  );
}
