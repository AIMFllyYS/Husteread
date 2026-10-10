-- ═══════════════════════════════════════════════════════════════
-- HUSTERead 本地开发 schema（初始版本）
-- ═══════════════════════════════════════════════════════════════
-- 来源说明：
--   表/枚举定义取自 docs/plan/archive/architecture/architecture-report.md
--   （共享 Supabase 项目 AIMFllys_share，项目 ID rithloxzperfgiqyquch）
--   列名以 src/ 中的实际调用为准，与文档不一致处以代码为准：
--     · hr_activities 实际按 start_time 排序（文档写的是 date）
--     · hr_users.email_verified 实际写入 ISO 时间戳（非 boolean）
-- 表前缀 hr_：与同一共享库中其他项目隔离。
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── 枚举类型 ────────────────────────────────────────────────────
create type hr_role as enum ('VISITOR', 'MEMBER', 'ADMIN');
create type hr_content_status as enum ('PENDING', 'APPROVED', 'REJECTED', 'ARCHIVED');
create type hr_article_category as enum ('BOOK_REVIEW', 'READING_NOTE', 'DAILY_SHARE', 'SUNLIGHT', 'OTHER');
create type hr_activity_status as enum ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');
create type hr_report_target as enum ('ARTICLE', 'POST', 'COMMENT');
create type hr_report_status as enum ('PENDING', 'RESOLVED', 'DISMISSED');

-- ── 用户 ───────────────────────────────────────────────────────
create table hr_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  nickname text,
  avatar text,
  role hr_role not null default 'VISITOR',
  email_verified timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 文章 / 书评 ─────────────────────────────────────────────────
create table hr_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  summary text,
  cover_image text,
  category hr_article_category not null default 'OTHER',
  status hr_content_status not null default 'PENDING',
  view_count integer not null default 0,
  author_id uuid references hr_users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index hr_articles_status_created_idx on hr_articles (status, created_at desc);
create index hr_articles_author_idx on hr_articles (author_id);

-- ── 论坛帖子 ───────────────────────────────────────────────────
create table hr_forum_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  status hr_content_status not null default 'PENDING',
  likes integer not null default 0,
  author_id uuid references hr_users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index hr_forum_posts_status_created_idx on hr_forum_posts (status, created_at desc);

-- ── 评论（文章 + 帖子通用） ──────────────────────────────────────
create table hr_comments (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  author_id uuid references hr_users (id) on delete set null,
  article_id uuid references hr_articles (id) on delete cascade,
  post_id uuid references hr_forum_posts (id) on delete cascade,
  parent_id uuid references hr_comments (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint hr_comments_target_check check (num_nonnulls(article_id, post_id) <= 1)
);

create index hr_comments_article_idx on hr_comments (article_id);
create index hr_comments_post_idx on hr_comments (post_id);

-- ── 读书会活动 ─────────────────────────────────────────────────
create table hr_activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  start_time timestamptz not null default now(),
  end_time timestamptz,
  location text,
  cover_image text,
  max_people integer,
  feishu_url text,
  status hr_activity_status not null default 'UPCOMING',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index hr_activities_start_time_idx on hr_activities (start_time desc);
create index hr_activities_status_idx on hr_activities (status);

-- ── 活动报名 / 签到 ─────────────────────────────────────────────
create table hr_registrations (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references hr_activities (id) on delete cascade,
  user_id uuid references hr_users (id) on delete cascade,
  user_name text,
  attended boolean not null default false,
  created_at timestamptz not null default now(),
  unique (activity_id, user_id)
);

-- ── 照片墙 ─────────────────────────────────────────────────────
create table hr_gallery_images (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references hr_activities (id) on delete set null,
  image_url text not null,
  caption text,
  uploader_id uuid references hr_users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index hr_gallery_images_activity_idx on hr_gallery_images (activity_id);

-- ── 举报 ───────────────────────────────────────────────────────
create table hr_reports (
  id uuid primary key default gen_random_uuid(),
  reason text,
  target_type hr_report_target not null,
  target_id uuid not null,
  reporter_id uuid references hr_users (id) on delete set null,
  status hr_report_status not null default 'PENDING',
  created_at timestamptz not null default now()
);

-- ── 审计日志 ───────────────────────────────────────────────────
create table hr_audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  details text,
  user_id uuid references hr_users (id) on delete set null,
  ip text,
  created_at timestamptz not null default now()
);

create index hr_audit_logs_created_idx on hr_audit_logs (created_at desc);

-- ── 用户会话 ───────────────────────────────────────────────────
create table hr_sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text not null unique,
  user_id uuid not null references hr_users (id) on delete cascade,
  expires timestamptz not null,
  created_at timestamptz not null default now()
);

create index hr_sessions_user_idx on hr_sessions (user_id);

-- ── 邮件验证令牌 ───────────────────────────────────────────────
create table hr_verification_tokens (
  identifier text not null,
  token text not null unique,
  expires timestamptz not null,
  created_at timestamptz not null default now(),
  primary key (identifier, token)
);

-- ── updated_at 自动维护 ────────────────────────────────────────
create or replace function hr_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger hr_users_touch before update on hr_users
  for each row execute function hr_touch_updated_at();
create trigger hr_articles_touch before update on hr_articles
  for each row execute function hr_touch_updated_at();
create trigger hr_forum_posts_touch before update on hr_forum_posts
  for each row execute function hr_touch_updated_at();
create trigger hr_activities_touch before update on hr_activities
  for each row execute function hr_touch_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- 权限与 RLS
-- ═══════════════════════════════════════════════════════════════
-- 本地 CLI 默认不自动暴露新建实体（对齐云端新默认），故显式授权。

grant usage on schema public to anon, authenticated, service_role;

-- 公开只读表：与 /api/articles、/api/activities、/api/forum 使用 anon 客户端一致
grant select on hr_articles, hr_activities, hr_forum_posts, hr_comments, hr_gallery_images
  to anon, authenticated;

grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

alter table hr_users enable row level security;
alter table hr_articles enable row level security;
alter table hr_forum_posts enable row level security;
alter table hr_comments enable row level security;
alter table hr_activities enable row level security;
alter table hr_registrations enable row level security;
alter table hr_gallery_images enable row level security;
alter table hr_reports enable row level security;
alter table hr_audit_logs enable row level security;
alter table hr_sessions enable row level security;
alter table hr_verification_tokens enable row level security;

-- 公开只读：仅已审核通过的文章
create policy hr_articles_public_read on hr_articles
  for select to anon, authenticated
  using (status = 'APPROVED');

-- 公开只读：仅已审核通过的论坛帖子
create policy hr_forum_posts_public_read on hr_forum_posts
  for select to anon, authenticated
  using (status = 'APPROVED');

-- 公开只读：活动 / 评论 / 照片墙
create policy hr_activities_public_read on hr_activities
  for select to anon, authenticated using (true);

create policy hr_comments_public_read on hr_comments
  for select to anon, authenticated using (true);

create policy hr_gallery_images_public_read on hr_gallery_images
  for select to anon, authenticated using (true);

-- service_role 在 Supabase 中具备 BYPASSRLS，服务端读写无需额外策略。
