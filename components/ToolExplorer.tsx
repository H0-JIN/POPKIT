"use client";

import { useMemo, useState } from "react";
import type { SortKey, Tool } from "@/lib/types";
import { matchesCategoryPath, matchesTool, sortTools } from "@/lib/utils";
import { SearchBar } from "@/components/SearchBar";
import { SortDropdown } from "@/components/SortDropdown";
import { FilterChips } from "@/components/FilterChips";
import { ToolCard } from "@/components/ToolCard";
import { EmptyState } from "@/components/EmptyState";
import { HeaderActions } from "@/components/HeaderActions";
import { MascotImage } from "@/components/MascotImage";
import { useLanguage } from "@/lib/i18n";

export function ToolExplorer({ tools, title, description, category, subCategory }: { tools: Tool[]; title?: string; description?: string; category?: string; subCategory?: string }) {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [filters, setFilters] = useState<string[]>([]);
  const filtered = useMemo(() => sortTools(tools.filter((tool) => matchesCategoryPath(tool, category, subCategory) && matchesTool(tool, query, filters)), sort), [tools, category, subCategory, query, filters, sort]);
  const toggle = (filter: string) => setFilters((prev) => prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]);

  return (
    <section className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <HeaderActions />
        <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between xl:flex-1">
              <div>
                <p className="text-sm font-semibold text-cyan-200">{t.hero.eyebrow}</p>
                <h1 className="mt-3 max-w-3xl whitespace-pre-line text-balance text-3xl font-black tracking-tight sm:text-5xl sm:leading-tight">{locale === "ko" && title ? title : t.hero.title}</h1>
                <p className="mt-3 max-w-2xl text-zinc-400">{locale === "ko" && description ? description : t.hero.description}</p>
              </div>
              <div className="flex w-fit items-end gap-2 rounded-[1.75rem] border border-white/10 bg-zinc-950/35 px-3 py-2 shadow-inner shadow-cyan-300/5 sm:gap-3 sm:px-4 sm:py-3 lg:mb-1">
                <MascotImage type="planner" size="md" className="size-10 sm:size-14" />
                <MascotImage type="developer" size="md" className="size-10 sm:size-14" />
                <MascotImage type="designer" size="md" className="size-10 sm:size-14" />
              </div>
            </div>
            <div className="grid gap-3 sm:min-w-[560px]"><div className="flex flex-col gap-3 sm:flex-row"><SearchBar value={query} onChange={setQuery} /><SortDropdown value={sort} onChange={setSort} /></div><FilterChips selected={filters} onToggle={toggle} /></div>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500"><span>{t.list.count(filtered.length)}</span><span>{t.list.compare}</span></div>
        {filtered.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div> : <EmptyState />}
      </div>
    </section>
  );
}
