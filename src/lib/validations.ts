import { z } from "zod";

// === Auth Schemas ===

export const sendCodeSchema = z.object({
  email: z
    .string()
    .email("请输入有效的邮箱地址")
    .max(255)
    .transform((e) => e.toLowerCase().trim()),
});

export const verifyCodeSchema = z.object({
  email: z
    .string()
    .email()
    .transform((e) => e.toLowerCase().trim()),
  code: z
    .string()
    .length(6, "验证码为 6 位数字")
    .regex(/^\d{6}$/, "验证码必须为数字"),
});

// === Article Schemas ===

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(2, "标题至少 2 个字")
    .max(100, "标题最多 100 个字"),
  content: z
    .string()
    .min(10, "正文至少 10 个字")
    .max(50000, "正文最多 50000 个字"),
  summary: z.string().max(500, "摘要最多 500 个字").optional(),
  category: z.enum([
    "BOOK_REVIEW",
    "READING_NOTE",
    "DAILY_SHARE",
    "SUNLIGHT",
    "OTHER",
  ]),
  cover_image: z.string().url().optional(),
});

// === Forum Post Schemas ===

export const createPostSchema = z.object({
  title: z
    .string()
    .min(2, "标题至少 2 个字")
    .max(100, "标题最多 100 个字"),
  content: z
    .string()
    .min(1, "请输入内容")
    .max(10000, "内容最多 10000 个字"),
});

// === Comment Schema ===

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "请输入评论内容")
    .max(2000, "评论最多 2000 个字"),
  article_id: z.string().optional(),
  post_id: z.string().optional(),
  parent_id: z.string().optional(),
});

// === User Profile Schema ===

export const updateProfileSchema = z.object({
  nickname: z
    .string()
    .min(1, "昵称不能为空")
    .max(20, "昵称最多 20 个字")
    .optional(),
  name: z.string().max(20, "姓名最多 20 个字").optional(),
  avatar: z.string().url().optional(),
});

// === Pagination Schema ===
// `URLSearchParams.get` returns null when omitted; `z.coerce.number()` maps null/""/"   "→0 → fails `.min(1)`.
// Zod `.default()` only applies to `undefined`, so normalize null/blank strings (after trim) to `undefined`.
const omitEmptyQueryParam = (v: unknown) => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === "string") {
    const t = v.trim();
    return t === "" ? undefined : t;
  }
  return v;
};

export const paginationSchema = z.object({
  page: z.preprocess(
    omitEmptyQueryParam,
    z.coerce.number().int().min(1).default(1),
  ),
  limit: z.preprocess(
    omitEmptyQueryParam,
    z.coerce.number().int().min(1).max(50).default(20),
  ),
});

// === Report Schema ===

export const createReportSchema = z.object({
  reason: z
    .string()
    .min(5, "举报原因至少 5 个字")
    .max(500, "举报原因最多 500 个字"),
  target_type: z.enum(["ARTICLE", "POST", "COMMENT"]),
  target_id: z.string().min(1),
});
