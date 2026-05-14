import { NextResponse } from "next/server";
import { createReview, validateReviewInput } from "@/lib/data/reviews";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateReviewInput(body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });

  try {
    const review = await createReview(validation.value);
    return NextResponse.json({ ok: true, review }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "리뷰 저장 중 알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
