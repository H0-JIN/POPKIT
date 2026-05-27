import Image from "next/image";
import type { Tool } from "@/lib/types";

type CoverKind = "chat_doc" | "search_research" | "dev" | "design_media" | "video_motion" | "productivity_auto";

type CoverTheme = {
  accent: string;
  accentSoft: string;
  glow: string;
  label: string;
};

const THEME_BY_KIND: Record<CoverKind, CoverTheme> = {
  chat_doc: { accent: "bg-cyan-300", accentSoft: "bg-sky-300/35", glow: "from-cyan-400/25 via-sky-400/20 to-violet-400/20", label: "text-cyan-100" },
  search_research: { accent: "bg-sky-300", accentSoft: "bg-cyan-300/35", glow: "from-sky-400/20 via-cyan-400/15 to-indigo-400/20", label: "text-sky-100" },
  dev: { accent: "bg-emerald-300", accentSoft: "bg-cyan-300/35", glow: "from-emerald-400/25 via-cyan-400/20 to-teal-400/15", label: "text-emerald-100" },
  design_media: { accent: "bg-violet-300", accentSoft: "bg-pink-300/35", glow: "from-violet-400/25 via-fuchsia-400/15 to-pink-400/25", label: "text-violet-100" },
  video_motion: { accent: "bg-pink-300", accentSoft: "bg-violet-300/35", glow: "from-fuchsia-400/20 via-pink-400/15 to-violet-400/25", label: "text-pink-100" },
  productivity_auto: { accent: "bg-amber-300", accentSoft: "bg-emerald-300/25", glow: "from-amber-400/20 via-emerald-400/15 to-cyan-400/15", label: "text-amber-100" },
};

function classifyTool(tool: Tool): CoverKind {
  const source = `${tool.slug} ${tool.category} ${tool.sub_category} ${tool.use_tags.join(" ")} ${tool.tags.join(" ")}`.toLowerCase();

  if (/(chat|claude|gemini|notion|notebook|문서|글쓰기|대화|번역|요약)/.test(source)) return "chat_doc";
  if (/(search|perplexity|consensus|research|리서치|검색|자료)/.test(source)) return "search_research";
  if (/(cursor|copilot|replit|bolt|codex|개발|코드|자동화|workflow|zapier|make)/.test(source)) return "dev";
  if (/(figma|midjourney|krea|ideogram|design|이미지|디자인)/.test(source)) return "design_media";
  if (/(runway|kling|pika|heygen|elevenlabs|video|audio|영상|음성)/.test(source)) return "video_motion";

  return "productivity_auto";
}

function PixelMotif({ kind, theme }: { kind: CoverKind; theme: CoverTheme }) {
  if (kind === "chat_doc") {
    return <>
      <div className="absolute left-5 top-9 h-8 w-14 rounded-[2px] border border-white/20 bg-zinc-900/70" />
      <div className={`absolute left-7 top-11 h-1 w-8 ${theme.accentSoft}`} />
      <div className="absolute left-7 top-14 h-1 w-10 bg-white/20" />
      <div className="absolute left-9 top-[4.3rem] h-2 w-2 rotate-45 border-r border-b border-white/20 bg-zinc-900/70" />
      <div className="absolute right-7 top-10 h-12 w-16 rounded-[2px] border border-white/15 bg-black/20" />
      <div className="absolute right-9 top-12 h-1 w-10 bg-white/25" />
      <div className={`absolute right-9 top-15 h-1 w-8 ${theme.accentSoft}`} />
    </>;
  }

  if (kind === "search_research") {
    return <>
      <div className="absolute left-5 top-9 h-7 w-24 rounded-[2px] border border-white/20 bg-zinc-900/70" />
      <div className="absolute left-8 top-12 h-1 w-14 bg-white/25" />
      <div className={`absolute left-24 top-11 h-3 w-3 rounded-full border border-white/25 ${theme.accentSoft}`} />
      <div className="absolute right-6 top-9 h-14 w-16 rounded-[2px] border border-white/20 bg-black/25" />
      <div className="absolute right-9 top-12 h-1 w-10 bg-white/25" />
      <div className="absolute right-9 top-15 h-1 w-8 bg-white/20" />
      <div className={`absolute right-9 top-[4.6rem] h-1 w-11 ${theme.accentSoft}`} />
    </>;
  }

  if (kind === "dev") {
    return <>
      <div className="absolute left-5 top-9 h-16 w-24 rounded-[2px] border border-white/20 bg-zinc-950/70" />
      <div className="absolute left-7 top-11 h-1 w-5 bg-white/25" />
      <div className="absolute left-14 top-11 h-1 w-3 bg-white/15" />
      <div className={`absolute left-7 top-14 h-1 w-12 ${theme.accentSoft}`} />
      <div className="absolute left-7 top-[4.15rem] h-1 w-10 bg-white/20" />
      <div className={`absolute left-7 top-[4.6rem] h-1 w-8 ${theme.accentSoft}`} />
      <div className="absolute right-6 top-10 h-10 w-14 rounded-[2px] border border-white/20 bg-black/25" />
      <div className="absolute right-8 top-12 h-1 w-7 bg-white/20" />
      <div className={`absolute right-8 top-15 h-1 w-9 ${theme.accentSoft}`} />
    </>;
  }

  if (kind === "design_media") {
    return <>
      <div className="absolute left-5 top-9 h-16 w-20 rounded-[2px] border border-white/20 bg-zinc-900/60" />
      <div className="absolute left-8 top-12 h-10 w-14 border border-white/20" />
      <div className={`absolute left-10 top-14 h-3 w-3 ${theme.accentSoft}`} />
      <div className={`absolute left-16 top-16 h-2 w-5 ${theme.accentSoft}`} />
      <div className="absolute right-5 top-10 grid grid-cols-4 gap-1">
        {Array.from({ length: 16 }).map((_, i) => <div key={i} className={`h-2 w-2 ${i % 5 === 0 ? theme.accentSoft : "bg-white/10"}`} />)}
      </div>
    </>;
  }

  if (kind === "video_motion") {
    return <>
      <div className="absolute left-5 top-10 h-14 w-24 rounded-[2px] border border-white/20 bg-zinc-900/60" />
      <div className="absolute left-14 top-15 h-0 w-0 border-b-[6px] border-l-[9px] border-t-[6px] border-b-transparent border-l-white/70 border-t-transparent" />
      <div className="absolute left-5 top-[4.95rem] h-2 w-24 bg-white/10" />
      <div className={`absolute left-8 top-[5.15rem] h-1 w-7 ${theme.accentSoft}`} />
      <div className="absolute right-7 top-11 flex items-end gap-1">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className={`${i % 2 === 0 ? "h-6" : "h-3"} w-1 ${i % 3 === 0 ? theme.accentSoft : "bg-white/20"}`} />)}
      </div>
    </>;
  }

  return <>
    <div className="absolute left-5 top-10 grid grid-cols-2 gap-2">
      <div className="h-8 w-10 rounded-[2px] border border-white/20 bg-black/25" />
      <div className="h-8 w-10 rounded-[2px] border border-white/20 bg-black/25" />
      <div className={`h-2 w-2 rounded-full ${theme.accent}`} />
      <div className="h-2 w-12 bg-white/20" />
    </div>
    <div className="absolute right-6 top-10 h-14 w-16 rounded-[2px] border border-white/20 bg-zinc-900/60" />
    <div className="absolute right-9 top-13 h-1 w-10 bg-white/20" />
    <div className={`absolute right-9 top-16 h-1 w-8 ${theme.accentSoft}`} />
    <div className={`absolute right-9 top-[4.6rem] h-1 w-11 ${theme.accentSoft}`} />
  </>;
}

export function ToolCover({ tool, className = "" }: { tool: Tool; className?: string }) {
  if (tool.image_url) {
    return <div className={`relative h-40 overflow-hidden bg-zinc-900 ${className}`}>
      <Image src={tool.image_url} alt="" fill className="object-cover" />
    </div>;
  }

  const kind = classifyTool(tool);
  const theme = THEME_BY_KIND[kind];

  return <div className={`relative h-40 overflow-hidden border-b border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black ${className}`}>
    <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br blur-2xl ${theme.glow}`} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.08),transparent_35%),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[length:100%_100%,12px_12px,12px_12px]" />

    <PixelMotif kind={kind} theme={theme} />

    <div className="absolute left-5 top-4 flex items-center gap-2">
      <span className={`h-2 w-2 rounded-[2px] ${theme.accent}`} />
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-100/70" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Neo Pixel Cover</span>
    </div>

    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
      <p className={`line-clamp-1 font-mono text-sm font-semibold tracking-wide ${theme.label}`}>{tool.tool_name}</p>
      <div className="grid grid-cols-2 gap-1">
        <span className="h-1.5 w-1.5 rounded-[1px] bg-white/30" />
        <span className={`h-1.5 w-1.5 rounded-[1px] ${theme.accent}`} />
        <span className={`h-1.5 w-1.5 rounded-[1px] ${theme.accentSoft}`} />
        <span className="h-1.5 w-1.5 rounded-[1px] bg-white/20" />
      </div>
    </div>
  </div>;
}
