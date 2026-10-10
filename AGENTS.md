# AGENTS.md — HUSTERead

华科读书会展示平台。Next.js 16 (App Router + Turbopack) + React 19 + Tailwind v4 + TypeScript。
数据库是 Supabase (PostgreSQL)，通过 `@supabase/supabase-js` 走 PostgREST 访问（**不使用 Prisma**，README 里的 Prisma/Auth.js 描述已过期）。

## 常用命令

| 命令 | 说明 |
|---|---|
| `npm run dev` | 开发服务器，端口 **7762** |
| `npm run build` / `npm start` | 生产构建 / 启动（同为 7762） |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright E2E |

## 本地数据库（Docker / Supabase CLI）

本地开发用 Supabase CLI 起容器栈，不依赖云端。

```bash
supabase start        # 首次拉镜像较慢；启动后自动应用 migrations + seed
supabase status       # 查看 URL 与密钥
supabase db reset     # 重建库：重放所有 migrations + seed
supabase stop         # 停止
```

- 需要 Docker Desktop 已启动（`docker info` 能返回 ServerVersion）。
- 端口：API `54321`、DB `54322`、Studio `54323`、Mailpit `54324`。
- `supabase/migrations/` 是表结构唯一事实来源；`supabase/seed.sql` 是本地种子数据。
- `.env.local` 里 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` /
  `SUPABASE_SERVICE_ROLE_KEY` 指向本地。**Next.js 只在启动时读 env，改完必须重启 dev server。**
- 密钥用新格式（`sb_publishable_*` / `sb_secret_*`）。旧的 `eyJ...` legacy key 已被 Supabase
  于 2026-05-11 全局禁用，不要再写回 legacy 格式。

## 数据库约定

- 所有表前缀 `hr_`：本项目与同一 Supabase 项目（AIMFllys_share，ID `rithloxzperfgiqyquch`）
  下其他项目共享同一个库，靠前缀隔离。
- 枚举：`hr_role`、`hr_content_status`、`hr_article_category`、`hr_activity_status`、
  `hr_report_target`、`hr_report_status`。
- 认证是自研的邮件验证码（阿里云 SMTP）+ `hr_sessions` 表，**不使用 Supabase Auth**。
  管理后台另有一套独立 HMAC 会话（`src/lib/admin-session.ts`），与 Supabase 密钥无关。
- 服务端一律用 `createServiceClient()`（service_role，绕过 RLS）；只有公开读接口用
  `supabasePublic`（anon）。**新增公开读接口时必须同时给表 GRANT select 并加 RLS policy**，
  否则 anon 会拿到 401（本地 CLI 默认不自动暴露新建实体）。

## 已知注意点

- `src/app/api/*` 的 catch 块会把数据库错误统一吞成 `500 INTERNAL_ERROR`，排查时先看
  服务端日志里的 `console.error` 前缀（如 `[articles]`），别只看浏览器响应。
- `docs/plan/` 被 `.gitignore` 排除（内部规划文档），但里面有权威的表结构定义
  （`docs/plan/archive/architecture/architecture-report.md`）。
- 前端页面（articles / activities / forum）都有本地兜底数据，API 失败时页面**不会空白**，
  只是显示兜底内容 —— 所以「页面看着正常」不代表数据库通了，要直接查 API 状态码。
