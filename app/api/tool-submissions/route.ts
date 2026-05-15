import { NextResponse } from "next/server";
import { createToolSubmission, validateToolSubmissionInput } from "@/lib/data/toolSubmissions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateToolSubmissionInput(body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });

  try {
    await createToolSubmission(validation.value);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "툴 제보 저장 중 알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
