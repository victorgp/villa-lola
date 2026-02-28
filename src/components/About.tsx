"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const t = useTranslations("About");
  const tHero = useTranslations("Hero");

  const stats = [
    { value: "3", key: "bedrooms" },
    { value: "2", key: "bathrooms" },
    { value: "6", key: "guests" },
  ] as const;

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Menorca coast"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-dashed border-seafoam/30 -z-10" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="h-1 w-12 rounded-full bg-ocean mb-4" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
              {t("label")}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy-light">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>

            <div className="mt-10 flex gap-10 border-t border-sand pt-8">
              {stats.map(({ value, key }) => (
                <div key={key}>
                  <span className="font-heading text-4xl font-bold text-ocean">
                    {value}
                  </span>
                  <p className="mt-1 text-sm text-navy-light">{tHero(key)}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
