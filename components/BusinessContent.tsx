"use client";

import { HeaderActions } from "@/components/HeaderActions";
import { Sidebar } from "@/components/Sidebar";
import { useLanguage } from "@/lib/i18n";

const content = {
  ko: {
    problemCards: [
      { title: "AI 툴은 많지만, 실제로 무엇이 좋은지 알기 어렵다", points: ["기능 소개만으로는 실무 활용성을 판단하기 어렵습니다.", "같은 툴도 직무와 목적에 따라 만족도가 달라집니다."] },
      { title: "실제 사용자 경험이 흩어져 있다", points: ["리뷰, 커뮤니티 후기, 업데이트 정보가 여러 곳에 분산되어 있습니다.", "검증된 사용 맥락을 찾기 어렵습니다."] },
      { title: "기업은 AI 도입 이후 활용 기준이 부족하다", points: ["어떤 팀에 어떤 AI를 추천해야 하는지 기준을 세우기 어렵습니다.", "사내 교육과 도입 효과 측정이 개인 역량에 의존하기 쉽습니다."] }
    ],
    recommendationCards: [
      { title: "실제 사용자 리뷰", points: ["사용자가 직접 남긴 평점과 한줄 리뷰", "직무별 만족도와 활용 맥락 축적"] },
      { title: "맥락 기반 추천", points: ["기획, 디자인, 개발, 마케팅 등 직무별 추천", "리서치, 문서 작성, 이미지 생성, 자동화 등 목적별 추천"] },
      { title: "데이터 인사이트", points: ["어떤 AI가 어떤 업무에서 반응이 좋은지 분석", "기업의 AI 도입, 교육, 제휴 전략에 활용 가능"] }
    ],
    feedbackLoop: ["리뷰 작성", "사용 맥락 축적", "추천 고도화", "기업 인사이트"],
    businessServices: [
      { title: "직무별 AI 툴 큐레이션", description: "사용자 리뷰와 활용 데이터를 바탕으로 직무별 추천 툴과 활용 시나리오를 제공합니다." },
      { title: "기업 맞춤 AI 활용 가이드", description: "조직의 업무 목적에 맞는 AI 조합과 사용 흐름을 제안하고, 단일 툴 추천이 아닌 워크플로우 중심으로 안내합니다." },
      { title: "사내 AI 활용 교육 / 워크숍", description: "실제 사용 사례와 리뷰 데이터를 기반으로 한 실습형 교육을 통해 직무별 AI 활용법을 조직 내부에 적용합니다." },
      { title: "AI 서비스 프로모션 / 제휴 노출", description: "AI SaaS 기업이 POPKIT 유저에게 자연스럽게 노출될 수 있도록 카테고리, 리뷰, 업데이트 콘텐츠와 연계된 제휴 가능성을 만듭니다." }
    ],
    monetizationCards: [
      { title: "B2B 컨설팅 / 교육", points: ["기업 맞춤 AI 도입 가이드", "직무별 AI 활용 교육 프로그램", "실무 워크플로우 설계"] },
      { title: "스폰서드 큐레이션 / 제휴 노출", points: ["검증된 AI 서비스를 적절한 카테고리와 사용자에게 노출", "리뷰와 업데이트 콘텐츠 기반의 자연스러운 프로모션"] },
      { title: "사용자 데이터 기반 인사이트 리포트", points: ["직무별 AI 관심도와 만족도", "목적별 AI 활용 트렌드", "AI SaaS 기업과 기업 고객을 위한 시장 반응 데이터"] }
    ],
    audienceCards: [
      { title: "인사 / 교육 조직", description: "사내 AI 교육과 활용 기준 수립" }, { title: "마케팅 조직", description: "콘텐츠 제작과 캠페인 운영에 맞는 AI 워크플로우 탐색" }, { title: "디자인 / 콘텐츠 조직", description: "이미지, 영상, 브랜드 제작 도구의 실제 활용성 비교" }, { title: "개발 / 프로덕트 조직", description: "코드 작성, 자동화, 웹 제작 도구의 실무 적합성 확인" }, { title: "신사업 / 디지털전환 조직", description: "조직 차원의 AI 도입 방향과 우선순위 설정" }, { title: "AI SaaS 기업", description: "잠재 사용자에게 노출되고, 실제 반응 데이터를 확인할 수 있는 제휴 채널" }
    ]
  },
  en: {
    problemCards: [
      { title: "There are many AI tools, but it is hard to know what actually works", points: ["Feature lists alone do not explain real work usefulness.", "The same tool can feel very different depending on role and goal."] },
      { title: "Real user experience is scattered", points: ["Reviews, community posts, and update information are spread across many channels.", "Verified usage context is difficult to find quickly."] },
      { title: "Companies lack clear criteria after adopting AI", points: ["It is hard to decide which AI tools to recommend to each team.", "Training and measuring adoption impact can depend too much on individual capability."] }
    ],
    recommendationCards: [
      { title: "Real user reviews", points: ["Ratings and short reviews shared directly by users", "Role-based satisfaction and usage context accumulated over time"] },
      { title: "Context-based recommendations", points: ["Recommendations by role, such as planning, design, development, and marketing", "Recommendations by task, such as research, writing, image generation, and automation"] },
      { title: "Data insights", points: ["Analyze which AI tools receive strong responses for which tasks", "Useful as inputs for AI adoption, training, and partnership strategy"] }
    ],
    feedbackLoop: ["Write reviews", "Accumulate usage context", "Improve recommendations", "Deliver business insights"],
    businessServices: [
      { title: "Role-based AI tool curation", description: "Provide recommended tools and usage scenarios by role based on user reviews and usage data." },
      { title: "Custom AI usage guides for companies", description: "Suggest AI combinations and workflows aligned with each organization’s goals, focusing on workflows rather than single-tool recommendations." },
      { title: "Internal AI training and workshops", description: "Apply role-based AI usage methods inside organizations through practical training built around real use cases and review data." },
      { title: "AI service promotion and partnership exposure", description: "Create partnership opportunities connected to categories, reviews, and update content so AI SaaS products can be discovered naturally by POPKIT users." }
    ],
    monetizationCards: [
      { title: "B2B consulting and training", points: ["Custom AI adoption guides for companies", "Role-based AI training programs", "Practical workflow design"] },
      { title: "Sponsored curation and partnership exposure", points: ["Expose validated AI services to relevant categories and users", "Natural promotion based on reviews and update content"] },
      { title: "User-data-based insight reports", points: ["AI interest and satisfaction by role", "AI usage trends by task", "Market response data for AI SaaS vendors and enterprise customers"] }
    ],
    audienceCards: [
      { title: "HR and learning teams", description: "Build internal AI training and usage standards." }, { title: "Marketing teams", description: "Explore AI workflows for content creation and campaign operations." }, { title: "Design and content teams", description: "Compare practical usefulness across image, video, and brand-production tools." }, { title: "Development and product teams", description: "Evaluate fit for coding, automation, and website-building workflows." }, { title: "New business and digital transformation teams", description: "Set AI adoption direction and priorities at the organization level." }, { title: "AI SaaS companies", description: "Reach potential users and validate real response data through partnerships." }
    ]
  }
} as const;

const primaryMailto = "mailto:kkcm1002@gmail.com?subject=POPKIT%20기업%20도입%20상담";
const partnerMailto = "mailto:kkcm1002@gmail.com?subject=POPKIT%20제휴%20문의";

export function BusinessContent() {
  const { locale, t } = useLanguage();
  const page = content[locale];
  const b = t.business;

  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <HeaderActions />
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-cyan-300/[0.06] p-6 shadow-2xl shadow-black/20 sm:p-10">
            <p className="text-sm font-semibold text-cyan-200">POPKIT for Business</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-balance text-4xl font-black tracking-tight sm:text-6xl sm:leading-tight">{b.heroTitle}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{b.heroDescription}</p>
                <p className="mt-4 max-w-3xl leading-7 text-zinc-400">{b.heroSub}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={primaryMailto} className="inline-flex justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-cyan-200">{b.primaryCta}</a>
                  <a href={partnerMailto} className="inline-flex justify-center rounded-2xl border border-cyan-200/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/15">{b.partnerCta}</a>
                </div>
              </div>
              <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-zinc-950/35 p-4">
                {b.stats.map((stat) => <div key={stat.label} className="rounded-2xl bg-white/[0.05] p-4"><strong className="block text-2xl text-white">{stat.value}</strong><span className="text-sm text-zinc-400">{stat.label}</span></div>)}
              </div>
            </div>
          </section>
          <section className="mt-10">
            <div className="max-w-3xl"><p className="text-sm font-semibold text-cyan-200">{b.sections.problemsEyebrow}</p><h2 className="mt-2 text-3xl font-black text-white">{b.sections.problems}</h2><p className="mt-3 leading-7 text-zinc-400">{b.sections.problemsDesc}</p></div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">{page.problemCards.map((card) => <article key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6"><h3 className="text-xl font-black text-white">{card.title}</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">{card.points.map((point) => <li key={point} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200" /><span>{point}</span></li>)}</ul></article>)}</div>
          </section>
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start"><div><p className="text-sm font-semibold text-cyan-200">{b.sections.loopEyebrow}</p><h2 className="mt-2 text-3xl font-black text-white">{b.sections.loop}</h2><p className="mt-3 leading-7 text-zinc-400">{b.sections.loopDesc}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{page.feedbackLoop.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-zinc-950/35 p-4"><span className="text-sm font-black text-cyan-200">0{index + 1}</span><p className="mt-2 font-bold text-white">{step}</p></div>)}</div></div><div className="grid gap-4">{page.recommendationCards.map((card) => <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5"><h3 className="text-lg font-black text-white">{card.title}</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">{card.points.map((point) => <li key={point} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200" /><span>{point}</span></li>)}</ul></article>)}</div></div>
          </section>
          <section className="mt-10"><div className="max-w-3xl"><p className="text-sm font-semibold text-cyan-200">Service Model</p><h2 className="mt-2 text-3xl font-black text-white">{b.sections.service}</h2><p className="mt-3 leading-7 text-zinc-400">{b.sections.serviceDesc}</p></div><div className="mt-6 grid gap-4 md:grid-cols-2">{page.businessServices.map((service, index) => <article key={service.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-200/30 hover:bg-white/[0.055]"><span className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-sm font-black text-cyan-200">{index + 1}</span><h3 className="mt-5 text-xl font-black text-white">{service.title}</h3><p className="mt-3 leading-7 text-zinc-400">{service.description}</p></article>)}</div></section>
          <section className="mt-10"><div className="max-w-3xl"><p className="text-sm font-semibold text-cyan-200">Business Opportunity</p><h2 className="mt-2 text-3xl font-black text-white">{b.sections.opportunity}</h2><p className="mt-3 leading-7 text-zinc-400">{b.sections.opportunityDesc}</p></div><div className="mt-6 grid gap-4 lg:grid-cols-3">{page.monetizationCards.map((card) => <article key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6"><h3 className="text-xl font-black text-white">{card.title}</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">{card.points.map((point) => <li key={point} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200" /><span>{point}</span></li>)}</ul></article>)}</div></section>
          <section className="mt-10"><div className="max-w-3xl"><p className="text-sm font-semibold text-cyan-200">For Teams</p><h2 className="mt-2 text-3xl font-black text-white">{b.sections.audience}</h2><p className="mt-3 leading-7 text-zinc-400">{b.sections.audienceDesc}</p></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{page.audienceCards.map((card) => <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5"><h3 className="font-black text-white">{card.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{card.description}</p></article>)}</div></section>
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/[0.12] via-white/[0.05] to-white/[0.03] p-6 sm:p-8"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-semibold text-cyan-200">Partnership Inquiry</p><h2 className="mt-2 text-3xl font-black text-white">{b.sections.final}</h2><p className="mt-3 max-w-3xl leading-7 text-zinc-300">{b.sections.finalDesc}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a href={primaryMailto} className="inline-flex justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-cyan-200">{b.primaryCta}</a><a href={partnerMailto} className="inline-flex justify-center rounded-2xl border border-cyan-200/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/15">{b.partnerCta}</a></div></div></section>
        </div>
      </section>
    </main>
  );
}
