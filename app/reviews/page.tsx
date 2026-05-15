import Link from "next/link";
import { getTools } from "@/lib/data/tools";
import { RatingBadge } from "@/components/RatingBadge";

export const metadata = { title: "리뷰 많은 AI 툴 | POPKIT", description: "댓글과 평가가 많은 AI 툴을 확인하세요." };

export default async function ReviewsPage() {
  const tools = (await getTools()).sort((a, b) => b.comment_count - a.comment_count).slice(0, 24);
  return <main className="min-h-screen px-4 py-8 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm text-zinc-400 hover:text-cyan-200">← 홈</Link><h1 className="mt-5 text-4xl font-black">리뷰 많은 AI 툴</h1><p className="mt-3 text-zinc-400">댓글 수와 평가 수가 많은 도구를 우선 살펴보세요.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{tools.map((tool) => <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-300/40"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">{tool.tool_name}</h2><RatingBadge rating={tool.rating_average} count={tool.rating_count} /></div><p className="mt-2 text-sm text-zinc-400">{tool.short_description}</p><p className="mt-3 text-sm text-zinc-500">댓글 {tool.comment_count} · {tool.category}/{tool.sub_category}</p></Link>)}</div></div></main>;
}
