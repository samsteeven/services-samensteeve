"use client";

import { useState, useEffect, useRef } from "react";
import { getT, type Language } from "@/lib/i18n";

interface TestimonialsCarouselProps {
  lang: Language;
}

export function TestimonialsCarousel({ lang }: TestimonialsCarouselProps) {
  const t = getT(lang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const testimonials: ReadonlyArray<{ quote: string; author: string; role: string; company: string }> = t.testimonials?.items ?? [];
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTick((v) => v + 1);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTick((v) => v + 1);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTick((v) => v + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
    setIsPaused(false);
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  if (testimonials.length === 0) return null;

  return (
    <section 
      className="py-20 bg-paper transition-all duration-300 relative overflow-hidden border-t border-line"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); setTick((v) => v + 1); }}
    >
      {/* Horizontal Line across viewport (behind the box) */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-line -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-8 relative flex items-center justify-center">
        {/* Centered Box with vertical borders */}
        <div 
          ref={containerRef}
          className="w-full max-w-2xl bg-paper px-6 sm:px-10 py-10 border-l border-r border-line relative z-10 flex flex-col items-start text-left touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Emerald Quote Icon */}
          <div className="mb-5 flex h-7 w-7 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
            <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Testimonial Quote with fade-up animation */}
          <blockquote key={currentIndex} className="fade-up font-sans text-sm sm:text-base leading-relaxed text-ink/90 font-medium min-h-[80px]">
            &ldquo;{testimonials[currentIndex].quote}&rdquo;
          </blockquote>

          {/* Author Block */}
          <div className="mt-8 flex items-center gap-3">
            {/* Initials Avatar */}
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

          {/* Dots Indicator with inline progress */}
          <div className="mt-8 flex gap-2 justify-center w-full">
            {testimonials.map((_, index: number) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  onClick={() => { setCurrentIndex(index); setTick((v) => v + 1); }}
                  className="relative h-1.5 w-6 overflow-hidden rounded-full bg-line/30"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {isActive && (
                    <span
                      key={`dot-${tick}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      style={{ width: "0%", animation: "testimonialProgress 5s linear forwards" }}
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
