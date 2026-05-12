export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="relative flex-1"><span className="sr-only">검색</span><input value={value} onChange={(e) => onChange(e.target.value)} placeholder="AI 이름, 용도, 태그 검색" className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none ring-cyan-400/30 transition placeholder:text-zinc-500 focus:border-cyan-300/50 focus:ring-4" /></label>;
}
