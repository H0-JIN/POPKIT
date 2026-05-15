import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Sidebar } from "@/components/Sidebar";
import { getToolBySlug, getTools } from "@/lib/data/tools";
import { getUpdatesByToolId } from "@/lib/data/updates";
import { applyReviewSummaryToTool, getReviewsByTool } from "@/lib/data/reviews";
import { SITE_NAME } from "@/lib/constants";
import { ToolDetailHeader } from "@/components/ToolDetailHeader";
import { ToolDetailTabs } from "@/components/ToolDetailTabs";
import { HeaderActions } from "@/components/HeaderActions";
import { BackToListLink } from "@/components/BackToListLink";

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
    description: `${tool.tool_name}의 주요 기능, 사용법 영상, 사용자 리뷰, 최신 업데이트를 확인하세요. ${tool.category}, ${tool.recommended_use_cases.join(", ")}`,
    openGraph: { title: `${tool.tool_name} | ${SITE_NAME}`, description: tool.short_description, images: tool.image_url ? [tool.image_url] : undefined }
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return notFound();
  const currentTool = tool;
  const [updates, reviews] = await Promise.all([getUpdatesByToolId(currentTool.tool_id), getReviewsByTool(currentTool)]);
  const reviewAwareTool = applyReviewSummaryToTool(currentTool, reviews);
  return <main className="flex min-h-screen"><Sidebar activeCategory={reviewAwareTool.category} activeSubCategory={reviewAwareTool.sub_category} /><section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><HeaderActions /><BackToListLink /><ToolDetailHeader tool={reviewAwareTool} /><ToolDetailTabs tool={reviewAwareTool} updates={updates} reviews={reviews} /></div></section></main>;
}
