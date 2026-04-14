import { createClient } from "@supabase/supabase-js";

/**
 * Supabase 服务端客户端（使用 service_role key）
 * 仅在 Server Components / API Routes / Server Actions 中使用
 * 可以绕过 RLS，拥有完整数据库权限
 */
export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing SUPABASE env variables for service client");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

/**
 * Supabase 公开客户端（使用 anon key）
 * 受 RLS 策略约束，适合公开读取场景
 */
export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Missing SUPABASE env variables for public client");
  }

  return createClient(supabaseUrl, anonKey);
}

/**
 * 公开客户端单例（使用 anon key，受 RLS 约束）
 */
export const supabasePublic = createPublicClient();

/**
 * 服务端客户端（懒加载，避免仅使用 public 时因缺少 service key 崩溃）
 */
let _serviceClient: ReturnType<typeof createClient> | null = null;
export function getServiceClient() {
  if (!_serviceClient) _serviceClient = createServiceClient();
  return _serviceClient;
}
