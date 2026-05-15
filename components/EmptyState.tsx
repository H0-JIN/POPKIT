"use client";

import { useLanguage } from "@/lib/i18n";

export function EmptyState({ title, description }: { title?: string; description?: string }) {
  const { t } = useLanguage();
  return <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] p-12 text-center"><h3 className="text-xl font-bold">{title ?? t.empty.title}</h3><p className="mt-2 text-zinc-500">{description ?? t.empty.description}</p></div>;
}
