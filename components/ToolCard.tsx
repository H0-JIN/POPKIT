"use client";

import Link from "next/link";
import type { Tool } from "@/lib/types";
import { getDomain } from "@/lib/utils";
import { RatingBadge } from "@/components/RatingBadge";
import { UpdateBadge } from "@/components/UpdateBadge";
import { useLanguage } from "@/lib/i18n";
import { localizeToolContent } from "@/lib/localizedTool";
import { translateTag } from "@/lib/displayTranslations";
import { ToolCover } from "@/components/ToolCover";

export function ToolCard({ tool }: { tool: Tool }) {
  const { locale, t } = useLanguage();
  const displayTool = localizeToolContent(tool, locale);
  return (
    <Link href={`/tools/${tool.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-zinc-900">
      <ToolCover tool={tool} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-200">{tool.tool_name}</h3>
          {displayTool.editor_quote ? <p className="mt-2 line-clamp-2 text-[15px] font-semibold leading-6 text-cyan-100/90">“{displayTool.editor_quote}”</p> : null}
          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-zinc-400">{displayTool.short_description}</p>
        </div>
        <div className="flex flex-wrap gap-2">{(tool.use_tags.length ? tool.use_tags : tool.tags).slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-300">{translateTag(tag, locale)}</span>)}</div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400"><RatingBadge rating={tool.rating_average} count={tool.rating_count} /><span>{t.toolCard.comments(tool.comment_count)}</span><UpdateBadge date={tool.last_update_date} /></div>
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="text-zinc-500">{getDomain(tool.official_url)}</span><span className="font-semibold text-cyan-200">{t.toolCard.details}</span></div>
      </div>
    </Link>
  );
}
