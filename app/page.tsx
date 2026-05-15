import { Sidebar } from "@/components/Sidebar";
import { ToolExplorer } from "@/components/ToolExplorer";
import { getTools } from "@/lib/data/tools";
import { applyReviewSummariesToTools, getReviews } from "@/lib/data/reviews";
import { applyViewSummariesToTools, getAllToolViews } from "@/lib/data/views";

export default async function Home() {
  const [tools, reviews, views] = await Promise.all([getTools(), getReviews(), getAllToolViews()]);
  const reviewAwareTools = applyReviewSummariesToTools(tools, reviews);
  const viewAwareTools = applyViewSummariesToTools(reviewAwareTools, views);
  return <main className="flex min-h-screen"><Sidebar /><ToolExplorer tools={viewAwareTools} title={"AI 툴을 직무와 업무별로\n빠르게 탐색하세요"} description="기획, 디자인, 개발, 생산성 AI를 평점·댓글·공식 업데이트 기준으로 비교하고 상세 사용법까지 확인할 수 있습니다." /></main>;
}
