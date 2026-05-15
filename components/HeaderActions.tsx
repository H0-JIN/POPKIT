"use client";

import Link from "next/link";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useLanguage } from "@/lib/i18n";

export function HeaderActions() {
  const { t } = useLanguage();
  return (
    <div className="mb-5 flex flex-wrap items-center justify-end gap-3">
      <LanguageSelect />
      <Link href="/business" className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100 shadow-lg shadow-cyan-950/10 transition hover:border-cyan-200/50 hover:bg-cyan-300 hover:text-zinc-950">
        {t.common.business}
      </Link>
    </div>
  );
}
