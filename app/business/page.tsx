import type { Metadata } from "next";
import { HeaderActions } from "@/components/HeaderActions";
import { Sidebar } from "@/components/Sidebar";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `기업 서비스 | ${SITE_NAME}`,
  description:
    "POPKIT은 실제 사용자 리뷰와 활용 맥락 데이터를 기반으로 기업의 AI 선택, 추천, 교육, 제휴 전략을 돕는 플랫폼입니다."
};

const problemCards = [
  {
    title: "AI 툴은 많지만, 실제로 무엇이 좋은지 알기 어렵다",
    points: ["기능 소개만으로는 실무 활용성을 판단하기 어렵습니다.", "같은 툴도 직무와 목적에 따라 만족도가 달라집니다."]
  },
  {
    title: "실제 사용자 경험이 흩어져 있다",
    points: ["리뷰, 커뮤니티 후기, 업데이트 정보가 여러 곳에 분산되어 있습니다.", "검증된 사용 맥락을 찾기 어렵습니다."]
  },
  {
    title: "기업은 AI 도입 이후 활용 기준이 부족하다",
    points: ["어떤 팀에 어떤 AI를 추천해야 하는지 기준을 세우기 어렵습니다.", "사내 교육과 도입 효과 측정이 개인 역량에 의존하기 쉽습니다."]
  }
];

const recommendationCards = [
  {
    title: "실제 사용자 리뷰",
    points: ["사용자가 직접 남긴 평점과 한줄 리뷰", "직무별 만족도와 활용 맥락 축적"]
  },
  {
    title: "맥락 기반 추천",
    points: ["기획, 디자인, 개발, 마케팅 등 직무별 추천", "리서치, 문서 작성, 이미지 생성, 자동화 등 목적별 추천"]
  },
  {
    title: "데이터 인사이트",
    points: ["어떤 AI가 어떤 업무에서 반응이 좋은지 분석", "기업의 AI 도입, 교육, 제휴 전략에 활용 가능"]
  }
];

const feedbackLoop = ["리뷰 작성", "사용 맥락 축적", "추천 고도화", "기업 인사이트"];

const businessServices = [
  {
    title: "직무별 AI 툴 큐레이션",
    description: "사용자 리뷰와 활용 데이터를 바탕으로 직무별 추천 툴과 활용 시나리오를 제공합니다."
  },
  {
    title: "기업 맞춤 AI 활용 가이드",
    description: "조직의 업무 목적에 맞는 AI 조합과 사용 흐름을 제안하고, 단일 툴 추천이 아닌 워크플로우 중심으로 안내합니다."
  },
  {
    title: "사내 AI 활용 교육 / 워크숍",
    description: "실제 사용 사례와 리뷰 데이터를 기반으로 한 실습형 교육을 통해 직무별 AI 활용법을 조직 내부에 적용합니다."
  },
  {
    title: "AI 서비스 프로모션 / 제휴 노출",
    description: "AI SaaS 기업이 POPKIT 유저에게 자연스럽게 노출될 수 있도록 카테고리, 리뷰, 업데이트 콘텐츠와 연계된 제휴 가능성을 만듭니다."
  }
];

const monetizationCards = [
  {
    title: "B2B 컨설팅 / 교육",
    points: ["기업 맞춤 AI 도입 가이드", "직무별 AI 활용 교육 프로그램", "실무 워크플로우 설계"]
  },
  {
    title: "스폰서드 큐레이션 / 제휴 노출",
    points: ["검증된 AI 서비스를 적절한 카테고리와 사용자에게 노출", "리뷰와 업데이트 콘텐츠 기반의 자연스러운 프로모션"]
  },
  {
    title: "사용자 데이터 기반 인사이트 리포트",
    points: ["직무별 AI 관심도와 만족도", "목적별 AI 활용 트렌드", "AI SaaS 기업과 기업 고객을 위한 시장 반응 데이터"]
  }
];

const audienceCards = [
  { title: "인사 / 교육 조직", description: "사내 AI 교육과 활용 기준 수립" },
  { title: "마케팅 조직", description: "콘텐츠 제작과 캠페인 운영에 맞는 AI 워크플로우 탐색" },
  { title: "디자인 / 콘텐츠 조직", description: "이미지, 영상, 브랜드 제작 도구의 실제 활용성 비교" },
  { title: "개발 / 프로덕트 조직", description: "코드 작성, 자동화, 웹 제작 도구의 실무 적합성 확인" },
  { title: "신사업 / 디지털전환 조직", description: "조직 차원의 AI 도입 방향과 우선순위 설정" },
  { title: "AI SaaS 기업", description: "잠재 사용자에게 노출되고, 실제 반응 데이터를 확인할 수 있는 제휴 채널" }
];

const primaryMailto = "mailto:kkcm1002@gmail.com?subject=POPKIT%20기업%20도입%20상담";
const partnerMailto = "mailto:kkcm1002@gmail.com?subject=POPKIT%20제휴%20문의";

export default function BusinessPage() {
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
                <h1 className="max-w-4xl text-balance text-4xl font-black tracking-tight sm:text-6xl sm:leading-tight">유저의 경험이 쌓일수록, AI 추천은 더 정확해집니다</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
                  POPKIT은 AI 툴을 단순히 나열하지 않습니다. 실제 사용자들의 리뷰와 활용 데이터를 기반으로, 직무와 목적에 맞는 더 나은 AI 선택과 조합을 돕는 플랫폼입니다.
                </p>
                <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
                  기획자, 디자이너, 개발자, 마케터가 남긴 사용 경험은 다음 사용자에게 더 나은 선택 기준이 되고, 기업에게는 AI 도입과 활용 전략의 데이터가 됩니다.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={primaryMailto} className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-cyan-200">
                    기업 도입 상담
                  </a>
                  <a href={partnerMailto} className="inline-flex items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/15">
                    제휴 문의하기
                  </a>
                </div>
              </div>
              <div className="rounded-3xl border border-cyan-200/20 bg-cyan-300/10 p-5 text-sm leading-6 text-cyan-50">
                <strong className="block text-base text-white">경험 데이터 기반 AI 선택 플랫폼</strong>
                <span className="mt-2 block text-cyan-100/80">
                  리뷰와 평점, 직무, 활용 목적이 쌓일수록 POPKIT은 더 정교한 추천과 기업 인사이트로 확장될 수 있습니다.
                </span>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-200">Problem</p>
              <h2 className="mt-2 text-3xl font-black text-white">POPKIT이 해결하려는 문제</h2>
              <p className="mt-3 leading-7 text-zinc-400">AI 도입의 어려움은 툴의 수가 부족해서가 아니라, 실제 업무 맥락에서 검증된 선택 기준이 부족해서 생깁니다.</p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {problemCards.map((card, index) => (
                <article key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6">
                  <span className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-sm font-black text-cyan-200">{index + 1}</span>
                  <h3 className="mt-5 text-xl font-black text-white">{card.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-cyan-300/[0.045] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold text-cyan-200">Experience Data Loop</p>
                <h2 className="mt-2 text-3xl font-black text-white">사용자의 경험이 쌓일수록, 추천은 더 정교해집니다</h2>
                <p className="mt-4 leading-7 text-zinc-300">
                  POPKIT은 사용자의 리뷰, 평점, 직무, 활용 목적 데이터를 축적해 AI 툴을 더 정확하게 비교하고 추천할 수 있는 구조를 만듭니다. 어떤 AI가 어떤 업무에서 실제로 도움이 되었는지, 어떤 조합이 더 좋은 결과를 만들었는지가 POPKIT의 핵심 데이터가 됩니다.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-4 lg:grid-cols-1">
                  {feedbackLoop.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/30 px-4 py-3 text-sm font-bold text-white">
                      <span className="grid size-7 place-items-center rounded-full bg-cyan-300 text-xs font-black text-zinc-950">{index + 1}</span>
                      <span>{step}</span>
                      {index < feedbackLoop.length - 1 ? <span className="ml-auto text-cyan-200">→</span> : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                {recommendationCards.map((card) => (
                  <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
                    <h3 className="text-lg font-black text-white">{card.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">
                      {card.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-200">Service Model</p>
              <h2 className="mt-2 text-3xl font-black text-white">기업 대상 서비스 모델</h2>
              <p className="mt-3 leading-7 text-zinc-400">POPKIT은 사용자 경험 데이터의 맥락을 바탕으로 기업의 AI 도입, 교육, 제휴 접점을 단계적으로 확장합니다.</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {businessServices.map((service, index) => (
                <article key={service.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-200/30 hover:bg-white/[0.055]">
                  <span className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-sm font-black text-cyan-200">{index + 1}</span>
                  <h3 className="mt-5 text-xl font-black text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{service.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-200">Business Opportunity</p>
              <h2 className="mt-2 text-3xl font-black text-white">POPKIT이 만들 수 있는 비즈니스</h2>
              <p className="mt-3 leading-7 text-zinc-400">
                광고나 교육을 넘어, POPKIT의 장기 자산은 실제 사용자 경험 데이터입니다. 아래 모델은 데이터 축적과 검증이 진행될수록 확장 가능한 사업 기회입니다.
              </p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {monetizationCards.map((card) => (
                <article key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6">
                  <h3 className="text-xl font-black text-white">{card.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-200" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-200">For Teams</p>
              <h2 className="mt-2 text-3xl font-black text-white">활용 대상 기업/조직</h2>
              <p className="mt-3 leading-7 text-zinc-400">직무와 목적이 분명할수록 사용자 경험 데이터는 더 실용적인 AI 선택 기준이 됩니다.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audienceCards.map((card) => (
                <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="font-black text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{card.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/[0.12] via-white/[0.05] to-white/[0.03] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-cyan-200">Partnership Inquiry</p>
                <h2 className="mt-2 text-3xl font-black text-white">AI 툴 선택을 넘어, 활용 데이터가 쌓이는 플랫폼으로</h2>
                <p className="mt-3 max-w-3xl leading-7 text-zinc-300">
                  POPKIT은 AI 툴을 소개하는 데서 멈추지 않습니다. 사용자의 실제 경험을 기반으로 더 나은 추천과 조합을 만들고, 기업에게는 AI 도입과 활용 전략의 출발점을 제공합니다.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href={primaryMailto} className="inline-flex justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-cyan-200">
                  기업 도입 상담
                </a>
                <a href={partnerMailto} className="inline-flex justify-center rounded-2xl border border-cyan-200/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/15">
                  제휴 문의하기
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
