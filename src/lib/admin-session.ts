import { createHmac, timingSafeEqual } from "node:crypto";
import { createServiceClient } from "./supabase";
import type { Role } from "@/types";

const ADMIN_COOKIE = "hr_admin_session";
const ADMIN_ROLE: Role = "ADMIN";
const DEFAULT_SESSION_MAX_AGE = 60 * 60 * 8;

type SessionPayload = {
  role: Role;
  exp: number;
};

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "";
}

function getSessionMaxAge() {
  const raw = Number(process.env.ADMIN_SESSION_MAX_AGE_SECONDS);
  if (!Number.isFinite(raw) || raw <= 0) return DEFAULT_SESSION_MAX_AGE;
  return Math.floor(raw);
}

function sign(payloadBase64: string, secret: string) {
  return createHmac("sha256", secret).update(payloadBase64).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function logAdminAuthEvent(params: {
  action: "ADMIN_LOGIN_SUCCESS" | "ADMIN_LOGIN_FAILURE" | "ADMIN_LOGOUT" | "ADMIN_ACCESS_DENIED";
  ip: string;
  detail: string;
}) {
  try {
    const supabase = createServiceClient();
    await supabase.from("hr_audit_logs").insert({
      action: params.action,
      ip: params.ip,
      details: params.detail,
    });
  } catch {
  }
}

export function verifyAdminPassword(inputPassword: string) {
  const configured = getAdminPassword();
  if (!configured || !inputPassword) return false;
  return safeEqual(inputPassword, configured);
}

export function createAdminSessionToken() {
  const secret = getSessionSecret();
  if (!secret) return null;

  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    role: ADMIN_ROLE,
    exp: now + getSessionMaxAge(),
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(payloadBase64, secret);
  return `${payloadBase64}.${signature}`;
}

export function readAdminSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const secret = getSessionSecret();
  if (!secret) return null;

  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return null;
  const expected = sign(payloadBase64, secret);
  if (!safeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8")) as SessionPayload;
    if (payload.role !== ADMIN_ROLE) return null;
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAdminCookieName() {
  return ADMIN_COOKIE;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: getSessionMaxAge(),
    path: "/",
  };
}
