import { fetchSheetRows, type SheetRow } from "@/lib/googleSheets";
import { seedTools } from "@/lib/data/seed";
import type { SortKey, Tool } from "@/lib/types";
import { sortTools } from "@/lib/utils";

const aliases: Record<string, string[]> = {
  tool_id: ["tool_id", "id"],
  slug: ["slug"],
  tool_name: ["tool_name", "name", "AI 이름", "Tool"],
  category: ["category"],
  sub_category: ["sub_category", "subcategory", "세부 카테고리"],
  legacy_group: ["legacy_group", "구분"],
  legacy_category: ["legacy_category", "카테고리"],
  legacy_usage_tags: ["legacy_usage_tags", "활용"],
  tags: ["tags", "태그"],
  use_tags: ["use_tags", "활용 태그", "사용 태그", "업무 태그", "usage_tags", "활용"],
  category_paths: ["category_paths", "categories", "분류", "복수 분류", "카테고리 경로"],
  editor_quote: ["editor_quote", "one_liner", "editor_one_liner", "에디터 한줄평", "한줄평"],
  short_description: [
    "short_description",
    "description",
    "tool_description",
    "card_description",
    "summary",
    "intro",
    "설명",
    "설명_요약",
    "요약",
    "소개",
    "간단 설명",
    "한 줄 설명"
  ],
  full_description: ["full_description", "상세 설명"],
  recommended_use_cases: ["recommended_use_cases", "use_cases", "추천 업무"],
  recommended_users: ["recommended_users", "추천 사용자"],
  pricing: ["pricing", "price", "가격"],
  difficulty: ["difficulty", "난이도"],
  korean_support: ["korean_support", "한국어 지원"],
  official_url: ["official_url", "url", "공식 URL", "링크"],
  logo_url: ["logo_url"],
  image_url: ["image_url"],
  youtube_url: ["youtube_url"],
  youtube_summary: ["youtube_summary", "영상 요약", "사용법 요약"],
  usage_steps: ["usage_steps", "사용법", "사용 단계", "기본 사용 흐름"],
  rating_average: ["rating_average", "rating", "평점"],
  rating_count: ["rating_count", "평가 수"],
  comment_count: ["comment_count", "댓글 수"],
  popularity_score: ["popularity_score"],
  last_update_date: ["last_update_date", "updated_at"],
  created_at: ["created_at"],
  is_featured: ["is_featured"],
  main_features: ["main_features", "주요 기능"],
  pros: ["pros", "장점", "strengths", "강점"],
  cons: ["cons", "주의할 점", "cautions", "주의사항"],
  strengths: ["strengths", "강점", "장점"],
  cautions: ["cautions", "주의사항", "주의할 점"],
  alternatives: ["alternatives", "유사 AI"]
};

const contentOverlaySheetNames = ["Core30_Content"] as const;

const contentOverlayFields = [
  "official_url",
  "category_paths",
  "use_tags",
  "editor_quote",
  "short_description",
  "full_description",
  "recommended_use_cases",
  "recommended_users",
  "strengths",
  "cautions",
  "usage_steps",
  "youtube_url",
  "youtube_summary",
  "rating_average",
  "rating_count",
  "comment_count"
] as const;

const toolNameAliases: Record<string, string> = {
  googlegemini: "gemini",
  notebooklm: "notebooklm",
  skywork: "skywork",
  스카이워크: "skywork",
  tomeai: "tome",
  perplexity: "perplexity",
  claude: "claude",
  chatgpt: "chatgpt",
  napkin: "napkin-ai",
  napkinai: "napkin-ai",
  kling: "kling-ai",
  klingai: "kling-ai",
  lavable: "lovable"
};

const zeroRatingState = {
  rating_average: 0,
  rating_count: 0,
  comment_count: 0
} as const;

const placeholderDescriptionPattern = /AI\s*툴\s*설명을?\s*준비\s*중입니다\.?/i;

const topCategories = ["기획", "디자인", "개발", "기타"];
const subCategoriesByTop: Record<string, string[]> = {
  기획: ["리서치", "문서 작성", "PPT/제안서", "콘텐츠"],
  디자인: ["이미지", "영상", "UX/UI", "브랜드/그래픽"],
  개발: ["코드 작성", "디버깅", "웹사이트 제작", "자동화"],
  기타: ["생산성", "협업", "데이터 분석"]
};

const canonicalUseTags = ["리서치", "문서 작성", "PPT", "이미지 생성", "영상 생성", "자동화", "코드 작성", "데이터 분석", "콘텐츠 제작", "협업", "디자인", "음성 생성"] as const;

function normalizeUseTag(text: string) {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return "";
  if (/리서치|조사|검색|자료|출처|research/.test(normalized)) return "리서치";
  if (/문서|글|작성|요약|번역|보고서|노트|카피|document|writing/.test(normalized)) return "문서 작성";
  if (/ppt|발표|제안서|슬라이드|프레젠테이션|presentation/.test(normalized)) return "PPT";
  if (/이미지|image|사진|그림|일러스트|아트|비주얼|포스터/.test(normalized)) return "이미지 생성";
  if (/영상|video|동영상|비디오|모션|더빙|아바타/.test(normalized)) return "영상 생성";
  if (/자동화|워크플로우|업무 자동|에이전트|agent|automation/.test(normalized)) return "자동화";
  if (/코드|개발|프로그래밍|코딩|debug|디버그|버그|ide|앱|웹사이트/.test(normalized)) return "코드 작성";
  if (/데이터|분석|스프레드시트|엑셀|analytics/.test(normalized)) return "데이터 분석";
  if (/콘텐츠|마케팅|sns|블로그|세일즈|스토리텔링|음악|작곡/.test(normalized)) return "콘텐츠 제작";
  if (/협업|회의|팀|slack|공유/.test(normalized)) return "협업";
  if (/디자인|브랜드|그래픽|ux|ui|로고|템플릿|벡터|프로토타입/.test(normalized)) return "디자인";
  if (/음성|목소리|보이스|voice|오디오/.test(normalized)) return "음성 생성";
  return "";
}

function normalizeUseTags(...sources: string[][]) {
  const normalized = sources.flat().map(normalizeUseTag).filter(Boolean);
  const unknown = sources.flat().map((tag) => tag.trim()).filter((tag) => tag && !normalizeUseTag(tag) && !topCategories.includes(tag) && !Object.values(subCategoriesByTop).flat().includes(tag));
  return unique([...normalized, ...unknown]).filter((tag) => canonicalUseTags.includes(tag as (typeof canonicalUseTags)[number]) || unknown.includes(tag));
}

const defaultUsageSteps = [
  "작업 목적과 필요한 입력 자료를 먼저 정리합니다.",
  "원하는 결과 형식과 톤, 분량을 구체적으로 요청합니다.",
  "생성 결과를 검토하고 사실 확인이나 후속 수정을 진행합니다."
];

const defaultCautions = [
  "중요한 결과물은 공개 전 사실 관계와 저작권 이슈를 확인해야 합니다.",
  "요금제와 사용량 제한은 공식 사이트에서 최신 정보를 확인하는 것이 안전합니다."
];

function categoryTone(category: string) {
  if (category === "개발") return { users: ["개발자", "테크 리드", "프로덕트 메이커"], strengths: ["반복적인 구현과 검토 시간을 줄이는 데 도움이 됩니다.", "코드나 작업 맥락을 바탕으로 다음 행동을 빠르게 정리할 수 있습니다."], work: "개발 흐름" };
  if (category === "디자인") return { users: ["디자이너", "마케터", "콘텐츠 제작자"], strengths: ["초기 시안과 레퍼런스를 빠르게 실험할 수 있습니다.", "시각 작업의 반복 수정 시간을 줄이는 데 도움이 됩니다."], work: "디자인 제작 흐름" };
  if (category === "기획") return { users: ["기획자", "마케터", "팀 리드"], strengths: ["막막한 초안을 구조화하는 데 도움이 됩니다.", "자료 정리와 아이디어 확장을 한 흐름에서 진행할 수 있습니다."], work: "기획 업무" };
  return { users: ["실무자", "운영자", "팀 리드"], strengths: ["반복 업무를 정리하고 실행 시간을 줄이는 데 도움이 됩니다.", "개인과 팀의 생산성 흐름에 맞춰 활용할 수 있습니다."], work: "업무 생산성 흐름" };
}

function fallbackQuote(name: string, useTags: string[]) {
  const primary = useTags[0] ?? "업무";
  return `${primary}의 막막함을 첫 실행으로 바꾸는 도구.`;
}

function fallbackShortDescription(name: string, category: string, subCategory: string, source: string) {
  if (source) return source;
  return `${name}는 ${subCategory || category} 업무를 더 빠르게 시작하고 정리하도록 돕는 AI 도구입니다.`;
}

function fallbackFullDescription(name: string, category: string, subCategory: string, shortDescription: string) {
  const tone = categoryTone(category);
  return `${name}는 ${shortDescription} ${tone.work}에서 초안 작성, 정리, 검토처럼 시간이 오래 걸리는 단계를 줄이는 데 유용합니다. 결과물은 그대로 확정하기보다 업무 맥락에 맞게 확인하고 다듬는 방식으로 활용하는 것이 좋습니다.`;
}

function fallbackUseCases(useTags: string[], subCategory: string) {
  const mapped = useTags.map((tag) => {
    if (tag === "리서치") return "자료 조사";
    if (tag === "문서 작성") return "초안 작성";
    if (tag === "PPT") return "발표자료 구조화";
    if (tag === "이미지 생성") return "이미지 시안 제작";
    if (tag === "영상 생성") return "영상 초안 제작";
    if (tag === "자동화") return "반복 업무 자동화";
    if (tag === "코드 작성") return "코드 작성과 검토";
    if (tag === "데이터 분석") return "데이터 요약과 분석";
    if (tag === "협업") return "팀 커뮤니케이션 정리";
    return `${tag} 업무 지원`;
  });
  return unique([...mapped, `${subCategory} 업무 정리`, "결과물 검토"]).slice(0, 3);
}

function fallbackYoutubeSummary(name: string, usageSteps: string[]) {
  return usageSteps.length ? usageSteps : [`${name}에 넣을 자료와 목표를 먼저 준비합니다.`, "원하는 결과 형식을 구체적으로 요청합니다.", "결과를 검토하고 필요한 부분을 다시 요청합니다."];
}

function value(row: SheetRow, key: string) {
  return aliases[key].map((name) => row[name]).find(Boolean)?.trim() ?? "";
}

function list(text: string) {
  return text.split(/[,|;\n]/).map((item) => item.trim()).filter(Boolean);
}

function normalizeCategoryPath(path: string) {
  return path.replace(/[>＞]/g, "/").replace(/\s*\/\s*/g, "/").trim();
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function normalizeToolNameForMatch(name: string) {
  const normalized = name
    .normalize("NFKC")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9가-힣]/g, "");
  return toolNameAliases[normalized] ?? normalized;
}

function isPlaceholderDescription(text: string) {
  return placeholderDescriptionPattern.test(text.trim());
}

function descriptionValue(row: SheetRow) {
  const candidates = aliases.short_description
    .map((name) => row[name]?.trim())
    .filter((candidate): candidate is string => Boolean(candidate));
  return candidates.find((candidate) => !isPlaceholderDescription(candidate)) ?? candidates[0] ?? "";
}

function buildContentOverlayMap(rows: SheetRow[]) {
  const overlays = new Map<string, SheetRow>();

  rows.forEach((row) => {
    const name = value(row, "tool_name");
    const matchKey = normalizeToolNameForMatch(name);
    if (!matchKey) return;

    const overlay: SheetRow = {};
    contentOverlayFields.forEach((field) => {
      const fieldValue = value(row, field);
      if (fieldValue) overlay[field] = fieldValue;
    });

    if (Object.keys(overlay).length) overlays.set(matchKey, overlay);
  });

  return overlays;
}

function mergeContentOverlay(row: SheetRow, overlays: Map<string, SheetRow>) {
  const matchKey = normalizeToolNameForMatch(value(row, "tool_name"));
  const overlay = matchKey ? overlays.get(matchKey) : undefined;
  return overlay ? { ...row, ...overlay } : row;
}

async function fetchContentOverlayRows(sheetNames: readonly string[]) {
  const rowGroups = await Promise.all(sheetNames.map((sheetName) => fetchSheetRows(sheetName)));
  return rowGroups.flat();
}

function completionScore(tool: Tool) {
  return [
    tool.editor_quote,
    tool.short_description && !isPlaceholderDescription(tool.short_description) ? tool.short_description : "",
    tool.full_description,
    tool.official_url && tool.official_url !== "#" ? tool.official_url : "",
    ...tool.recommended_use_cases,
    ...tool.recommended_users,
    ...tool.strengths,
    ...tool.cautions,
    ...tool.usage_steps
  ].filter(Boolean).length;
}

function mergeToolRecords(primary: Tool, secondary: Tool): Tool {
  const base = completionScore(secondary) > completionScore(primary) ? secondary : primary;
  const fallback = base === primary ? secondary : primary;
  const shortDescription = !isPlaceholderDescription(base.short_description) ? base.short_description : fallback.short_description;

  return {
    ...base,
    short_description: shortDescription,
    editor_quote: base.editor_quote || fallback.editor_quote,
    full_description: base.full_description || fallback.full_description,
    recommended_use_cases: base.recommended_use_cases.length ? base.recommended_use_cases : fallback.recommended_use_cases,
    recommended_users: base.recommended_users.length ? base.recommended_users : fallback.recommended_users,
    strengths: base.strengths.length ? base.strengths : fallback.strengths,
    cautions: base.cautions.length ? base.cautions : fallback.cautions,
    pros: base.pros.length ? base.pros : fallback.pros,
    cons: base.cons.length ? base.cons : fallback.cons,
    usage_steps: base.usage_steps.length ? base.usage_steps : fallback.usage_steps,
    youtube_summary: base.youtube_summary.length ? base.youtube_summary : fallback.youtube_summary,
    category_paths: base.category_paths.length ? base.category_paths : fallback.category_paths,
    tags: base.tags.length ? base.tags : fallback.tags,
    use_tags: base.use_tags.length ? base.use_tags : fallback.use_tags,
    official_url: base.official_url && base.official_url !== "#" ? base.official_url : fallback.official_url,
    ...zeroRatingState
  };
}

function dedupeToolsByName(tools: Tool[]) {
  const byName = new Map<string, Tool>();

  tools.forEach((tool) => {
    const matchKey = normalizeToolNameForMatch(tool.tool_name);
    const current = byName.get(matchKey);
    byName.set(matchKey, current ? mergeToolRecords(current, tool) : { ...tool, ...zeroRatingState });
  });

  return Array.from(byName.values());
}

function canonicalSubCategory(text: string) {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return "";
  const entries = Object.entries(subCategoriesByTop).flatMap(([top, subs]) => subs.map((sub) => ({ top, sub })));
  const exact = entries.find(({ sub }) => sub.toLowerCase() === normalized);
  if (exact) return exact.sub;
  if (/리서치|조사|검색|자료/.test(text)) return "리서치";
  if (/문서|글|작성|요약|번역|텍스트|카피|보고서/.test(text)) return "문서 작성";
  if (/ppt|발표|제안서|슬라이드|프레젠테이션/.test(normalized)) return "PPT/제안서";
  if (/콘텐츠|마케팅|sns|블로그|카피/.test(normalized)) return "콘텐츠";
  if (/이미지|image|사진|그림|일러스트|아트/.test(normalized)) return "이미지";
  if (/영상|video|동영상|비디오|모션/.test(normalized)) return "영상";
  if (/ux|ui|웹디자인|앱디자인|프로토타입|와이어/.test(normalized)) return "UX/UI";
  if (/브랜드|그래픽|로고|디자인/.test(normalized)) return "브랜드/그래픽";
  if (/코드|개발|프로그래밍|코딩/.test(normalized)) return "코드 작성";
  if (/디버그|debug|오류|버그/.test(normalized)) return "디버깅";
  if (/웹사이트|웹|사이트|랜딩/.test(normalized)) return "웹사이트 제작";
  if (/자동화|워크플로우|업무 자동/.test(normalized)) return "자동화";
  if (/협업|회의|팀/.test(normalized)) return "협업";
  if (/데이터|분석|스프레드시트|엑셀/.test(normalized)) return "데이터 분석";
  if (/생산성|업무|도구/.test(normalized)) return "생산성";
  return "";
}

function inferTopCategory(text: string, subCategory?: string) {
  const normalized = text.trim().toLowerCase();
  if (topCategories.includes(text.trim())) return text.trim();
  if (subCategory) {
    const found = Object.entries(subCategoriesByTop).find(([, subs]) => subs.includes(subCategory));
    if (found) return found[0];
  }
  if (/기획|리서치|문서|ppt|제안서|콘텐츠|마케팅|글|작성|요약/.test(normalized)) return "기획";
  if (/디자인|이미지|영상|ux|ui|브랜드|그래픽|로고|아트|사진/.test(normalized)) return "디자인";
  if (/개발|코드|디버그|웹사이트|자동화|프로그래밍|코딩/.test(normalized)) return "개발";
  if (/기타|생산성|협업|데이터|분석/.test(normalized)) return "기타";
  return "";
}

function inferCategoryPathsFromLegacy(group: string, category: string, usageTags: string) {
  const paths: string[] = [];
  const groups = list(group);
  const categories = list(category);
  const usages = list(usageTags);

  groups.forEach((groupItem) => {
    const groupPath = normalizeCategoryPath(groupItem);
    if (groupPath.includes("/")) {
      paths.push(groupPath);
      return;
    }

    const groupSubCategory = canonicalSubCategory(groupItem);
    const top = inferTopCategory(groupItem, groupSubCategory);
    if (!top) return;

    const matchingCategories = categories
      .map((categoryItem) => normalizeCategoryPath(categoryItem))
      .filter(Boolean);

    if (matchingCategories.length) {
      matchingCategories.forEach((categoryItem) => {
        if (categoryItem.includes("/")) {
          paths.push(categoryItem);
          return;
        }
        const sub = canonicalSubCategory(categoryItem) || groupSubCategory || subCategoriesByTop[top]?.[0] || "생산성";
        paths.push(`${top}/${sub}`);
      });
      return;
    }

    paths.push(`${top}/${groupSubCategory || subCategoriesByTop[top]?.[0] || "생산성"}`);
  });

  categories.forEach((categoryItem) => {
    const categoryPath = normalizeCategoryPath(categoryItem);
    if (categoryPath.includes("/")) {
      paths.push(categoryPath);
      return;
    }
    const sub = canonicalSubCategory(categoryItem);
    const top = inferTopCategory(categoryItem, sub);
    if (top && sub) paths.push(`${top}/${sub}`);
  });

  usages.forEach((usage) => {
    const usagePath = normalizeCategoryPath(usage);
    if (usagePath.includes("/")) {
      paths.push(usagePath);
      return;
    }
    const sub = canonicalSubCategory(usage);
    const top = inferTopCategory(usage, sub);
    if (top && sub) paths.push(`${top}/${sub}`);
  });

  return unique(paths);
}

function categoryPaths(text: string, category: string, subCategory: string, legacyPaths: string[], fallback?: string[]) {
  const explicitPaths = list(text).map(normalizeCategoryPath).filter((path) => path.includes("/"));
  if (explicitPaths.length) return unique(explicitPaths);
  if (legacyPaths.length) return legacyPaths;
  if (fallback?.length) return fallback;
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

function normalizeOfficialUrl(url: string, fallback = "#") {
  const trimmed = url.trim() || fallback;
  if (!trimmed || trimmed === "#") return "#";
  if (/^[a-z][a-z\d+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/\//, "")}`;
}

function fillDownRows(rows: SheetRow[]) {
  const carried: Partial<Record<"legacy_group" | "legacy_category", string>> = {};
  return rows.map((row) => {
    const next = { ...row };
    (["legacy_group", "legacy_category"] as const).forEach((key) => {
      const current = value(next, key);
      if (current) {
        carried[key] = current;
      } else if (carried[key]) {
        next[key] = carried[key];
      }
    });
    return next;
  });
}

function adapt(row: SheetRow, index: number): Tool | null {
  const name = value(row, "tool_name");
  if (!name) return null;
  const seed = seedTools.find((tool) => normalizeToolNameForMatch(tool.tool_name) === normalizeToolNameForMatch(name));
  const legacyGroup = value(row, "legacy_group");
  const legacyCategory = value(row, "legacy_category");
  const legacyUsageTags = value(row, "legacy_usage_tags");
  const legacyCategoryPaths = inferCategoryPathsFromLegacy(legacyGroup, legacyCategory, legacyUsageTags);
  const primaryLegacyPath = legacyCategoryPaths[0]?.split("/") ?? [];
  const rowCategory = value(row, "category") || primaryLegacyPath[0] || "";
  const rowSubCategory = value(row, "sub_category") || primaryLegacyPath[1] || "";
  const category = rowCategory || seed?.category || "기타";
  const subCategory = rowSubCategory || seed?.sub_category || "생산성";
  const rawTags = list(value(row, "tags"));
  const rawUseTags = list(value(row, "use_tags"));
  const tags = unique([...rawTags, ...list(legacyUsageTags)]);
  const useTags = normalizeUseTags(rawUseTags, list(legacyUsageTags), rawTags, seed?.use_tags ?? [], seed?.tags ?? []);
  const recommendedUseCases = list(value(row, "recommended_use_cases"));
  const recommendedUsers = list(value(row, "recommended_users"));
  const usageSteps = list(value(row, "usage_steps"));
  const strengths = list(value(row, "strengths"));
  const cautions = list(value(row, "cautions"));
  const youtubeSummary = list(value(row, "youtube_summary"));
  const officialUrl = normalizeOfficialUrl(value(row, "official_url"), seed?.official_url || "#");
  const sourceShortDescription = descriptionValue(row) || seed?.short_description || "";
  const shortDescription = fallbackShortDescription(name, category, subCategory, sourceShortDescription);
  const normalizedUsageSteps = usageSteps.length ? usageSteps : seed?.usage_steps?.length ? seed.usage_steps : defaultUsageSteps;
  const normalizedStrengths = strengths.length ? strengths : seed?.strengths?.length ? seed.strengths : seed?.pros?.length ? seed.pros : categoryTone(category).strengths;
  const normalizedCautions = cautions.length ? cautions : seed?.cautions?.length ? seed.cautions : seed?.cons?.length ? seed.cons : defaultCautions;

  return {
    ...(seed ?? seedTools[index % seedTools.length]),
    tool_id: value(row, "tool_id") || seed?.tool_id || `sheet_${index + 1}`,
    slug: value(row, "slug") || seed?.slug || slugify(name),
    tool_name: name,
    category,
    sub_category: subCategory,
    category_paths: categoryPaths(value(row, "category_paths"), category, subCategory, legacyCategoryPaths, seed?.category_paths),
    tags: tags.length ? tags : seed?.tags ?? [],
    use_tags: useTags.length ? useTags : seed?.use_tags ?? normalizeUseTags(seed?.tags ?? [], [subCategory]),
    short_description: shortDescription,
    editor_quote: value(row, "editor_quote") || seed?.editor_quote || fallbackQuote(name, useTags),
    full_description: value(row, "full_description") || seed?.full_description || fallbackFullDescription(name, category, subCategory, shortDescription),
    recommended_use_cases: recommendedUseCases.length ? recommendedUseCases : seed?.recommended_use_cases?.length ? seed.recommended_use_cases : fallbackUseCases(useTags, subCategory),
    recommended_users: recommendedUsers.length ? recommendedUsers : seed?.recommended_users?.length ? seed.recommended_users : categoryTone(category).users,
    pricing: value(row, "pricing") || seed?.pricing || "부분 유료",
    difficulty: value(row, "difficulty") || seed?.difficulty || "쉬움",
    korean_support: value(row, "korean_support") ? bool(value(row, "korean_support")) : seed?.korean_support ?? false,
    official_url: officialUrl,
    logo_url: value(row, "logo_url") || seed?.logo_url,
    image_url: value(row, "image_url") || seed?.image_url,
    youtube_url: value(row, "youtube_url") || seed?.youtube_url,
    youtube_summary: youtubeSummary.length ? youtubeSummary : seed?.youtube_summary?.length ? seed.youtube_summary : fallbackYoutubeSummary(name, normalizedUsageSteps),
    usage_steps: normalizedUsageSteps,
    ...zeroRatingState,
    popularity_score: value(row, "popularity_score") ? num(value(row, "popularity_score"), 0) : seed?.popularity_score,
    last_update_date: value(row, "last_update_date") || seed?.last_update_date || new Date().toISOString().slice(0, 10),
    created_at: value(row, "created_at") || seed?.created_at || new Date().toISOString().slice(0, 10),
    is_featured: value(row, "is_featured") ? bool(value(row, "is_featured")) : seed?.is_featured ?? false,
    main_features: list(value(row, "main_features")).length ? list(value(row, "main_features")) : seed?.main_features ?? [],
    pros: normalizedStrengths,
    cons: normalizedCautions,
    strengths: normalizedStrengths,
    cautions: normalizedCautions,
    alternatives: list(value(row, "alternatives")).length ? list(value(row, "alternatives")) : seed?.alternatives ?? []
  };
}

export async function getTools(sort: SortKey = "popular") {
  const [mainRows, contentRows] = await Promise.all([
    fetchSheetRows("Tools"),
    fetchContentOverlayRows(contentOverlaySheetNames)
  ]);
  const contentOverlays = buildContentOverlayMap(contentRows);
  const rows = fillDownRows(mainRows).map((row) => mergeContentOverlay(row, contentOverlays));
  const sheetTools = rows.map(adapt).filter((tool): tool is Tool => Boolean(tool));
  return sortTools(dedupeToolsByName([...sheetTools, ...seedTools]), sort);
}

export async function getToolBySlug(slug: string) {
  return (await getTools()).find((tool) => tool.slug === decodeURIComponent(slug));
}
