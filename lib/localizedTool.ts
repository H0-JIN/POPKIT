import type { LocalizedToolContent, Tool } from "@/lib/types";

export type ContentLocale = "ko" | "en";

function hasItems(value: string[] | undefined) {
  return Boolean(value?.length);
}

export function localizeToolContent(tool: Tool, locale: ContentLocale): Tool {
  const englishContent: LocalizedToolContent | undefined = locale === "en" ? tool.localized_content?.en : undefined;
  if (!englishContent) return tool;

  return {
    ...tool,
    editor_quote: englishContent.editor_quote || tool.editor_quote,
    short_description: englishContent.short_description || tool.short_description,
    full_description: englishContent.full_description || tool.full_description,
    recommended_use_cases: hasItems(englishContent.recommended_use_cases) ? englishContent.recommended_use_cases! : tool.recommended_use_cases,
    recommended_users: hasItems(englishContent.recommended_users) ? englishContent.recommended_users! : tool.recommended_users,
    strengths: hasItems(englishContent.strengths) ? englishContent.strengths! : tool.strengths,
    cautions: hasItems(englishContent.cautions) ? englishContent.cautions! : tool.cautions,
    usage_steps: hasItems(englishContent.usage_steps) ? englishContent.usage_steps! : tool.usage_steps,
    youtube_summary: hasItems(englishContent.youtube_summary) ? englishContent.youtube_summary! : tool.youtube_summary
  };
}
