"use client";

import { useState } from "react";
import type { Review, Tool, ToolUpdate } from "@/lib/types";
import type { UseCasePopularity } from "@/lib/data/views";
import { useLanguage } from "@/lib/i18n";
import { localizeToolContent } from "@/lib/localizedTool";
import { cn } from "@/lib/utils";
import { OverviewTab } from "@/components/OverviewTab";
import { UsageTab } from "@/components/UsageTab";
import { UpdatesTab } from "@/components/UpdatesTab";
import { ReviewsTab } from "@/components/ReviewsTab";

const tabs = ["overview", "usage", "updates", "reviews"] as const;
type Tab = (typeof tabs)[number];

export function ToolDetailTabs({ tool, updates, reviews, popularityByUseCase }: { tool: Tool; updates: ToolUpdate[]; reviews: Review[]; popularityByUseCase: UseCasePopularity[] }) {
  const [active, setActive] = useState<Tab>("overview");
  const { locale, t } = useLanguage();
  const displayTool = localizeToolContent(tool, locale);
  return <div className="mt-6"><div className="sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-white/10 bg-zinc-950/90 py-3 backdrop-blur">{tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={cn("whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold", active === tab ? "bg-cyan-300 text-zinc-950" : "bg-white/[0.04] text-zinc-400 hover:text-white")}>{t.detail.tabs[tab]}</button>)}</div><div className="py-6">{active === "overview" && <OverviewTab tool={displayTool} updates={updates} popularityByUseCase={popularityByUseCase} />}{active === "usage" && <UsageTab tool={displayTool} />}{active === "updates" && <UpdatesTab updates={updates} />}{active === "reviews" && <ReviewsTab tool={tool} initialReviews={reviews} />}</div></div>;
}
