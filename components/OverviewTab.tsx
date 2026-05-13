import type { ReactNode } from "react";
import type { Tool, ToolUpdate } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { RatingBadge } from "@/components/RatingBadge";
import { UpdateBadge } from "@/components/UpdateBadge";

function FeatureBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="font-bold text-white">{title}</h3>
      {items.length ? <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{items.map((item) => <li key={item}>• {item}</li>)}</ul> : <p className="mt-3 text-sm text-zinc-500">정보를 준비 중입니다.</p>}
    </section>
  );
}

function MetricItem({ label, value, helper }: { label: string; value: ReactNode; helper?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs font-semibold text-zinc-500">{label}</p>
      <div className="mt-2 text-lg font-black text-white">{value}</div>
      {helper ? <p className="mt-1 text-xs text-zinc-500">{helper}</p> : null}
    </div>
  );
}

export function OverviewTab({ tool, updates }: { tool: Tool; updates: ToolUpdate[] }) {
  const latestUpdate = updates[0]?.update_date || tool.last_update_date;
  const hasRating = tool.rating_count > 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <p className="text-sm font-bold text-cyan-200">AI 기본 소개</p>
          <h2 className="mt-2 text-2xl font-black text-white">{tool.tool_name}를 한눈에 이해하기</h2>
          <p className="mt-5 text-base leading-8 text-zinc-300">{tool.full_description}</p>
        </div>
        <aside className="rounded-[2rem] border border-white/10 bg-zinc-950/35 p-5">
          <p className="text-sm font-bold text-white">핵심 지표</p>
          <div className="mt-4 grid gap-3">
            <MetricItem label="평점 / 평가 수" value={hasRating ? <RatingBadge rating={tool.rating_average} count={tool.rating_count} /> : "아직 사용자 평가가 없습니다."} helper={hasRating ? undefined : "첫 리뷰를 남겨보세요."} />
            <MetricItem label="댓글 수" value={`${formatNumber(tool.comment_count)}개`} />
            <MetricItem label="업데이트 히스토리" value={`${formatNumber(updates.length)}개`} helper="공식 출처 기반 기록" />
            <MetricItem label="최근 업데이트 시점" value={<UpdateBadge date={latestUpdate} />} helper={latestUpdate} />
          </div>
        </aside>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <FeatureBlock title="주요 기능" items={tool.main_features} />
        <FeatureBlock title="추천 사용 업무" items={tool.recommended_use_cases} />
        <FeatureBlock title="추천 사용자" items={tool.recommended_users} />
        <FeatureBlock title="장점" items={tool.strengths.length ? tool.strengths : tool.pros} />
        <FeatureBlock title="주의할 점" items={tool.cautions.length ? tool.cautions : tool.cons} />
        <FeatureBlock title="유사 AI / 대체 AI" items={tool.alternatives} />
      </section>
    </div>
  );
}
