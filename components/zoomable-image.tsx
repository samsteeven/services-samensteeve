"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

export function ZoomableImage({ src, alt, priority, className }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen]);

  return (
    <>
      {/* Aperçu cliquable */}
      <button
        type="button"
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-black ${className ?? ""}`}
        style={{ aspectRatio: "16/9" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        aria-label={`Voir ${alt ?? "l'image"} en plein écran`}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        {/* Badge zoom */}
        <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] text-white opacity-0 transition-all duration-200 group-hover:opacity-100 backdrop-blur-sm z-10 pointer-events-none">
          <ZoomIn className="h-3.5 w-3.5" />
          Voir en plein écran
        </span>
      </button>

      {/* Lightbox plein écran avec createPortal */}
      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Bouton fermer */}
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

          {/* Image plein écran */}
          <div
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt ?? ""}
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl"
            />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/50 uppercase tracking-wider pointer-events-none select-none">
            Cliquer à l'extérieur ou appuyer sur Echap pour fermer
          </p>
        </div>,
        document.body
      )}
    </>
  );
}
