"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import en from "./locales/en.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";
import bn from "./locales/bn.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import hi from "./locales/hi.json";
import ja from "./locales/ja.json";
import pl from "./locales/pl.json";
import pt from "./locales/pt.json";
import zh from "./locales/zh.json";

export type Lang =
  | "en"
  | "es"
  | "ar"
  | "bn"
  | "de"
  | "fr"
  | "hi"
  | "ja"
  | "pl"
  | "pt"
  | "zh";

// Define a type for the structure of your translation resources
type TranslationResources = typeof en; // Assuming all translation files have the same structure as 'en.json'

// Use a Mapped Type to ensure 'resources' values conform to TranslationResources
type Resources = {
  [K in Lang]: TranslationResources;
};

const resources: Resources = {
  en,
  es,
  ar,
  bn,
  de,
  fr,
  hi,
  ja,
  pl,
  pt,
  zh,
};

interface I18nContextProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  // FIX: Replaced 'any' with 'string | number' or a more specific type if values are limited
  t: (key: keyof TranslationResources, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

// FIX: Replaced PropsWithChildren<{}> with PropsWithChildren
export function I18nProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Lang>("en");

  // on mount, read saved lang if it exists in `resources`
  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    // FIX: Safely check if stored language is a valid key in resources
    if (stored && Object.keys(resources).includes(stored)) {
      setLangState(stored as Lang);
    }
  }, []);

  const setLang = (l: Lang) => {
    window.localStorage.setItem("lang", l);
    setLangState(l);
  };

  // FIX: Replaced 'any' with 'string | number' for param values
  const t = (key: keyof TranslationResources, params?: Record<string, string | number>) => {
    let str = resources[lang][key] as string; // Assert as string, as JSON values can be boolean/number if not careful
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), String(v));
      });
    }
    return str;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextProps {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
}