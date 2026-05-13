"use client";

import { FormEvent, useState } from "react";
import type { Review, Tool } from "@/lib/types";
import { ReviewCard } from "@/components/ReviewCard";
import { BestComments } from "@/components/BestComments";
import { LoadMoreButton } from "@/components/LoadMoreButton";

export function ReviewsTab({ tool, initialReviews }: { tool: Tool; initialReviews: Review[] }) {
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [visible, setVisible] = useState(5);
  const actualReviews = [...localReviews, ...initialReviews];
  const hasReviews = actualReviews.length > 0;
  const avg = hasReviews ? actualReviews.reduce((acc, review) => acc + review.rating_total, 0) / actualReviews.length : 0;
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const review: Review = { review_id: `local_${Date.now()}`, tool_id: tool.tool_id, user_role: String(form.get("role") || "사용자"), rating_total: Number(form.get("rating") || 4.5), rating_work_usefulness: 4.4, rating_output_quality: 4.3, rating_difficulty: 4.2, rating_price: 4.0, rating_korean_support: tool.korean_support ? 4.2 : 3.5, comment: String(form.get("comment") || ""), helpful_count: 0, approved: true, created_at: new Date().toISOString() };
    if (!review.comment.trim()) return;
    setLocalReviews((prev) => [review, ...prev]);
    await fetch("/api/reviews", { method: "POST", body: JSON.stringify(review) }).catch(() => undefined);
    event.currentTarget.reset();
  };
  const scores = [["업무 활용도", 4.5], ["결과물 품질", 4.3], ["사용 난이도", 4.2], ["가격 만족도", 4.0], ["한국어 지원", tool.korean_support ? 4.2 : 3.6]];
  return <div className="space-y-8"><section className="grid gap-4 md:grid-cols-[240px_1fr]"><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">{hasReviews ? <><div className="text-5xl font-black text-amber-200">{avg.toFixed(1)}</div><p className="mt-2 text-sm text-zinc-500">종합 평점 · {actualReviews.length}개 평가</p></> : <><div className="text-2xl font-black text-white">아직 사용자 평가가 없습니다.</div><p className="mt-2 text-sm text-zinc-500">첫 리뷰를 남겨보세요.</p></>}</div><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">{hasReviews ? scores.map(([label, score]) => <div key={label} className="mb-3 grid grid-cols-[100px_1fr_36px] items-center gap-3 text-sm"><span className="text-zinc-400">{label}</span><span className="h-2 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-cyan-300" style={{ width: `${(Number(score) / 5) * 100}%` }} /></span><b>{Number(score).toFixed(1)}</b></div>) : <p className="text-sm leading-6 text-zinc-500">평가가 쌓이면 업무 활용도와 결과물 품질 같은 세부 지표를 함께 보여드릴 예정입니다.</p>}</div></section>{hasReviews ? <BestComments reviews={actualReviews} /> : null}<section><h3 className="text-lg font-bold">전체 댓글</h3>{hasReviews ? <div className="mt-3 space-y-4">{actualReviews.slice(0, visible).map((review) => <ReviewCard key={review.review_id} review={review} />)}</div> : <p className="mt-3 rounded-3xl border border-dashed border-white/10 p-6 text-zinc-500">아직 실제 댓글이 없습니다. 이 AI를 사용해봤다면 첫 리뷰를 남겨주세요.</p>}{actualReviews.length > visible && <LoadMoreButton onClick={() => setVisible((v) => v + 5)}>댓글 더 보기</LoadMoreButton>}</section><form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"><h3 className="text-lg font-bold">리뷰 작성</h3><div className="mt-4 grid gap-3 sm:grid-cols-2"><input name="role" placeholder="직무 (예: 기획자)" className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none" /><input name="rating" type="number" min="1" max="5" step="0.1" defaultValue="4.5" className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none" /></div><textarea name="comment" placeholder="실무에서 어떻게 활용했는지 알려주세요." className="mt-3 min-h-28 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none" /><button className="mt-3 rounded-2xl bg-cyan-300 px-5 py-3 font-black text-zinc-950">리뷰 등록</button></form></div>;
}
