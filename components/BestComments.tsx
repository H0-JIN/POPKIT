"use client";

import type { Review } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { ReviewCard } from "@/components/ReviewCard";

export function BestComments({ reviews }: { reviews: Review[] }) {
  const { t } = useLanguage();
  const best = [...reviews].sort((a, b) => b.helpful_count - a.helpful_count).slice(0, 3);
  return <section><h3 className="text-lg font-bold">{t.reviews.top}</h3><div className="mt-3 grid gap-4 lg:grid-cols-3">{best.map((review) => <ReviewCard key={review.review_id} review={review} />)}</div></section>;
}
