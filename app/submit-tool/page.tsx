"use client";

import { HeaderActions } from "@/components/HeaderActions";
import { Sidebar } from "@/components/Sidebar";
import { ToolSubmissionForm } from "@/components/ToolSubmissionForm";
import { useLanguage } from "@/lib/i18n";

export default function SubmitToolPage() {
  const { t } = useLanguage();
  const copy = t.submitTool;

  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <HeaderActions />
          <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.035] to-cyan-300/[0.06] p-6 sm:p-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">POPKIT Community</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{copy.title}</h1>
              <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">{copy.description}</p>
              <p className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-300/10 px-4 py-3 text-sm leading-6 text-cyan-50">{copy.reviewNotice}</p>
            </div>
            <div className="mt-8">
              <ToolSubmissionForm />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
