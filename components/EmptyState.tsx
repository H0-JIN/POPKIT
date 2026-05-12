export function EmptyState({ title = "결과가 없습니다", description = "검색어나 필터를 조정해 보세요." }: { title?: string; description?: string }) {
  return <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] p-12 text-center"><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 text-zinc-500">{description}</p></div>;
}
