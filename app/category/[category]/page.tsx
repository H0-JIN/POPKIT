import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { ToolExplorer } from "@/components/ToolExplorer";
import { getTools } from "@/lib/data/tools";
import { applyReviewSummariesToTools, getReviews } from "@/lib/data/reviews";
import { applyViewSummariesToTools, getAllToolViews } from "@/lib/data/views";
import { SITE_NAME } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return { title: `${decoded} AI 툴 | ${SITE_NAME}`, description: `${decoded} 카테고리의 AI 툴 평점, 리뷰, 업데이트를 확인하세요.` };
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string }>; searchParams: Promise<{ sub?: string }> }) {
  const [{ category }, query] = await Promise.all([params, searchParams]);
  const decoded = decodeURIComponent(category);
  const subCategory = query.sub ? decodeURIComponent(query.sub) : undefined;
  const [tools, reviews, views] = await Promise.all([getTools(), getReviews(), getAllToolViews()]);
  const reviewAwareTools = applyReviewSummariesToTools(tools, reviews);
  const viewAwareTools = applyViewSummariesToTools(reviewAwareTools, views);
  const title = subCategory ? `${decoded} > ${subCategory} AI 툴` : `${decoded} AI 툴`;
  const description = subCategory ? `${decoded}/${subCategory} 업무 흐름에 맞는 AI 툴을 검색, 필터, 정렬로 비교하세요.` : `${decoded} 직무와 업무 흐름에 맞는 AI 툴을 검색, 필터, 정렬로 비교하세요.`;
  return <main className="flex min-h-screen"><Sidebar activeCategory={decoded} activeSubCategory={subCategory} /><ToolExplorer tools={viewAwareTools} category={decoded} subCategory={subCategory} title={title} description={description} /></main>;
}
