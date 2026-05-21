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
import { getReviewRoleLabel, getReviewRoleMascot, isReviewRole, REVIEW_ROLE_OPTIONS, type ReviewRole } from "@/lib/reviewRoles";

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

type RoleRatingSummary = {
  role: ReviewRole;
  reviewCount: number;
  averageRatingTotal: number;
};

function summarizeRatingsByRole(reviews: Review[]): RoleRatingSummary[] {
  return REVIEW_ROLE_OPTIONS.map((role) => {
    const roleReviews = reviews.filter((review) => review.user_role === role && typeof review.rating_total === "number" && review.rating_total > 0);
    const averageRatingTotal = roleReviews.length ? roleReviews.reduce((acc, review) => acc + review.rating_total, 0) / roleReviews.length : 0;

    return {
      role,
      reviewCount: roleReviews.length,
      averageRatingTotal
    };
  });
}

export function ReviewsTab({ tool, initialReviews }: { tool: Tool; initialReviews: Review[] }) {
  const { locale, t } = useLanguage();
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
  const roleRatingSummary = useMemo(() => summarizeRatingsByRole(actualReviews), [actualReviews]);
  const exampleBestReviews = useMemo(() => exampleReviews.map((review) => ({ ...review, review_id: `${review.review_id}_${tool.tool_id}`, tool_id: tool.tool_id, tool_slug: tool.slug, tool_name: tool.tool_name })), [tool]);
  const scrollToReviewForm = () => {
    const form = document.getElementById("review-write-form");
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateForm = (currentForm: FormState) => {
    if (!isReviewRole(currentForm.user_role)) return t.reviews.roleRequired;
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
        user_role: form.user_role,
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

      {hasReviews && (
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-white">{t.reviews.roleRatingsTitle}</h3>
              <p className="mt-1 text-sm text-zinc-500">{t.reviews.roleRatingsDescription}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {roleRatingSummary.map((roleSummary) => (
              <article key={roleSummary.role} className="rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <MascotImage type={getReviewRoleMascot(roleSummary.role)} size="lg" className="size-9" />
                  </span>
                  <div>
                    <h4 className="font-black text-white">{getReviewRoleLabel(roleSummary.role, locale)}</h4>
                    <p className="text-xs font-semibold text-zinc-500">{t.reviews.roleReviewCount(roleSummary.reviewCount)}</p>
                  </div>
                </div>
                <div className="mt-4 text-2xl font-black text-amber-200">
                  {roleSummary.reviewCount > 0 ? `${roleSummary.averageRatingTotal.toFixed(1)} ★` : t.reviews.noRoleRatings}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="rounded-3xl border border-violet-300/25 bg-gradient-to-r from-violet-400/10 via-transparent to-cyan-400/10 p-4 sm:p-5">
        <h3 className="text-base font-black text-white sm:text-lg">{t.reviewCta.detailTitle}</h3>
        <p className="mt-1 text-sm text-zinc-400">{t.reviewCta.detailDescription}</p>
        <button type="button" onClick={scrollToReviewForm} className="mt-3 rounded-2xl border border-violet-300/50 bg-violet-300/15 px-4 py-2 text-sm font-bold text-violet-100 transition hover:bg-violet-300/25">
          {t.reviewCta.detailButton}
        </button>
      </section>
      {hasReviews ? <BestComments reviews={actualReviews} /> : <BestComments reviews={exampleBestReviews} />}
      <section>
        <h3 className="text-lg font-bold">{t.reviews.all}</h3>
        {hasReviews ? (
          <div className="mt-3 space-y-4">{actualReviews.slice(0, visible).map((review) => <ReviewCard key={review.review_id} review={review} />)}</div>
        ) : (
          <div className="mt-3 flex items-center justify-center gap-3 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-left text-zinc-500 sm:justify-start">
            <MascotImage type="community" size="lg" className="size-8 sm:size-10" />
            <div>
              <p className="text-sm leading-6">{t.reviewCta.emptyMessage}</p>
              <button type="button" onClick={scrollToReviewForm} className="mt-2 rounded-xl border border-cyan-300/40 px-3 py-1.5 text-xs font-bold text-cyan-200 transition hover:bg-cyan-300/10">
                {t.reviewCta.emptyButton}
              </button>
            </div>
          </div>
        )}
        {actualReviews.length > visible && <LoadMoreButton onClick={() => setVisible((v) => v + 5)}>{t.reviews.loadMore}</LoadMoreButton>}
      </section>
      <form id="review-write-form" onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="text-lg font-bold">{t.reviews.write}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <select
            name="role"
            value={form.user_role}
            onChange={(event) => setForm((prev) => ({ ...prev, user_role: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none"
            required
          >
            <option value="" disabled>{t.reviews.rolePlaceholder}</option>
            {REVIEW_ROLE_OPTIONS.map((role) => <option key={role} value={role}>{t.reviews.roleOptions[role]}</option>)}
          </select>
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
