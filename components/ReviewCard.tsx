"use client";

import { useEffect, useState } from "react";
import type { Review } from "@/lib/types";

export function ReviewCard({ review }: { review: Review }) {
  const storageKey = `helpful:${review.review_id}`;
  const [helpful, setHelpful] = useState(review.helpful_count);
  const [voted, setVoted] = useState(false);
  useEffect(() => setVoted(localStorage.getItem(storageKey) === "1"), [storageKey]);
  const vote = async () => {
    if (voted) return;
    setHelpful((count) => count + 1);
    setVoted(true);
    localStorage.setItem(storageKey, "1");
    await fetch(`/api/reviews/${review.review_id}/helpful`, { method: "POST" }).catch(() => undefined);
  };
  return <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><div className="flex items-center justify-between gap-3"><div><span className="font-bold">{review.user_role}</span>{review.isExample && <span className="ml-2 rounded-full bg-violet-400/10 px-2 py-1 text-[10px] text-violet-200">예시</span>}</div><span className="text-amber-200">★ {review.rating_total.toFixed(1)}</span></div><p className="mt-3 leading-7 text-zinc-400">“{review.comment}”</p><button onClick={vote} disabled={voted} className="mt-4 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 disabled:opacity-60 hover:bg-white/5">추천 {helpful}</button></article>;
}
