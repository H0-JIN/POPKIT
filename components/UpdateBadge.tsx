"use client";

import { formatRelativeUpdate, useLanguage } from "@/lib/i18n";

export function UpdateBadge({ date }: { date: string }) {
  const { locale } = useLanguage();
  return <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-200">{formatRelativeUpdate(date, locale)}</span>;
}
