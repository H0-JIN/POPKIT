import type { Metadata } from "next";
import { HeaderActions } from "@/components/HeaderActions";
import { Sidebar } from "@/components/Sidebar";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `기업 서비스 | ${SITE_NAME}`,
  description: "POPKIT의 직무별 AI 툴 큐레이션을 기반으로 기업 AI 도입, 교육, 협업, 프로모션 기회를 연결합니다."
};

const businessServices = [
  {
    title: "직무별 AI 툴 큐레이션",
    description: "기획, 디자인, 개발, 생산성 업무 흐름에 맞는 AI 툴을 빠르게 비교하고 도입 후보를 좁힙니다."
  },
  {
    title: "기업 맞춤 AI 도입 가이드",
    description: "조직의 목표와 사용 맥락에 맞춰 우선 적용할 업무, 툴 조합, 운영 기준을 정리합니다."
  },
  {
    title: "사내 AI 활용 교육 및 워크숍",
    description: "팀별 실무 사례를 중심으로 바로 써볼 수 있는 AI 활용 방식과 협업 프로세스를 안내합니다."
  },
  {
    title: "AI 서비스 프로모션 / 제휴 노출",
    description: "POPKIT의 탐색 경험 안에서 검증된 AI 서비스와 기업 사용자를 자연스럽게 연결합니다."
  }
];

export default function BusinessPage() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <HeaderActions />
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-cyan-300/[0.05] p-6 shadow-2xl shadow-black/20 sm:p-10">
            <p className="text-sm font-semibold text-cyan-200">POPKIT for Business</p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <h1 className="max-w-3xl text-balance text-4xl font-black tracking-tight sm:text-6xl sm:leading-tight">기업의 AI 도입과 활용을 더 빠르게</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">POPKIT은 직무별 AI 툴 큐레이션을 기반으로 기업의 AI 도입, 교육, 협업, 프로모션 기회를 연결합니다.</p>
              </div>
              <div className="rounded-3xl border border-cyan-200/20 bg-cyan-300/10 p-5 text-sm leading-6 text-cyan-50">
                <strong className="block text-base text-white">탐색 데이터에서 도입 실행까지</strong>
                <span className="mt-2 block text-cyan-100/80">업무별 툴 맥락을 기반으로 조직이 바로 판단할 수 있는 AI 활용 접점을 설계합니다.</span>
              </div>
            </div>
          </div>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            {businessServices.map((service, index) => (
              <article key={service.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-cyan-200/30 hover:bg-white/[0.055]">
                <span className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-sm font-black text-cyan-200">{index + 1}</span>
                <h2 className="mt-5 text-xl font-black text-white">{service.title}</h2>
                <p className="mt-3 leading-7 text-zinc-400">{service.description}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <div>
              <p className="text-sm font-semibold text-cyan-200">Partnership Inquiry</p>
              <h2 className="mt-2 text-2xl font-black text-white">기업 도입과 제휴 가능성을 함께 논의해보세요.</h2>
              <p className="mt-2 text-zinc-400">문의 폼 확장 전까지는 메일 문의로 연결되며, 이후 동일 CTA 영역을 폼으로 교체할 수 있습니다.</p>
            </div>
            <a href="mailto:partnership@popkit.ai?subject=POPKIT%20기업%20도입%20상담" className="mt-5 inline-flex shrink-0 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-zinc-950 hover:bg-cyan-200 sm:mt-0">
              기업 도입 상담
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}
