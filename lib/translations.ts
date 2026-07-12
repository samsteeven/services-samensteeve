export { translations, getT, type Language, type Translation } from "./i18n";

export function getOppositeUrl(pathname: string, lang: "en" | "fr", hash?: string): string {
  if (!pathname) return "/";
  const segments = pathname.split("/");
  const targetLang = lang === "en" ? "fr" : "en";
  // Si le pathname commence par /en ou /fr, segments[1] est la langue
  if (segments[1] === "en" || segments[1] === "fr") {
    segments[1] = targetLang;
  } else {
    // Si pas de segment de langue au début (ex: /about), on l'ajoute
    return `/${targetLang}${pathname}${hash || ""}`;
  }
  const base = segments.join("/");
  return hash ? `${base}${hash}` : base;
}

