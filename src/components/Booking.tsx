"use client";

import { useTranslations } from "next-intl";
import { Star, ExternalLink } from "lucide-react";
import ContactForm from "./ContactForm";
import ScrollReveal from "./ScrollReveal";

const platforms = [
  {
    key: "airbnb",
    href: "https://airbnb.com/h/menorcastylevilla",
    bg: "bg-[#FF5A5F] hover:bg-[#E04E52]",
    text: "text-white",
  },
  {
    key: "bookingcom",
    href: "https://www.booking.com/hotel/es/menorca-style-villa-with-seaviews-and-private-pool.html",
    bg: "bg-[#003580] hover:bg-[#002A66]",
    text: "text-white",
  },
  {
    key: "vrbo",
    href: "https://www.vrbo.com/en-gb/p2353378vb",
    bg: "bg-[#3D67B2] hover:bg-[#2F5293]",
    text: "text-white",
  },
  {
    key: "expedia",
    href: "https://www.expedia.com/Ciutadella-De-Menorca-Hotels-Menorca-Style-Villa-With-Seaviews-And-Private-Pool.h68805284.Hotel-Information",
    bg: "bg-[#FBCE04] hover:bg-[#E2B800]",
    text: "text-navy",
  },
] as const;

export default function Booking() {
  const t = useTranslations("Booking");

  return (
    <section id="booking" className="bg-pearl-blue/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16">
            <div className="h-1 w-12 rounded-full bg-ocean mb-4" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
              {t("label")}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-navy-light">
              {t("subtitle")}
            </p>
          </div>
        </ScrollReveal>

        {/* Direct booking — form with benefit callout */}
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-3 rounded-full bg-sunset/10 px-5 py-3">
              <Star className="h-5 w-5 shrink-0 text-sunset" />
              <div>
                <span className="font-heading text-base font-bold text-navy">
                  {t("directTitle")}
                </span>
                <span className="mx-2 text-navy-light">—</span>
                <span className="text-sm text-navy-light">
                  {t("directBenefit")}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-sand/20 bg-white p-6 shadow-sm md:p-10">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        {/* OTA platforms — horizontal row */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-sand/20 bg-white p-6 shadow-sm md:p-8">
            <h3 className="font-heading text-xl font-bold text-navy">
              {t("platformsTitle")}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {platforms.map(({ key, href, bg, text }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition shadow-sm hover:shadow-md ${bg} ${text}`}
                >
                  <span>{t(key)}</span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
