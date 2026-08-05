"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  // Focus cancel button when modal opens
  useEffect(() => {
    if (open) {
      cancelBtnRef.current?.focus();
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm rounded-2xl border border-line bg-paper shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-ink-soft hover:text-ink hover:bg-paper-raised transition"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>

          {/* Title */}
          <h2
            id="confirm-modal-title"
            className="text-center font-display text-lg font-bold text-ink"
          >
            {title}
          </h2>

          {/* Description */}
          <p
            id="confirm-modal-desc"
            className="mt-2 text-center text-sm leading-relaxed text-ink-soft"
          >
            {description}
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <button
              ref={cancelBtnRef}
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-xl border border-line bg-paper-raised px-5 py-2.5 font-mono text-[11px] uppercase font-bold tracking-wider text-ink-soft transition hover:border-ink-soft/60 hover:text-ink"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center justify-center rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-2.5 font-mono text-[11px] uppercase font-bold tracking-wider text-red-400 transition hover:bg-red-500/20 hover:border-red-400"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
