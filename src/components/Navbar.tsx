"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const navKeys = ["about", "spaces", "gallery", "location", "activities"] as const;

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = isScrolled
    ? "bg-pearl/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  const logoClasses = isScrolled ? "text-ocean" : "text-white";
  const linkClasses = isScrolled
    ? "text-navy hover:text-ocean"
    : "text-white hover:text-white/90";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-2xl font-bold">
          <span className={logoClasses}>Villa Lola</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/#${key}`}
              className={`text-sm font-medium transition ${linkClasses}`}
            >
              {t(key)}
            </Link>
          ))}
          <a
            href="#booking"
            className="rounded-full bg-sunset px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sunset-dark"
          >
            {t("booking")}
          </a>
          <LanguageSwitcher isScrolled={isScrolled} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher isScrolled={isScrolled} />
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`rounded-lg p-2 ${isScrolled ? "text-navy" : "text-white"}`}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-sand/20 bg-pearl md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={`/#${key}`}
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-navy transition hover:bg-pearl-blue hover:text-ocean"
              >
                {t(key)}
              </Link>
            ))}
            <a
              href="#booking"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-full bg-sunset px-4 py-3 text-center font-semibold text-white hover:bg-sunset-dark"
            >
              {t("booking")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
