export const SITE_NAME = "POPKIT";
export const NAVIGATION = [
  { label: "All Cases", href: "/", children: [] },
  { label: "기획", href: "/category/기획", children: ["리서치", "문서 작성", "PPT/제안서", "콘텐츠"] },
  { label: "디자인", href: "/category/디자인", children: ["이미지", "영상", "UX/UI", "브랜드/그래픽"] },
  { label: "개발", href: "/category/개발", children: ["코드 작성", "디버깅", "웹사이트 제작", "자동화"] },
  { label: "기타", href: "/category/기타", children: ["생산성", "협업", "데이터 분석"] }
];

export const SORT_OPTIONS = [
  { value: "views", label: "조회순" },
  { value: "rating", label: "별점순" },
  { value: "updated", label: "업데이트순" },
  { value: "trending", label: "오늘 핫한순" }
] as const;

export const FILTER_OPTIONS = ["무료", "부분 유료", "유료", "초보자 추천", "한국어 지원"];
