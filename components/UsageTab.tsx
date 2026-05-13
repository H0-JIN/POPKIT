import type { Tool } from "@/lib/types";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

export function UsageTab({ tool }: { tool: Tool }) {
  const steps = (tool.usage_steps.length ? tool.usage_steps : tool.youtube_summary).slice(0, 3);

  return (
    <div className="space-y-5">
      {tool.youtube_url ? <YouTubeEmbed url={tool.youtube_url} title={`${tool.tool_name} 사용법 영상`} /> : null}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-bold">기본 사용 흐름</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {tool.youtube_url ? "영상과 함께 아래 흐름을 따라 실무 적용 단계를 확인해보세요." : "영상 가이드는 준비 중이지만, 아래 흐름으로 바로 시작할 수 있습니다."}
        </p>
        <ol className="mt-4 space-y-3 text-zinc-400">
          {steps.map((line, index) => <li key={`${line}_${index}`} className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan-300 text-sm font-bold text-zinc-950">{index + 1}</span><span>{line}</span></li>)}
        </ol>
      </div>
    </div>
  );
}
