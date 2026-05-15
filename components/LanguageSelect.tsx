"use client";

import { useId } from "react";
import { useLanguage, type Locale } from "@/lib/i18n";

const LANGUAGE_OPTIONS: Array<{ value: Locale; label: string }> = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" }
];

export function LanguageSelect() {
  const selectId = useId();
  const { locale, setLocale } = useLanguage();

  return (
    <label htmlFor={selectId} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-cyan-200/40 hover:bg-white/[0.07] hover:text-white">
      <span className="sr-only">언어 선택</span>
      <select
        id={selectId}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-inherit outline-none"
        aria-label="언어 선택"
      >
        {LANGUAGE_OPTIONS.map((option) => <option key={option.value} value={option.value} className="bg-zinc-950 text-zinc-100">{option.label}</option>)}
      </select>
      <span aria-hidden="true" className="pointer-events-none -ml-5 text-xs text-zinc-500 transition group-hover:text-cyan-200">▾</span>
    </label>
  );
}
