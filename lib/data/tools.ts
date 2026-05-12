import { fetchSheetRows, type SheetRow } from "@/lib/googleSheets";
import { seedTools } from "@/lib/data/seed";
import type { SortKey, Tool } from "@/lib/types";
import { sortTools } from "@/lib/utils";

const aliases: Record<string, string[]> = {
  tool_id: ["tool_id", "id"], slug: ["slug"], tool_name: ["tool_name", "name", "AI 이름", "Tool"], category: ["category", "대표 카테고리"], sub_category: ["sub_category", "subcategory", "세부 카테고리"], tags: ["tags", "태그", "legacy_usage_tags", "활용"], category_paths: ["category_paths", "categories", "분류", "복수 분류", "카테고리 경로"], editor_quote: ["editor_quote", "one_liner", "editor_one_liner", "에디터 한줄평", "한줄평"], short_description: ["short_description", "description", "설명", "한 줄 설명"], full_description: ["full_description", "extra_description", "note", "비고", "상세 설명"], recommended_use_cases: ["recommended_use_cases", "use_cases", "추천 업무"], recommended_users: ["recommended_users", "추천 사용자"], pricing: ["pricing", "price", "가격"], difficulty: ["difficulty", "난이도"], korean_support: ["korean_support", "한국어 지원"], official_url: ["official_url", "url", "link", "링크", "공식 URL"], logo_url: ["logo_url"], image_url: ["image_url"], youtube_url: ["youtube_url"], youtube_summary: ["youtube_summary"], rating_average: ["rating_average", "rating", "평점"], rating_count: ["rating_count", "평가 수"], comment_count: ["comment_count", "댓글 수"], popularity_score: ["popularity_score"], last_update_date: ["last_update_date", "updated_at", "최신순"], created_at: ["created_at"], is_featured: ["is_featured"], main_features: ["main_features", "주요 기능"], pros: ["pros", "장점"], cons: ["cons", "주의할 점"], alternatives: ["alternatives", "유사 AI"], legacy_group: ["legacy_group", "구분"], legacy_category: ["legacy_category", "카테고리"], legacy_usage_tags: ["legacy_usage_tags", "활용"], note: ["note", "extra_description", "비고"], legacy_latest_order: ["legacy_latest_order", "최신순"], legacy_popularity: ["legacy_popularity", "popularity_grade", "인기순"]
};

function value(row: SheetRow, key: string) {
  return aliases[key].map((name) => row[name]).find(Boolean)?.trim() ?? "";
}

function list(text: string) {
  return text.split(/[,|;\n]/).map((item) => item.trim()).filter(Boolean);
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function normalizeCategoryPath(path: string) {
  return path.replace(/[>＞]/g, "/").replace(/\s*\/\s*/g, "/").trim();
}

function normalizeOfficialUrl(url: string, fallback: string) {
  const raw = (url || fallback || "#").trim();
  if (!raw || raw === "#") return "#";
  if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
  return `https://${raw.replace(/^\/+/, "")}`;
}

function addUsagePath(paths: Set<string>, usage: string) {
  const normalized = usage.toLowerCase().replace(/\s/g, "");
  if (usage.includes("이미지") || usage.includes("사진")) paths.add("디자인/이미지");
  if (usage.includes("영상") || usage.includes("비디오") || usage.includes("더빙") || usage.includes("아바타")) paths.add("디자인/영상");
  if (normalized.includes("ux/ui") || normalized.includes("ux·ui") || normalized.includes("ui") || usage.includes("웹사이트")) paths.add("디자인/UX/UI");
  if (usage.includes("브랜드") || usage.includes("그래픽") || usage.includes("로고")) paths.add("디자인/브랜드/그래픽");
  if (usage.includes("내용") || usage.includes("콘텐츠") || usage.includes("카피") || usage.includes("마케팅")) paths.add("기획/콘텐츠");
  if (usage.includes("문서") || usage.includes("글") || usage.includes("요약")) paths.add("기획/문서 작성");
  if (usage.includes("리서치") || usage.includes("검색") || usage.includes("자료")) paths.add("기획/리서치");
  if (normalized.includes("ppt") || usage.includes("제안서") || usage.includes("발표")) paths.add("기획/PPT/제안서");
  if (usage.includes("코드") || usage.includes("코딩") || usage.includes("개발")) paths.add("개발/코드 작성");
  if (usage.includes("디버깅") || usage.includes("버그")) paths.add("개발/디버깅");
  if (usage.includes("자동화") || usage.includes("워크플로우")) paths.add("개발/자동화");
  if (usage.includes("협업") || usage.includes("메신저")) paths.add("기타/협업");
  if (usage.includes("데이터") || usage.includes("분석")) paths.add("기타/데이터 분석");
  if (usage.includes("생산성") || usage.includes("업무")) paths.add("기타/생산성");
  if (usage.includes("기획")) paths.add(paths.has("기획/문서 작성") ? "기획/문서 작성" : "기획/콘텐츠");
}

function pathsFromLegacy(group: string, category: string, usageTags: string[]) {
  const paths = new Set<string>();
  const legacyGroup = group.trim();
  const legacyCategory = category.trim();

  if (legacyGroup === "기획") {
    if (legacyCategory.includes("초안")) {
      paths.add("기획/리서치");
      paths.add("기획/문서 작성");
    } else if (legacyCategory.includes("문서")) paths.add("기획/문서 작성");
    else if (legacyCategory.includes("콘텐츠") || legacyCategory.includes("내용")) paths.add("기획/콘텐츠");
    else if (legacyCategory.toLowerCase().includes("ppt") || legacyCategory.includes("제안서")) paths.add("기획/PPT/제안서");
    else if (legacyCategory.includes("리서치") || legacyCategory.includes("검색")) paths.add("기획/리서치");
    else paths.add("기획/리서치");
  }

  if (legacyGroup === "제작" || legacyGroup === "디자인") {
    if (legacyCategory.includes("이미지")) paths.add("디자인/이미지");
    else if (legacyCategory.includes("영상")) paths.add("디자인/영상");
    else if (legacyCategory.toLowerCase().includes("ux/ui") || legacyCategory.includes("UX/UI")) paths.add("디자인/UX/UI");
    else if (legacyCategory.includes("브랜드") || legacyCategory.includes("그래픽")) paths.add("디자인/브랜드/그래픽");
    else paths.add("디자인/이미지");
  }

  if (legacyGroup === "개발") {
    if (legacyCategory.includes("디버깅")) paths.add("개발/디버깅");
    else if (legacyCategory.includes("웹사이트") || legacyCategory.includes("웹")) paths.add("개발/웹사이트 제작");
    else if (legacyCategory.includes("자동화")) paths.add("개발/자동화");
    else paths.add("개발/코드 작성");
  }

  if (legacyGroup === "기타") {
    if (legacyCategory.includes("협업")) paths.add("기타/협업");
    else if (legacyCategory.includes("데이터") || legacyCategory.includes("분석")) paths.add("기타/데이터 분석");
    else paths.add("기타/생산성");
  }

  usageTags.forEach((usage) => addUsagePath(paths, usage));
  return Array.from(paths);
}

function categoryPaths(text: string, category: string, subCategory: string, fallback?: string[], legacyPaths: string[] = [], preferFallback = false) {
  const paths = list(text).map(normalizeCategoryPath).filter((path) => path.includes("/"));
  if (paths.length) return unique(paths);
  if (legacyPaths.length) return unique([...legacyPaths, ...(fallback ?? [])]);
  if (preferFallback && fallback?.length) return fallback;
  return [`${category || "기타"}/${subCategory || "생산성"}`];
}

function bool(text: string) {
  return ["true", "TRUE", "1", "yes", "Y", "지원", "예"].includes(text);
}

function num(text: string, fallback: number) {
  const parsed = Number(String(text).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "");
}

function fillDownLegacyRows(rows: SheetRow[]) {
  let lastGroup = "";
  let lastCategory = "";
  return rows.map((row) => {
    const next = { ...row };
    const group = value(next, "legacy_group");
    const category = value(next, "legacy_category");
    if (group) lastGroup = group;
    else if (lastGroup) next["구분"] = lastGroup;
    if (category) lastCategory = category;
    else if (lastCategory) next["카테고리"] = lastCategory;
    return next;
  });
}

function adapt(row: SheetRow, index: number): Tool | null {
  const name = value(row, "tool_name");
  if (!name) return null;
  const seed = seedTools.find((tool) => tool.tool_name.toLowerCase() === name.toLowerCase());
  const legacyGroup = value(row, "legacy_group");
  const legacyCategory = value(row, "legacy_category");
  const usageTags = list(value(row, "legacy_usage_tags"));
  const legacyPaths = pathsFromLegacy(legacyGroup, legacyCategory, usageTags);
  const rowCategory = value(row, "category");
  const rowSubCategory = value(row, "sub_category");
  const primaryPath = legacyPaths[0]?.split("/") ?? [];
  const category = rowCategory || primaryPath[0] || seed?.category || "기타";
  const subCategory = rowSubCategory || primaryPath.slice(1).join("/") || seed?.sub_category || "생산성";
  const useSeedCategoryPaths = !rowCategory && !rowSubCategory && !legacyPaths.length;
  const shortDescription = value(row, "short_description") || seed?.short_description || "AI 툴 설명을 준비 중입니다.";
  const note = value(row, "note");
  return {
    ...(seed ?? seedTools[index % seedTools.length]),
    tool_id: value(row, "tool_id") || seed?.tool_id || `sheet_${index + 1}`,
    slug: value(row, "slug") || seed?.slug || slugify(name),
    tool_name: name,
    category,
    sub_category: subCategory,
    category_paths: categoryPaths(value(row, "category_paths"), category, subCategory, seed?.category_paths, legacyPaths, useSeedCategoryPaths),
    tags: list(value(row, "tags")).length ? list(value(row, "tags")) : usageTags.length ? usageTags : seed?.tags ?? [],
    short_description: shortDescription,
    editor_quote: value(row, "editor_quote") || seed?.editor_quote || "",
    full_description: value(row, "full_description") || note || seed?.full_description || shortDescription,
    recommended_use_cases: list(value(row, "recommended_use_cases")).length ? list(value(row, "recommended_use_cases")) : usageTags.length ? usageTags : seed?.recommended_use_cases ?? [],
    recommended_users: list(value(row, "recommended_users")).length ? list(value(row, "recommended_users")) : seed?.recommended_users ?? [],
    pricing: value(row, "pricing") || seed?.pricing || "부분 유료",
    difficulty: value(row, "difficulty") || seed?.difficulty || "쉬움",
    korean_support: value(row, "korean_support") ? bool(value(row, "korean_support")) : seed?.korean_support ?? false,
    official_url: normalizeOfficialUrl(value(row, "official_url"), seed?.official_url || "#"),
    logo_url: value(row, "logo_url") || seed?.logo_url,
    image_url: value(row, "image_url") || seed?.image_url,
    youtube_url: value(row, "youtube_url") || seed?.youtube_url,
    youtube_summary: list(value(row, "youtube_summary")).length ? list(value(row, "youtube_summary")) : seed?.youtube_summary ?? [],
    rating_average: num(value(row, "rating_average"), seed?.rating_average ?? 4.2),
    rating_count: num(value(row, "rating_count"), seed?.rating_count ?? 0),
    comment_count: num(value(row, "comment_count"), seed?.comment_count ?? 0),
    popularity_score: value(row, "popularity_score") ? num(value(row, "popularity_score"), 0) : value(row, "legacy_popularity") ? num(value(row, "legacy_popularity"), seed?.popularity_score ?? 0) : seed?.popularity_score,
    last_update_date: value(row, "last_update_date") || seed?.last_update_date || new Date().toISOString().slice(0, 10),
    created_at: value(row, "created_at") || seed?.created_at || new Date().toISOString().slice(0, 10),
    is_featured: value(row, "is_featured") ? bool(value(row, "is_featured")) : seed?.is_featured ?? false,
    main_features: list(value(row, "main_features")).length ? list(value(row, "main_features")) : usageTags.length ? usageTags : seed?.main_features ?? [],
    pros: list(value(row, "pros")).length ? list(value(row, "pros")) : seed?.pros ?? [],
    cons: list(value(row, "cons")).length ? list(value(row, "cons")) : seed?.cons ?? [],
    alternatives: list(value(row, "alternatives")).length ? list(value(row, "alternatives")) : seed?.alternatives ?? []
  };
}

export async function getTools(sort: SortKey = "popular") {
  const rows = fillDownLegacyRows(await fetchSheetRows("Tools"));
  const sheetTools = rows.map(adapt).filter((tool): tool is Tool => Boolean(tool));
  const bySlug = new Map<string, Tool>();
  [...sheetTools, ...seedTools].forEach((tool) => {
    if (!bySlug.has(tool.slug)) bySlug.set(tool.slug, tool);
  });
  return sortTools(Array.from(bySlug.values()), sort);
}

export async function getToolBySlug(slug: string) {
  return (await getTools()).find((tool) => tool.slug === decodeURIComponent(slug));
}
