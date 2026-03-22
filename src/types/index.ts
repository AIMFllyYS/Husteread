/**
 * HUSTERead global type definitions
 * 与 Supabase hr_ 表结构对齐
 */

// === 枚举类型（对应 PostgreSQL hr_* 枚举） ===

export type Role = "VISITOR" | "MEMBER" | "ADMIN";
export type ContentStatus = "PENDING" | "APPROVED" | "REJECTED" | "ARCHIVED";
export type ArticleCategory = "BOOK_REVIEW" | "READING_NOTE" | "DAILY_SHARE" | "SUNLIGHT" | "OTHER";
export type ActivityStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type ReportTarget = "ARTICLE" | "POST" | "COMMENT";
export type ReportStatus = "PENDING" | "RESOLVED" | "DISMISSED";

// === 数据模型（对应 hr_ 表） ===

export interface HrUser {
  id: string;
  email: string;
  name: string | null;
  nickname: string;
  avatar: string | null;
  role: Role;
  email_verified: string | null;
  created_at: string;
  updated_at: string;
}

export interface HrArticle {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  cover_image: string | null;
  category: ArticleCategory;
  status: ContentStatus;
  view_count: number;
  author_id: string;
  created_at: string;
  updated_at: string;
  // 关联
  author?: HrUser;
}

export interface HrForumPost {
  id: string;
  title: string;
  content: string;
  status: ContentStatus;
  likes: number;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: HrUser;
}

export interface HrComment {
  id: string;
  content: string;
  author_id: string;
  article_id: string | null;
  post_id: string | null;
  parent_id: string | null;
  created_at: string;
  author?: HrUser;
}

export interface HrActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date: string | null;
  location: string;
  cover_image: string | null;
  max_people: number | null;
  feishu_url: string | null;
  status: ActivityStatus;
  created_at: string;
  updated_at: string;
}

export interface HrRegistration {
  id: string;
  activity_id: string;
  user_id: string | null;
  user_name: string;
  attended: boolean;
  created_at: string;
}

export interface HrGalleryImage {
  id: string;
  activity_id: string;
  image_url: string;
  caption: string | null;
  uploader_id: string | null;
  created_at: string;
}

// === API 响应类型 ===

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
