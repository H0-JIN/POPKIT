import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Sidebar } from "@/components/Sidebar";
import { getToolBySlug, getTools } from "@/lib/data/tools";
import { getUpdatesByToolId } from "@/lib/data/updates";
import { applyReviewSummaryToTool, getReviewsByTool } from "@/lib/data/reviews";
import { SITE_NAME } from "@/lib/constants";
import { ToolDetailHeader } from "@/components/ToolDetailHeader";
import { ToolDetailTabs } from "@/components/ToolDetailTabs";
import { ToolViewTracker } from "@/components/ToolViewTracker";
import { HeaderActions } from "@/components/HeaderActions";
import { BackToListLink } from "@/components/BackToListLink";
import { buildUseCasePopularity, getAllToolViews } from "@/lib/data/views";

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.slice(0, 20).map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return { title: SITE_NAME };
  return {
    title: `${tool.tool_name} - 평점, 사용법, 업데이트 히스토리 | ${SITE_NAME}`,
    description: `${tool.tool_name}의 주요 기능, 사용법, 사용자 리뷰, 업데이트 정보를 ${SITE_NAME}에서 확인하세요.`,
    openGraph: { title: `${tool.tool_name} | ${SITE_NAME}`, description: tool.short_description, images: tool.image_url ? [tool.image_url] : undefined }
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [allTools, allViews] = await Promise.all([getTools(), getAllToolViews()]);
  const tool = allTools.find((candidate) => candidate.slug === decodeURIComponent(slug));
  if (!tool) return notFound();
  const currentTool = tool;
  const [updates, reviews] = await Promise.all([getUpdatesByToolId(currentTool.tool_id), getReviewsByTool(currentTool)]);
  const reviewAwareTool = applyReviewSummaryToTool(currentTool, reviews);
  const popularityByUseCase = buildUseCasePopularity(reviewAwareTool, allTools, allViews);
  return <main className="flex min-h-screen"><ToolViewTracker tool={reviewAwareTool} /><Sidebar activeCategory={reviewAwareTool.category} activeSubCategory={reviewAwareTool.sub_category} /><section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><HeaderActions /><BackToListLink /><ToolDetailHeader tool={reviewAwareTool} /><ToolDetailTabs tool={reviewAwareTool} updates={updates} reviews={reviews} popularityByUseCase={popularityByUseCase} /></div></section></main>;
}
