import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/lib/types";
import { getDomain } from "@/lib/utils";
import { RatingBadge } from "@/components/RatingBadge";
import { UpdateBadge } from "@/components/UpdateBadge";

const gradients: Record<string, string> = { "기획": "from-sky-400 via-cyan-200 to-violet-300", "디자인": "from-fuchsia-400 via-rose-300 to-amber-200", "개발": "from-emerald-400 via-cyan-500 to-blue-600", "기타": "from-lime-300 via-teal-300 to-indigo-400" };

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-zinc-900">
      <div className={`relative h-40 bg-gradient-to-br ${gradients[tool.category] ?? gradients["기타"]}`}>
        {tool.image_url ? <Image src={tool.image_url} alt="" fill className="object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.7),transparent_26%),linear-gradient(135deg,rgba(0,0,0,.08)_25%,transparent_25%,transparent_50%,rgba(0,0,0,.08)_50%,rgba(0,0,0,.08)_75%,transparent_75%)] bg-[length:100%_100%,26px_26px]" />}
        <div className="absolute bottom-4 left-4 rounded-2xl bg-zinc-950/75 px-3 py-2 text-sm font-bold backdrop-blur">{tool.tool_name}</div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-200">{tool.tool_name}</h3>
          {tool.editor_quote ? <p className="mt-2 line-clamp-2 text-[15px] font-semibold leading-6 text-cyan-100/90">“{tool.editor_quote}”</p> : null}
          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-zinc-400">{tool.short_description}</p>
        </div>
        <div className="flex flex-wrap gap-2">{(tool.use_tags.length ? tool.use_tags : tool.tags).slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-300">{tag}</span>)}</div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400"><RatingBadge rating={tool.rating_average} count={tool.rating_count} /><span>댓글 {tool.comment_count}</span><UpdateBadge date={tool.last_update_date} /></div>
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="text-zinc-500">{getDomain(tool.official_url)}</span><span className="font-semibold text-cyan-200">자세히 보기 →</span></div>
      </div>
    </Link>
  );
}
