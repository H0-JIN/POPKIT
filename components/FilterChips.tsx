import { FILTER_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FilterChips({ selected, onToggle }: { selected: string[]; onToggle: (value: string) => void }) {
  return <div className="flex flex-wrap gap-2">{FILTER_OPTIONS.map((filter) => <button key={filter} onClick={() => onToggle(filter)} className={cn("rounded-full border px-3 py-2 text-xs font-semibold transition", selected.includes(filter) ? "border-cyan-300 bg-cyan-300 text-zinc-950" : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white")}>{filter}</button>)}</div>;
}
