import Link from "next/link";
import { getTools } from "@/lib/data/tools";
import { getUpdates } from "@/lib/data/updates";

export const metadata = { title: "AI 업데이트 모음 | AI Tool Archive", description: "공식 출처 기반 AI 업데이트 히스토리를 모아봅니다." };

export default async function UpdatesPage() {
  const [tools, updates] = await Promise.all([getTools(), getUpdates()]);
  const byId = new Map(tools.map((tool) => [tool.tool_id, tool]));
  return <main className="min-h-screen px-4 py-8 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm text-zinc-400 hover:text-cyan-200">← 홈</Link><h1 className="mt-5 text-4xl font-black">전체 AI 업데이트</h1><p className="mt-3 text-zinc-400">공식 블로그, 릴리스 노트, 체인지로그 등 출처가 확인된 업데이트를 우선 노출합니다.</p><div className="mt-8 space-y-4">{updates.map((update) => { const tool = byId.get(update.tool_id); return <article key={update.update_id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><div className="flex flex-wrap items-center gap-2 text-sm"><span className="font-bold text-cyan-200">{tool?.tool_name ?? update.tool_id}</span><span className="text-zinc-500">{update.update_date}</span></div><h2 className="mt-2 text-xl font-bold">{update.update_title}</h2><p className="mt-2 text-zinc-400">{update.update_summary}</p>{update.source_url && <a href={update.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-cyan-200">공식 출처 →</a>}</article>; })}</div></div></main>;
}
