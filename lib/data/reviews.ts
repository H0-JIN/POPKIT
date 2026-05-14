import { appendSheetRow, fetchSheetRows, updateSheetCell } from "@/lib/googleSheets";
import { exampleReviews, seedReviews } from "@/lib/data/seed";
import type { Review, Tool } from "@/lib/types";

const reviewColumns = [
  "review_id",
  "tool_id",
  "tool_slug",
  "tool_name",
  "user_role",
  "rating_total",
  "rating_work_usefulness",
  "rating_output_quality",
  "rating_difficulty",
  "rating_price",
  "rating_korean_support",
  "comment",
  "helpful_count",
  "approved",
  "created_at"
] as const;

export type ReviewInput = {
  tool_id: string;
  tool_slug: string;
  tool_name: string;
  user_role: string;
  rating_total: number;
  rating_work_usefulness: number | null;
  rating_output_quality: number | null;
  rating_difficulty: number | null;
  rating_price: number | null;
  rating_korean_support: number | null;
  comment: string;
};

export type ReviewSummary = {
  count: number;
  rating_total: number;
  rating_work_usefulness: number;
  rating_output_quality: number;
  rating_difficulty: number;
  rating_price: number;
  rating_korean_support: number;
};

function num(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function bool(value: string | undefined) {
  if (!value) return false;
  return ["true", "TRUE", "1", "yes", "Y", "승인"].includes(value.trim());
}

function clampRating(value: unknown) {
  const rating = Number(value);
  if (!Number.isFinite(rating) || rating < 0.5 || rating > 5) return null;
  return Math.round(rating * 2) / 2;
}

function optionalRating(value: unknown) {
  if (value === undefined || value === null || value === "") return null;
  return clampRating(value);
}

function hasRatingInput(value: unknown) {
  return !(value === undefined || value === null || value === "");
}

function optionalRating(value: unknown) {
  if (value === undefined || value === null || value === "") return 0;
  return clampRating(value);
}

export function validateReviewInput(body: unknown): { ok: true; value: ReviewInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "리뷰 요청 형식이 올바르지 않습니다." };
  const data = body as Record<string, unknown>;
  const tool_id = String(data.tool_id ?? "").trim();
  const tool_slug = String(data.tool_slug ?? "").trim();
  const tool_name = String(data.tool_name ?? "").trim();
  const user_role = String(data.user_role ?? "").trim();
  const comment = String(data.comment ?? "").trim();
  if (!tool_id || !tool_slug || !tool_name) return { ok: false, error: "리뷰를 연결할 AI 툴 정보가 없습니다." };
  if (!user_role) return { ok: false, error: "사용자 역할을 입력해주세요." };
  if (comment.trim().length === 0) return { ok: false, error: "리뷰 본문을 입력해주세요." };

  const rating_total = clampRating(data.rating_total);
  const rating_work_usefulness = optionalRating(data.rating_work_usefulness);
  const rating_output_quality = optionalRating(data.rating_output_quality);
  const rating_difficulty = optionalRating(data.rating_difficulty);
  const rating_price = optionalRating(data.rating_price);
  const rating_korean_support = optionalRating(data.rating_korean_support);
  if (rating_total === null) return { ok: false, error: "종합 평점을 1~5점으로 선택해주세요." };
  if ([
    [data.rating_work_usefulness, rating_work_usefulness],
    [data.rating_output_quality, rating_output_quality],
    [data.rating_difficulty, rating_difficulty],
    [data.rating_price, rating_price],
    [data.rating_korean_support, rating_korean_support]
  ].some(([raw, rating]) => hasRatingInput(raw) && rating === null)) {
    return { ok: false, error: "항목별 평점은 선택 시 1~5점이어야 합니다." };
  }

  return {
    ok: true,
    value: { tool_id, tool_slug, tool_name, user_role, comment, rating_total, rating_work_usefulness, rating_output_quality, rating_difficulty, rating_price, rating_korean_support } as ReviewInput
  };
}

function reviewFromRow(row: Record<string, string>, index: number): Review {
  return {
    review_id: row.review_id || `sheet_review_${index + 1}`,
    tool_id: row.tool_id || "",
    tool_slug: row.tool_slug || "",
    tool_name: row.tool_name || "",
    user_role: row.user_role || "사용자",
    rating_total: num(row.rating_total, 0),
    rating_work_usefulness: optionalRating(row.rating_work_usefulness),
    rating_output_quality: optionalRating(row.rating_output_quality),
    rating_difficulty: optionalRating(row.rating_difficulty),
    rating_price: optionalRating(row.rating_price),
    rating_korean_support: optionalRating(row.rating_korean_support),
    comment: row.comment || "",
    helpful_count: num(row.helpful_count, 0),
    approved: bool(row.approved),
    created_at: row.created_at || new Date(0).toISOString()
  };
}

export async function getReviews(): Promise<Review[]> {
  const rows = await fetchSheetRows("Reviews", { cache: "no-store", revalidate: false });
  const sheet = rows.map(reviewFromRow).filter((review) => review.tool_id && review.comment && review.approved && review.rating_total > 0);
  return [...sheet, ...seedReviews].filter((review) => review.approved).sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
}

export async function getReviewsByTool(tool: Pick<Tool, "tool_id" | "slug">) {
  return (await getReviews()).filter((review) => review.tool_id === tool.tool_id || review.tool_slug === tool.slug);
}

export async function getReviewsByToolId(toolId: string) {
  return (await getReviews()).filter((review) => review.tool_id === toolId);
}

export function getReviewSummary(reviews: Review[]): ReviewSummary {
  const count = reviews.length;
  const average = (field: keyof Pick<Review, "rating_total" | "rating_work_usefulness" | "rating_output_quality" | "rating_difficulty" | "rating_price" | "rating_korean_support">) => {
    const ratedReviews = reviews.filter((review) => typeof review[field] === "number" && review[field] > 0);
    return ratedReviews.length ? ratedReviews.reduce((acc, review) => acc + (review[field] ?? 0), 0) / ratedReviews.length : 0;
  };
  return {
    count,
    rating_total: average("rating_total"),
    rating_work_usefulness: average("rating_work_usefulness"),
    rating_output_quality: average("rating_output_quality"),
    rating_difficulty: average("rating_difficulty"),
    rating_price: average("rating_price"),
    rating_korean_support: average("rating_korean_support")
  };
}

export function applyReviewSummaryToTool<T extends Tool>(tool: T, reviews: Review[]): T {
  const summary = getReviewSummary(reviews);
  if (!summary.count) return tool;
  return { ...tool, rating_average: summary.rating_total, rating_count: summary.count, comment_count: summary.count };
}

export async function createReview(input: ReviewInput): Promise<Review> {
  const review: Review = {
    review_id: `review_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`,
    ...input,
    helpful_count: 0,
    approved: true,
    created_at: new Date().toISOString()
  };
  await appendSheetRow("Reviews", reviewColumns.map((column) => review[column] ?? ""));
  return review;
}

export async function incrementHelpfulCount(reviewId: string) {
  const rows = await fetchSheetRows("Reviews", { cache: "no-store", revalidate: false });
  const rowIndex = rows.findIndex((row) => row.review_id === reviewId);
  if (rowIndex < 0) throw new Error("추천할 리뷰를 찾을 수 없습니다.");
  const nextCount = num(rows[rowIndex].helpful_count, 0) + 1;
  await updateSheetCell(`Reviews!M${rowIndex + 2}`, nextCount);
  return nextCount;
}

export function getExampleReviews(tool: Pick<Tool, "tool_id" | "slug" | "tool_name">) {
  return exampleReviews.map((review) => ({ ...review, review_id: `${review.review_id}_${tool.tool_id}`, tool_id: tool.tool_id, tool_slug: tool.slug, tool_name: tool.tool_name }));
}
