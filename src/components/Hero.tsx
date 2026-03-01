"use client";

import { motion } from "framer-motion";
import { Bed, Bath, Users, Sunset, AirVent, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const stats = [
  { icon: Bed, value: "3", key: "bedrooms" },
  { icon: Bath, value: "2", key: "bathrooms" },
  { icon: Users, value: "6", key: "guests" },
  { icon: Sunset, value: "", key: "seaView" },
  { icon: AirVent, value: "", key: "airCon" },
] as const;

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://jntdgku86zvk2i5q.public.blob.vercel-storage.com/villa-lola-front.jpg?auto=format&fit=crop&w=2000&q=80")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Wave accent at top */}
      <div className="absolute top-0 left-0 right-0 z-10 rotate-180">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-[14px] md:h-[20px]">
          <path
            d="M0,60 C240,10 480,100 720,50 C960,0 1200,80 1440,40 L1440,120 L0,120 Z"
            className="fill-pearl"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pl-8 text-left sm:pl-12 lg:pl-20"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-seafoam-light">
            Cap d&apos;Artrutx, Menorca
          </p>
          <h1 className="font-heading text-5xl font-bold text-white/80 sm:text-6xl md:text-7xl lg:text-8xl">
            Villa Lola
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light text-white/90 sm:text-xl md:text-2xl">
            {t("tagline")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 sm:flex-nowrap">
            {stats.map(({ icon: Icon, value, key }) => (
              <div
                key={key}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm whitespace-nowrap"
              >
                <Icon className="h-3.5 w-3.5 text-white/90" />
                <span className="text-xs font-medium text-white/90 sm:text-sm">
                  {value ? `${value} ${t(key)}` : t(key)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.a>

      {/* Wave divider — coastal transition into About section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[80px]">
          <path
            d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120 Z"
            className="fill-pearl"
          />
        </svg>
      </div>
    </section>
  );
}
