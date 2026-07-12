"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { getT, getOppositeUrl, type Language } from "@/lib/translations";
import { Menu, X, ArrowRight } from "lucide-react";

export function SiteHeader({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState("");
  const t = getT(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const navLinks = [
    { href: `/${lang}/services`, label: t.nav.services, key: "services" },
    { href: `/${lang}/comment-ca-marche`, label: t.nav.process, key: "process" },
    { href: `/${lang}/realisations`, label: t.nav.realisations, key: "realisations" },
  ];

  const oppositeLang = t.nav.opposite;

  const isActive = (href: string) => {
    // Si la route courante commence par le lien (en ignorant la langue)
    const cleanPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    const cleanHref = href.replace(/^\/[a-z]{2}/, "") || "/";
    
    if (cleanHref === "/") {
      return cleanPath === "/";
    }
    return cleanPath.startsWith(cleanHref);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 transition-all duration-200 hover:opacity-85 group shrink-0"
        >
          <span className="font-display text-base font-extrabold tracking-tight text-ink">
            SAMEN STEEVE<span className="font-mono text-xs font-semibold text-accent ml-1 px-1.5 py-0.5 rounded-md bg-accent/10">SERVICES</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                isActive(link.href) ? "text-accent after:w-full" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="h-3 w-px bg-line/60" />
          <Link
            href={getOppositeUrl(pathname, lang, hash)}
            scroll={false}
            className="font-semibold text-ink-soft hover:text-accent transition duration-200"
          >
            {oppositeLang}
          </Link>
          <ThemeToggle />
          <Link
            href={`/${lang}/demarrer-un-projet`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-paper hover:bg-accent hover:text-white transition duration-200 hover:scale-105 active:scale-[0.96]"
          >
            {t.nav.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="rounded-full border border-line p-2 text-ink hover:border-ink-soft active:scale-[0.96]"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-line bg-paper-raised/95 px-6 py-6 transition-all duration-300 backdrop-blur-lg animate-fade-in">
          <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider text-ink-soft">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 transition duration-200 border-b border-line/30 ${
                  isActive(link.href) ? "text-accent font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <Link
                href={getOppositeUrl(pathname, lang, hash)}
                scroll={false}
                onClick={() => setIsOpen(false)}
                className="font-semibold text-ink hover:text-accent transition duration-200"
              >
                {oppositeLang === "EN" ? "Switch to English" : "Passer en Français"}
              </Link>
            </div>
            <Link
              href={`/${lang}/demarrer-un-projet`}
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-ink py-3 font-semibold text-paper hover:bg-accent hover:text-white transition duration-200"
            >
              {t.nav.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
