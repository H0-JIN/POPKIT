"use client";

import { useState } from "react";
import type { Review, Tool, ToolUpdate } from "@/lib/types";
import { cn } from "@/lib/utils";
import { OverviewTab } from "@/components/OverviewTab";
import { UsageTab } from "@/components/UsageTab";
import { UpdatesTab } from "@/components/UpdatesTab";
import { ReviewsTab } from "@/components/ReviewsTab";

const tabs = ["개요", "사용법", "업데이트 히스토리", "리뷰"] as const;

type Tab = (typeof tabs)[number];

export function ToolDetailTabs({ tool, updates, reviews }: { tool: Tool; updates: ToolUpdate[]; reviews: Review[] }) {
  const [active, setActive] = useState<Tab>("개요");
  return <div className="mt-6"><div className="sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-white/10 bg-zinc-950/90 py-3 backdrop-blur">{tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={cn("whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold", active === tab ? "bg-cyan-300 text-zinc-950" : "bg-white/[0.04] text-zinc-400 hover:text-white")}>{tab}</button>)}</div><div className="py-6">{active === "개요" && <OverviewTab tool={tool} updatesCount={updates.length} />}{active === "사용법" && <UsageTab tool={tool} />}{active === "업데이트 히스토리" && <UpdatesTab updates={updates} />}{active === "리뷰" && <ReviewsTab tool={tool} initialReviews={reviews} />}</div></div>;
}
