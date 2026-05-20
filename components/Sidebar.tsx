"use client";

import Image from "next/image";
import Link from "next/link";
import { NAVIGATION } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Sidebar({ activeCategory, activeSubCategory }: { activeCategory?: string; activeSubCategory?: string }) {
  const { t } = useLanguage();
  const labels = t.navigation.labels;
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-zinc-950/80 px-5 py-6 backdrop-blur lg:block">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <Image
          src="/brand/popkit-lollipop.png"
          alt="POPKIT lollipop symbol"
          width={40}
          height={40}
          className="size-10 shrink-0"
          style={{ imageRendering: "pixelated" }}
          priority
        />
        <span><strong className="block text-lg">POPKIT</strong><span className="text-xs text-zinc-500">{t.navigation.brandHelper}</span></span>
      </Link>
      <nav className="space-y-5">
        {NAVIGATION.map((item) => (
          <div key={item.label}>
            <Link href={item.href} className={cn("flex rounded-2xl px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white", activeCategory === item.label && "bg-white/10 text-white")}>{labels[item.label as keyof typeof labels]}</Link>
            {item.children.length > 0 && <div className="mt-2 space-y-1 pl-3">{item.children.map((child) => <Link key={child} href={`${item.href}?sub=${encodeURIComponent(child)}`} className={cn("block rounded-xl px-3 py-1.5 text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-200", activeCategory === item.label && activeSubCategory === child && "bg-white/10 text-zinc-200")}>{labels[child as keyof typeof labels]}</Link>)}</div>}
          </div>
        ))}
      </nav>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">{t.navigation.updateNote}</div>
    </aside>
  );
}
