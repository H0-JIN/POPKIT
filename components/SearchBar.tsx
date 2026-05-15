"use client";

import { useLanguage } from "@/lib/i18n";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t } = useLanguage();
  return <label className="relative flex-1"><span className="sr-only">{t.search.srLabel}</span><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={t.search.placeholder} className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none ring-cyan-400/30 transition placeholder:text-zinc-500 focus:border-cyan-300/50 focus:ring-4" /></label>;
}
