import type { Metadata } from "next";
import { PolicyPageContent } from "@/components/PolicyPageContent";

export const metadata: Metadata = {
  title: "개인정보처리방침 | POPKIT",
  description: "POPKIT이 수집하고 활용하는 정보와 개인정보 처리 원칙을 안내합니다."
};

export default function PrivacyPage() {
  return <PolicyPageContent kind="privacy" />;
}
