import { daysAgo } from "@/lib/utils";

export function UpdateBadge({ date }: { date: string }) {
  return <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-200">{daysAgo(date)}</span>;
}
