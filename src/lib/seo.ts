import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://villalolamenorca.com";

const ogLocaleMap: Record<Locale, string> = {
  en: "en_GB",
  es: "es_ES",
  fr: "fr_FR",
  it: "it_IT",
  de: "de_DE",
  ca: "ca_ES",
};

export function getOgLocale(locale: Locale): string {
  return ogLocaleMap[locale];
}

export function getAlternateLanguages(): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[ogLocaleMap[locale]] = `${SITE_URL}/${locale}`;
  }
  languages["x-default"] = `${SITE_URL}/en`;
  return languages;
}

export function getCanonicalUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}`;
}

const OG_IMAGE_BLOB_URL =
  "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-front.jpg";

export function getOgImageUrl(): string {
  return `${SITE_URL}/_next/image?url=${encodeURIComponent(OG_IMAGE_BLOB_URL)}&w=1200&q=75`;
}
