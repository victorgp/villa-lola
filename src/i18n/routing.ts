import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "ca", "fr", "it", "de"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
