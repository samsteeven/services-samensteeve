import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";

const BASE_URL = SITE_URL;

const DEFAULT_OG_IMAGE = "/layout_app.png";

export interface PageMetadataOptions {
  lang: Language;
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

/**
 * Fabrique un objet Metadata Next.js complet avec :
 * - canonical + lang alternates (hreflang)
 * - Open Graph + Twitter card (toujours summary_large_image)
 * - image par défaut (layout_app) ou personnalisée avec dimensions
 */
export function createPageMetadata({
  lang,
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageMetadataOptions): Metadata {
  const altLang: Language = lang === "fr" ? "en" : "fr";
  // L'anglais est à la racine (pas de /en visible), le français sous /fr
  const canonicalUrl = lang === "en" ? `${BASE_URL}${path}` : `${BASE_URL}/fr${path}`;
  const altUrl = lang === "en" ? `${BASE_URL}/fr${path}` : `${BASE_URL}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;
  const ogImage = image === DEFAULT_OG_IMAGE
    ? { url: absoluteImage, width: 1902, height: 926, alt: title }
    : { url: absoluteImage, alt: title };

  return {
    title: `${title} — Samen Steeve`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [lang]: canonicalUrl,
        [altLang]: altUrl,
        // x-default = URL anglaise propre (sans /en)
        "x-default": `${BASE_URL}${path}`,
      },
    },
    openGraph: {
      type,
      title,
      description,
      url: canonicalUrl,
      siteName: "Samen Steeve · Services",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: altLang === "fr" ? "fr_FR" : "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export { BASE_URL, DEFAULT_OG_IMAGE };
