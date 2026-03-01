"use client";

import Image from "next/image";
import {
  Waves,
  Sunset,
  Flower2,
  Flame,
  Sofa,
  ChefHat,
  Bed,
  Bath,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ScrollReveal from "./ScrollReveal";

interface SpaceItem {
  key: string;
  icon: LucideIcon;
  image: string;
}

const spaces: SpaceItem[] = [
  {
    key: "pool",
    icon: Waves,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-pool.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "seaViews",
    icon: Sunset,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-sunset.avif?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "garden",
    icon: Flower2,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-garden.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "bbq",
    icon: Flame,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-outdoor-dining.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "living",
    icon: Sofa,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-livingroom.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "kitchen",
    icon: ChefHat,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-kitchen.avif?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "bedrooms",
    icon: Bed,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-room.jpg?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "bathrooms",
    icon: Bath,
    image: "https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-bathroom.avif?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Spaces() {
  const t = useTranslations("Spaces");

  return (
    <section id="spaces" className="bg-pearl-blue/50 py-24 md:py-32">
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

        <div className="grid gap-4 md:grid-cols-2">
          {spaces.map((space, i) => (
            <ScrollReveal key={space.key} delay={i * 0.06}>
              <div className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="relative h-48 sm:h-full min-h-[160px] overflow-hidden">
                  <Image
                    src={space.image}
                    alt={t(`${space.key}.title`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>
                <div className="flex flex-col justify-center p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ocean/10">
                    <space.icon className="h-5 w-5 text-ocean" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy group-hover:text-ocean transition-colors">
                    {t(`${space.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-navy-light leading-relaxed">
                    {t(`${space.key}.description`)}
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
