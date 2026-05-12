import Image from "next/image";
import type { Tool } from "@/lib/types";
import { getDomain } from "@/lib/utils";
import { RatingBadge } from "@/components/RatingBadge";
import { UpdateBadge } from "@/components/UpdateBadge";

function MetaPill({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"><span className="text-zinc-500">{label}</span> {value}</span>;
}

export function ToolDetailHeader({ tool }: { tool: Tool }) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-cyan-300/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[1fr_260px] lg:items-start">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row">
          <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-300 to-violet-500 text-3xl font-black text-zinc-950">{tool.logo_url ? <Image src={tool.logo_url} alt={`${tool.tool_name} logo`} fill className="object-cover" /> : tool.tool_name.slice(0, 2)}</div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-cyan-200"><span>{tool.category}</span><span>/</span><span>{tool.sub_category}</span></div>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{tool.tool_name}</h1>
            {tool.editor_quote ? <p className="mt-4 max-w-3xl border-l-2 border-cyan-300/60 pl-4 text-lg font-semibold leading-8 text-cyan-100">“{tool.editor_quote}”</p> : null}
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{tool.short_description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2"><RatingBadge rating={tool.rating_average} count={tool.rating_count} /><span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300">댓글 {tool.comment_count}</span><UpdateBadge date={tool.last_update_date} /></div>
          </div>
        </div>
        <aside className="rounded-3xl border border-white/10 bg-zinc-950/35 p-4">
          <div className="flex flex-wrap gap-2"><MetaPill label="가격" value={tool.pricing} /><MetaPill label="난이도" value={tool.difficulty} /><MetaPill label="한국어" value={tool.korean_support ? "지원" : "확인 필요"} /></div>
          <div className="mt-5 flex flex-col gap-3"><a href={tool.official_url} target="_blank" rel="noreferrer" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-black text-zinc-950 hover:bg-cyan-200">공식 사이트 바로가기</a><button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-zinc-200 hover:bg-white/5">즐겨찾기 ☆</button><span className="text-center text-xs text-zinc-500">{getDomain(tool.official_url)}</span></div>
        </aside>
      </div>
    </header>
  );
}
