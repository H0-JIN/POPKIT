import type { SortKey, Tool } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function getDomain(url: string) {
  try {
    const normalizedUrl = /^[a-z][a-z\d+.-]*:/i.test(url) ? url : `https://${url.replace(/^\/\//, "")}`;
    return new URL(normalizedUrl).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function daysAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.max(0, now.getTime() - date.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (Number.isNaN(days)) return "업데이트 날짜 확인 필요";
  if (days === 0) return "오늘 업데이트";
  if (days < 7) return `업데이트 ${days}일 전`;
  if (days < 30) return `업데이트 ${Math.floor(days / 7)}주 전`;
  if (days < 365) return `업데이트 ${Math.floor(days / 30)}개월 전`;
  return `업데이트 ${Math.floor(days / 365)}년 전`;
}

export function recentUpdateBonus(dateString: string) {
  const days = Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000);
  if (Number.isNaN(days)) return 0;
  if (days <= 7) return 30;
  if (days <= 30) return 20;
  if (days <= 90) return 10;
  return 0;
}

export function popularityScore(tool: Tool) {
  return tool.popularity_score ?? tool.rating_count * 0.25 + tool.comment_count * 0.25 + tool.rating_average * 20 + recentUpdateBonus(tool.last_update_date);
}


export function primaryCategoryPath(tool: Tool) {
  return tool.category_paths?.[0] ?? `${tool.category}/${tool.sub_category}`;
}

export function matchesCategoryPath(tool: Tool, category?: string, subCategory?: string) {
  if (!category || category === "All Cases") return true;
  const paths = tool.category_paths?.length ? tool.category_paths : [`${tool.category}/${tool.sub_category}`];
  const normalizedCategory = decodeURIComponent(category);
  const normalizedSubCategory = subCategory ? decodeURIComponent(subCategory) : undefined;
  const normalizedPaths = paths.map((path) => path.replace(/[>＞]/g, "/").replace(/\s*\/\s*/g, "/").trim());
  if (normalizedSubCategory) return normalizedPaths.includes(`${normalizedCategory}/${normalizedSubCategory}`);
  return normalizedPaths.some((path) => path === normalizedCategory || path.startsWith(`${normalizedCategory}/`));
}

export function sortTools(tools: Tool[], sort: SortKey) {
  return [...tools].sort((a, b) => {
    if (sort === "updated") return new Date(b.last_update_date).getTime() - new Date(a.last_update_date).getTime();
    if (sort === "rating") return (b.rating_average * Math.log10(b.rating_count + 10)) - (a.rating_average * Math.log10(a.rating_count + 10));
    if (sort === "comments") return b.comment_count - a.comment_count;
    if (sort === "recent") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return popularityScore(b) - popularityScore(a);
  });
}

export function matchesTool(tool: Tool, query: string, filters: string[]) {
  const q = query.trim().toLowerCase();
  const haystack = [tool.tool_name, tool.editor_quote, tool.short_description, tool.full_description, tool.category, tool.sub_category, ...(tool.category_paths ?? []), ...tool.tags, ...tool.use_tags, ...tool.recommended_use_cases].join(" ").toLowerCase();
  const queryOk = !q || haystack.includes(q);
  const filtersOk = filters.every((filter) => {
    if (filter === "한국어 지원") return tool.korean_support;
    if (filter === "초보자 추천") return tool.difficulty.includes("초보") || tool.recommended_users.some((u) => u.includes("초보"));
    return tool.pricing === filter;
  });
  return queryOk && filtersOk;
}

export function getYouTubeId(url?: string) {
  if (!url) return undefined;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match?.[1];
}
