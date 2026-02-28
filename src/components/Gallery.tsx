"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Category = "all" | "livingAreas" | "bedrooms" | "poolGarden";

interface GalleryImage {
  src: string;
  alt: string;
  category: "livingAreas" | "bedrooms" | "poolGarden";
  span?: string;
}

const images: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    alt: "Villa exterior with pool",
    category: "poolGarden",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1572331165267-854da2b021b1?auto=format&fit=crop&w=600&q=80",
    alt: "Private swimming pool",
    category: "poolGarden",
  },
  {
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
    alt: "Sea view from terrace",
    category: "poolGarden",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80",
    alt: "Modern kitchen",
    category: "livingAreas",
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
    alt: "Living room",
    category: "livingAreas",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    alt: "Main bedroom",
    category: "bedrooms",
  },
  {
    src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    alt: "Mediterranean garden",
    category: "poolGarden",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    alt: "Outdoor BBQ area",
    category: "livingAreas",
  },
  {
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80",
    alt: "Second bedroom",
    category: "bedrooms",
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80",
    alt: "Bathroom",
    category: "bedrooms",
  },
];

const categories: { key: Category; labelKey: string }[] = [
  { key: "all", labelKey: "all" },
  { key: "livingAreas", labelKey: "livingAreas" },
  { key: "bedrooms", labelKey: "bedrooms" },
  { key: "poolGarden", labelKey: "poolGarden" },
];

export default function Gallery() {
  const t = useTranslations("Gallery");
  const [active, setActive] = useState<Category>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = active === "all"
    ? images
    : images.filter((img) => img.category === active);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const currentImage = filtered[lightboxIndex] ?? filtered[0];

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  return (
    <section id="gallery" className="py-24 md:py-32">
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

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map(({ key, labelKey }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active === key
                    ? "bg-ocean text-white shadow-md"
                    : "bg-pearl-blue text-navy-light hover:bg-sand-light hover:text-navy"
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, index) => (
              <motion.div
                key={`${img.src}-${img.alt}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group cursor-pointer overflow-hidden rounded-xl transition-transform duration-700 hover:scale-105 ${img.span ?? ""}`}
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="relative mx-4 max-h-[90vh] max-w-4xl">
            {currentImage && (
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
