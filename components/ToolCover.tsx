import Image from "next/image";
import type { Tool } from "@/lib/types";

type CoverKind = "chat_doc" | "search_research" | "dev" | "design_media" | "video_motion" | "productivity_auto";

type CoverTheme = {
  accent: string;
  accentSoft: string;
  glow: string;
  label: string;
};

type CoverVariant = {
  tone: "cyan" | "violet" | "pink" | "emerald";
  patternShift: string;
  dotOffset: string;
  stripe: string;
};

const THEME_BY_KIND: Record<CoverKind, CoverTheme> = {
  chat_doc: { accent: "bg-cyan-300", accentSoft: "bg-sky-300/40", glow: "from-cyan-400/30 via-sky-400/20 to-violet-400/15", label: "text-cyan-100" },
  search_research: { accent: "bg-sky-300", accentSoft: "bg-cyan-300/35", glow: "from-sky-400/25 via-cyan-400/15 to-indigo-400/20", label: "text-sky-100" },
  dev: { accent: "bg-emerald-300", accentSoft: "bg-cyan-300/35", glow: "from-emerald-400/30 via-cyan-400/20 to-teal-400/15", label: "text-emerald-100" },
  design_media: { accent: "bg-violet-300", accentSoft: "bg-pink-300/35", glow: "from-violet-400/30 via-fuchsia-400/20 to-pink-400/25", label: "text-violet-100" },
  video_motion: { accent: "bg-pink-300", accentSoft: "bg-violet-300/35", glow: "from-fuchsia-400/25 via-pink-400/15 to-violet-400/25", label: "text-pink-100" },
  productivity_auto: { accent: "bg-cyan-300", accentSoft: "bg-emerald-300/30", glow: "from-cyan-400/25 via-emerald-400/20 to-violet-400/15", label: "text-cyan-100" },
};

const VARIANT_TONES: Record<CoverVariant["tone"], { accent: string; soft: string }> = {
  cyan: { accent: "bg-cyan-300", soft: "bg-cyan-300/35" },
  violet: { accent: "bg-violet-300", soft: "bg-violet-300/35" },
  pink: { accent: "bg-pink-300", soft: "bg-pink-300/35" },
  emerald: { accent: "bg-emerald-300", soft: "bg-emerald-300/35" },
};

function classifyTool(tool: Tool): CoverKind {
  const source = `${tool.slug} ${tool.category} ${tool.sub_category} ${tool.use_tags.join(" ")} ${tool.tags.join(" ")}`.toLowerCase();

  if (/(chat|claude|gemini|notion|notebook|문서|글쓰기|대화|번역|요약)/.test(source)) return "chat_doc";
  if (/(search|perplexity|consensus|genspark|research|리서치|검색|자료)/.test(source)) return "search_research";
  if (/(cursor|copilot|replit|bolt|codex|v0|lovable|개발|코드)/.test(source)) return "dev";
  if (/(figma|midjourney|krea|ideogram|napkin|design|이미지|디자인)/.test(source)) return "design_media";
  if (/(runway|kling|pika|heygen|elevenlabs|video|audio|영상|음성)/.test(source)) return "video_motion";

  return "productivity_auto";
}

function hashVariant(slug: string): CoverVariant {
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const tones: CoverVariant["tone"][] = ["cyan", "violet", "pink", "emerald"];
  const shifts = ["top-9 right-7", "top-10 right-10", "top-8 right-6", "top-11 right-8"];
  const dots = ["left-6 top-5", "left-8 top-6", "left-7 top-4", "left-9 top-5"];
  const stripes = ["w-6", "w-8", "w-10", "w-7"];

  return {
    tone: tones[hash % tones.length],
    patternShift: shifts[hash % shifts.length],
    dotOffset: dots[hash % dots.length],
    stripe: stripes[hash % stripes.length],
  };
}

function PixelMotif({ kind, accent, accentSoft, variant }: { kind: CoverKind; accent: string; accentSoft: string; variant: CoverVariant }) {
  if (kind === "chat_doc") {
    return <>
      <div className="absolute left-6 top-8 h-20 w-28 rounded-[3px] border border-white/20 bg-zinc-950/80" />
      <div className="absolute left-9 top-12 h-2 w-18 bg-white/20" />
      <div className={`absolute left-9 top-16 h-2 ${variant.stripe} ${accentSoft}`} />
      <div className="absolute left-9 top-20 h-2 w-14 bg-white/15" />
      <div className="absolute left-11 top-[5.6rem] h-3 w-3 rotate-45 border-r border-b border-white/20 bg-zinc-950/80" />
      <div className="absolute right-8 top-10 h-12 w-16 rounded-[3px] border border-white/20 bg-black/30" />
      <div className={`absolute right-10 top-13 h-2 w-8 ${accentSoft}`} />
      <div className="absolute right-10 top-17 h-2 w-10 bg-white/20" />
    </>;
  }

  if (kind === "search_research") {
    return <>
      <div className="absolute left-6 top-9 h-9 w-28 rounded-[3px] border border-white/20 bg-zinc-950/80" />
      <div className="absolute left-9 top-[2.9rem] h-2 w-16 bg-white/20" />
      <div className={`absolute left-[6.2rem] top-[2.65rem] h-3 w-3 rounded-full border border-white/30 ${accentSoft}`} />
      <div className="absolute left-[6.9rem] top-[3.35rem] h-2 w-2 rounded-full border border-white/30" />
      <div className="absolute right-7 top-10 h-16 w-18 rounded-[3px] border border-white/20 bg-black/30" />
      <div className="absolute right-9 top-13 h-2 w-12 bg-white/20" />
      <div className={`absolute right-9 top-17 h-2 ${variant.stripe} ${accentSoft}`} />
      <div className={`absolute right-9 top-21 h-2 w-10 ${accentSoft}`} />
    </>;
  }

  if (kind === "dev") {
    return <>
      <div className="absolute left-6 top-8 h-20 w-28 rounded-[3px] border border-white/20 bg-zinc-950/85" />
      <div className="absolute left-6 top-8 h-4 w-28 border-b border-white/15" />
      <div className="absolute left-9 top-10 h-1.5 w-5 bg-white/20" />
      <div className="absolute left-16 top-10 h-1.5 w-3 bg-white/10" />
      <div className={`absolute left-9 top-14 h-2 w-11 ${accentSoft}`} />
      <div className="absolute left-9 top-18 h-2 w-14 bg-white/15" />
      <div className={`absolute left-9 top-22 h-2 ${variant.stripe} ${accentSoft}`} />
      <div className="absolute right-7 top-10 grid grid-cols-2 gap-1.5">
        <div className="h-5 w-5 border border-white/20 bg-black/30" />
        <div className="h-5 w-5 border border-white/20 bg-black/30" />
        <div className="h-5 w-5 border border-white/20 bg-black/30" />
        <div className={`h-5 w-5 border border-white/20 ${accentSoft}`} />
      </div>
    </>;
  }

  if (kind === "design_media") {
    return <>
      <div className="absolute left-6 top-8 h-20 w-26 rounded-[3px] border border-white/20 bg-zinc-900/70" />
      <div className="absolute left-9 top-11 h-14 w-20 border border-white/20 bg-black/25" />
      <div className={`absolute left-11 top-13 h-5 w-5 ${accentSoft}`} />
      <div className={`absolute left-18 top-15 h-3 w-8 ${accentSoft}`} />
      <div className="absolute left-11 top-20 h-1.5 w-13 bg-white/20" />
      <div className="absolute right-6 top-10 grid grid-cols-4 gap-1">
        {Array.from({ length: 16 }).map((_, i) => <div key={i} className={`h-2 w-2 ${i % 5 === 0 ? accentSoft : "bg-white/10"}`} />)}
      </div>
    </>;
  }

  if (kind === "video_motion") {
    return <>
      <div className="absolute left-6 top-10 h-14 w-24 rounded-[3px] border border-white/20 bg-zinc-900/70" />
      <div className="absolute left-15 top-14 h-0 w-0 border-b-[8px] border-l-[12px] border-t-[8px] border-b-transparent border-l-white/70 border-t-transparent" />
      <div className="absolute left-6 top-[5.15rem] h-2 w-24 bg-white/10" />
      <div className={`absolute left-9 top-[5.35rem] h-1.5 ${variant.stripe} ${accentSoft}`} />
      <div className="absolute right-7 top-11 flex items-end gap-1">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className={`${i % 2 === 0 ? "h-7" : "h-3"} w-1 ${i % 3 === 0 ? accentSoft : "bg-white/20"}`} />)}
      </div>
    </>;
  }

  return <>
    <div className="absolute left-6 top-9 h-18 w-24 rounded-[3px] border border-white/20 bg-black/25" />
    <div className="absolute left-9 top-12 h-6 w-18 border border-white/15 bg-zinc-950/60" />
    <div className={`absolute left-9 top-20 h-2 ${variant.stripe} ${accentSoft}`} />
    <div className="absolute right-7 top-10 grid grid-cols-2 gap-2">
      <div className={`h-6 w-8 rounded-[2px] ${accentSoft}`} />
      <div className="h-6 w-8 rounded-[2px] bg-white/10" />
      <div className="h-6 w-8 rounded-[2px] bg-white/10" />
      <div className={`h-6 w-8 rounded-[2px] ${accentSoft}`} />
    </div>
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
  const tone = VARIANT_TONES[variant.tone];

  return <div className={`relative h-40 overflow-hidden border-b border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black ${className}`}>
    <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl ${theme.glow}`} />
    <div className={`absolute ${variant.patternShift} h-24 w-24 border border-white/10`} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.06),transparent_35%),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[length:100%_100%,12px_12px,12px_12px]" />

    <PixelMotif kind={kind} accent={tone.accent} accentSoft={tone.soft} variant={variant} />

    <div className={`absolute ${variant.dotOffset} flex items-center gap-1`}>
      <span className={`h-2 w-2 rounded-[2px] ${tone.accent}`} />
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-100/70" />
      <span className={`h-1.5 w-3 ${tone.soft}`} />
    </div>

    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-2">
      <p className={`line-clamp-1 font-mono text-base font-semibold tracking-wide ${theme.label}`}>{tool.tool_name}</p>
      <div className="grid grid-cols-2 gap-1">
        <span className="h-1.5 w-1.5 rounded-[1px] bg-white/30" />
        <span className={`h-1.5 w-1.5 rounded-[1px] ${tone.accent}`} />
        <span className={`h-1.5 w-1.5 rounded-[1px] ${tone.soft}`} />
        <span className="h-1.5 w-1.5 rounded-[1px] bg-white/20" />
      </div>
    </div>
  </div>;
}
