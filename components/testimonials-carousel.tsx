"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getT, type Language } from "@/lib/i18n";

interface TestimonialsCarouselProps {
  lang: Language;
}

const SLIDE_DURATION = 5000; // ms per slide
const FADE_DURATION  = 250;  // ms out-fade before switching content

export function TestimonialsCarousel({ lang }: TestimonialsCarouselProps) {
  const t = getT(lang);
  const testimonials: ReadonlyArray<{
    quote: string;
    author: string;
    role: string;
    company: string;
  }> = t.testimonials?.items ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ── RAF-driven state (no React re-renders for these) ─────────────────────
  const isPausedRef    = useRef(false);
  const isAnimRef      = useRef(false);        // mirrors isAnimating without stale closure
  const elapsedRef     = useRef(0);            // ms elapsed in current slide
  const lastTickRef    = useRef(0);
  const rafRef         = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null); // active dot fill
  const currentIdxRef  = useRef(0);
  const countRef       = useRef(testimonials.length);

  const touchStartX = useRef(0);

  // Keep countRef in sync when testimonials change
  useEffect(() => { countRef.current = testimonials.length; }, [testimonials.length]);

  // ── Navigate to a specific index ─────────────────────────────────────────
  const goTo = useCallback((targetIndex: number) => {
    if (isAnimRef.current) return;
    isAnimRef.current = true;
    setIsAnimating(true);

    // Reset progress bar immediately
    elapsedRef.current = 0;
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";

    // Wait for fade-out, then swap content
    setTimeout(() => {
      const next = ((targetIndex % countRef.current) + countRef.current) % countRef.current;
      currentIdxRef.current = next;
      setCurrentIndex(next);

      // Give React one render to mount the new slide before un-freezing
      setTimeout(() => {
        isAnimRef.current = false;
        setIsAnimating(false);
      }, 50);
    }, FADE_DURATION);
  }, []);

  // ── requestAnimationFrame loop ────────────────────────────────────────────
  useEffect(() => {
    if (testimonials.length <= 1) return;

    lastTickRef.current = performance.now();

    const loop = (now: number) => {
      if (!isPausedRef.current && !isAnimRef.current) {
        const delta = now - lastTickRef.current;
        elapsedRef.current += delta;

        const pct = Math.min((elapsedRef.current / SLIDE_DURATION) * 100, 100);

        // Write directly to the DOM — no React re-render
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${pct}%`;
        }

        if (elapsedRef.current >= SLIDE_DURATION) {
          // Advance slide
          isAnimRef.current = true;
          elapsedRef.current = 0;
          if (progressBarRef.current) progressBarRef.current.style.width = "0%";
          setIsAnimating(true);

          setTimeout(() => {
            const next = (currentIdxRef.current + 1) % countRef.current;
            currentIdxRef.current = next;
            setCurrentIndex(next);
            setTimeout(() => {
              isAnimRef.current = false;
              setIsAnimating(false);
            }, 50);
          }, FADE_DURATION);
        }
      }

      // Always keep lastTickRef current (so delta is correct on resume)
      lastTickRef.current = now;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [testimonials.length]); // mount once; stable thanks to refs

  // ── Mouse handlers (inner box only) ───────────────────────────────────────
  const handleMouseEnter  = () => { isPausedRef.current = true; };
  const handleMouseLeave  = () => { isPausedRef.current = false; };

  // ── Touch handlers ─────────────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    isPausedRef.current = true;          // pause while finger is down
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(currentIdxRef.current + 1);
      else          goTo(currentIdxRef.current - 1);
    }
    isPausedRef.current = false;         // resume on lift
  };
  const handleTouchCancel = () => {
    // Finger left the element (e.g. page scroll) — always resume
    isPausedRef.current = false;
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-paper transition-all duration-300 relative overflow-hidden border-t border-line">
      {/* Decorative horizontal line — full viewport width */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-line -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-8 relative flex items-center justify-center">
        {/*
          ── The bordered box is the ONLY pause zone ──────────────────────────
          Hovering / touching OUTSIDE this box keeps the carousel running.
          onTouchCancel ensures mobile page-scroll doesn't freeze the carousel.
        */}
        <div
          className="w-full max-w-2xl bg-paper px-6 sm:px-10 py-10 border-l border-r border-line relative z-10 flex flex-col items-start text-left touch-pan-y select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          {/* Quote icon */}
          <div className="mb-5 flex h-7 w-7 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Slide — smooth opacity+y transition driven by isAnimating state */}
          <div
            className="w-full"
            style={{
              transition: `opacity ${FADE_DURATION}ms ease-out, transform ${FADE_DURATION}ms ease-out`,
              opacity:   isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(7px)" : "translateY(0px)",
              willChange: "opacity, transform",
            }}
          >
            <blockquote className="font-sans text-sm sm:text-base leading-relaxed text-ink/90 font-medium min-h-[80px]">
              &ldquo;{testimonials[currentIndex].quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent font-mono text-[10px] font-bold border border-accent/20">
                {getInitials(testimonials[currentIndex].author)}
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-bold text-ink leading-none">
                  {testimonials[currentIndex].author}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-ink-soft/75">
                  {testimonials[currentIndex].role} · {testimonials[currentIndex].company}
                </span>
              </div>
            </div>
          </div>

          {/* Progress dots — active bar width driven at 60fps via RAF + ref */}
          <div className="mt-8 flex gap-2 justify-center w-full">
            {testimonials.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className="relative h-1.5 w-6 overflow-hidden rounded-full bg-line/30 cursor-pointer"
                  aria-label={`Aller au témoignage ${index + 1}`}
                >
                  {isActive && (
                    <span
                      ref={progressBarRef}
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      style={{ width: "0%" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
