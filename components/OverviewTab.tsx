import type { Tool } from "@/lib/types";

function Block({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><h3 className="font-bold text-white">{title}</h3><ul className="mt-3 space-y-2 text-sm text-zinc-400">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}

export function OverviewTab({ tool }: { tool: Tool }) {
  return <div className="space-y-5"><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"><h2 className="text-xl font-bold">AI 기본 설명</h2><p className="mt-3 leading-7 text-zinc-400">{tool.full_description}</p></div><div className="grid gap-5 md:grid-cols-2"><Block title="주요 기능" items={tool.main_features} /><Block title="추천 사용 업무" items={tool.recommended_use_cases} /><Block title="추천 사용자" items={tool.recommended_users} /><Block title="장점" items={tool.pros} /><Block title="주의할 점" items={tool.cons} /><Block title="유사 AI / 대체 AI" items={tool.alternatives} /></div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white/[0.04] p-4"><span className="text-xs text-zinc-500">가격</span><strong className="mt-1 block">{tool.pricing}</strong></div><div className="rounded-2xl bg-white/[0.04] p-4"><span className="text-xs text-zinc-500">난이도</span><strong className="mt-1 block">{tool.difficulty}</strong></div><div className="rounded-2xl bg-white/[0.04] p-4"><span className="text-xs text-zinc-500">한국어 지원</span><strong className="mt-1 block">{tool.korean_support ? "지원" : "확인 필요"}</strong></div></div></div>;
}
