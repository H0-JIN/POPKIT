"use client";

import { useState } from "react";
import type { ToolUpdate } from "@/lib/types";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { EmptyState } from "@/components/EmptyState";

export function UpdatesTab({ updates }: { updates: ToolUpdate[] }) {
  const [visible, setVisible] = useState(3);
  if (!updates.length) return <EmptyState title="공식 업데이트 출처 확인 필요" description="공식 블로그, 릴리스 노트, 체인지로그 확인 후 반영합니다." />;
  return <div><div className="space-y-4">{updates.slice(0, visible).map((update) => <article key={update.update_id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><time className="text-sm font-semibold text-cyan-200">{update.update_date}</time><h3 className="mt-2 text-lg font-bold">{update.update_title}</h3><p className="mt-2 text-zinc-400">{update.update_summary}</p><dl className="mt-4 grid gap-3 text-sm md:grid-cols-2"><div><dt className="text-zinc-500">실무 영향</dt><dd className="mt-1 text-zinc-300">{update.work_impact}</dd></div><div><dt className="text-zinc-500">추천 사용자</dt><dd className="mt-1 text-zinc-300">{update.recommended_users}</dd></div></dl>{update.source_url ? <a href={update.source_url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-cyan-200 hover:underline">공식 출처 보기 →</a> : <p className="mt-4 text-sm text-amber-200">공식 업데이트 출처 확인 필요</p>}</article>)}</div>{updates.length > visible && <LoadMoreButton onClick={() => setVisible((v) => v + 3)}>업데이트 더 보기</LoadMoreButton>}</div>;
}
