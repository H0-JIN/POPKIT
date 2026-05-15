"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SortKey, Tool } from "@/lib/types";
import type { RolePopularTool } from "@/lib/rolePopularTools";
import type { ReviewRole } from "@/lib/reviewRoles";
import {
  getReviewRoleLabel,
  getReviewRoleMascot,
  REVIEW_ROLE_OPTIONS,
} from "@/lib/reviewRoles";
import { matchesCategoryPath, matchesTool, sortTools } from "@/lib/utils";
import { SearchBar } from "@/components/SearchBar";
import { SortDropdown } from "@/components/SortDropdown";
import { FilterChips } from "@/components/FilterChips";
import { ToolCard } from "@/components/ToolCard";
import { EmptyState } from "@/components/EmptyState";
import { HeaderActions } from "@/components/HeaderActions";
import { MascotImage } from "@/components/MascotImage";
import { useLanguage } from "@/lib/i18n";
import { localizeToolContent } from "@/lib/localizedTool";

type ToolExplorerProps = {
  tools: Tool[];
  rolePopularTools?: Record<ReviewRole, RolePopularTool[]>;
  title?: string;
  description?: string;
  category?: string;
  subCategory?: string;
};

function RolePopularSection({
  rolePopularTools,
}: {
  rolePopularTools: Record<ReviewRole, RolePopularTool[]>;
}) {
  const { t, locale } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<ReviewRole>(
    REVIEW_ROLE_OPTIONS[0],
  );
  const selectedTools = rolePopularTools[selectedRole] ?? [];

  return (
    <section className="mb-6 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-zinc-950/70 p-5 shadow-2xl shadow-cyan-950/10 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2">
            <MascotImage type={getReviewRoleMascot(selectedRole)} size="md" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200/80">
              Review signal
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
              {t.rolePopular.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {t.rolePopular.description}
            </p>
          </div>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label={t.rolePopular.title}
        >
          {REVIEW_ROLE_OPTIONS.map((role) => {
            const isActive = selectedRole === role;
            return (
              <button
                key={role}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedRole(role)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${isActive ? "border-cyan-300/70 bg-cyan-300/15 text-cyan-100 shadow-lg shadow-cyan-950/20" : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-100"}`}
              >
                {getReviewRoleLabel(role, locale)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        {selectedTools.length ? (
          <div className="grid gap-3 lg:grid-cols-3">
            {selectedTools.map((item, index) => {
              const displayTool = localizeToolContent(item.tool, locale);
              return (
                <Link
                  key={`${item.role}-${item.tool.slug}`}
                  href={`/tools/${item.tool.slug}`}
                  className="group flex h-full gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.06]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-lg font-black text-cyan-100">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="truncate text-lg font-black text-white group-hover:text-cyan-100">
                        {item.tool.tool_name}
                      </h3>
                      <span className="shrink-0 rounded-full bg-amber-300/10 px-2 py-1 text-xs font-black text-amber-200">
                        {item.average_rating.toFixed(1)} ★
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-zinc-500">
                      {t.rolePopular.reviewCount(item.review_count)}
                    </p>
                    {displayTool.short_description ? (
                      <p className="mt-2 line-clamp-1 text-sm leading-6 text-zinc-400">
                        {displayTool.short_description}
                      </p>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.025] p-6 text-center text-sm font-semibold text-zinc-500">
            {t.rolePopular.empty}
          </div>
        )}
      </div>
    </section>
  );
}

export function ToolExplorer({
  tools,
  rolePopularTools,
  title,
  description,
  category,
  subCategory,
}: ToolExplorerProps) {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("views");
  const [filters, setFilters] = useState<string[]>([]);
  const filtered = useMemo(
    () =>
      sortTools(
        tools.filter(
          (tool) =>
            matchesCategoryPath(tool, category, subCategory) &&
            matchesTool(tool, query, filters),
        ),
        sort,
      ),
    [tools, category, subCategory, query, filters, sort],
  );
  const toggle = (filter: string) =>
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter],
    );

  return (
    <section className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <HeaderActions />
        <div className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <MascotImage
            type="planner"
            size="md"
            className="pointer-events-none absolute right-5 top-5 size-7 opacity-80 sm:right-7 sm:top-7 sm:size-8"
          />
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between xl:flex-1">
              <div>
                <p className="text-sm font-semibold text-cyan-200">
                  {t.hero.eyebrow}
                </p>
                <h1 className="mt-3 max-w-3xl whitespace-pre-line text-balance text-3xl font-black tracking-tight sm:text-5xl sm:leading-tight">
                  {locale === "ko" && title ? title : t.hero.title}
                </h1>
                <p className="mt-3 max-w-2xl text-zinc-400">
                  {locale === "ko" && description
                    ? description
                    : t.hero.description}
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:min-w-[560px]">
              <div className="flex flex-col gap-3 sm:flex-row">
                <SearchBar value={query} onChange={setQuery} />
                <SortDropdown value={sort} onChange={setSort} />
              </div>
              <FilterChips selected={filters} onToggle={toggle} />
            </div>
          </div>
        </div>
        {rolePopularTools ? (
          <RolePopularSection rolePopularTools={rolePopularTools} />
        ) : null}
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
          <span>{t.list.count(filtered.length)}</span>
          <span>{t.list.compare}</span>
        </div>
        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
