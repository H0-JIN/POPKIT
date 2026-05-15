"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type { Tool, ToolUpdate } from "@/lib/types";
import type { UseCasePopularity, WeeklyViewPoint } from "@/lib/data/views";
import { useLanguage } from "@/lib/i18n";
import { translateTag } from "@/lib/displayTranslations";
import { cn, formatNumber } from "@/lib/utils";
import { RatingBadge } from "@/components/RatingBadge";
import { UpdateBadge } from "@/components/UpdateBadge";

function FeatureBlock({ title, items, emptyText }: { title: string; items: string[]; emptyText: string }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="font-bold text-white">{title}</h3>
      {items.length ? <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{items.map((item) => <li key={item}>• {item}</li>)}</ul> : <p className="mt-3 text-sm text-zinc-500">{emptyText}</p>}
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

function PopularityLineChart({ points, valueLabel }: { points: WeeklyViewPoint[]; valueLabel: string }) {
  const width = 640;
  const height = 260;
  const padding = { top: 30, right: 22, bottom: 42, left: 42 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxCount = Math.max(1, ...points.map((point) => point.count));
  const coordinates = points.map((point, index) => {
    const x = padding.left + (points.length <= 1 ? chartWidth / 2 : (chartWidth / (points.length - 1)) * index);
    const y = padding.top + chartHeight - (point.count / maxCount) * chartHeight;
    return { ...point, x, y };
  });
  const path = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const gridLines = Array.from({ length: 4 }, (_, index) => {
    const y = padding.top + (chartHeight / 3) * index;
    const value = Math.round(maxCount - (maxCount / 3) * index);
    return { y, value };
  });

  return (
    <div className="rounded-[2rem] border border-cyan-300/10 bg-zinc-950/45 p-3 sm:p-5">
      <svg role="img" aria-label={valueLabel} viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full sm:h-[260px]">
        <defs>
          <linearGradient id="popularity-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <filter id="popularity-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {gridLines.map((line) => (
          <g key={line.y}>
            <line x1={padding.left} x2={width - padding.right} y1={line.y} y2={line.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <text x={padding.left - 10} y={line.y + 4} textAnchor="end" className="fill-zinc-600 text-[11px]">{line.value}</text>
          </g>
        ))}
        <path d={path} fill="none" stroke="url(#popularity-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" filter="url(#popularity-glow)" />
        {coordinates.map((point, index) => (
          <g key={point.weekStart}>
            <circle cx={point.x} cy={point.y} r="5" fill="#020617" stroke="#67e8f9" strokeWidth="3" />
            <text x={point.x} y={Math.max(14, point.y - 12)} textAnchor="middle" className={cn("fill-cyan-100 text-[12px] font-bold", index % 2 === 1 ? "hidden sm:block" : "")}>{point.count}</text>
            <text x={point.x} y={height - 14} textAnchor="middle" className={cn("fill-zinc-500 text-[11px]", index % 2 === 1 ? "hidden sm:block" : "")}>{point.weekLabel}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PopularityByUseCase({ popularity }: { popularity: UseCasePopularity[] }) {
  const { locale, t } = useLanguage();
  const visiblePopularity = popularity.slice(0, 4);
  const [selectedUseTag, setSelectedUseTag] = useState(visiblePopularity[0]?.useTag ?? "");
  const selected = useMemo(() => visiblePopularity.find((item) => item.useTag === selectedUseTag) ?? visiblePopularity[0], [selectedUseTag, visiblePopularity]);
  const hasViews = visiblePopularity.some((item) => item.totalViews > 0);

  if (!visiblePopularity.length) return null;

  if (!hasViews) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
        <p className="text-sm font-bold text-cyan-200">{t.detail.overview.popularityTitle}</p>
        <h2 className="mt-2 text-2xl font-black text-white">{t.detail.overview.popularityEmptyTitle}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{t.detail.overview.popularityEmptyDescription}</p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-cyan-200">{t.detail.overview.popularityTitle}</p>
          <h2 className="mt-2 text-2xl font-black text-white">{t.detail.overview.popularityHeading}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{t.detail.overview.popularityDescription}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t.detail.overview.views}</p>
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {visiblePopularity.map((item) => {
          const label = translateTag(item.useTag, locale);
          return (
            <button key={item.useTag} type="button" onClick={() => setSelectedUseTag(item.useTag)} className={cn("whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold transition", selected?.useTag === item.useTag ? "bg-cyan-300 text-zinc-950" : "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.08] hover:text-white")}>{label}</button>
          );
        })}
      </div>
      {selected ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <MetricItem label={t.detail.overview.useCaseRankLabel} value={t.detail.overview.useCaseRank(selected.rank, translateTag(selected.useTag, locale))} />
            <MetricItem label={t.detail.overview.comparedToolsLabel} value={t.detail.overview.comparedTools(selected.toolCount)} />
            <MetricItem label={t.detail.overview.lastTwelveWeeksLabel} value={t.detail.overview.lastTwelveWeeksViews(formatNumber(selected.totalViews))} />
          </div>
          <PopularityLineChart points={selected.weeklyViews} valueLabel={`${translateTag(selected.useTag, locale)} ${t.detail.overview.views}`} />
        </div>
      ) : null}
    </section>
  );
}

export function OverviewTab({ tool, updates, popularityByUseCase }: { tool: Tool; updates: ToolUpdate[]; popularityByUseCase: UseCasePopularity[] }) {
  const { t } = useLanguage();
  const latestUpdate = updates[0]?.update_date || tool.last_update_date;
  const hasRating = tool.rating_count > 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <p className="text-sm font-bold text-cyan-200">{t.detail.overview.about}</p>
          <h2 className="mt-2 text-2xl font-black text-white">{t.detail.overview.aboutTitle(tool.tool_name)}</h2>
          <p className="mt-5 text-base leading-8 text-zinc-300">{tool.full_description}</p>
        </div>
        <aside className="rounded-[2rem] border border-white/10 bg-zinc-950/35 p-5">
          <p className="text-sm font-bold text-white">{t.detail.overview.metrics}</p>
          <div className="mt-4 grid gap-3">
            <MetricItem label={t.detail.overview.ratingCount} value={hasRating ? <RatingBadge rating={tool.rating_average} count={tool.rating_count} /> : t.detail.overview.noUserRatings} helper={hasRating ? undefined : t.detail.overview.firstReview} />
            <MetricItem label={t.detail.overview.commentCount} value={t.detail.overview.countUnit(formatNumber(tool.comment_count))} />
            <MetricItem label={t.detail.overview.updateHistory} value={t.detail.overview.countUnit(formatNumber(updates.length))} helper={t.detail.overview.officialHistory} />
            <MetricItem label={t.detail.overview.recentUpdate} value={<UpdateBadge date={latestUpdate} />} helper={latestUpdate} />
          </div>
        </aside>
      </section>
      <PopularityByUseCase popularity={popularityByUseCase} />
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <FeatureBlock title={t.detail.overview.features} items={tool.main_features} emptyText={t.detail.overview.preparing} />
        <FeatureBlock title={t.detail.overview.recommendedTasks} items={tool.recommended_use_cases} emptyText={t.detail.overview.preparing} />
        <FeatureBlock title={t.detail.overview.recommendedUsers} items={tool.recommended_users} emptyText={t.detail.overview.preparing} />
        <FeatureBlock title={t.detail.overview.strengths} items={tool.strengths.length ? tool.strengths : tool.pros} emptyText={t.detail.overview.preparing} />
        <FeatureBlock title={t.detail.overview.cautions} items={tool.cautions.length ? tool.cautions : tool.cons} emptyText={t.detail.overview.preparing} />
        <FeatureBlock title={t.detail.overview.alternatives} items={tool.alternatives} emptyText={t.detail.overview.preparing} />
      </section>
    </div>
  );
}
