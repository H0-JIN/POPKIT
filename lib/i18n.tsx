"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { messages, type Messages } from "@/lib/translations";

export type Locale = "ko" | "en";

const LANGUAGE_STORAGE_KEY = "popkit-language";
const localeLabels: Record<Locale, string> = { ko: "한국어", en: "English" };

function readSavedLocale(): Locale {
  if (typeof window === "undefined") return "ko";
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === "en" || saved === "English") return "en";
  return "ko";
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
  languageLabel: string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");

  useEffect(() => {
    setLocaleState(readSavedLocale());
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: messages[locale], languageLabel: localeLabels[locale] }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function formatRelativeUpdate(dateString: string, locale: Locale) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.max(0, now.getTime() - date.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (Number.isNaN(days)) return locale === "en" ? "Update date unavailable" : "업데이트 날짜 확인 필요";
  if (locale === "en") {
    if (days === 0) return "Updated today";
    if (days < 7) return `Updated ${days} ${days === 1 ? "day" : "days"} ago`;
    if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `Updated ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    if (days < 365) {
      const months = Math.floor(days / 30);
      return `Updated ${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(days / 365);
    return `Updated ${years} ${years === 1 ? "year" : "years"} ago`;
  }
  if (days === 0) return "오늘 업데이트";
  if (days < 7) return `업데이트 ${days}일 전`;
  if (days < 30) return `업데이트 ${Math.floor(days / 7)}주 전`;
  if (days < 365) return `업데이트 ${Math.floor(days / 30)}개월 전`;
  return `업데이트 ${Math.floor(days / 365)}년 전`;
}
