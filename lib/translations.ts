export const messages = {
  ko: {
    common: { business: "기업 서비스", backToList: "목록으로", loadingMore: "더 보기" },
    hero: {
      eyebrow: "Curated AI tools for planners, designers, developers",
      title: "AI 툴을 직무와 업무별로\n빠르게 탐색하세요",
      description: "기획, 디자인, 개발, 생산성 AI를 평점·댓글·공식 업데이트 기준으로 비교하고 상세 사용법까지 확인할 수 있습니다."
    },
    search: { srLabel: "검색", placeholder: "AI 이름, 용도, 태그 검색" },
    sort: { popular: "추천순", updated: "최신 업데이트순", rating: "평점순", comments: "댓글 많은 순", recent: "최근 등록순" },
    filters: { "무료": "무료", "부분 유료": "부분 유료", "유료": "유료", "초보자 추천": "초보자 추천", "한국어 지원": "한국어 지원" },
    list: { count: (count: number) => `${count}개 AI 툴`, compare: "평점 · 댓글 · 업데이트 기준 비교" },
    navigation: {
      brandHelper: "Curated for makers",
      labels: {
        "All Cases": "All Cases", "기획": "기획", "리서치": "리서치", "문서 작성": "문서 작성", "PPT/제안서": "PPT/제안서", "콘텐츠": "콘텐츠",
        "디자인": "디자인", "이미지": "이미지", "영상": "영상", "UX/UI": "UX/UI", "브랜드/그래픽": "브랜드/그래픽",
        "개발": "개발", "코드 작성": "코드 작성", "디버깅": "디버깅", "웹사이트 제작": "웹사이트 제작", "자동화": "자동화",
        "기타": "기타", "생산성": "생산성", "협업": "협업", "데이터 분석": "데이터 분석"
      },
      updateNote: "공식 출처가 확인된 업데이트만 히스토리에 반영합니다."
    },
    toolCard: { noRatings: "평가 전", comments: (count: number) => `댓글 ${count}`, details: "자세히 보기 →" },
    detail: {
      officialSite: "공식 사이트 바로가기", favorite: "즐겨찾기 ☆", price: "가격", difficulty: "난이도", korean: "한국어", supported: "지원", needsCheck: "확인 필요",
      tabs: { overview: "개요", usage: "사용법", updates: "업데이트 히스토리", reviews: "리뷰" },
      overview: {
        about: "AI 기본 소개", aboutTitle: (name: string) => `${name}를 한눈에 이해하기`, metrics: "핵심 지표", ratingCount: "평점 / 평가 수", noUserRatings: "아직 사용자 평가가 없습니다.", firstReview: "첫 리뷰를 남겨보세요.", commentCount: "댓글 수", countUnit: (count: string) => `${count}개`, updateHistory: "업데이트 히스토리", officialHistory: "공식 출처 기반 기록", recentUpdate: "최근 업데이트 시점", preparing: "정보를 준비 중입니다.", features: "주요 기능", recommendedTasks: "추천 사용 업무", recommendedUsers: "추천 사용자", strengths: "장점", cautions: "주의할 점", alternatives: "유사 AI / 대체 AI"
      }
    },
    reviews: {
      noRatings: "아직 사용자 평가가 없습니다.", firstReview: "첫 리뷰를 남겨보세요.", detailLater: "평가가 쌓이면 업무 활용도와 결과물 품질 같은 세부 지표를 함께 보여드릴 예정입니다.", top: "베스트 댓글", all: "전체 댓글", noComments: "아직 실제 댓글이 없습니다. 이 AI를 사용해봤다면 첫 리뷰를 남겨주세요.", loadMore: "댓글 더 보기", write: "리뷰 작성", role: "직무 (예: 기획자)", overall: "종합 평점", addDetailed: "더 자세히 평가하기", hideDetailed: "세부 평가 접기", work: "업무 활용도", quality: "결과물 품질", difficulty: "사용 난이도", price: "가격 만족도", korean: "한국어 지원", commentPlaceholder: "짧아도 좋습니다. 실제로 써본 느낌을 남겨주세요.", submit: "리뷰 등록", saving: "저장 중...", saved: "리뷰가 저장되었습니다. 화면에 바로 반영했어요.", failed: "리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요.", roleRequired: "사용자 역할을 입력해주세요.", ratingRequired: "종합 평점을 1~5점으로 선택해주세요.", commentRequired: "리뷰 본문을 입력해주세요.", totalSummary: (count: number) => `종합 평점 · ${count}개 평가`, example: "예시", helpful: (count: number) => `추천 ${count}`
    },
    empty: { title: "결과가 없습니다", description: "검색어나 필터를 조정해 보세요." },
    business: {
      heroTitle: "유저의 경험이 쌓일수록, AI 추천은 더 정확해집니다",
      heroDescription: "POPKIT은 AI 툴을 단순히 나열하지 않습니다. 실제 사용자들의 리뷰와 활용 데이터를 기반으로, 직무와 목적에 맞는 더 나은 AI 선택과 조합을 돕는 플랫폼입니다.",
      heroSub: "기획자, 디자이너, 개발자, 마케터가 남긴 사용 경험은 다음 사용자에게 더 나은 선택 기준이 되고, 기업에게는 AI 도입과 활용 전략의 출발점이 됩니다.",
      primaryCta: "기업 도입 상담", partnerCta: "제휴 문의하기",
      stats: [{ value: "직무별", label: "AI 활용 맥락" }, { value: "리뷰 기반", label: "추천 데이터" }, { value: "B2B", label: "교육·제휴 확장" }],
      sections: { problems: "POPKIT이 해결하려는 문제", problemsEyebrow: "Problems", problemsDesc: "AI 툴 선택은 점점 복잡해지고 있습니다. POPKIT은 실제 사용 경험을 모아 더 신뢰할 수 있는 선택 기준을 만들고자 합니다.", loop: "사용자의 경험이 쌓일수록, 추천은 더 정교해집니다", loopEyebrow: "Data Flywheel", loopDesc: "리뷰와 활용 맥락이 축적되면 직무, 목적, 난이도에 맞춘 추천 품질을 단계적으로 높일 수 있습니다.", service: "기업 대상 서비스 모델", serviceDesc: "POPKIT은 사용자 경험 데이터의 맥락을 바탕으로 기업의 AI 도입, 교육, 제휴 접점을 단계적으로 확장합니다.", opportunity: "POPKIT이 만들 수 있는 비즈니스", opportunityDesc: "광고나 교육을 넘어, POPKIT의 장기 자산은 실제 사용자 경험 데이터입니다. 아래 모델은 데이터 축적과 검증이 진행될수록 확장 가능한 사업 기회입니다.", audience: "활용 대상 기업/조직", audienceDesc: "직무와 목적이 분명할수록 사용자 경험 데이터는 더 실용적인 AI 선택 기준이 됩니다.", final: "AI 툴 선택을 넘어, 활용 데이터가 쌓이는 플랫폼으로", finalDesc: "POPKIT은 AI 툴을 소개하는 데서 멈추지 않습니다. 사용자의 실제 경험을 기반으로 더 나은 추천과 조합을 만들고, 기업에게는 AI 도입과 활용 전략의 출발점을 제공합니다." }
    }
  },
  en: {
    common: { business: "Business", backToList: "Back to list", loadingMore: "Load more" },
    hero: { eyebrow: "Curated AI tools for planners, designers, and developers", title: "Explore AI tools faster by role and task", description: "Compare AI tools by ratings, reviews, and official updates, then check practical use cases in detail." },
    search: { srLabel: "Search", placeholder: "Search by AI name, use case, or tag" },
    sort: { popular: "Recommended", updated: "Recently updated", rating: "Top rated", comments: "Most reviewed", recent: "Recently added" },
    filters: { "무료": "Free", "부분 유료": "Freemium", "유료": "Paid", "초보자 추천": "Beginner-friendly", "한국어 지원": "Korean supported" },
    list: { count: (count: number) => `${count} AI tools`, compare: "Compare by ratings, reviews, and updates" },
    navigation: {
      brandHelper: "Curated for makers",
      labels: { "All Cases": "All Tools", "기획": "Planning", "리서치": "Research", "문서 작성": "Writing", "PPT/제안서": "Presentations", "콘텐츠": "Content", "디자인": "Design", "이미지": "Image", "영상": "Video", "UX/UI": "UX/UI", "브랜드/그래픽": "Branding / Graphics", "개발": "Development", "코드 작성": "Coding", "디버깅": "Debugging", "웹사이트 제작": "Website Building", "자동화": "Automation", "기타": "Others", "생산성": "Productivity", "협업": "Collaboration", "데이터 분석": "Data Analysis" },
      updateNote: "Only updates verified from official sources are reflected in history."
    },
    toolCard: { noRatings: "No ratings yet", comments: (count: number) => `${count} reviews`, details: "View details →" },
    detail: {
      officialSite: "Visit official site", favorite: "Favorite ☆", price: "Price", difficulty: "Difficulty", korean: "Korean", supported: "Supported", needsCheck: "Needs check",
      tabs: { overview: "Overview", usage: "How to use", updates: "Update history", reviews: "Reviews" },
      overview: { about: "About this AI", aboutTitle: (name: string) => `Understand ${name} at a glance`, metrics: "Key metrics", ratingCount: "Rating / reviews", noUserRatings: "Not enough ratings yet.", firstReview: "Be the first to leave a review.", commentCount: "Review count", countUnit: (count: string) => `${count}`, updateHistory: "Update history", officialHistory: "Official-source records", recentUpdate: "Recent update", preparing: "Information is being prepared.", features: "Key features", recommendedTasks: "Recommended tasks", recommendedUsers: "Recommended users", strengths: "Strengths", cautions: "Cautions", alternatives: "Similar / alternative tools" }
    },
    reviews: { noRatings: "No user ratings yet.", firstReview: "Be the first to leave a review.", detailLater: "Detailed metrics will appear as more reviews come in.", top: "Top reviews", all: "All reviews", noComments: "No reviews yet. If you have tried this AI, leave the first review.", loadMore: "Load more reviews", write: "Write a review", role: "Role (e.g. Planner)", overall: "Overall rating", addDetailed: "Add detailed ratings", hideDetailed: "Hide detailed ratings", work: "Work usefulness", quality: "Output quality", difficulty: "Ease of use", price: "Value for price", korean: "Korean support", commentPlaceholder: "Short is fine. Share what it was actually like to use.", submit: "Submit review", saving: "Saving...", saved: "Your review has been saved and is now visible.", failed: "Failed to save your review. Please try again shortly.", roleRequired: "Please enter your role.", ratingRequired: "Please select an overall rating from 1 to 5.", commentRequired: "Please write a review.", totalSummary: (count: number) => `Overall rating · ${count} reviews`, example: "Example", helpful: (count: number) => `Helpful ${count}` },
    empty: { title: "No results", description: "Try adjusting your search or filters." },
    business: {
      heroTitle: "The more user experience accumulates, the more accurate AI recommendations become.", heroDescription: "POPKIT is not just a directory of AI tools. It is a platform that helps users choose and combine better AI tools based on real reviews and usage data.", heroSub: "Experience shared by planners, designers, developers, and marketers becomes a better decision-making signal for the next user and a starting point for enterprise AI adoption strategy.", primaryCta: "Talk to us", partnerCta: "Partnership inquiry",
      stats: [{ value: "By role", label: "AI usage context" }, { value: "Review-led", label: "Recommendation data" }, { value: "B2B", label: "Education and partnerships" }],
      sections: { problems: "Problems POPKIT solves", problemsEyebrow: "Problems", problemsDesc: "Choosing AI tools is becoming increasingly complex. POPKIT aims to collect real usage experiences and turn them into more reliable decision criteria.", loop: "Recommendations improve as user experience accumulates", loopEyebrow: "Data Flywheel", loopDesc: "As reviews and usage contexts grow, POPKIT can gradually improve recommendations by role, goal, and difficulty.", service: "Business service models", serviceDesc: "Based on the context of user experience data, POPKIT can gradually expand touchpoints for enterprise AI adoption, training, and partnerships.", opportunity: "Business opportunities", opportunityDesc: "Beyond ads or education, POPKIT’s long-term asset is real user experience data. These models can expand as data accumulation and validation progress.", audience: "Who POPKIT can support", audienceDesc: "The clearer the role and purpose, the more practical user experience data becomes as a criterion for choosing AI tools.", final: "Beyond AI tool discovery, toward a platform built on usage data", finalDesc: "POPKIT does not stop at introducing AI tools. It uses real user experience to build better recommendations and combinations, while giving companies a starting point for AI adoption and usage strategy." }
    }
  }
} as const;

export type Messages = (typeof messages)[keyof typeof messages];
