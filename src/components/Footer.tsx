"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { MapPin, Mail, Heart } from "lucide-react";

const quickLinks = [
  "about",
  "spaces",
  "gallery",
  "location",
  "activities",
  "booking",
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Villa Lola
            </h2>
            <p className="mt-4 text-white/60">{t("description")}</p>
            <p className="mt-4 flex items-center gap-2 text-white/50">
              <MapPin className="h-5 w-5 shrink-0" />
              Cap d&apos;Artrutx, Menorca, Spain
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {t("quickLinks")}
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={`/#${key}`}
                    className="text-white/60 transition hover:text-seafoam-light"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {t("contact")}
            </h3>
            <a
              href="mailto:info@villalolamenorca.com"
              className="mt-4 flex items-center gap-2 text-white/60 transition hover:text-seafoam-light"
            >
              <Mail className="h-5 w-5 shrink-0" />
              info@villalolamenorca.com
            </a>
            <a
              href="#booking"
              className="mt-6 inline-block rounded-full bg-sunset px-6 py-2.5 font-semibold text-white transition hover:bg-sunset-dark"
            >
              {tNav("booking")}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 py-6 md:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Villa Lola. {t("rights")}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-white/40">
            <span>{t("partOf")}</span>
            <a
              href="https://www.zerodayrealty.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-white/40 hover:text-white/60 underline decoration-white/20 hover:decoration-white/40 transition-colors"
            >
              <span>Zero Day Realty</span>
              <img
                src="/images/zero-day-logo-white.png"
                alt="Zero Day Realty"
                className="h-5 w-auto opacity-50 group-hover:opacity-75 transition-opacity"
              />
            </a>
          </div>
          <p className="flex items-center gap-1 text-sm text-white/60">
            {t("madeWith")}{" "}
            <Heart className="h-4 w-4 fill-sunset text-sunset" />
          </p>
        </div>
      </div>
    </footer>
  );
}
