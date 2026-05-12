import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.tool_id || !body?.comment) return NextResponse.json({ error: "tool_id and comment are required" }, { status: 400 });
  // MVP: 클라이언트 로컬 상태로 반영합니다. 추후 Google Sheets append 또는 Supabase insert를 이 지점에 연결합니다.
  return NextResponse.json({ ok: true, review: body }, { status: 201 });
}
