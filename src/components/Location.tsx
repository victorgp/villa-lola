"use client";

import { useTranslations } from "next-intl";
import {
  Umbrella,
  UtensilsCrossed,
  Sunset,
  Mountain,
  Building2,
  Plane,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const locations: {
  key: "beach" | "restaurants" | "lighthouse" | "camiCavalls" | "ciutadella" | "airport";
  icon: LucideIcon;
}[] = [
  { key: "beach", icon: Umbrella },
  { key: "restaurants", icon: UtensilsCrossed },
  { key: "lighthouse", icon: Sunset },
  { key: "camiCavalls", icon: Mountain },
  { key: "ciutadella", icon: Building2 },
  { key: "airport", icon: Plane },
];

export default function Location() {
  const t = useTranslations("Location");

  return (
    <section id="location" className="bg-pearl-blue/50 py-24 md:py-32">
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

        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-ocean/10 px-5 py-2.5 mb-10">
            <MapPin className="h-4 w-4 text-ocean" />
            <span className="text-sm font-medium text-ocean">
              Cap d&apos;Artrutx, Menorca — Balearic Islands, Spain
            </span>
          </div>
        </ScrollReveal>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-sand/20">
          {locations.map(({ key, icon: Icon }, i) => (
            <ScrollReveal key={key} delay={i * 0.06}>
              <div className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5 md:px-8 md:py-6 transition-colors hover:bg-pearl-blue/30 ${i < locations.length - 1 ? "border-b border-sand/20" : ""}`}>
                <div className="flex items-center gap-3 sm:contents">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean/10 sm:h-12 sm:w-12">
                    <Icon className="h-4 w-4 text-ocean sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex items-center gap-2 sm:hidden">
                    <h3 className="font-heading text-base font-bold text-navy">
                      {t(`${key}.title`)}
                    </h3>
                    <span className="inline-block rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold text-ocean whitespace-nowrap">
                      {t(`${key}.distance`)}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="hidden sm:block font-heading text-lg font-bold text-navy">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-sm text-navy-light">
                    {t(`${key}.description`)}
                  </p>
                </div>

                <div className="hidden shrink-0 sm:block">
                  <span className="inline-block rounded-full bg-ocean/10 px-4 py-1.5 text-xs font-semibold text-ocean whitespace-nowrap">
                    {t(`${key}.distance`)}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
