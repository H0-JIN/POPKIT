import type { Locale } from "@/lib/i18n";
import type { MascotType } from "@/components/MascotImage";

export const REVIEW_ROLE_OPTIONS = ["기획자", "개발자", "디자이너", "기타"] as const;

export type ReviewRole = (typeof REVIEW_ROLE_OPTIONS)[number];

const reviewRoleMascots: Record<ReviewRole, MascotType> = {
  기획자: "planner",
  개발자: "developer",
  디자이너: "designer",
  기타: "community"
};

const reviewRoleLabels: Record<ReviewRole, Record<Locale, string>> = {
  기획자: { ko: "기획자", en: "Planner" },
  개발자: { ko: "개발자", en: "Developer" },
  디자이너: { ko: "디자이너", en: "Designer" },
  기타: { ko: "기타", en: "Other" }
};

export function isReviewRole(value: string): value is ReviewRole {
  return REVIEW_ROLE_OPTIONS.includes(value as ReviewRole);
}

export function getReviewRoleMascot(userRole: string): MascotType {
  return isReviewRole(userRole) ? reviewRoleMascots[userRole] : "community";
}

export function getReviewRoleLabel(userRole: string, locale: Locale): string {
  return isReviewRole(userRole) ? reviewRoleLabels[userRole][locale] : userRole;
}
