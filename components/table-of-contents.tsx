"use client";

import { useEffect, useState } from "react";
import { ListTree, ChevronDown } from "lucide-react";

export interface TocHeading {
  id: string;
  text: string;
  depth: number;
}

interface TableOfContentsProps {
  lang: string;
  selector?: string;
}

export function TableOfContents({ lang, selector = "main article" }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find container element
    const container = document.querySelector(selector);
    if (!container) return;

    // Find all H2 and H3 elements
    const elements = container.querySelectorAll("h2, h3");
    const items: TocHeading[] = [];

    elements.forEach((el, idx) => {
      const text = el.textContent?.trim() || "";
      if (!text) return;

      // Assign id if missing
      if (!el.id) {
        const slug = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        el.id = slug || `heading-${idx}`;
      }

      items.push({
        id: el.id,
        text,
        depth: el.tagName.toLowerCase() === "h3" ? 3 : 2,
      });
    });

    setHeadings(items);

    // Setup intersection observer for scroll highlighting
    const headingEls = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -65% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);

  if (headings.length === 0) return null;

  const titleText = lang === "fr" ? "Sommaire de l'article" : "Table of Contents";

  const renderItems = () => (
    <ul className="space-y-2">
      {headings.map((item) => {
        const isActive = activeId === item.id;
        const indent = item.depth === 3 ? "pl-3" : "pl-0";

        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.id);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(item.id);
                }
              }}
              className={`block text-xs leading-relaxed transition-all duration-200 ${indent} ${
                isActive
                  ? "text-accent font-bold bg-accent/5 px-2 py-1 rounded-md"
                  : "text-ink-soft hover:text-ink hover:bg-paper-raised/40 px-2 py-1 rounded-md"
              }`}
            >
              <span className="line-clamp-1">{item.text}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop version: sticky sidebar floating on the right side on xl screens */}
      <aside className="absolute top-0 -right-72 hidden h-full w-60 xl:block">
        <div className="sticky top-24 flex max-h-[calc(100vh-8rem)] flex-col gap-2 overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-line bg-paper/80 p-4 shadow-sm backdrop-blur-sm">
            <nav>
              <h4 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest font-bold text-ink-soft">
                <ListTree className="h-3.5 w-3.5 text-accent" />
                {titleText}
              </h4>
              {renderItems()}
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile / Tablet version: collapsible card right above article content */}
      <details className="group mb-8 rounded-xl border border-line bg-paper/80 p-4 shadow-sm backdrop-blur-sm xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[11px] font-bold uppercase tracking-widest text-ink select-none">
          <span className="flex items-center gap-2">
            <ListTree className="h-3.5 w-3.5 text-accent" />
            {titleText}
          </span>
          <ChevronDown className="h-4 w-4 text-ink-soft transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav className="mt-4 pt-3 border-t border-line/40">
          {renderItems()}
        </nav>
      </details>
    </>
  );
}
