"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "./ScrollReveal";

const activities = [
  {
    key: "beaches",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "hiking",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "towns",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "gastronomy",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "watersports",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  },
] as const;

export default function Activities() {
  const t = useTranslations("Activities");

  return (
    <section id="activities" className="py-24 md:py-32">
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

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {activities.map(({ key, image }, i) => (
            <ScrollReveal key={key} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`${key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <span className="text-xs font-semibold text-seafoam-light tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold text-white md:text-xl">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 leading-relaxed line-clamp-3 md:text-sm">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
