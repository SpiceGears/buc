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

type Resources = typeof en | typeof es | typeof ar | typeof bn | typeof de | typeof fr | typeof hi | typeof ja | typeof pl | typeof pt | typeof zh;

const resources: Record<Lang, Resources> = {
  en, es, ar, bn, de, fr, hi, ja, pl, pt, zh
};

interface I18nContextProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof Resources, params?: Record<string, any>) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ children }: PropsWithChildren<{}>) {
  const [lang, setLangState] = useState<Lang>("en");

  // on mount, read saved lang if it exists in `resources`
  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored && (resources as any)[stored]) {
      setLangState(stored as Lang);
    }
  }, []);

  const setLang = (l: Lang) => {
    window.localStorage.setItem("lang", l);
    setLangState(l);
  };

  const t = (key: keyof Resources, params?: Record<string, any>) => {
    let str = resources[lang][key] as string;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(
          new RegExp(`{{\\s*${k}\\s*}}`, "g"),
          String(v)
        );
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