import { NextResponse } from "next/server";
import { incrementHelpfulCount } from "@/lib/data/reviews";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await params;
  if (!reviewId) return NextResponse.json({ error: "reviewId가 필요합니다." }, { status: 400 });

  try {
    const helpful_count = await incrementHelpfulCount(reviewId);
    return NextResponse.json({ ok: true, reviewId, helpful_count });
  } catch (error) {
    const message = error instanceof Error ? error.message : "추천 수 저장 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
