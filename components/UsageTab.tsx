import type { Tool } from "@/lib/types";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

export function UsageTab({ tool }: { tool: Tool }) {
  return <div className="space-y-5"><YouTubeEmbed url={tool.youtube_url} title={`${tool.tool_name} 사용법 영상`} /><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"><h2 className="text-xl font-bold">핵심 사용법 요약</h2><ol className="mt-4 space-y-3 text-zinc-400">{tool.youtube_summary.slice(0, 3).map((line, index) => <li key={line} className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan-300 text-sm font-bold text-zinc-950">{index + 1}</span><span>{line}</span></li>)}</ol></div></div>;
}
