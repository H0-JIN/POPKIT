import { NextResponse } from "next/server";

export async function POST(_request: Request, { params }: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await params;
  // MVP: localStorage 중복 방지는 클라이언트에서 처리합니다. 추후 DB의 helpful_count 증가 로직을 연결합니다.
  return NextResponse.json({ ok: true, reviewId });
}
