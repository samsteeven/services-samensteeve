"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper-raised/60 px-2.5 py-1 font-mono text-[10px] text-ink-soft hover:border-accent/40 hover:text-accent hover:bg-paper-raised transition duration-200 cursor-pointer"
      aria-label="Copier le code"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-emerald-500" />
          <span className="text-emerald-500 font-semibold">Copié !</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>Copier</span>
        </>
      )}
    </button>
  );
}
