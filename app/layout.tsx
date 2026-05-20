import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/constants";
import { SiteFooter } from "@/components/SiteFooter";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const siteTitle = `${SITE_NAME} | 직무와 업무별 AI 툴 추천 플랫폼`;
const siteDescription = `${SITE_NAME}은 실제 사용자 리뷰와 활용 경험을 바탕으로, 직무와 목적에 맞는 AI 툴 선택과 조합을 돕는 플랫폼입니다.`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ko"><body className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,.10),transparent_28%),#09090b] font-sans antialiased"><LanguageProvider>{children}<SiteFooter /></LanguageProvider></body></html>;
}
