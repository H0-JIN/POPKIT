import type { ReactNode } from "react";

export function LoadMoreButton({ onClick, children = "더 보기" }: { onClick: () => void; children?: ReactNode }) {
  return <button onClick={onClick} className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-cyan-300/50 hover:text-cyan-100">{children}</button>;
}
