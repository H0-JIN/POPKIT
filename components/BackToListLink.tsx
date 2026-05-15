"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function BackToListLink() {
  const { t } = useLanguage();
  return <Link href="/" className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-semibold text-zinc-400 hover:border-cyan-200/40 hover:text-cyan-200">← {t.common.backToList}</Link>;
}
