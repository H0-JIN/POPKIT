"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Review, Tool } from "@/lib/types";
import { ReviewCard } from "@/components/ReviewCard";
import { BestComments } from "@/components/BestComments";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { exampleReviews } from "@/lib/data/seed";

type DetailRatingKey = "rating_work_usefulness" | "rating_output_quality" | "rating_difficulty" | "rating_price" | "rating_korean_support";

type FormState = {
  user_role: string;
  rating_total: string;
  comment: string;
} & Record<DetailRatingKey, string>;

const initialForm: FormState = {
  user_role: "",
  rating_total: "",
  rating_work_usefulness: "",
  rating_output_quality: "",
  rating_difficulty: "",
  rating_price: "",
  rating_korean_support: "",
  comment: ""
};

const detailRatingFields: Array<[DetailRatingKey, string]> = [
  ["rating_work_usefulness", "업무 활용도"],
  ["rating_output_quality", "결과물 품질"],
  ["rating_difficulty", "사용 난이도"],
  ["rating_price", "가격 만족도"],
  ["rating_korean_support", "한국어 지원"]
];

function validateForm(form: FormState) {
  if (!form.user_role.trim()) return "사용자 역할을 입력해주세요.";
  if (!form.rating_total) return "종합 평점을 1~5점으로 선택해주세요.";
  if (!form.comment.trim()) return "리뷰 본문을 입력해주세요.";
  return "";
}

function optionalRating(value: string) {
  return value ? Number(value) : undefined;
}

export function ReviewsTab({ tool, initialReviews }: { tool: Tool; initialReviews: Review[] }) {
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [visible, setVisible] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetailRatings, setShowDetailRatings] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const actualReviews = useMemo(() => [...localReviews, ...initialReviews].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)), [localReviews, initialReviews]);
  const hasReviews = actualReviews.length > 0;
  const summary = useMemo(() => {
    const count = actualReviews.length;
    const averageTotal = count ? actualReviews.reduce((acc, review) => acc + review.rating_total, 0) / count : 0;
    const averageDetail = (field: DetailRatingKey) => {
      const values = actualReviews.map((review) => review[field]).filter((value): value is number => typeof value === "number" && Number.isFinite(value));
      return values.length ? values.reduce((acc, value) => acc + value, 0) / values.length : null;
    };
    return {
      count,
      rating_total: averageTotal,
      rating_work_usefulness: averageDetail("rating_work_usefulness"),
      rating_output_quality: averageDetail("rating_output_quality"),
      rating_difficulty: averageDetail("rating_difficulty"),
      rating_price: averageDetail("rating_price"),
      rating_korean_support: averageDetail("rating_korean_support")
    };
  }, [actualReviews]);
  const exampleBestReviews = useMemo(() => exampleReviews.map((review) => ({ ...review, review_id: `${review.review_id}_${tool.tool_id}`, tool_id: tool.tool_id, tool_slug: tool.slug, tool_name: tool.tool_name })), [tool]);

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
      if (!res.ok || !data.review) throw new Error(data.error || "리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setLocalReviews((prev) => [data.review as Review, ...prev]);
      setForm(initialForm);
      setShowDetailRatings(false);
      setVisible((current) => Math.max(current, 1));
      setMessage({ type: "success", text: "리뷰가 저장되었습니다. 화면에 바로 반영했어요." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="space-y-8"><section className="grid gap-4 md:grid-cols-[240px_1fr]"><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">{hasReviews ? <><div className="text-5xl font-black text-amber-200">{summary.rating_total.toFixed(1)}</div><p className="mt-2 text-sm text-zinc-500">종합 평점 · {summary.count}개 평가</p></> : <><div className="text-2xl font-black text-white">아직 사용자 평가가 없습니다.</div><p className="mt-2 text-sm text-zinc-500">첫 리뷰를 남겨보세요.</p></>}</div><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">{hasReviews ? detailRatingFields.map(([key, label]) => { const score = summary[key]; return <div key={label} className="mb-3 grid grid-cols-[100px_1fr_72px] items-center gap-3 text-sm"><span className="text-zinc-400">{label}</span>{score === null ? <><span className="h-2 rounded-full bg-white/5" /><span className="text-xs text-zinc-500">평가 전</span></> : <><span className="h-2 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-cyan-300" style={{ width: `${(score / 5) * 100}%` }} /></span><b>{score.toFixed(1)}</b></>}</div>; }) : <p className="text-sm leading-6 text-zinc-500">평가가 쌓이면 업무 활용도와 결과물 품질 같은 세부 지표를 함께 보여드릴 예정입니다.</p>}</div></section>{hasReviews ? <BestComments reviews={actualReviews} /> : <BestComments reviews={exampleBestReviews} /> }<section><h3 className="text-lg font-bold">전체 댓글</h3>{hasReviews ? <div className="mt-3 space-y-4">{actualReviews.slice(0, visible).map((review) => <ReviewCard key={review.review_id} review={review} />)}</div> : <p className="mt-3 rounded-3xl border border-dashed border-white/10 p-6 text-zinc-500">아직 실제 댓글이 없습니다. 이 AI를 사용해봤다면 첫 리뷰를 남겨주세요.</p>}{actualReviews.length > visible && <LoadMoreButton onClick={() => setVisible((v) => v + 5)}>댓글 더 보기</LoadMoreButton>}</section><form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"><h3 className="text-lg font-bold">리뷰 작성</h3><div className="mt-4 grid gap-3 sm:grid-cols-2"><input name="role" value={form.user_role} onChange={(event) => setForm((prev) => ({ ...prev, user_role: event.target.value }))} placeholder="직무 (예: 기획자)" className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none" /><label className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-400"><span className="mb-2 block">종합 평점</span><select name="rating_total" value={form.rating_total} onChange={(event) => setForm((prev) => ({ ...prev, rating_total: event.target.value }))} className="w-full bg-transparent font-bold text-white outline-none"><option value="">선택</option>{[5, 4, 3, 2, 1].map((score) => <option key={score} value={score}>{score}점</option>)}</select></label></div><button type="button" onClick={() => setShowDetailRatings((value) => !value)} className="mt-3 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:bg-white/5">{showDetailRatings ? "세부 평가 접기" : "더 자세히 평가하기"}</button>{showDetailRatings && <div className="mt-3 grid gap-3 sm:grid-cols-2">{detailRatingFields.map(([key, label]) => <label key={key} className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-400"><span className="mb-2 block">{label} <span className="text-zinc-600">선택</span></span><select name={key} value={form[key]} onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))} className="w-full bg-transparent font-bold text-white outline-none"><option value="">평가 안 함</option>{[5, 4, 3, 2, 1].map((score) => <option key={score} value={score}>{score}점</option>)}</select></label>)}</div>}<textarea name="comment" value={form.comment} onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))} placeholder="짧아도 좋습니다. 실제로 써본 느낌을 남겨주세요." className="mt-3 min-h-28 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none" />{message && <p className={message.type === "success" ? "mt-3 text-sm font-semibold text-cyan-200" : "mt-3 text-sm font-semibold text-rose-300"}>{message.text}</p>}<button disabled={isSubmitting} className="mt-3 rounded-2xl bg-cyan-300 px-5 py-3 font-black text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "저장 중..." : "리뷰 등록"}</button></form></div>;
}
