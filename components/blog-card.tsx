import Link from "next/link";
import { PostMeta } from "@/content/blog/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: PostMeta;
  lang: string;
}

export function BlogCard({ post, lang }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group relative flex flex-col justify-between h-full rounded-2xl border border-line bg-paper-raised/40 p-6 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:bg-paper-raised hover:shadow-xl hover:shadow-accent/5 overflow-hidden"
    >
      {/* Subtle card highlight glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/3 rounded-full blur-3xl group-hover:bg-accent/8 transition-colors duration-300 pointer-events-none" />

      <div>
        {/* Date and Read time */}
        <div className="flex items-center gap-4 text-xs text-ink-soft font-mono mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime} min {lang === "fr" ? "lecture" : "read"}
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

      <div className="mt-6 pt-4 border-t border-line/40 flex items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
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
        <span className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-widest text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          {lang === "fr" ? "Lire" : "Read"}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
