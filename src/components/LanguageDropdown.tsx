import React, { useEffect, useState } from "react";

import { LANGUAGES, DEFAULT_LANGUAGE } from "../constants/languages";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorage";
import i18n from "../i18n";

const LanguageDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const currentLanguage = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) || DEFAULT_LANGUAGE;
    setSelectedLanguage(currentLanguage);
  }, []);

  const onChangeLanguage = (e: React.FormEvent<HTMLSelectElement>) => {
    const lang = e.currentTarget.value;
    i18n.changeLanguage(lang);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, lang);
    setSelectedLanguage(lang);
  };

  const renderLanguageOption = (lang: string) => {
    return (
      <option key={lang} value={lang}>
        {LANGUAGES[lang as keyof typeof LANGUAGES].label}
      </option>
    );
  };

  return (
    <select onChange={onChangeLanguage} value={selectedLanguage}>
      {Object.keys(LANGUAGES).map(renderLanguageOption)}
    </select>
  );
};

export default LanguageDropdown;
