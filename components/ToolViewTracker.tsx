"use client";

import { useEffect } from "react";
import type { Tool } from "@/lib/types";

export function ToolViewTracker({ tool }: { tool: Pick<Tool, "tool_id" | "slug" | "tool_name"> }) {
  useEffect(() => {
    const storageKey = `popkit_viewed_${tool.slug}`;

    try {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");
    } catch (error) {
      console.warn("조회 중복 방지 상태를 저장하지 못했습니다.", error);
    }

    fetch("/api/views", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tool_id: tool.tool_id, tool_slug: tool.slug, tool_name: tool.tool_name })
    }).then((response) => {
      if (!response.ok) console.warn("조회 기록 저장에 실패했습니다.");
    }).catch((error) => {
      console.warn("조회 기록 요청 중 오류가 발생했습니다.", error);
    });
  }, [tool.slug, tool.tool_id, tool.tool_name]);

  return null;
}
