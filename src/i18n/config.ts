import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { enUS, jaJP } from "@mui/material/locale";

import traslation_en from "./en.json";
import traslation_ja from "./ja.json";

const resources = {
  ja: {
    translation: traslation_ja,
  },
  en: {
    translation: traslation_en,
  },
  "en-US": {
    translation: traslation_en,
  },
};

export type SupportedLocale = keyof typeof resources;
export const muiLocales = { ja: jaJP, en: enUS, "en-US": enUS };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ja",
    supportedLngs: Object.keys(resources),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
