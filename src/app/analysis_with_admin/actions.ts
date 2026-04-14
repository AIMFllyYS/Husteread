"use server";

import { headers, cookies } from "next/headers";
import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminCookieOptions,
  logAdminAuthEvent,
  verifyAdminPassword as verifyPasswordSecurely,
} from "@/lib/admin-session";

// In-memory rate limiting map for basic protection against brute force dictionary attacks.
// Persists linearly across state since this relies on Node.js lifecycle or Next.js standalone process.
const bruteForceMap = new Map<string, { count: number, lockUntil: number, lastAttempt: number }>();

export async function verifyAdminPassword(password: string) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown-ip";
  const now = Date.now();
  
  const record = bruteForceMap.get(ip) || { count: 0, lockUntil: 0, lastAttempt: 0 };

  // 1. IP instantaneous access protection: Throttling request to at most 1 per 2 seconds.
  if (now - record.lastAttempt < 2000) {
    await logAdminAuthEvent({
      action: "ADMIN_LOGIN_FAILURE",
      ip,
      detail: "频率限制触发",
    });
    return { success: false, error: "系统检测到并发探测，请求过于频繁，请稍候再试。" };
  }
  record.lastAttempt = now;

  // 2. Lockout period check
  if (now < record.lockUntil) {
    const remainingMin = Math.ceil((record.lockUntil - now) / 60000);
    await logAdminAuthEvent({
      action: "ADMIN_LOGIN_FAILURE",
      ip,
      detail: `锁定中，剩余 ${remainingMin} 分钟`,
    });
    return { success: false, error: `保护机制强制执行中，非法扫描已封停。请等待 ${remainingMin} 分钟解锁。` };
  }

  if (verifyPasswordSecurely(password)) {
    bruteForceMap.delete(ip);

    const token = createAdminSessionToken();
    if (!token) {
      await logAdminAuthEvent({
        action: "ADMIN_LOGIN_FAILURE",
        ip,
        detail: "缺少 ADMIN_SESSION_SECRET",
      });
      return { success: false, error: "管理员登录未完成配置，请联系维护者。" };
    }

    (await cookies()).set(getAdminCookieName(), token, getAdminCookieOptions());
    await logAdminAuthEvent({
      action: "ADMIN_LOGIN_SUCCESS",
      ip,
      detail: "管理员登录成功",
    });

    return { success: true };
  } else {
    record.count += 1;
    if (record.count >= 5) {
      record.lockUntil = now + 15 * 60 * 1000;
      record.count = 0;
      bruteForceMap.set(ip, record);
      await logAdminAuthEvent({
        action: "ADMIN_LOGIN_FAILURE",
        ip,
        detail: "密码错误达到阈值，锁定 15 分钟",
      });
      return { success: false, error: "⚠️ 密码错误尝试已达 5 次阈值，系统触发阻断，本 IP 地址已被限制访问 15 分钟。" };
    }
    
    bruteForceMap.set(ip, record);
    await logAdminAuthEvent({
      action: "ADMIN_LOGIN_FAILURE",
      ip,
      detail: `密码错误，剩余尝试 ${5 - record.count} 次`,
    });
    return { success: false, error: `凭证未通过核查。您还可以尝试 ${5 - record.count} 次。` };
  }
}

export async function logoutAdmin() {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown-ip";
  (await cookies()).delete(getAdminCookieName());
  await logAdminAuthEvent({
    action: "ADMIN_LOGOUT",
    ip,
    detail: "管理员登出",
  });
}
