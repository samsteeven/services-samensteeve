import { en } from "./en";
import { fr } from "./fr";

export type Language = "en" | "fr";

export const translations = { en, fr } as const;

export type Translation = (typeof translations)[Language];

/** Helper centralisé : récupère les traductions avec fallback vers l'anglais. */
export function getT(lang: Language): Translation {
  return translations[lang] ?? translations.en;
}

export function getOppositeUrl(pathname: string, lang: "en" | "fr", hash?: string): string {
  if (!pathname) return "/";
  const segments = pathname.split("/");
  const targetLang = lang === "en" ? "fr" : "en";
  if (segments[1] === "en" || segments[1] === "fr") {
    segments[1] = targetLang;
  } else {
    return `/${targetLang}${pathname}${hash || ""}`;
  }
  const base = segments.join("/");
  return hash ? `${base}${hash}` : base;
}
