import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/constants";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE_NAME} | 기획자·디자이너·개발자를 위한 AI 툴 큐레이션`,
  description: "AI 툴의 평점, 사용법, 리뷰, 공식 업데이트 히스토리를 탐색하는 카드 기반 큐레이션 아카이브입니다.",
  openGraph: { title: SITE_NAME, description: "기획자, 디자이너, 개발자를 위한 AI Tool Archive", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ko"><body className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,.10),transparent_28%),#09090b] font-sans antialiased"><LanguageProvider>{children}</LanguageProvider></body></html>;
}
