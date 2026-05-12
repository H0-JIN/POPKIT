import type { Tool } from "@/lib/types";
import { RatingBadge } from "@/components/RatingBadge";

function FeatureBlock({ title, items, emphasis = false }: { title: string; items: string[]; emphasis?: boolean }) {
  return (
    <section className={emphasis ? "rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5" : "rounded-3xl border border-white/10 bg-white/[0.03] p-5"}>
      <h3 className="font-bold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{items.map((item) => <li key={item}>• {item}</li>)}</ul>
    </section>
  );
}

function MetaBadge({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300"><span className="text-zinc-500">{label}</span> {value}</span>;
}

export function OverviewTab({ tool }: { tool: Tool }) {
  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <p className="text-sm font-bold text-cyan-200">AI 기본 소개</p>
          <h2 className="mt-2 text-2xl font-black text-white">{tool.tool_name}를 한눈에 이해하기</h2>
          {tool.editor_quote ? <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.08] p-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">에디터 한줄평</p><p className="mt-3 text-xl font-semibold leading-8 text-cyan-50">“{tool.editor_quote}”</p></div> : null}
          <p className="mt-5 text-base leading-8 text-zinc-300">{tool.full_description}</p>
        </div>
        <aside className="rounded-[2rem] border border-white/10 bg-zinc-950/35 p-5">
          <p className="text-sm font-bold text-white">핵심 지표</p>
          <div className="mt-4"><RatingBadge rating={tool.rating_average} count={tool.rating_count} /></div>
          <div className="mt-4 flex flex-wrap gap-2"><MetaBadge label="가격" value={tool.pricing} /><MetaBadge label="난이도" value={tool.difficulty} /><MetaBadge label="한국어" value={tool.korean_support ? "지원" : "확인 필요"} /></div>
          <p className="mt-5 text-sm leading-6 text-zinc-500">평점과 댓글은 우선 검토할 도구를 고르는 기준으로, 가격·난이도·한국어 지원은 보조 메타 정보로 확인하세요.</p>
        </aside>
      </section>
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <FeatureBlock title="주요 기능" items={tool.main_features} emphasis />
        <FeatureBlock title="추천 사용 업무" items={tool.recommended_use_cases} />
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <FeatureBlock title="추천 사용자" items={tool.recommended_users} />
        <FeatureBlock title="장점" items={tool.pros} />
        <FeatureBlock title="주의할 점" items={tool.cons} />
        <FeatureBlock title="유사 AI / 대체 AI" items={tool.alternatives} />
      </section>
    </div>
  );
}
