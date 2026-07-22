"use client";

import { ReactNode } from "react";
import { CopyButton } from "./copy-button";

interface CodeWindowProps {
  filename?: string;
  code: string;
  badge?: string;
}

export function CodeWindow({ filename, code, badge }: CodeWindowProps) {
  return (
    <div className="rounded-xl border border-line bg-paper-raised/40 overflow-hidden font-mono text-xs my-6 shadow-sm">
      <div className="border-b border-line/40 px-4 py-2.5 text-[11px] text-ink-soft bg-paper-raised/80 font-bold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
          {filename && <span className="ml-2 text-ink-soft/90 font-bold">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          {badge && <span className="text-[10px] text-accent uppercase tracking-wider font-bold">{badge}</span>}
          <CopyButton text={code} />
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-ink-soft bg-paper-raised/20 m-0 leading-relaxed text-xs">
        <code>{code}</code>
      </pre>
    </div>
  );
}
