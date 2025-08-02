import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import traslation_en from "./en.json";
import traslation_ja from "./ja.json";

const resources = {
  ja: {
    translation: traslation_ja,
  },
  en: {
    translation: traslation_en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
