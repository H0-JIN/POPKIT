import { Sidebar } from "@/components/Sidebar";
import { ToolExplorer } from "@/components/ToolExplorer";
import { getTools } from "@/lib/data/tools";

export default async function Home() {
  const tools = await getTools();
  return <main className="flex min-h-screen"><Sidebar /><ToolExplorer tools={tools} title="AI 툴을 직무와 업무별로 빠르게 탐색하세요" description="기획, 디자인, 개발, 생산성 AI를 평점·댓글·공식 업데이트 기준으로 비교하고 상세 사용법까지 확인할 수 있습니다." /></main>;
}
