"use client";

import type { ReactNode } from "react";
import type { Tool, ToolUpdate } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import { formatNumber } from "@/lib/utils";
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

export function OverviewTab({ tool, updates }: { tool: Tool; updates: ToolUpdate[] }) {
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
