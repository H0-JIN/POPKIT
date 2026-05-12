import type { ReactNode } from "react";
import type { Tool } from "@/lib/types";
import { daysAgo, formatNumber } from "@/lib/utils";

const emptyMetric = "아직 충분한 평가가 쌓이지 않았습니다.";

function FeatureBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="font-bold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{items.map((item) => <li key={item}>• {item}</li>)}</ul>
    </section>
  );
}

function MetricRow({ label, children }: { label: string; children: ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs font-semibold text-zinc-500">{label}</p><div className="mt-2 text-sm text-zinc-300">{children}</div></div>;
}

export function OverviewTab({ tool, updatesCount }: { tool: Tool; updatesCount: number }) {
  const hasRating = tool.rating_count > 0 && tool.rating_average > 0;
  const hasComments = tool.comment_count > 0;
  const hasUpdates = updatesCount > 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <p className="text-sm font-bold text-cyan-200">AI 기본 소개</p>
          <h2 className="mt-2 text-2xl font-black text-white">{tool.tool_name}를 한눈에 이해하기</h2>
          <p className="mt-5 text-base leading-8 text-zinc-300">{tool.full_description}</p>
        </div>
        <aside className="rounded-[2rem] border border-white/10 bg-zinc-950/35 p-5">
          <p className="text-sm font-bold text-white">핵심 지표</p>
          <div className="mt-4 space-y-3">
            <MetricRow label="평점 + 평가 수">{hasRating ? <span><strong className="text-lg text-amber-200">★ {tool.rating_average.toFixed(1)}</strong><span className="ml-2 text-zinc-500">평가 {formatNumber(tool.rating_count)}개</span></span> : <span className="text-zinc-500">{emptyMetric}</span>}</MetricRow>
            <MetricRow label="댓글 수">{hasComments ? <strong className="text-base text-white">{formatNumber(tool.comment_count)}개</strong> : <span className="text-zinc-500">아직 댓글이 충분히 쌓이지 않았습니다.</span>}</MetricRow>
            <MetricRow label="업데이트 히스토리 수">{hasUpdates ? <strong className="text-base text-white">{formatNumber(updatesCount)}개</strong> : <span className="text-zinc-500">아직 업데이트 히스토리가 없습니다.</span>}</MetricRow>
            <MetricRow label="최근 업데이트 시점">{hasUpdates ? <span className="text-cyan-200">{daysAgo(tool.last_update_date)}</span> : <span className="text-zinc-500">최근 업데이트 내역을 확인 중입니다.</span>}</MetricRow>
          </div>
        </aside>
      </section>
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <FeatureBlock title="주요 기능" items={tool.main_features} />
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
