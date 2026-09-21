"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

export function ScreenshotCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = images.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, count]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (count === 0) return null;
  const current = images[index];

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border border-line bg-black">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="cursor-zoom-in object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => setIsOpen(true)}
            aria-label={`Voir ${current.alt} en plein écran`}
          />
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Capture précédente"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Capture suivante"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/90 backdrop-blur-sm">
            {index + 1}/{count}
          </span>
        </div>
        {current.caption && (
          <figcaption className="border-t border-line bg-paper px-4 py-3 text-xs leading-relaxed text-ink-soft">
            {current.caption}
          </figcaption>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Aller à la capture ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-ink-soft/40"
              }`}
            />
          ))}
        </div>
      )}

      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition duration-200 z-[10000]"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          {count > 1 && (
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition duration-200 z-[10000]"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Capture précédente"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <div
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl"
            />
          </div>

          {count > 1 && (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition duration-200 z-[10000]"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Capture suivante"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/50 uppercase tracking-wider pointer-events-none select-none">
            Flèches pour naviguer, cliquer à l&apos;extérieur ou Echap pour fermer
          </p>
        </div>,
        document.body
      )}
    </figure>
  );
}
