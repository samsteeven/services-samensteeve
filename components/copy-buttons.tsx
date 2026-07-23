"use client";

import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";

interface CopyButtonsProps {
  /** Full canonical URL of the article/project */
  url: string;
  /** Pre-formatted shareable text (title + description + tags + url) */
  shareText: string;
  lang: "en" | "fr";
}

interface CopyState {
  link: boolean;
  post: boolean;
}

export function CopyButtons({ url, shareText, lang }: CopyButtonsProps) {
  const [copied, setCopied] = useState<CopyState>({ link: false, post: false });

  const handleCopy = async (type: keyof CopyState, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(
        () => setCopied((prev) => ({ ...prev, [type]: false })),
        2000
      );
    } catch {
      // Clipboard unavailable or permission denied
    }
  };

  const labels = {
    en: { link: "Copy link", post: "Copy article", done: "Copied!" },
    fr: { link: "Copier le lien", post: "Copier l'article", done: "Copié !" },
  };
  const l = labels[lang];

  return (
    <div className="flex items-center gap-2">
      {/* Copy link button */}
      <button
        onClick={() => handleCopy("link", url)}
        title={l.link}
        className={`
          inline-flex items-center gap-1.5
          rounded-full border px-3 py-1
          font-mono text-[10px] uppercase font-bold tracking-wider
          transition-all duration-200 cursor-pointer
          ${
            copied.link
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-line bg-paper-raised/80 text-ink-soft hover:border-accent/30 hover:text-ink hover:bg-paper-raised"
          }
        `}
      >
        {copied.link ? (
          <Check className="h-3 w-3" />
        ) : (
          <Link2 className="h-3 w-3" />
        )}
        {copied.link ? l.done : l.link}
      </button>

      {/* Copy article button */}
      <button
        onClick={() => handleCopy("post", shareText)}
        title={l.post}
        className={`
          inline-flex items-center gap-1.5
          rounded-full border px-3 py-1
          font-mono text-[10px] uppercase font-bold tracking-wider
          transition-all duration-200 cursor-pointer
          ${
            copied.post
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-line bg-paper-raised/80 text-ink-soft hover:border-accent/30 hover:text-ink hover:bg-paper-raised"
          }
        `}
      >
        {copied.post ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        {copied.post ? l.done : l.post}
      </button>
    </div>
  );
}
