import { fetchSheetRows, type SheetRow } from "@/lib/googleSheets";
import { seedTools } from "@/lib/data/seed";
import type { SortKey, Tool } from "@/lib/types";
import { normalizeUseTags } from "@/lib/useTags";
import { sortTools } from "@/lib/utils";

const aliases: Record<string, string[]> = {
  tool_id: ["tool_id", "id"], slug: ["slug"], tool_name: ["tool_name", "name", "AI 이름", "Tool"], category: ["category", "카테고리"], sub_category: ["sub_category", "subcategory", "세부 카테고리"], tags: ["tags", "태그"], use_tags: ["use_tags", "활용 태그", "활용"], category_paths: ["category_paths", "categories", "분류", "복수 분류", "카테고리 경로"], editor_quote: ["editor_quote", "one_liner", "editor_one_liner", "에디터 한줄평", "한줄평"], short_description: ["short_description", "description", "한 줄 설명"], full_description: ["full_description", "상세 설명"], recommended_use_cases: ["recommended_use_cases", "use_cases", "추천 업무"], recommended_users: ["recommended_users", "추천 사용자"], pricing: ["pricing", "price", "가격"], difficulty: ["difficulty", "난이도"], korean_support: ["korean_support", "한국어 지원"], official_url: ["official_url", "url", "공식 URL"], logo_url: ["logo_url"], image_url: ["image_url"], youtube_url: ["youtube_url"], youtube_summary: ["youtube_summary"], rating_average: ["rating_average", "rating", "평점"], rating_count: ["rating_count", "평가 수"], comment_count: ["comment_count", "댓글 수"], popularity_score: ["popularity_score"], last_update_date: ["last_update_date", "updated_at"], created_at: ["created_at"], is_featured: ["is_featured"], main_features: ["main_features", "주요 기능"], pros: ["pros", "장점"], cons: ["cons", "주의할 점"], alternatives: ["alternatives", "유사 AI"]
};

function value(row: SheetRow, key: string) {
  return aliases[key].map((name) => row[name]).find(Boolean)?.trim() ?? "";
}

function list(text: string) {
  return text.split(/[,|;\n]/).map((item) => item.trim()).filter(Boolean);
}


function normalizeCategoryPath(path: string) {
  return path.replace(/[>＞]/g, "/").replace(/\s*\/\s*/g, "/").trim();
}

function categoryPaths(text: string, category: string, subCategory: string, fallback?: string[], preferFallback = false) {
  const paths = list(text).map(normalizeCategoryPath).filter((path) => path.includes("/"));
  if (paths.length) return Array.from(new Set(paths));
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

function adapt(row: SheetRow, index: number): Tool | null {
  const name = value(row, "tool_name");
  if (!name) return null;
  const seed = seedTools.find((tool) => tool.tool_name.toLowerCase() === name.toLowerCase());
  const rowCategory = value(row, "category");
  const rowSubCategory = value(row, "sub_category");
  const category = rowCategory || seed?.category || "기타";
  const subCategory = rowSubCategory || seed?.sub_category || "생산성";
  const useSeedCategoryPaths = !rowCategory && !rowSubCategory;
  const sheetUseTags = normalizeUseTags(list(value(row, "use_tags")), list(value(row, "recommended_use_cases")), list(value(row, "tags")), [subCategory]);
  return {
    ...(seed ?? seedTools[index % seedTools.length]),
    tool_id: value(row, "tool_id") || seed?.tool_id || `sheet_${index + 1}`,
    slug: value(row, "slug") || seed?.slug || slugify(name),
    tool_name: name,
    category,
    sub_category: subCategory,
    category_paths: categoryPaths(value(row, "category_paths"), category, subCategory, seed?.category_paths, useSeedCategoryPaths),
    tags: list(value(row, "tags")).length ? list(value(row, "tags")) : seed?.tags ?? [],
    use_tags: sheetUseTags.length ? sheetUseTags : seed?.use_tags ?? [],
    short_description: value(row, "short_description") || seed?.short_description || "AI 툴 설명을 준비 중입니다.",
    editor_quote: value(row, "editor_quote") || seed?.editor_quote || "",
    full_description: value(row, "full_description") || seed?.full_description || "상세 설명을 준비 중입니다.",
    recommended_use_cases: list(value(row, "recommended_use_cases")).length ? list(value(row, "recommended_use_cases")) : seed?.recommended_use_cases ?? [],
    recommended_users: list(value(row, "recommended_users")).length ? list(value(row, "recommended_users")) : seed?.recommended_users ?? [],
    pricing: value(row, "pricing") || seed?.pricing || "부분 유료",
    difficulty: value(row, "difficulty") || seed?.difficulty || "쉬움",
    korean_support: value(row, "korean_support") ? bool(value(row, "korean_support")) : seed?.korean_support ?? false,
    official_url: value(row, "official_url") || seed?.official_url || "#",
    logo_url: value(row, "logo_url") || seed?.logo_url,
    image_url: value(row, "image_url") || seed?.image_url,
    youtube_url: value(row, "youtube_url") || seed?.youtube_url,
    youtube_summary: list(value(row, "youtube_summary")).length ? list(value(row, "youtube_summary")) : seed?.youtube_summary ?? [],
    rating_average: num(value(row, "rating_average"), seed?.rating_average ?? 4.2),
    rating_count: num(value(row, "rating_count"), seed?.rating_count ?? 0),
    comment_count: num(value(row, "comment_count"), seed?.comment_count ?? 0),
    popularity_score: value(row, "popularity_score") ? num(value(row, "popularity_score"), 0) : seed?.popularity_score,
    last_update_date: value(row, "last_update_date") || seed?.last_update_date || new Date().toISOString().slice(0, 10),
    created_at: value(row, "created_at") || seed?.created_at || new Date().toISOString().slice(0, 10),
    is_featured: value(row, "is_featured") ? bool(value(row, "is_featured")) : seed?.is_featured ?? false,
    main_features: list(value(row, "main_features")).length ? list(value(row, "main_features")) : seed?.main_features ?? [],
    pros: list(value(row, "pros")).length ? list(value(row, "pros")) : seed?.pros ?? [],
    cons: list(value(row, "cons")).length ? list(value(row, "cons")) : seed?.cons ?? [],
    alternatives: list(value(row, "alternatives")).length ? list(value(row, "alternatives")) : seed?.alternatives ?? []
  };
}

export async function getTools(sort: SortKey = "popular") {
  const rows = await fetchSheetRows("Tools");
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
