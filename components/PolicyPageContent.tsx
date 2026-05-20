"use client";

import { HeaderActions } from "@/components/HeaderActions";
import { Sidebar } from "@/components/Sidebar";
import { useLanguage } from "@/lib/i18n";

type PolicyKind = "privacy" | "terms";

type PolicyPageContentProps = {
  kind: PolicyKind;
};

export function PolicyPageContent({ kind }: PolicyPageContentProps) {
  const { t } = useLanguage();
  const copy = kind === "privacy" ? t.privacy : t.terms;

  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <HeaderActions />
          <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.035] to-cyan-300/[0.06] p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">POPKIT Policy</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{copy.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">{copy.description}</p>
          </section>

          <section className="mt-6 space-y-4 sm:mt-8">
            {copy.sections.map((section) => (
              <article key={section.title} className="rounded-[1.75rem] border border-white/10 bg-zinc-950/45 p-5 shadow-2xl shadow-black/10 sm:p-6">
                <h2 className="text-xl font-black text-white">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
                  {section.blocks.map((block) => {
                    const label = "label" in block ? block.label : undefined;

                    return (
                      <div key={label ?? block.items.join("|")}>
                        {label ? <p className="font-bold text-cyan-100">{label}</p> : null}
                        <ul className="mt-2 space-y-2">
                          {block.items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-3 size-1.5 shrink-0 rounded-full bg-cyan-200/80" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
