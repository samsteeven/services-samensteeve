import Image from "next/image";
import Link from "next/link";
import { PostMeta } from "@/content/blog/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getT, type Language } from "@/lib/i18n";

interface BlogCardProps {
  post: PostMeta;
  lang: Language;
}

export function BlogCard({ post, lang }: BlogCardProps) {
  const t = getT(lang);
  const prefix = lang === "en" ? "" : "/fr";
  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <Link
      href={`${prefix}/blog/${post.slug}`}
      className="group relative flex flex-col justify-between h-full rounded-2xl border border-line bg-paper-raised/40 p-6 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:bg-paper-raised hover:shadow-xl hover:shadow-accent/5 overflow-hidden"
    >
      {/* Subtle card highlight glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/3 rounded-full blur-3xl group-hover:bg-accent/8 transition-colors duration-300 pointer-events-none" />

      <div className="flex-1 flex flex-col">
        {/* Cover Image Thumbnail (uniquement si présent) */}
        {post.coverImage && (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-line/60 bg-paper">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-103 transition-transform duration-500"
            />
          </div>
        )}

        {/* Date and Read time */}
        <div className="flex items-center gap-4 text-xs text-ink-soft font-mono mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime} min {t.blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-ink sm:text-xl group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Footer tags & CTA */}
      <div className="mt-6 pt-4 border-t border-line/40 flex items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 min-w-0">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-wider font-bold text-accent bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <span className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-widest text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0 ml-2">
          {t.blog.readMore}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
