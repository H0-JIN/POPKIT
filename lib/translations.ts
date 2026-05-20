export const messages = {
  ko: {
    common: { business: "기업 서비스", submitTool: "툴 제보", backToList: "목록으로", loadingMore: "더 보기" },
    hero: {
      eyebrow: "Curated AI tools for planners, designers, developers",
      title: "AI 툴을 직무와 업무별로\n빠르게 탐색하세요",
      description: "실제 리뷰와 조회 흐름을 바탕으로, 직무와 목적에 맞는 AI 툴을 비교하고 더 빠르게 찾을 수 있습니다."
    },
    rolePopular: { title: "직무별 인기 AI", description: "실제 리뷰를 바탕으로 각 직무에서 평가가 좋은 AI를 모았습니다.", empty: "이 직무의 평가가 쌓이면 인기 AI를 보여드릴게요.", reviewCount: (count: number) => `리뷰 ${count}개` },
    search: { srLabel: "검색", placeholder: "AI 이름, 용도, 태그 검색" },
    sort: { views: "조회순", rating: "별점순", updated: "업데이트순", trending: "오늘 핫한순" },
    filters: { "무료": "무료", "부분 유료": "부분 유료", "유료": "유료", "초보자 추천": "초보자 추천", "한국어 지원": "한국어 지원" },
    list: { count: (count: number) => `${count}개 AI 툴`, compare: "실제 반응과 업데이트 기준 비교" },
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
      officialSite: "공식 사이트 바로가기", favorite: "즐겨찾기 ☆", price: "가격", difficulty: "난이도", korean: "한국어", supported: "지원", needsCheck: "확인 필요", editorQuoteLabel: "에디터 한마디",
      tabs: { overview: "개요", usage: "사용법", updates: "업데이트 히스토리", reviews: "리뷰" },
      overview: {
        about: "AI 기본 소개", aboutTitle: (name: string) => `${name}를 한눈에 이해하기`, metrics: "핵심 지표", ratingCount: "평점 / 평가 수", noUserRatings: "아직 사용자 평가가 없습니다.", firstReview: "첫 리뷰를 남겨보세요.", commentCount: "댓글 수", countUnit: (count: string) => `${count}개`, updateHistory: "업데이트 히스토리", officialHistory: "공식 출처 기반 기록", recentUpdate: "최근 업데이트 시점", preparing: "정보를 준비 중입니다.",
        popularityTitle: "분야별 인기 흐름", popularityHeading: "사용 분야별 주목도 변화", popularityDescription: "최근 12주 상세페이지 조회수를 기준으로 분야별 순위와 흐름을 보여드립니다.", popularityEmptyTitle: "조회 데이터가 쌓이면 분야별 인기 흐름을 보여드릴게요.", popularityEmptyDescription: "상세페이지 방문이 누적되면 순위와 주차별 추이를 확인할 수 있습니다.", useCaseRankLabel: "분야 내 순위", useCaseRank: (rank: number, tag: string) => `${tag} 분야 ${rank}위`, comparedToolsLabel: "비교 대상", comparedTools: (count: number) => `총 ${count}개 툴 중`, lastTwelveWeeksLabel: "최근 12주", lastTwelveWeeksViews: (count: string) => `최근 12주 ${count}회 조회`, views: "조회수",
        features: "주요 기능", recommendedTasks: "추천 사용 업무", recommendedUsers: "추천 사용자", strengths: "장점", cautions: "주의할 점", alternatives: "유사 AI / 대체 AI"
      }
    },
    reviews: {
      noRatings: "아직 사용자 평가가 없습니다.", firstReview: "첫 리뷰를 남겨보세요.", detailLater: "평가가 쌓이면 업무 활용도와 결과물 품질 같은 세부 지표를 함께 보여드릴 예정입니다.", top: "베스트 댓글", all: "전체 댓글", noComments: "아직 실제 댓글이 없습니다. 이 AI를 사용해봤다면 첫 리뷰를 남겨주세요.", loadMore: "댓글 더 보기", write: "리뷰 작성", role: "직무", rolePlaceholder: "직무를 선택해주세요", roleOptions: { 기획자: "기획자", 개발자: "개발자", 디자이너: "디자이너", 기타: "기타" }, overall: "종합 평점", addDetailed: "더 자세히 평가하기", hideDetailed: "세부 평가 접기", work: "업무 활용도", quality: "결과물 품질", difficulty: "사용 난이도", price: "가격 만족도", korean: "한국어 지원", commentPlaceholder: "짧아도 좋습니다. 실제로 써본 느낌을 남겨주세요.", submit: "리뷰 등록", saving: "저장 중...", saved: "리뷰가 저장되었습니다. 화면에 바로 반영했어요.", failed: "리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요.", roleRequired: "직무를 선택해주세요.", ratingRequired: "종합 평점을 1~5점으로 선택해주세요.", commentRequired: "리뷰 본문을 입력해주세요.", totalSummary: (count: number) => `종합 평점 · ${count}개 평가`, roleRatingsTitle: "직무별 평가", roleRatingsDescription: "직무에 따라 평가가 어떻게 달라지는지 확인해보세요.", roleReviewCount: (count: number) => `리뷰 ${count}개`, noRoleRatings: "평가 전", example: "예시", helpful: (count: number) => `추천 ${count}`
    },
    submitTool: {
      title: "AI 툴을 제보해주세요",
      description: "POPKIT에 추가되면 좋을 AI 툴을 알려주세요. 검토 후 서비스에 반영될 수 있습니다.",
      reviewNotice: "제보된 툴은 운영 검토 후 콘텐츠 품질과 서비스 방향에 맞는 경우 반영됩니다.",
      emailHint: "이메일은 추가 확인이 필요할 때만 참고합니다.",
      submit: "제보 보내기",
      saving: "저장 중...",
      success: "제보가 접수되었습니다. 검토 후 POPKIT에 반영될 수 있습니다.",
      failed: "제보 저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
      fields: {
        toolName: { label: "툴 이름", placeholder: "툴 이름" },
        officialUrl: { label: "공식 URL", placeholder: "https://example.com" },
        suggestedUse: { label: "어떤 용도로 쓰는 툴인가요?", placeholder: "어떤 용도로 쓰는 툴인가요?" },
        reason: { label: "추천 이유 / 제보 이유", placeholder: "왜 POPKIT에 추가되면 좋다고 생각하나요?" },
        role: { label: "제보자 직무", placeholder: "직무를 선택해주세요" },
        email: { label: "이메일 (선택)", placeholder: "이메일 (선택)" }
      },
      validation: {
        toolNameRequired: "툴 이름을 입력해주세요.",
        urlInvalid: "올바른 공식 URL을 입력해주세요.",
        suggestedUseRequired: "툴의 용도를 입력해주세요.",
        reasonRequired: "추천 이유를 입력해주세요.",
        roleRequired: "직무를 선택해주세요.",
        emailInvalid: "올바른 이메일 형식을 입력해주세요."
      }
    },
    footer: {
      description: "실제 사용자 경험을 바탕으로, 직무와 목적에 맞는 AI 툴 선택을 돕는 플랫폼",
      service: { title: "서비스", links: { explore: "AI 툴 탐색", business: "기업 서비스", submitTool: "툴 제보" } },
      contact: { title: "문의", links: { partnership: "제휴 / 도입 상담", email: "이메일 문의" } },
      policy: { title: "정책", links: { privacy: "개인정보처리방침", terms: "이용약관" } },
      copyright: "© 2026 POPKIT. All rights reserved."
    },
    privacy: {
      title: "개인정보처리방침",
      description: "POPKIT은 서비스 운영에 필요한 범위에서만 정보를 수집하고 활용합니다.",
      sections: [
        { title: "1. 수집하는 정보", blocks: [
          { label: "리뷰 작성 시", items: ["직무", "평점", "댓글 내용"] },
          { label: "AI 툴 제보 시", items: ["툴 이름", "공식 URL", "용도 설명", "제보 이유", "직무", "이메일(선택)"] },
          { label: "서비스 이용 과정에서", items: ["상세페이지 조회 데이터", "언어 선택 등 브라우저 저장 정보(localStorage/sessionStorage 기반)"] }
        ] },
        { title: "2. 이용 목적", blocks: [
          { items: ["리뷰 및 평가 콘텐츠 표시", "직무별 인기 AI, 직무별 평가 등 서비스 기능 제공", "툴 제보 검토 및 운영", "조회 기반 인기 흐름과 탐색 경험 개선", "문의 응답"] }
        ] },
        { title: "3. 보관 및 관리", blocks: [
          { items: ["수집 정보는 서비스 운영과 개선 목적 범위에서 관리합니다.", "제보 이메일은 운영 검토 또는 회신이 필요한 경우에만 참고합니다.", "불필요한 정보를 과도하게 수집하지 않습니다."] }
        ] },
        { title: "4. 제3자 제공", blocks: [
          { items: ["별도 동의 없이 개인정보를 판매하거나 광고주에게 제공하지 않습니다.", "법적 요청 등 예외 상황은 관련 법령에 따릅니다."] }
        ] },
        { title: "5. 문의", blocks: [
          { items: ["개인정보 관련 문의: kkcm1002@gmail.com"] }
        ] }
      ]
    },
    terms: {
      title: "이용약관",
      description: "POPKIT 이용과 콘텐츠 참여에 관한 기본 원칙을 안내합니다.",
      sections: [
        { title: "1. 서비스 목적", blocks: [
          { items: ["POPKIT은 AI 툴 탐색, 사용자 리뷰, 툴 제보, 데이터 기반 추천 경험을 제공하는 서비스입니다."] }
        ] },
        { title: "2. 사용자 콘텐츠", blocks: [
          { items: ["리뷰와 제보는 사용자가 자발적으로 제출한 콘텐츠입니다.", "허위 정보, 공격적 표현, 불법적 콘텐츠는 제한될 수 있습니다.", "운영자는 서비스 품질을 위해 사용자 콘텐츠를 검토·비공개·삭제할 수 있습니다."] }
        ] },
        { title: "3. AI 툴 정보", blocks: [
          { items: ["POPKIT은 다양한 AI 툴 정보를 정리하지만, 외부 서비스의 가격, 기능, 정책 변경을 실시간으로 보장하지 않습니다.", "최종 이용 전 공식 사이트 확인을 권장합니다."] }
        ] },
        { title: "4. 서비스 변경", blocks: [
          { items: ["POPKIT은 서비스 기능, 콘텐츠 구성, 정책을 개선할 수 있습니다."] }
        ] },
        { title: "5. 책임 제한", blocks: [
          { items: ["POPKIT의 정보는 선택을 돕는 참고 자료이며, 특정 서비스 이용 결과를 보장하지 않습니다.", "외부 링크 및 제3자 서비스 이용은 각 서비스의 정책에 따릅니다."] }
        ] },
        { title: "6. 문의", blocks: [
          { items: ["서비스 관련 문의: kkcm1002@gmail.com"] }
        ] }
      ]
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
    common: { business: "Business", submitTool: "Submit a tool", backToList: "Back to list", loadingMore: "Load more" },
    hero: { eyebrow: "Curated AI tools for planners, designers, and developers", title: "Explore AI tools faster by role and task", description: "Compare AI tools through real reviews and interest trends, then find the right option for your role and task faster." },
    rolePopular: { title: "Popular AI by role", description: "Discover AI tools rated highly by people in each role.", empty: "Popular AI tools for this role will appear as reviews accumulate.", reviewCount: (count: number) => `${count} reviews` },
    search: { srLabel: "Search", placeholder: "Search by AI name, use case, or tag" },
    sort: { views: "Most viewed", rating: "Top rated", updated: "Recently updated", trending: "Trending today" },
    filters: { "무료": "Free", "부분 유료": "Freemium", "유료": "Paid", "초보자 추천": "Beginner-friendly", "한국어 지원": "Korean supported" },
    list: { count: (count: number) => `${count} AI tools`, compare: "Compare by real signals and updates" },
    navigation: {
      brandHelper: "Curated for makers",
      labels: { "All Cases": "All Tools", "기획": "Planning", "리서치": "Research", "문서 작성": "Writing", "PPT/제안서": "Presentations", "콘텐츠": "Content", "디자인": "Design", "이미지": "Image", "영상": "Video", "UX/UI": "UX/UI", "브랜드/그래픽": "Branding / Graphics", "개발": "Development", "코드 작성": "Coding", "디버깅": "Debugging", "웹사이트 제작": "Website Building", "자동화": "Automation", "기타": "Others", "생산성": "Productivity", "협업": "Collaboration", "데이터 분석": "Data Analysis" },
      updateNote: "Only updates verified from official sources are reflected in history."
    },
    toolCard: { noRatings: "No ratings yet", comments: (count: number) => `${count} reviews`, details: "View details →" },
    detail: {
      officialSite: "Visit official site", favorite: "Favorite ☆", price: "Price", difficulty: "Difficulty", korean: "Korean", supported: "Supported", needsCheck: "Needs check", editorQuoteLabel: "Editor note",
      tabs: { overview: "Overview", usage: "How to use", updates: "Update history", reviews: "Reviews" },
      overview: { about: "About this AI", aboutTitle: (name: string) => `Understand ${name} at a glance`, metrics: "Key metrics", ratingCount: "Rating / reviews", noUserRatings: "Not enough ratings yet.", firstReview: "Be the first to leave a review.", commentCount: "Review count", countUnit: (count: string) => `${count}`, updateHistory: "Update history", officialHistory: "Official-source records", recentUpdate: "Recent update", preparing: "Information is being prepared.", popularityTitle: "Popularity by use case", popularityHeading: "View momentum by use case", popularityDescription: "See rankings and weekly trends based on detail-page views over the last 12 weeks.", popularityEmptyTitle: "Popularity trends will appear as view data accumulates.", popularityEmptyDescription: "Rankings and weekly trends will be available after enough detail-page visits are collected.", useCaseRankLabel: "Use-case rank", useCaseRank: (rank: number, tag: string) => `#${rank} in ${tag}`, comparedToolsLabel: "Compared tools", comparedTools: (count: number) => `Among ${count} tools`, lastTwelveWeeksLabel: "Last 12 weeks", lastTwelveWeeksViews: (count: string) => `${count} views over the last 12 weeks`, views: "Views", features: "Key features", recommendedTasks: "Recommended tasks", recommendedUsers: "Recommended users", strengths: "Strengths", cautions: "Cautions", alternatives: "Similar / alternative tools" }
    },
    reviews: { noRatings: "No user ratings yet.", firstReview: "Be the first to leave a review.", detailLater: "Detailed metrics will appear as more reviews come in.", top: "Top reviews", all: "All reviews", noComments: "No reviews yet. If you have tried this AI, leave the first review.", loadMore: "Load more reviews", write: "Write a review", role: "Role", rolePlaceholder: "Select your role", roleOptions: { 기획자: "Planner", 개발자: "Developer", 디자이너: "Designer", 기타: "Other" }, overall: "Overall rating", addDetailed: "Add detailed ratings", hideDetailed: "Hide detailed ratings", work: "Work usefulness", quality: "Output quality", difficulty: "Ease of use", price: "Value for price", korean: "Korean support", commentPlaceholder: "Short is fine. Share what it was actually like to use.", submit: "Submit review", saving: "Saving...", saved: "Your review has been saved and is now visible.", failed: "Failed to save your review. Please try again shortly.", roleRequired: "Please select your role.", ratingRequired: "Please select an overall rating from 1 to 5.", commentRequired: "Please write a review.", totalSummary: (count: number) => `Overall rating · ${count} reviews`, roleRatingsTitle: "Ratings by role", roleRatingsDescription: "See how different roles evaluate this tool.", roleReviewCount: (count: number) => `${count} reviews`, noRoleRatings: "No ratings yet", example: "Example", helpful: (count: number) => `Helpful ${count}` },
    submitTool: {
      title: "Submit an AI tool",
      description: "Tell us about an AI tool that should be added to POPKIT. Submissions may be reviewed and reflected in the service.",
      reviewNotice: "Submitted tools are reviewed before inclusion based on content quality and service fit.",
      emailHint: "Email is optional and only used if we need to follow up.",
      submit: "Submit tool",
      saving: "Saving...",
      success: "Your submission has been received. It may be reviewed and reflected in POPKIT.",
      failed: "Failed to submit the tool. Please try again shortly.",
      fields: {
        toolName: { label: "Tool name", placeholder: "Tool name" },
        officialUrl: { label: "Official URL", placeholder: "https://example.com" },
        suggestedUse: { label: "What is this tool used for?", placeholder: "What is this tool used for?" },
        reason: { label: "Recommendation reason", placeholder: "Why should POPKIT consider adding it?" },
        role: { label: "Your role", placeholder: "Select your role" },
        email: { label: "Email (optional)", placeholder: "Email (optional)" }
      },
      validation: {
        toolNameRequired: "Please enter the tool name.",
        urlInvalid: "Please enter a valid official URL.",
        suggestedUseRequired: "Please describe what the tool is used for.",
        reasonRequired: "Please explain why it should be added.",
        roleRequired: "Please select your role.",
        emailInvalid: "Please enter a valid email address."
      }
    },
    footer: {
      description: "A platform that helps users discover AI tools by role and task, grounded in real usage experience.",
      service: { title: "Service", links: { explore: "Explore tools", business: "Business", submitTool: "Submit a tool" } },
      contact: { title: "Contact", links: { partnership: "Partnership / Business inquiry", email: "Email us" } },
      policy: { title: "Policy", links: { privacy: "Privacy Policy", terms: "Terms of Use" } },
      copyright: "© 2026 POPKIT. All rights reserved."
    },
    privacy: {
      title: "Privacy Policy",
      description: "POPKIT collects and uses information only to the extent necessary to operate the service.",
      sections: [
        { title: "1. Information we collect", blocks: [
          { label: "When writing reviews", items: ["Role", "Rating", "Comment content"] },
          { label: "When submitting an AI tool", items: ["Tool name", "Official URL", "Description of use", "Reason for submission", "Role", "Email (optional)"] },
          { label: "During service usage", items: ["Detail-page view data", "Browser-stored information such as language selection based on localStorage/sessionStorage"] }
        ] },
        { title: "2. Purpose of use", blocks: [
          { items: ["Display review and rating content", "Provide features such as popular AI by role and ratings by role", "Review and operate tool submissions", "Improve view-based popularity trends and discovery experience", "Respond to inquiries"] }
        ] },
        { title: "3. Retention and management", blocks: [
          { items: ["Collected information is managed within the scope of service operation and improvement.", "Submission emails are referenced only when operational review or a reply is needed.", "POPKIT does not collect unnecessary information excessively."] }
        ] },
        { title: "4. Third-party sharing", blocks: [
          { items: ["POPKIT does not sell personal information or provide it to advertisers without separate consent.", "Exceptional situations such as legal requests are handled according to applicable laws."] }
        ] },
        { title: "5. Contact", blocks: [
          { items: ["Privacy-related inquiries: kkcm1002@gmail.com"] }
        ] }
      ]
    },
    terms: {
      title: "Terms of Use",
      description: "These terms outline the basic principles for using POPKIT and contributing content.",
      sections: [
        { title: "1. Service purpose", blocks: [
          { items: ["POPKIT provides AI tool discovery, user reviews, tool submissions, and data-based recommendation experiences."] }
        ] },
        { title: "2. User content", blocks: [
          { items: ["Reviews and submissions are content voluntarily submitted by users.", "False information, offensive expressions, and illegal content may be restricted.", "Operators may review, hide, or delete content to maintain service quality."] }
        ] },
        { title: "3. AI tool information", blocks: [
          { items: ["POPKIT organizes information about various AI tools, but does not guarantee real-time updates for external services’ pricing, features, or policies.", "Users are encouraged to check the official site before final use."] }
        ] },
        { title: "4. Service changes", blocks: [
          { items: ["POPKIT may improve service features, content structure, and policies."] }
        ] },
        { title: "5. Limitation of responsibility", blocks: [
          { items: ["Information on POPKIT is reference material to support choices and does not guarantee outcomes from using a specific service.", "Use of external links and third-party services follows each service’s own policies."] }
        ] },
        { title: "6. Contact", blocks: [
          { items: ["Service inquiries: kkcm1002@gmail.com"] }
        ] }
      ]
    },
    empty: { title: "No results", description: "Try adjusting your search or filters." },
    business: {
      heroTitle: "The more user experience accumulates, the more accurate AI recommendations become.", heroDescription: "POPKIT is not just a directory of AI tools. It is a platform that helps users choose and combine better AI tools based on real reviews and usage data.", heroSub: "Experience shared by planners, designers, developers, and marketers becomes a better decision-making signal for the next user and a starting point for enterprise AI adoption strategy.", primaryCta: "Talk to us", partnerCta: "Partnership inquiry",
      stats: [{ value: "By role", label: "AI usage context" }, { value: "Review-led", label: "Recommendation data" }, { value: "B2B", label: "Education and partnerships" }],
      sections: { problems: "Problems POPKIT solves", problemsEyebrow: "Problems", problemsDesc: "Choosing AI tools is becoming increasingly complex. POPKIT aims to collect real usage experiences and turn them into more reliable decision criteria.", loop: "Recommendations improve as user experience accumulates", loopEyebrow: "Data Flywheel", loopDesc: "As reviews and usage contexts grow, POPKIT can gradually improve recommendations by role, goal, and difficulty.", service: "Business service models", serviceDesc: "Based on the context of user experience data, POPKIT can gradually expand touchpoints for enterprise AI adoption, training, and partnerships.", opportunity: "Business opportunities", opportunityDesc: "Beyond ads or education, POPKIT’s long-term asset is real user experience data. These models can expand as data accumulation and validation progress.", audience: "Who POPKIT can support", audienceDesc: "The clearer the role and purpose, the more practical user experience data becomes as a criterion for choosing AI tools.", final: "Beyond AI tool discovery, toward a platform built on usage data", finalDesc: "POPKIT does not stop at introducing AI tools. It uses real user experience to build better recommendations and combinations, while giving companies a starting point for AI adoption and usage strategy." }
    }
  }
} as const;

export type Messages = (typeof messages)[keyof typeof messages];
