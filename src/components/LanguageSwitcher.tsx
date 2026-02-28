"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";
import type { ReactNode } from "react";

const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ca: "Català",
  fr: "Français",
  it: "Italiano",
  de: "Deutsch",
};

function CatalanFlag() {
  return (
    <svg viewBox="0 0 640 480" width="1.2em" height="0.9em" aria-label="Catalan flag">
      <rect width="640" height="480" fill="#FCDD09" />
      <path stroke="#DA121A" strokeWidth="53.3" d="M0 80h640M0 186.7h640M0 293.3h640M0 400h640" />
    </svg>
  );
}

const localeFlags: Record<Locale, ReactNode> = {
  en: "🇬🇧",
  es: "🇪🇸",
  ca: <CatalanFlag />,
  fr: "🇫🇷",
  it: "🇮🇹",
  de: "🇩🇪",
};

export default function LanguageSwitcher({ isScrolled }: { isScrolled: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          isScrolled
            ? "text-navy hover:bg-pearl-blue"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
        aria-label="Change language"
      >
        <Globe size={16} />
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-sand/50 py-2 min-w-[160px] z-50">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                l === locale
                  ? "bg-pearl-blue text-ocean font-medium"
                  : "text-navy hover:bg-pearl-blue/50"
              }`}
            >
              <span className="text-base">{localeFlags[l]}</span>
              <span>{localeLabels[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
