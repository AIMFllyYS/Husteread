import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Middleware — 安全 Headers + 路由保护
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // === Security Headers ===
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // === Protected Routes: check session cookie ===
  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const sessionCookie = request.cookies.get("hr_session");
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // === Admin routes: additional check via API (done in layout) ===

  // === Rate-limit headers hint (real rate limiting in proxy.ts or edge) ===
  if (pathname.startsWith("/api/auth/")) {
    response.headers.set("X-RateLimit-Policy", "auth");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image (static files)
     * - favicon.ico, public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
