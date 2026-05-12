"use client";

import { useState } from "react";
import { getYouTubeId } from "@/lib/utils";

export function YouTubeEmbed({ url, title }: { url?: string; title: string }) {
  const [play, setPlay] = useState(false);
  const id = getYouTubeId(url);
  if (!id) return <div className="grid aspect-video place-items-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.03] text-zinc-500">사용법 영상 준비 중</div>;
  if (!play) return <button onClick={() => setPlay(true)} className="group grid aspect-video w-full place-items-center rounded-[1.5rem] bg-gradient-to-br from-zinc-800 to-zinc-950 text-center"><span className="grid size-20 place-items-center rounded-full bg-cyan-300 text-3xl text-zinc-950 transition group-hover:scale-105">▶</span><span className="sr-only">영상 재생</span></button>;
  return <iframe className="aspect-video w-full rounded-[1.5rem]" src={`https://www.youtube.com/embed/${id}`} title={title} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />;
}
