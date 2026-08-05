import Image from "next/image";
import Link from "next/link";
import { PostMeta } from "@/content/blog/types";
import { Calendar, Clock, ArrowRight, ShieldCheck, Cpu, Database, Cloud, Terminal, Code2 } from "lucide-react";
import { getT, type Language } from "@/lib/i18n";

interface BlogCardProps {
  post: PostMeta;
  lang: Language;
}

function getTagIcon(tags: string[]) {
  if (tags.some((t) => ["IA", "AI", "Agents"].includes(t))) return Cpu;
  if (tags.some((t) => ["Sécurité", "Security", "Audit"].includes(t))) return ShieldCheck;
  if (tags.some((t) => ["SQL", "PostgreSQL", "BDD", "Fintech"].includes(t))) return Database;
  if (tags.some((t) => ["Cloud", "Réseau", "Network", "Infrastructure"].includes(t))) return Cloud;
  if (tags.some((t) => ["DevOps", "Docker", "n8n", "Automatisation"].includes(t))) return Terminal;
  return Code2;
}

export function BlogCard({ post, lang }: BlogCardProps) {
  const t = getT(lang);
  const prefix = lang === "en" ? "" : "/fr";
  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const CategoryIcon = getTagIcon(post.tags);

  return (
    <Link
      href={`${prefix}/blog/${post.slug}`}
      className="group relative flex flex-col justify-between h-full rounded-2xl border border-line bg-paper-raised/40 p-6 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:bg-paper-raised hover:shadow-xl hover:shadow-accent/5 overflow-hidden"
    >
      {/* Subtle card highlight glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/3 rounded-full blur-3xl group-hover:bg-accent/8 transition-colors duration-300 pointer-events-none" />

      <div>
        {/* Cover Image Thumbnail or Tech Fallback Header */}
        {post.coverImage ? (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-line/60 bg-paper">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-103 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 border border-line/60 bg-paper-raised/80 flex flex-col justify-between p-4 group-hover:border-accent/30 transition-colors duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent opacity-70 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
                {post.tags[0] || "ARTICLE"}
              </span>
              <CategoryIcon className="h-5 w-5 text-accent/70" />
            </div>
            <div className="relative z-10 font-mono text-[10px] text-ink-soft/40 truncate font-semibold">
              SAMEN STEEVE // {post.slug}
            </div>
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
          {t.blog.readMore}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
