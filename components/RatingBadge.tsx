"use client";

import { useLanguage } from "@/lib/i18n";
import { formatNumber } from "@/lib/utils";

export function RatingBadge({ rating, count }: { rating: number; count: number }) {
  const { t } = useLanguage();
  if (count <= 0) {
    return <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-400">{t.toolCard.noRatings}</span>;
  }

  return <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-200">★ {rating.toFixed(1)} <span className="text-zinc-400">({formatNumber(count)})</span></span>;
}
