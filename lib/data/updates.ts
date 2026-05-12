import { fetchSheetRows } from "@/lib/googleSheets";
import { seedUpdates } from "@/lib/data/seed";
import type { ToolUpdate } from "@/lib/types";

export async function getUpdates(): Promise<ToolUpdate[]> {
  const rows = await fetchSheetRows("Updates");
  const sheet = rows.map((row, index) => ({
    update_id: row.update_id || `sheet_update_${index + 1}`,
    tool_id: row.tool_id || "",
    update_date: row.update_date || "",
    update_title: row.update_title || "공식 업데이트 출처 확인 필요",
    update_summary: row.update_summary || "공식 출처 확인 필요",
    work_impact: row.work_impact || "운영자가 공식 문서를 확인한 뒤 반영해야 합니다.",
    recommended_users: row.recommended_users || "전체 사용자",
    source_url: row.source_url || "",
    created_at: row.created_at || row.update_date || ""
  })).filter((u) => u.tool_id);
  return [...sheet, ...seedUpdates].sort((a, b) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime());
}

export async function getUpdatesByToolId(toolId: string) {
  return (await getUpdates()).filter((update) => update.tool_id === toolId);
}
