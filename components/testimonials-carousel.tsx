"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getT, type Language } from "@/lib/i18n";

interface TestimonialsCarouselProps {
  lang: Language;
}

const DURATION = 5000; // ms per slide

export function TestimonialsCarousel({ lang }: TestimonialsCarouselProps) {
  const t = getT(lang);
  const testimonials: ReadonlyArray<{ quote: string; author: string; role: string; company: string }> =
    t.testimonials?.items ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // Each time we change slide, bump this key so progress bar CSS restarts
  const [progressKey, setProgressKey] = useState(0);

  const touchStartX = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      // After a quick out-fade, switch slide and trigger in-fade
      setTimeout(() => {
        setCurrentIndex((index + testimonials.length) % testimonials.length);
        setProgressKey((k) => k + 1);
        setIsAnimating(false);
      }, 250);
    },
    [isAnimating, testimonials.length],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    intervalRef.current = setInterval(next, DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next, testimonials.length]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
    setIsPaused(false);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-paper transition-all duration-300 relative overflow-hidden border-t border-line">
      {/* Horizontal line across full viewport — decorative, pointer-events none */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-line -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-8 relative flex items-center justify-center">
        {/*
          ── The bordered box is the ONLY zone that pauses auto-scroll on hover ──
          Moving the mouse outside the box (but still in <section>) keeps the
          carousel running.
        */}
        <div
          className="w-full max-w-2xl bg-paper px-6 sm:px-10 py-10 border-l border-r border-line relative z-10 flex flex-col items-start text-left touch-pan-y select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Quote icon */}
          <div className="mb-5 flex h-7 w-7 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Slide — smooth opacity + y transition */}
          <div
            className="w-full transition-all duration-250 ease-out"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(6px)" : "translateY(0px)",
            }}
          >
            <blockquote className="font-sans text-sm sm:text-base leading-relaxed text-ink/90 font-medium min-h-[80px]">
              &ldquo;{testimonials[currentIndex].quote}&rdquo;
            </blockquote>

            {/* Author */}
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

          {/* Progress dots */}
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
                      key={progressKey}
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      style={{
                        width: "0%",
                        animation: `testimonialProgress ${DURATION}ms linear forwards`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
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
