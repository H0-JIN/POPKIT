import type { Review, Tool } from "@/lib/types";
import {
  isReviewRole,
  REVIEW_ROLE_OPTIONS,
  type ReviewRole,
} from "@/lib/reviewRoles";

export type RolePopularTool = {
  tool: Tool;
  role: ReviewRole;
  average_rating: number;
  review_count: number;
  score: number;
};

type RoleToolAccumulator = {
  tool: Tool;
  role: ReviewRole;
  ratingTotal: number;
  reviewCount: number;
};

function addToolToIndex(
  index: Map<string, Tool>,
  key: string | undefined,
  tool: Tool,
) {
  const normalizedKey = key?.trim();
  if (!normalizedKey || index.has(normalizedKey)) return;
  index.set(normalizedKey, tool);
}

function buildToolIndex(tools: Tool[]) {
  const index = new Map<string, Tool>();
  for (const tool of tools) {
    addToolToIndex(index, tool.tool_id, tool);
    addToolToIndex(index, tool.slug, tool);
  }
  return index;
}

function getReviewTool(review: Review, toolIndex: Map<string, Tool>) {
  for (const key of [review.tool_id, review.tool_slug]) {
    const normalizedKey = key?.trim();
    if (!normalizedKey) continue;
    const tool = toolIndex.get(normalizedKey);
    if (tool) return tool;
  }
  return null;
}

function compareRolePopularTools(a: RolePopularTool, b: RolePopularTool) {
  const scoreDiff = b.score - a.score;
  if (scoreDiff !== 0) return scoreDiff;

  const averageDiff = b.average_rating - a.average_rating;
  if (averageDiff !== 0) return averageDiff;

  const reviewCountDiff = b.review_count - a.review_count;
  if (reviewCountDiff !== 0) return reviewCountDiff;

  const viewCountDiff =
    (b.tool.total_view_count ?? 0) - (a.tool.total_view_count ?? 0);
  if (viewCountDiff !== 0) return viewCountDiff;

  return a.tool.tool_name.localeCompare(b.tool.tool_name, ["ko", "en"], {
    numeric: true,
  });
}

export function buildRolePopularTools(
  tools: Tool[],
  reviews: Review[],
  limit = 3,
): Record<ReviewRole, RolePopularTool[]> {
  const toolIndex = buildToolIndex(tools);
  const accumulators = new Map<string, RoleToolAccumulator>();

  for (const review of reviews) {
    if (
      !review.approved ||
      review.isExample ||
      !isReviewRole(review.user_role) ||
      review.rating_total <= 0
    )
      continue;

    const tool = getReviewTool(review, toolIndex);
    if (!tool) continue;

    const accumulatorKey = `${review.user_role}:${tool.tool_id || tool.slug}`;
    const accumulator = accumulators.get(accumulatorKey);
    if (accumulator) {
      accumulator.ratingTotal += review.rating_total;
      accumulator.reviewCount += 1;
      continue;
    }

    accumulators.set(accumulatorKey, {
      tool,
      role: review.user_role,
      ratingTotal: review.rating_total,
      reviewCount: 1,
    });
  }

  const byRole = REVIEW_ROLE_OPTIONS.reduce(
    (acc, role) => {
      acc[role] = [];
      return acc;
    },
    {} as Record<ReviewRole, RolePopularTool[]>,
  );

  for (const accumulator of accumulators.values()) {
    const averageRating = accumulator.ratingTotal / accumulator.reviewCount;
    byRole[accumulator.role].push({
      tool: accumulator.tool,
      role: accumulator.role,
      average_rating: averageRating,
      review_count: accumulator.reviewCount,
      score: averageRating * Math.log10(accumulator.reviewCount + 10),
    });
  }

  for (const role of REVIEW_ROLE_OPTIONS) {
    byRole[role] = byRole[role].sort(compareRolePopularTools).slice(0, limit);
  }

  return byRole;
}
