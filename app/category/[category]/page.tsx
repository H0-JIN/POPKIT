import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { ToolExplorer } from "@/components/ToolExplorer";
import { getTools } from "@/lib/data/tools";
import { SITE_NAME } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return { title: `${decoded} AI 툴 | ${SITE_NAME}`, description: `${decoded} 카테고리의 AI 툴 평점, 리뷰, 업데이트를 확인하세요.` };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const tools = await getTools();
  return <main className="flex min-h-screen"><Sidebar activeCategory={decoded} /><ToolExplorer tools={tools} category={decoded} title={`${decoded} AI 툴`} description={`${decoded} 직무와 업무 흐름에 맞는 AI 툴을 검색, 필터, 정렬로 비교하세요.`} /></main>;
}
