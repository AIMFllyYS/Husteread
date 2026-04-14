import { cookies } from "next/headers";
import { createServiceClient } from "./supabase";
import cryptoRandomString from "crypto-random-string";

const SESSION_COOKIE = "hr_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Generate a 6-digit verification code and store in hr_verification_tokens
 */
export async function createVerificationCode(email: string): Promise<string> {
  const supabase = createServiceClient();
  const code = cryptoRandomString({ length: 6, type: "numeric" });
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Remove old tokens for this email
  const { error: deleteError } = await supabase
    .from("hr_verification_tokens")
    .delete()
    .eq("identifier", email);

  if (deleteError) {
    console.error("[createVerificationCode] delete failed:", deleteError);
  }

  // Insert new
  const { error: insertError } = await supabase
    .from("hr_verification_tokens")
    .insert({
      identifier: email,
      token: code,
      expires: expires.toISOString(),
    });

  if (insertError) {
    console.error("[createVerificationCode] insert failed:", insertError);
    throw new Error(`Failed to store verification code: ${insertError.message}`);
  }

  return code;
}

/**
 * Verify a code and return true if valid
 */
export async function verifyCode(
  email: string,
  code: string
): Promise<boolean> {
  const supabase = createServiceClient();

  const { data } = await supabase
    .from("hr_verification_tokens")
    .select("*")
    .eq("identifier", email)
    .eq("token", code)
    .single();

  if (!data) return false;
  if (new Date(data.expires) < new Date()) {
    // Expired — clean up
    await supabase
      .from("hr_verification_tokens")
      .delete()
      .eq("identifier", email);
    return false;
  }

  // Valid — clean up token
  await supabase
    .from("hr_verification_tokens")
    .delete()
    .eq("identifier", email);

  return true;
}

/**
 * Find or create user by email, then create session
 */
export async function createSession(email: string): Promise<string> {
  const supabase = createServiceClient();

  // Upsert user
  let { data: user } = await supabase
    .from("hr_users")
    .select("id")
    .eq("email", email)
    .single();

  if (!user) {
    const nickname = email.split("@")[0];
    const { data: newUser } = await supabase
      .from("hr_users")
      .insert({
        email,
        nickname,
        role: "MEMBER",
        email_verified: new Date().toISOString(),
      })
      .select("id")
      .single();
    user = newUser;
  } else {
    // Update email_verified timestamp
    await supabase
      .from("hr_users")
      .update({ email_verified: new Date().toISOString() })
      .eq("id", user.id);
  }

  if (!user) throw new Error("Failed to create/find user");

  // Create session
  const sessionToken = cryptoRandomString({ length: 64, type: "url-safe" });
  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000);

  await supabase.from("hr_sessions").insert({
    session_token: sessionToken,
    user_id: user.id,
    expires: expires.toISOString(),
  });

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return user.id;
}

/**
 * Get current session user from cookie
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) return null;

  const supabase = createServiceClient();

  const { data: session } = await supabase
    .from("hr_sessions")
    .select("user_id, expires")
    .eq("session_token", sessionToken)
    .single();

  if (!session) return null;
  if (new Date(session.expires) < new Date()) {
    // Expired — clean up
    await supabase
      .from("hr_sessions")
      .delete()
      .eq("session_token", sessionToken);
    return null;
  }

  const { data: user } = await supabase
    .from("hr_users")
    .select("*")
    .eq("id", session.user_id)
    .single();

  return user;
}

/**
 * Destroy session (logout)
 */
export async function destroySession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionToken) {
    const supabase = createServiceClient();
    await supabase
      .from("hr_sessions")
      .delete()
      .eq("session_token", sessionToken);
  }

  cookieStore.delete(SESSION_COOKIE);
}
