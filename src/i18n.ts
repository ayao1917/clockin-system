import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { LOCAL_STORAGE_KEYS } from "./constants/localStorage";
import translationENG from "./locales/en.json";
import translationTW from "./locales/zh-TW.json";

// the translations
const resources = {
  en: {
    translation: translationENG,
  },
  tw: {
    translation: translationTW,
  },
};

const language = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);

if (!language) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, "en");
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // use en if detected lng is not available
    keySeparator: false,
    lng: localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) || "en",
    resources,
  });

export default i18n;
