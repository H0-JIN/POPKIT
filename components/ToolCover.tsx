import Image from "next/image";
import type { Tool } from "@/lib/types";

type CoverKind =
  | "conversation"
  | "document"
  | "research"
  | "development"
  | "design"
  | "video"
  | "audio_analytics"
  | "productivity";

type CoverTheme = { glow: string; label: string };
type CoverVariant = {
  tone: "cyan" | "violet" | "pink" | "emerald";
  symbolSide: "left" | "center";
  density: "low" | "mid" | "high";
  glowAnchor: string;
};

const THEME_BY_KIND: Record<CoverKind, CoverTheme> = {
  conversation: { glow: "from-cyan-400/25 via-sky-300/15 to-violet-400/15", label: "text-cyan-100" },
  document: { glow: "from-sky-400/25 via-indigo-400/15 to-cyan-400/15", label: "text-sky-100" },
  research: { glow: "from-emerald-400/25 via-cyan-400/15 to-sky-400/15", label: "text-emerald-100" },
  development: { glow: "from-emerald-400/25 via-teal-400/15 to-cyan-400/15", label: "text-emerald-100" },
  design: { glow: "from-violet-400/25 via-fuchsia-400/15 to-pink-400/15", label: "text-violet-100" },
  video: { glow: "from-pink-400/25 via-violet-400/15 to-fuchsia-400/15", label: "text-pink-100" },
  audio_analytics: { glow: "from-cyan-400/25 via-emerald-400/15 to-violet-400/15", label: "text-cyan-100" },
  productivity: { glow: "from-cyan-400/20 via-violet-400/12 to-emerald-400/15", label: "text-cyan-100" },
};

const TONE: Record<CoverVariant["tone"], { accent: string; soft: string; line: string }> = {
  cyan: { accent: "bg-cyan-300", soft: "bg-cyan-300/35", line: "bg-cyan-100/60" },
  violet: { accent: "bg-violet-300", soft: "bg-violet-300/35", line: "bg-violet-100/60" },
  pink: { accent: "bg-pink-300", soft: "bg-pink-300/35", line: "bg-pink-100/60" },
  emerald: { accent: "bg-emerald-300", soft: "bg-emerald-300/35", line: "bg-emerald-100/60" },
};

function classifyTool(tool: Tool): CoverKind {
  const src = `${tool.slug} ${tool.category} ${tool.sub_category} ${tool.use_tags.join(" ")} ${tool.tags.join(" ")}`.toLowerCase();
  if (/(cursor|copilot|replit|bolt|codex|v0|lovable|developer|code|coding|개발|코드)/.test(src)) return "development";
  if (/(perplexity|consensus|genspark|search|research|리서치|검색|source)/.test(src)) return "research";
  if (/(notion|notebook|docs|document|writing|writer|문서|글쓰기|노트)/.test(src)) return "document";
  if (/(chatgpt|claude|gemini|chat|conversation|assistant|대화)/.test(src)) return "conversation";
  if (/(figma|midjourney|krea|ideogram|napkin|weavy|design|image|디자인|이미지)/.test(src)) return "design";
  if (/(runway|veo|pika|kling|heygen|video|motion|영상)/.test(src)) return "video";
  if (/(elevenlabs|audio|voice|marketing|analytics|dashboard|캠페인|분석|음성)/.test(src)) return "audio_analytics";
  return "productivity";
}

function hashVariant(slug: string): CoverVariant {
  const hash = slug.split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 3), 0);
  const tones: CoverVariant["tone"][] = ["cyan", "violet", "pink", "emerald"];
  const anchors = ["-right-12 -top-10", "-right-10 top-2", "right-0 -top-6", "-right-6 top-6"];
  return {
    tone: tones[hash % tones.length],
    symbolSide: hash % 2 === 0 ? "left" : "center",
    density: hash % 3 === 0 ? "high" : hash % 3 === 1 ? "mid" : "low",
    glowAnchor: anchors[hash % anchors.length],
  };
}

function Symbol({ kind, tone, side, density }: { kind: CoverKind; tone: (typeof TONE)[CoverVariant["tone"]]; side: CoverVariant["symbolSide"]; density: CoverVariant["density"] }) {
  const base = side === "left" ? "left-6" : "left-1/2 -translate-x-1/2";
  const extra = density === "high" ? "w-4" : density === "mid" ? "w-6" : "w-8";

  if (kind === "conversation") return <>
    <div className={`absolute ${base} top-6 h-20 w-28 rounded-[4px] border border-white/20 bg-zinc-950/85`} />
    <div className={`absolute ${base} top-[6.6rem] ml-3 h-3 w-3 rotate-45 border-r border-b border-white/20 bg-zinc-950/85`} />
    <div className={`absolute ${base} top-11 ml-20 h-16 w-20 rounded-[4px] border border-white/20 bg-black/35`} />
    <div className={`absolute ${base} top-[5.95rem] ml-24 h-2.5 w-2.5 rotate-45 border-r border-b border-white/20 bg-black/35`} />
    <div className={`absolute ${base} top-10 ml-4 h-2 w-16 ${tone.line}`} /><div className={`absolute ${base} top-14 ml-4 h-2 ${extra} ${tone.soft}`} />
  </>;
  if (kind === "document") return <>
    <div className={`absolute ${base} top-6 h-24 w-24 rounded-[4px] border border-white/20 bg-zinc-950/85`} />
    <div className={`absolute ${base} top-6 h-5 w-24 border-b border-white/15 ${tone.soft}`} />
    <div className={`absolute ${base} top-14 ml-3 h-2 w-16 ${tone.line}`} /><div className={`absolute ${base} top-18 ml-3 h-2 w-14 bg-white/25`} />
    <div className={`absolute ${base} top-22 ml-3 h-2 ${extra} ${tone.soft}`} />
  </>;
  if (kind === "research") return <>
    <div className={`absolute ${base} top-7 h-10 w-28 rounded-[4px] border border-white/20 bg-zinc-950/85`} />
    <div className={`absolute ${base} top-10 ml-3 h-2 w-13 ${tone.line}`} />
    <div className={`absolute ${base} top-9 ml-20 size-4 rounded-full border border-white/25 ${tone.soft}`} /><div className={`absolute ${base} top-12 ml-[5.75rem] size-2 rotate-45 border-r border-b border-white/25`} />
    <div className={`absolute ${base} top-20 h-8 w-10 border border-white/20 bg-black/30`} /><div className={`absolute ${base} top-20 ml-12 h-8 w-10 border border-white/20 bg-black/30`} />
  </>;
  if (kind === "development") return <>
    <div className={`absolute ${base} top-6 h-24 w-28 rounded-[4px] border border-white/20 bg-zinc-950/85`} />
    <div className={`absolute ${base} top-6 h-5 w-28 border-b border-white/15`} />
    <div className={`absolute ${base} top-8 ml-3 h-1.5 w-3 rounded-full ${tone.accent}`} /><div className="absolute top-8 ml-8 h-1.5 w-1.5 rounded-full bg-white/30" />
    <div className={`absolute ${base} top-14 ml-3 h-2 w-14 ${tone.line}`} /><div className={`absolute ${base} top-18 ml-3 h-2 w-11 bg-white/20`} />
    <div className={`absolute ${base} top-22 ml-3 h-2 ${extra} ${tone.soft}`} />
  </>;
  if (kind === "design") return <>
    <div className={`absolute ${base} top-6 h-24 w-24 rounded-[4px] border border-white/20 bg-zinc-900/70`} />
    <div className={`absolute ${base} top-10 ml-4 h-6 w-6 ${tone.soft}`} /><div className={`absolute ${base} top-10 ml-12 h-6 w-8 border border-white/20`} />
    <div className={`absolute ${base} top-18 ml-4 h-8 w-16 border border-white/20 bg-black/30`} />
  </>;
  if (kind === "video") return <>
    <div className={`absolute ${base} top-8 h-20 w-28 rounded-[4px] border border-white/20 bg-zinc-900/70`} />
    <div className={`absolute ${base} top-14 ml-11 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-white/70`} />
    <div className={`absolute ${base} top-[5.5rem] h-2 w-28 bg-white/10`} /><div className={`absolute ${base} top-[5.5rem] h-2 ${extra} ${tone.soft}`} />
  </>;
  if (kind === "audio_analytics") return <>
    <div className={`absolute ${base} top-8 flex items-end gap-1`}>
      {Array.from({ length: 10 }).map((_, i) => <div key={i} className={`${i % 2 === 0 ? "h-12" : "h-6"} w-2 ${i % 3 === 0 ? tone.accent : "bg-white/25"}`} />)}
    </div>
    <div className={`absolute ${base} top-24 h-2 w-24 bg-white/10`} />
  </>;
  return <>
    <div className={`absolute ${base} top-7 h-24 w-24 rounded-[4px] border border-white/20 bg-zinc-950/80`} />
    <div className={`absolute ${base} top-11 ml-3 h-9 w-18 border border-white/20 bg-black/30`} />
    <div className={`absolute ${base} top-21 ml-3 h-2 ${extra} ${tone.soft}`} />
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
  const variant = hashVariant(tool.slug);
  const tone = TONE[variant.tone];

  return <div className={`relative h-40 overflow-hidden border-b border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black ${className}`}>
    <div className={`absolute ${variant.glowAnchor} h-44 w-44 rounded-full bg-gradient-to-br blur-2xl ${theme.glow}`} />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[length:14px_14px]" />
    <Symbol kind={kind} tone={tone} side={variant.symbolSide} density={variant.density} />
    <div className="absolute right-4 top-4 grid grid-cols-3 gap-1 opacity-70">
      {Array.from({ length: 9 }).map((_, i) => <span key={i} className={`h-1.5 w-1.5 rounded-[1px] ${i % 4 === 0 ? tone.accent : "bg-white/20"}`} />)}
    </div>
    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-2">
      <p className={`line-clamp-1 font-mono text-base font-semibold tracking-wide ${theme.label}`}>{tool.tool_name}</p>
      <span className={`h-2 w-8 ${tone.soft}`} />
    </div>
  </div>;
}
