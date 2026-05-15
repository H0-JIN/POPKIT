import { appendSheetRow } from "@/lib/googleSheets";
import { isReviewRole, type ReviewRole } from "@/lib/reviewRoles";

export const submissionColumns = [
  "submission_id",
  "tool_name",
  "official_url",
  "suggested_use",
  "reason",
  "user_role",
  "email",
  "status",
  "created_at"
] as const;

export type ToolSubmissionInput = {
  tool_name: string;
  official_url: string;
  suggested_use: string;
  reason: string;
  user_role: ReviewRole;
  email: string;
};

type ToolSubmission = ToolSubmissionInput & {
  submission_id: string;
  status: "pending";
  created_at: string;
};

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateToolSubmissionInput(body: unknown): { ok: true; value: ToolSubmissionInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "제보 요청 형식이 올바르지 않습니다." };

  const data = body as Record<string, unknown>;
  const tool_name = String(data.tool_name ?? "").trim();
  const official_url = String(data.official_url ?? "").trim();
  const suggested_use = String(data.suggested_use ?? "").trim();
  const reason = String(data.reason ?? "").trim();
  const user_role = String(data.user_role ?? "").trim();
  const email = String(data.email ?? "").trim();

  if (!tool_name) return { ok: false, error: "툴 이름을 입력해주세요." };
  if (!official_url || !isValidUrl(official_url)) return { ok: false, error: "올바른 공식 URL을 입력해주세요." };
  if (!suggested_use) return { ok: false, error: "툴의 용도를 입력해주세요." };
  if (!reason) return { ok: false, error: "추천 이유를 입력해주세요." };
  if (!isReviewRole(user_role)) return { ok: false, error: "직무를 선택해주세요." };
  if (email && !isValidEmail(email)) return { ok: false, error: "올바른 이메일 형식을 입력해주세요." };

  return { ok: true, value: { tool_name, official_url, suggested_use, reason, user_role, email } };
}

export async function createToolSubmission(input: ToolSubmissionInput): Promise<ToolSubmission> {
  const submission: ToolSubmission = {
    submission_id: `submission_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`,
    ...input,
    status: "pending",
    created_at: new Date().toISOString()
  };

  await appendSheetRow("Tool_Submissions", submissionColumns.map((column) => submission[column] ?? ""));
  return submission;
}
