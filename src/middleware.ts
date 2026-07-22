import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function authSecret() {
  return (
    process.env.AUTH_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    ""
  );
}

async function readSessionToken(request: NextRequest) {
  const secret = authSecret();
  if (!secret) return null;

  // Production HTTPS uses __Secure-authjs.session-token
  const secure = await getToken({
    req: request,
    secret,
    secureCookie: true,
  });
  if (secure?.id || secure?.sub) return secure;

  // Dev / non-secure fallback
  return getToken({
    req: request,
    secret,
    secureCookie: false,
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Origin check for mutating admin APIs (CSRF mitigation)
  if (
    pathname.startsWith("/api/admin") &&
    request.method !== "GET" &&
    request.method !== "HEAD" &&
    request.method !== "OPTIONS"
  ) {
    // Public auth endpoints
    if (
      pathname === "/api/admin/login" ||
      pathname === "/api/admin/password-reset" ||
      pathname === "/api/admin/logout"
    ) {
      return NextResponse.next();
    }

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
      }
    }
  }

  // Protect only /admin/* panel routes — NOT /adminha (login)
  const isAdminPanel =
    pathname === "/admin" || pathname.startsWith("/admin/");
  if (!isAdminPanel) {
    return NextResponse.next();
  }

  const token = await readSessionToken(request);
  const userId = (token?.id || token?.sub) as string | undefined;
  if (!userId) {
    const url = request.nextUrl.clone();
    url.pathname = "/adminha";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
