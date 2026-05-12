import { SORT_OPTIONS } from "@/lib/constants";
import type { SortKey } from "@/lib/types";

export function SortDropdown({ value, onChange }: { value: SortKey; onChange: (value: SortKey) => void }) {
  return <select value={value} onChange={(e) => onChange(e.target.value as SortKey)} className="h-12 rounded-2xl border border-white/10 bg-zinc-900 px-4 text-sm font-medium text-zinc-200 outline-none focus:border-cyan-300/50">{SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>;
}
