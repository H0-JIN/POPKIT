import { appendSheetRow, fetchSheetRows } from "@/lib/googleSheets";
import type { Tool } from "@/lib/types";

export const viewColumns = ["view_id", "tool_id", "tool_slug", "tool_name", "viewed_at"] as const;

export type ViewEvent = {
  view_id: string;
  tool_id: string;
  tool_slug: string;
  tool_name: string;
  viewed_at: string;
};

export type ViewInput = Pick<ViewEvent, "tool_id" | "tool_slug" | "tool_name">;

export type WeeklyViewPoint = {
  weekStart: string;
  weekLabel: string;
  count: number;
};

export type UseCasePopularity = {
  useTag: string;
  rank: number;
  toolCount: number;
  totalViews: number;
  weeklyViews: WeeklyViewPoint[];
};

export type ToolViewSummary = {
  total_view_count: number;
  recent_24h_view_count: number;
};

function viewFromRow(row: Record<string, string>, index: number): ViewEvent {
  return {
    view_id: row.view_id || `sheet_view_${index + 1}`,
    tool_id: row.tool_id || "",
    tool_slug: row.tool_slug || "",
    tool_name: row.tool_name || "",
    viewed_at: row.viewed_at || ""
  };
}

export async function createToolView(input: ViewInput): Promise<ViewEvent> {
  const view: ViewEvent = {
    view_id: `view_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`,
    ...input,
    viewed_at: new Date().toISOString()
  };

  await appendSheetRow("Views", viewColumns.map((column) => view[column] ?? ""));
  return view;
}

export async function getAllToolViews(): Promise<ViewEvent[]> {
  const rows = await fetchSheetRows("Views", { cache: "no-store", revalidate: false });
  return rows.map(viewFromRow).filter((view) => (view.tool_id || view.tool_slug) && view.viewed_at);
}

export async function getToolViews(tool: Pick<Tool, "tool_id" | "slug">): Promise<ViewEvent[]> {
  const views = await getAllToolViews();
  return views.filter((view) => view.tool_id === tool.tool_id || view.tool_slug === tool.slug);
}


function addViewToIndex(index: Map<string, ViewEvent[]>, key: string | undefined, view: ViewEvent) {
  const normalizedKey = key?.trim();
  if (!normalizedKey) return;
  const indexedViews = index.get(normalizedKey);
  if (indexedViews) {
    indexedViews.push(view);
    return;
  }
  index.set(normalizedKey, [view]);
}

function getIndexedViewsForTool(index: Map<string, ViewEvent[]>, tool: Pick<Tool, "tool_id" | "slug">) {
  const views = new Set<ViewEvent>();
  for (const key of [tool.tool_id, tool.slug]) {
    const normalizedKey = key.trim();
    if (!normalizedKey) continue;
    index.get(normalizedKey)?.forEach((view) => views.add(view));
  }
  return Array.from(views);
}

export function buildToolViewSummaries(tools: Pick<Tool, "tool_id" | "slug">[], views: ViewEvent[], now = new Date()) {
  const recentThreshold = now.getTime() - 24 * 60 * 60 * 1000;
  const viewsByToolKey = new Map<string, ViewEvent[]>();

  for (const view of views) {
    addViewToIndex(viewsByToolKey, view.tool_id, view);
    addViewToIndex(viewsByToolKey, view.tool_slug, view);
  }

  return new Map(
    tools.map((tool) => {
      const toolViews = getIndexedViewsForTool(viewsByToolKey, tool);
      const summary: ToolViewSummary = {
        total_view_count: toolViews.length,
        recent_24h_view_count: toolViews.filter((view) => {
          const viewedAt = new Date(view.viewed_at).getTime();
          return !Number.isNaN(viewedAt) && viewedAt >= recentThreshold && viewedAt <= now.getTime();
        }).length
      };
      return [toolKey(tool), summary];
    })
  );
}

export function applyViewSummariesToTools<T extends Tool>(tools: T[], views: ViewEvent[], now = new Date()): T[] {
  const summaries = buildToolViewSummaries(tools, views, now);
  return tools.map((tool) => {
    const summary = summaries.get(toolKey(tool)) ?? { total_view_count: 0, recent_24h_view_count: 0 };
    return { ...tool, ...summary };
  });
}

export function validateViewInput(body: unknown): { ok: true; value: ViewInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "조회 기록에 필요한 정보가 없습니다." };
  const source = body as Partial<Record<keyof ViewInput, unknown>>;
  const tool_id = typeof source.tool_id === "string" ? source.tool_id.trim() : "";
  const tool_slug = typeof source.tool_slug === "string" ? source.tool_slug.trim() : "";
  const tool_name = typeof source.tool_name === "string" ? source.tool_name.trim() : "";

  if (!tool_id) return { ok: false, error: "tool_id가 필요합니다." };
  if (!tool_slug) return { ok: false, error: "tool_slug가 필요합니다." };
  if (!tool_name) return { ok: false, error: "tool_name이 필요합니다." };

  return { ok: true, value: { tool_id, tool_slug, tool_name } };
}

function startOfUtcDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function getWeekStart(dateInput: string | Date) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (Number.isNaN(date.getTime())) return "";
  const day = startOfUtcDay(date);
  const dayOfWeek = day.getUTCDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  day.setUTCDate(day.getUTCDate() + diffToMonday);
  return day.toISOString().slice(0, 10);
}

function formatWeekLabel(weekStart: string) {
  const date = new Date(`${weekStart}T00:00:00.000Z`);
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
}

export function getRecentWeeks(count = 12, now = new Date()): WeeklyViewPoint[] {
  const currentWeekStart = getWeekStart(now);
  const start = new Date(`${currentWeekStart}T00:00:00.000Z`);

  return Array.from({ length: count }, (_, index) => {
    const week = new Date(start);
    week.setUTCDate(start.getUTCDate() - (count - 1 - index) * 7);
    const weekStart = week.toISOString().slice(0, 10);
    return { weekStart, weekLabel: formatWeekLabel(weekStart), count: 0 };
  });
}

function toolKey(tool: Pick<Tool, "tool_id" | "slug">) {
  return tool.tool_id || tool.slug;
}

function viewMatchesTool(view: ViewEvent, tool: Pick<Tool, "tool_id" | "slug">) {
  return view.tool_id === tool.tool_id || view.tool_slug === tool.slug;
}

export function buildWeeklyViewSeries(views: ViewEvent[], weeks = getRecentWeeks()): WeeklyViewPoint[] {
  const counts = new Map(weeks.map((week) => [week.weekStart, 0]));

  for (const view of views) {
    const weekStart = getWeekStart(view.viewed_at);
    if (!counts.has(weekStart)) continue;
    counts.set(weekStart, (counts.get(weekStart) ?? 0) + 1);
  }

  return weeks.map((week) => ({ ...week, count: counts.get(week.weekStart) ?? 0 }));
}

export function buildUseCasePopularity(tool: Tool, tools: Tool[], views: ViewEvent[], options: { maxTags?: number; weeks?: WeeklyViewPoint[] } = {}): UseCasePopularity[] {
  const weeks = options.weeks ?? getRecentWeeks();
  const maxTags = options.maxTags ?? 4;
  const selectedTags = tool.use_tags.filter(Boolean).slice(0, maxTags);
  if (!selectedTags.length) return [];

  const recentWeekStarts = new Set(weeks.map((week) => week.weekStart));
  const recentViews = views.filter((view) => recentWeekStarts.has(getWeekStart(view.viewed_at)));
  const totalsByTool = new Map<string, number>();

  for (const candidate of tools) {
    totalsByTool.set(toolKey(candidate), recentViews.filter((view) => viewMatchesTool(view, candidate)).length);
  }

  return selectedTags.map((useTag) => {
    const comparedTools = tools.filter((candidate) => candidate.use_tags.includes(useTag));
    const rankedTools = comparedTools
      .map((candidate) => ({ tool: candidate, totalViews: totalsByTool.get(toolKey(candidate)) ?? 0 }))
      .sort((a, b) => b.totalViews - a.totalViews || a.tool.tool_name.localeCompare(b.tool.tool_name));
    const currentIndex = rankedTools.findIndex(({ tool: candidate }) => candidate.tool_id === tool.tool_id || candidate.slug === tool.slug);
    const currentViews = recentViews.filter((view) => viewMatchesTool(view, tool));
    const weeklyViews = buildWeeklyViewSeries(currentViews, weeks);

    return {
      useTag,
      rank: currentIndex >= 0 ? currentIndex + 1 : rankedTools.length || 1,
      toolCount: comparedTools.length,
      totalViews: weeklyViews.reduce((sum, point) => sum + point.count, 0),
      weeklyViews
    };
  });
}
