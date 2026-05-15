import { messages } from "@/lib/translations";

export type DisplayLocale = keyof typeof messages;

type DisplayMap = Record<string, string>;

const pricingLabels: DisplayMap = {
  무료: "Free",
  "부분 유료": "Freemium",
  유료: "Paid"
};

const difficultyLabels: DisplayMap = {
  쉬움: "Easy",
  보통: "Moderate",
  중급: "Moderate",
  어려움: "Advanced",
  고급: "Advanced",
  "초보자 추천": "Beginner-friendly"
};

const tagLabels: DisplayMap = {
  리서치: "Research",
  검색: "Search",
  출처: "Sources",
  분석: "Analysis",
  "문서 작성": "Writing",
  "문서 요약": "Document summaries",
  문서: "Documents",
  노트: "Notes",
  번역: "Translation",
  PPT: "Presentations",
  "PPT/제안서": "Presentations",
  제안서: "Proposals",
  콘텐츠: "Content",
  "콘텐츠 제작": "Content creation",
  "이미지 생성": "Image generation",
  이미지: "Image",
  편집: "Editing",
  시각화: "Visualization",
  다이어그램: "Diagrams",
  타이포: "Typography",
  벡터: "Vector",
  콘셉트: "Concepting",
  아트: "Art",
  "영상 생성": "Video generation",
  영상: "Video",
  모션: "Motion",
  코드: "Code",
  코딩: "Coding",
  "코드 작성": "Coding",
  개발: "Development",
  디버깅: "Debugging",
  리팩토링: "Refactoring",
  자동화: "Automation",
  "웹사이트 제작": "Website building",
  "데이터 분석": "Data analysis",
  디자인: "Design",
  브랜딩: "Branding",
  브랜드: "Branding",
  "브랜드/그래픽": "Branding / Graphics",
  그래픽: "Graphics",
  생산성: "Productivity",
  협업: "Collaboration",
  요약: "Summaries",
  노코드: "No-code",
  워크플로우: "Workflows",
  에이전트: "Agents",
  프로토타입: "Prototypes",
  템플릿: "Templates",
  웹앱: "Web apps",
  자동완성: "Autocomplete",
  음성: "Voice",
  "음성 생성": "Voice generation",
  오디오: "Audio",
  더빙: "Dubbing",
  음악: "Music",
  아바타: "Avatar",
  마케팅: "Marketing"
};

function displayValue(value: string, locale: DisplayLocale, labels: DisplayMap) {
  if (locale !== "en") return value;
  return labels[value] ?? value;
}

export function translatePricing(value: string, locale: DisplayLocale) {
  return displayValue(value, locale, pricingLabels);
}

export function translateDifficulty(value: string, locale: DisplayLocale) {
  return displayValue(value, locale, difficultyLabels);
}

export function translateTag(tag: string, locale: DisplayLocale) {
  return displayValue(tag, locale, tagLabels);
}

export function translateCategoryPath(path: string, locale: DisplayLocale) {
  if (locale !== "en") return path;

  const labels = messages.en.navigation.labels;
  const segments = path.split("/").map((segment) => segment.trim()).filter(Boolean);
  const translatedSegments: string[] = [];

  for (let index = 0; index < segments.length; index += 1) {
    const current = segments[index];
    const twoSegmentLabel = segments[index + 1] ? `${current}/${segments[index + 1]}` : undefined;

    if (twoSegmentLabel && twoSegmentLabel in labels) {
      translatedSegments.push(labels[twoSegmentLabel as keyof typeof labels]);
      index += 1;
      continue;
    }

    translatedSegments.push(labels[current as keyof typeof labels] ?? translateTag(current, locale));
  }

  return translatedSegments.join(" / ");
}
