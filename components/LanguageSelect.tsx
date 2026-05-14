"use client";

import { useEffect, useId, useState } from "react";

const LANGUAGE_STORAGE_KEY = "popkit-language";
const LANGUAGE_OPTIONS = ["한국어", "English"] as const;

type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];

function isLanguageOption(value: string | null): value is LanguageOption {
  return value === "한국어" || value === "English";
}

export function LanguageSelect() {
  const selectId = useId();
  const [language, setLanguage] = useState<LanguageOption>("한국어");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageOption(savedLanguage)) setLanguage(savedLanguage);
  }, []);

  const handleChange = (value: LanguageOption) => {
    setLanguage(value);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
  };

  return (
    <label htmlFor={selectId} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-cyan-200/40 hover:bg-white/[0.07] hover:text-white">
      <span className="sr-only">언어 선택</span>
      <select
        id={selectId}
        value={language}
        onChange={(event) => handleChange(event.target.value as LanguageOption)}
        className="cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-inherit outline-none"
        aria-label="언어 선택"
      >
        {LANGUAGE_OPTIONS.map((option) => <option key={option} value={option} className="bg-zinc-950 text-zinc-100">{option}</option>)}
      </select>
      <span aria-hidden="true" className="pointer-events-none -ml-5 text-xs text-zinc-500 transition group-hover:text-cyan-200">▾</span>
    </label>
  );
}
