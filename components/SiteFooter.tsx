"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const serviceLinks = [
  { href: "/", labelKey: "explore" },
  { href: "/business", labelKey: "business" },
  { href: "/submit-tool", labelKey: "submitTool" }
] as const;

const contactLinks = [
  { href: "mailto:kkcm1002@gmail.com?subject=POPKIT%20문의", labelKey: "partnership" },
  { href: "mailto:kkcm1002@gmail.com?subject=POPKIT%20일반%20문의", labelKey: "email" }
] as const;

const policyLinks = [
  { href: "/privacy", labelKey: "privacy" },
  { href: "/terms", labelKey: "terms" }
] as const;

export function SiteFooter() {
  const { t } = useLanguage();
  const footer = t.footer;

  return (
    <footer className="border-t border-white/10 bg-zinc-950/70 text-zinc-400 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:pl-80 lg:pr-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.9fr_.8fr]">
          <section className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 text-white">
              <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-black text-zinc-950">AI</span>
              <span className="text-lg font-black tracking-tight">POPKIT</span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{footer.description}</p>
          </section>

          <section>
            <h2 className="text-sm font-black text-zinc-100">{footer.service.title}</h2>
            <nav className="mt-3 flex flex-col gap-2 text-sm">
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition hover:text-cyan-100">
                  {footer.service.links[link.labelKey]}
                </Link>
              ))}
            </nav>
          </section>

          <section>
            <h2 className="text-sm font-black text-zinc-100">{footer.contact.title}</h2>
            <nav className="mt-3 flex flex-col gap-2 text-sm">
              {contactLinks.map((link) => (
                <a key={link.href} href={link.href} className="w-fit transition hover:text-cyan-100">
                  {footer.contact.links[link.labelKey]}
                </a>
              ))}
            </nav>
          </section>

          <section>
            <h2 className="text-sm font-black text-zinc-100">{footer.policy.title}</h2>
            <nav className="mt-3 flex flex-col gap-2 text-sm">
              {policyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition hover:text-cyan-100">
                  {footer.policy.links[link.labelKey]}
                </Link>
              ))}
            </nav>
          </section>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-zinc-500">{footer.copyright}</div>
      </div>
    </footer>
  );
}
