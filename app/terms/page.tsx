import type { Metadata } from "next";
import { PolicyPageContent } from "@/components/PolicyPageContent";

export const metadata: Metadata = {
  title: "이용약관 | POPKIT",
  description: "POPKIT 서비스 이용과 사용자 콘텐츠 참여에 관한 기본 원칙을 안내합니다."
};

export default function TermsPage() {
  return <PolicyPageContent kind="terms" />;
}
