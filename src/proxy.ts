import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

// Each protected area has its OWN login door so the two sides never mix: clients land on
// /login, agency staff on /admin/login.
const GUARDS = [
  { prefix: "/admin", login: "/admin/login" },
  { prefix: "/dashboard", login: "/login" },
];

// Next.js 16 renamed the middleware.ts file convention to proxy.ts (same default-export
// function + config.matcher shape) — this file must live at src/proxy.ts, not the project
// root, since this project uses --src-dir.
//
// Wrapped as `auth((req) => ...)` rather than the bare `export { auth as middleware }`
// re-export — on this Next.js/next-auth beta combo, the bare form hit an `instanceof
// Request` realm mismatch inside next-auth's edge dispatcher during testing, so the
// auth-gating branch never ran. Passing an explicit handler function forces next-auth's
// more robust "wrapper" call path instead.
export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;

  // The login pages themselves must stay reachable while logged out.
  if (pathname === "/admin/login" || pathname === "/login") {
    return NextResponse.next();
  }

  const guard = GUARDS.find((g) => pathname.startsWith(g.prefix));

  if (guard && !isLoggedIn) {
    const loginUrl = new URL(guard.login, req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
