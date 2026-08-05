import { en } from "./en";
import { fr } from "./fr";

export type Language = "en" | "fr";

export const translations = { en, fr } as const;

export type Translation = (typeof translations)[Language];

/** Helper centralisé : récupère les traductions avec fallback vers l'anglais. */
export function getT(lang: Language): Translation {
  return translations[lang] ?? translations.en;
}

/**
 * Retourne l'URL pour la langue opposée.
 * L'anglais est la langue par défaut (sans préfixe visible dans l'URL).
 * Ex: /fr/services/dev → /services/dev   (switch FR → EN)
 * Ex: /blog/mon-article → /fr/blog/mon-article (switch EN → FR)
 */
export function getOppositeUrl(pathname: string, lang: "en" | "fr", hash?: string): string {
  if (!pathname) return "/";
  const targetLang = lang === "en" ? "fr" : "en";

  if (targetLang === "fr") {
    // EN → FR : enlever l'éventuel /en puis préfixer par /fr
    const cleanPath = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname;
    const base = cleanPath === "/" ? "/fr" : `/fr${cleanPath}`;
    return hash ? `${base}${hash}` : base;
  }

  // FR → EN : enlever /fr (la racine = anglais, pas de préfixe)
  const cleanPath = pathname.startsWith("/fr") ? pathname.slice(3) || "/" : pathname;
  return hash ? `${cleanPath}${hash}` : cleanPath;
}
