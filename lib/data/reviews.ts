import { fetchSheetRows } from "@/lib/googleSheets";
import { exampleReviews, seedReviews } from "@/lib/data/seed";
import type { Review } from "@/lib/types";

function num(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function getReviews(): Promise<Review[]> {
  const rows = await fetchSheetRows("Reviews");
  const sheet = rows.map((row, index) => ({
    review_id: row.review_id || `sheet_review_${index + 1}`,
    tool_id: row.tool_id || "",
    user_role: row.user_role || "사용자",
    rating_total: num(row.rating_total, 4.3),
    rating_work_usefulness: num(row.rating_work_usefulness, 4.3),
    rating_output_quality: num(row.rating_output_quality, 4.2),
    rating_difficulty: num(row.rating_difficulty, 4.1),
    rating_price: num(row.rating_price, 4.0),
    rating_korean_support: num(row.rating_korean_support, 3.9),
    comment: row.comment || "",
    helpful_count: num(row.helpful_count, 0),
    approved: !row.approved || ["true", "TRUE", "1", "yes", "승인"].includes(row.approved),
    created_at: row.created_at || new Date().toISOString()
  })).filter((review) => review.tool_id && review.comment && review.approved);
  return [...sheet, ...seedReviews].sort((a, b) => b.helpful_count - a.helpful_count);
}

export async function getReviewsByToolId(toolId: string) {
  return (await getReviews()).filter((review) => review.tool_id === toolId);
}

export function getExampleReviews(toolId: string) {
  return exampleReviews.map((review) => ({ ...review, review_id: `${review.review_id}_${toolId}`, tool_id: toolId }));
}
