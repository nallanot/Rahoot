import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

type Locale = "en" | "fr";
type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = { en, fr };

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("rahoot-locale") as Locale | null;
    if (saved === "fr" || saved === "en") {
      setLocaleState(saved);
    } else {
      const browser = navigator.language.toLowerCase();
      setLocaleState(browser.startsWith("fr") ? "fr" : "en");
    }
  }, []);

  const setLocale = (value: Locale) => {
    setLocaleState(value);
    window.localStorage.setItem("rahoot-locale", value);
  };

  const value = useMemo<I18nContextType>(() => {
    return {
      locale,
      setLocale,
      t: (key: string) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return ctx;
}