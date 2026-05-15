"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Review, Tool } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { ReviewCard } from "@/components/ReviewCard";
import { BestComments } from "@/components/BestComments";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { StarRatingInput } from "@/components/StarRatingInput";
import { MascotImage } from "@/components/MascotImage";
import { exampleReviews } from "@/lib/data/seed";

type FormState = {
  user_role: string;
  rating_total: number | null;
  rating_work_usefulness: number | null;
  rating_output_quality: number | null;
  rating_difficulty: number | null;
  rating_price: number | null;
  rating_korean_support: number | null;
  comment: string;
};

type RatingKey = keyof Pick<Review, "rating_total" | "rating_work_usefulness" | "rating_output_quality" | "rating_difficulty" | "rating_price" | "rating_korean_support">;

const initialForm: FormState = {
  user_role: "",
  rating_total: null,
  rating_work_usefulness: null,
  rating_output_quality: null,
  rating_difficulty: null,
  rating_price: null,
  rating_korean_support: null,
  comment: ""
};

const detailedRatingKeys = ["rating_work_usefulness", "rating_output_quality", "rating_difficulty", "rating_price", "rating_korean_support"] as const;

function averageRating(reviews: Review[], field: RatingKey) {
  const ratedReviews = reviews.filter((review) => typeof review[field] === "number" && review[field] > 0);
  return ratedReviews.length ? ratedReviews.reduce((acc, review) => acc + (review[field] ?? 0), 0) / ratedReviews.length : 0;
}

function optionalRating(value: number | null) {
  return value === null ? null : value;
}

export function ReviewsTab({ tool, initialReviews }: { tool: Tool; initialReviews: Review[] }) {
  const { t } = useLanguage();
  const detailedRatingLabels = {
    rating_work_usefulness: t.reviews.work,
    rating_output_quality: t.reviews.quality,
    rating_difficulty: t.reviews.difficulty,
    rating_price: t.reviews.price,
    rating_korean_support: t.reviews.korean
  } as const;
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [showDetailedRatings, setShowDetailedRatings] = useState(false);
  const [visible, setVisible] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const actualReviews = useMemo(() => [...localReviews, ...initialReviews].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)), [localReviews, initialReviews]);
  const hasReviews = actualReviews.length > 0;
  const summary = useMemo(() => {
    const count = actualReviews.length;
    return {
      count,
      rating_total: averageRating(actualReviews, "rating_total"),
      rating_work_usefulness: averageRating(actualReviews, "rating_work_usefulness"),
      rating_output_quality: averageRating(actualReviews, "rating_output_quality"),
      rating_difficulty: averageRating(actualReviews, "rating_difficulty"),
      rating_price: averageRating(actualReviews, "rating_price"),
      rating_korean_support: averageRating(actualReviews, "rating_korean_support")
    };
  }, [actualReviews]);
  const exampleBestReviews = useMemo(() => exampleReviews.map((review) => ({ ...review, review_id: `${review.review_id}_${tool.tool_id}`, tool_id: tool.tool_id, tool_slug: tool.slug, tool_name: tool.tool_name })), [tool]);

  const validateForm = (currentForm: FormState) => {
    if (!currentForm.user_role.trim()) return t.reviews.roleRequired;
    if (!currentForm.rating_total) return t.reviews.ratingRequired;
    if (currentForm.comment.trim().length === 0) return t.reviews.commentRequired;
    return "";
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationMessage = validateForm(form);
    if (validationMessage) {
      setMessage({ type: "error", text: validationMessage });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const payload = {
        tool_id: tool.tool_id,
        tool_slug: tool.slug,
        tool_name: tool.tool_name,
        user_role: form.user_role.trim(),
        rating_total: Number(form.rating_total),
        rating_work_usefulness: optionalRating(form.rating_work_usefulness),
        rating_output_quality: optionalRating(form.rating_output_quality),
        rating_difficulty: optionalRating(form.rating_difficulty),
        rating_price: optionalRating(form.rating_price),
        rating_korean_support: optionalRating(form.rating_korean_support),
        comment: form.comment.trim()
      };
      const res = await fetch("/api/reviews", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { review?: Review; error?: string };
      if (!res.ok || !data.review) throw new Error(t.reviews.failed);
      setLocalReviews((prev) => [data.review as Review, ...prev]);
      setForm(initialForm);
      setShowDetailedRatings(false);
      setVisible((current) => Math.max(current, 1));
      setMessage({ type: "success", text: t.reviews.saved });
    } catch {
      setMessage({ type: "error", text: t.reviews.failed });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-[240px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
          {hasReviews ? (
            <>
              <div className="text-5xl font-black text-amber-200">{summary.rating_total.toFixed(1)}</div>
              <p className="mt-2 text-sm text-zinc-500">{t.reviews.totalSummary(summary.count)}</p>
            </>
          ) : (
            <>
              <div className="text-2xl font-black text-white">{t.reviews.noRatings}</div>
              <p className="mt-2 text-sm text-zinc-500">{t.reviews.firstReview}</p>
            </>
          )}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          {hasReviews ? (
            detailedRatingKeys.map((key) => (
              <div key={key} className="mb-3 grid grid-cols-[100px_1fr_36px] items-center gap-3 text-sm">
                <span className="text-zinc-400">{detailedRatingLabels[key]}</span>
                <span className="h-2 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-cyan-300" style={{ width: `${(summary[key] / 5) * 100}%` }} /></span>
                <b>{summary[key].toFixed(1)}</b>
              </div>
            ))
          ) : (
            <p className="text-sm leading-6 text-zinc-500">{t.reviews.detailLater}</p>
          )}
        </div>
      </section>
      {hasReviews ? <BestComments reviews={actualReviews} /> : <BestComments reviews={exampleBestReviews} />}
      <section>
        <h3 className="text-lg font-bold">{t.reviews.all}</h3>
        {hasReviews ? (
          <div className="mt-3 space-y-4">{actualReviews.slice(0, visible).map((review) => <ReviewCard key={review.review_id} review={review} />)}</div>
        ) : (
          <div className="mt-3 flex items-center justify-center gap-3 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-left text-zinc-500 sm:justify-start">
            <MascotImage type="community" size="lg" className="size-8 sm:size-10" />
            <p className="text-sm leading-6">{t.reviews.noComments}</p>
          </div>
        )}
        {actualReviews.length > visible && <LoadMoreButton onClick={() => setVisible((v) => v + 5)}>{t.reviews.loadMore}</LoadMoreButton>}
      </section>
      <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="text-lg font-bold">{t.reviews.write}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input name="role" value={form.user_role} onChange={(event) => setForm((prev) => ({ ...prev, user_role: event.target.value }))} placeholder={t.reviews.role} className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none" />
          <StarRatingInput label={t.reviews.overall} name="rating_total" value={form.rating_total} onChange={(rating) => setForm((prev) => ({ ...prev, rating_total: rating }))} required />
        </div>
        <button type="button" onClick={() => setShowDetailedRatings((open) => !open)} className="mt-3 rounded-2xl border border-white/10 px-4 py-2 text-sm font-bold text-cyan-200 hover:bg-white/5" aria-expanded={showDetailedRatings}>
          {showDetailedRatings ? t.reviews.hideDetailed : t.reviews.addDetailed}
        </button>
        {showDetailedRatings && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {detailedRatingKeys.map((key) => (
              <StarRatingInput key={key} label={detailedRatingLabels[key]} name={key} value={form[key]} onChange={(rating) => setForm((prev) => ({ ...prev, [key]: rating }))} />
            ))}
          </div>
        )}
        <textarea value={form.comment} onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))} placeholder={t.reviews.commentPlaceholder} className="mt-3 min-h-28 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none" />
        {message && <p className={message.type === "success" ? "mt-3 text-sm font-semibold text-cyan-200" : "mt-3 text-sm font-semibold text-rose-300"}>{message.text}</p>}
        <button disabled={isSubmitting} className="mt-3 rounded-2xl bg-cyan-300 px-5 py-3 font-black text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? t.reviews.saving : t.reviews.submit}</button>
      </form>
    </div>
  );
}
