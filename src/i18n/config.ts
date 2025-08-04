import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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

type SupportedLocales = keyof typeof resources;
export function localeConv(locale: SupportedLocales): string {
  const _tbl = { ja: "jaJP", en: "enUS", "en-US": "enUS" };
  if (locale in _tbl) {
    return _tbl[locale];
  }
  return "jaJP";
}

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

import { createContext, useState, useEffect } from "react";

type LocaleContext = {
  locale: SupportedLocales;
  setLocale: (locale: SupportedLocales) => void;
};
const defaultContext: LocaleContext = {
  locale: i18n.language as SupportedLocales,
  setLocale: () => {},
};
export const localeContext = createContext<LocaleContext>(defaultContext);

export const useLocale = (): LocaleContext => {
  const [locale, setLocale] = useState<SupportedLocales>(
    i18n.language as SupportedLocales
  );
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);
  return {
    locale,
    setLocale,
  };
};

export default i18n;
