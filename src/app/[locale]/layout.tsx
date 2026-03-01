import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import {
  SITE_URL,
  getOgLocale,
  getAlternateLanguages,
  getCanonicalUrl,
  getOgImageUrl,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Menorca",
      "villa",
      "holiday rental",
      "Mediterranean",
      "Balearic Islands",
      "Spain",
      "sea view",
      "pool",
      "Villa Lola",
      "Cap d'Artrutx",
      "Cala en Bosc",
      "sunset",
      "lighthouse",
    ],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: getCanonicalUrl(locale as Locale),
      languages: getAlternateLanguages(),
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      type: "website",
      locale: getOgLocale(locale as Locale),
      url: getCanonicalUrl(locale as Locale),
      siteName: "Villa Lola",
      images: [
        {
          url: getOgImageUrl(),
          width: 1200,
          height: 630,
          alt: "Villa Lola — Coastal Villa in Menorca",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: [getOgImageUrl()],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${nunito.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
