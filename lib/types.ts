export type SortKey = "popular" | "updated" | "rating" | "comments" | "recent";

export type Tool = {
  tool_id: string;
  slug: string;
  tool_name: string;
  category: string;
  sub_category: string;
  category_paths: string[];
  tags: string[];
  use_tags: string[];
  short_description: string;
  editor_quote?: string;
  full_description: string;
  recommended_use_cases: string[];
  recommended_users: string[];
  pricing: "무료" | "부분 유료" | "유료" | string;
  difficulty: string;
  korean_support: boolean;
  official_url: string;
  logo_url?: string;
  image_url?: string;
  youtube_url?: string;
  youtube_summary: string[];
  usage_steps: string[];
  rating_average: number;
  rating_count: number;
  comment_count: number;
  popularity_score?: number;
  last_update_date: string;
  created_at: string;
  is_featured: boolean;
  main_features: string[];
  pros: string[];
  cons: string[];
  strengths: string[];
  cautions: string[];
  alternatives: string[];
};

export type ToolUpdate = {
  update_id: string;
  tool_id: string;
  update_date: string;
  update_title: string;
  update_summary: string;
  work_impact: string;
  recommended_users: string;
  source_url: string;
  created_at: string;
};

export type Review = {
  review_id: string;
  tool_id: string;
  user_role: string;
  rating_total: number;
  rating_work_usefulness: number;
  rating_output_quality: number;
  rating_difficulty: number;
  rating_price: number;
  rating_korean_support: number;
  comment: string;
  helpful_count: number;
  approved: boolean;
  created_at: string;
  isExample?: boolean;
};
