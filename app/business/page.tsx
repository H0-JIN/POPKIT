import type { Metadata } from "next";
import { BusinessContent } from "@/components/BusinessContent";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `기업 서비스 | ${SITE_NAME}`,
  description: "POPKIT은 실제 사용자 리뷰와 활용 맥락 데이터를 기반으로 기업의 AI 선택, 추천, 교육, 제휴 전략을 돕는 플랫폼입니다."
};

export default function BusinessPage() {
  return <BusinessContent />;
}
