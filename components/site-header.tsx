"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { getT, getOppositeUrl, type Language } from "@/lib/translations";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

export function SiteHeader({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exploreCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!pathname.includes("/blog")) {
        setScrollProgress(0);
        return;
      }
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Safe asynchronous call within useEffect

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Hover helpers with delayed close to avoid flickering
  const openServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    setServicesOpen(true);
    setExploreOpen(false);
  };
  const closeServices = () => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };
  const openExplore = () => {
    if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current);
    setExploreOpen(true);
    setServicesOpen(false);
  };
  const closeExplore = () => {
    exploreCloseTimer.current = setTimeout(() => setExploreOpen(false), 150);
  };

  const oppositeLang = t.nav.opposite;

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    const cleanHref = href.replace(/^\/[a-z]{2}/, "") || "/";
    if (cleanHref === "/") return cleanPath === "/";
    return cleanPath.startsWith(cleanHref);
  };

  const dropdownBase =
    "absolute top-full mt-2 left-0 min-w-[200px] rounded-xl border border-line bg-paper-raised/95 backdrop-blur-md shadow-lg py-1.5 z-50 animate-fade-in";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 transition-all duration-200 hover:opacity-85 group shrink-0"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-line bg-paper-raised/80 shadow-sm transition-all duration-300 group-hover:border-accent/40 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profil.png"
              alt="Samen Steeve"
              className="h-full w-full object-cover object-[center_15%]"
            />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-wider text-accent px-1.5 py-0.5 rounded-md bg-accent/10 group-hover:bg-accent group-hover:text-white transition duration-200">
            {t.nav.servicesLabel}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider text-ink-soft">

          {/* ── Services Dropdown ── */}
          <div className="relative" ref={servicesRef} onMouseEnter={openServices} onMouseLeave={closeServices}>
            <button
              onClick={() => { setServicesOpen((v) => !v); setExploreOpen(false); }}
              className={`flex items-center uppercase gap-1 py-1 transition-all duration-200 hover:text-accent ${
                isActive(`/${lang}/services`) ? "text-accent" : ""
              }`}
            >
              {t.nav.services}
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className={dropdownBase} onMouseEnter={openServices} onMouseLeave={closeServices}>
                {t.nav.serviceItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${lang}/services/${item.slug}`}
                    onClick={() => setServicesOpen(false)}
                    className={`block px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider transition duration-150 hover:text-accent hover:bg-accent/5 ${
                      isActive(`/${lang}/services/${item.slug}`) ? "text-accent" : "text-ink-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Explorer Dropdown ── */}
          <div className="relative" ref={exploreRef} onMouseEnter={openExplore} onMouseLeave={closeExplore}>
            <button
              onClick={() => { setExploreOpen((v) => !v); setServicesOpen(false); }}
              className={`flex items-center gap-1 py-1 uppercase transition-all duration-200 hover:text-accent ${
                isActive(`/${lang}/comment-ca-marche`) || isActive(`/${lang}/realisations`) ? "text-accent" : ""
              }`}
            >
              {t.nav.explore}
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
            </button>
            {exploreOpen && (
              <div className={dropdownBase} onMouseEnter={openExplore} onMouseLeave={closeExplore}>
                <Link
                  href={`/${lang}/comment-ca-marche`}
                  onClick={() => setExploreOpen(false)}
                  className={`block px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider transition duration-150 hover:text-accent hover:bg-accent/5 ${
                    isActive(`/${lang}/comment-ca-marche`) ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  {t.nav.process}
                </Link>
                <Link
                  href={`/${lang}/realisations`}
                  onClick={() => setExploreOpen(false)}
                  className={`block px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider transition duration-150 hover:text-accent hover:bg-accent/5 ${
                    isActive(`/${lang}/realisations`) ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  {t.nav.realisations}
                </Link>
                <Link
                  href={`/${lang}/blog`}
                  onClick={() => setExploreOpen(false)}
                  className={`block px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider transition duration-150 hover:text-accent hover:bg-accent/5 ${
                    isActive(`/${lang}/blog`) ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  {t.nav.blog}
                </Link>
              </div>
            )}
          </div>

          {/* ── Moi / Portfolio ── */}
          <a
            href="https://samensteeve.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 transition-all duration-200 hover:text-accent"
          >
            {t.nav.moi}
          </a>

          <span className="h-3 w-px bg-line/60" />

          {/* Lang switch */}
          <Link
            href={getOppositeUrl(pathname, lang, hash)}
            scroll={false}
            className="font-semibold text-ink-soft hover:text-accent transition duration-200"
          >
            {oppositeLang}
          </Link>

          <ThemeToggle />

          {/* CTA */}
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
          <nav className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider text-ink-soft">
            {/* Services group */}
            <p className="pt-2 pb-1 text-[9px] font-bold tracking-widest text-ink-soft/40">{t.nav.services}</p>
            {t.nav.serviceItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/services/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className={`py-2 pl-2 border-b border-line/20 transition duration-200 ${
                  isActive(`/${lang}/services/${item.slug}`) ? "text-accent font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Explorer group */}
            <p className="pt-4 pb-1 text-[9px] font-bold tracking-widest text-ink-soft/40">{t.nav.explore}</p>
            <Link
              href={`/${lang}/comment-ca-marche`}
              onClick={() => setIsOpen(false)}
              className={`py-2 pl-2 border-b border-line/20 transition duration-200 ${
                isActive(`/${lang}/comment-ca-marche`) ? "text-accent font-semibold" : ""
              }`}
            >
              {t.nav.process}
            </Link>
            <Link
              href={`/${lang}/realisations`}
              onClick={() => setIsOpen(false)}
              className={`py-2 pl-2 border-b border-line/20 transition duration-200 ${
                isActive(`/${lang}/realisations`) ? "text-accent font-semibold" : ""
              }`}
            >
              {t.nav.realisations}
            </Link>
            <Link
              href={`/${lang}/blog`}
              onClick={() => setIsOpen(false)}
              className={`py-2 pl-2 border-b border-line/20 transition duration-200 ${
                isActive(`/${lang}/blog`) ? "text-accent font-semibold" : ""
              }`}
            >
              {t.nav.blog}
            </Link>

            {/* Moi */}
            <a
              href="https://samensteeve.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="py-2 pl-2 border-b border-line/20 transition duration-200"
            >
              {t.nav.moi}
            </a>

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
      {/* Scroll Progress Bar for Blog & Details */}
      {pathname.includes("/blog") && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      )}
    </header>
  );
}
