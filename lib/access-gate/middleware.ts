// Edge-runtime middleware factory. Verifies the HMAC cookie on every request
// and redirects unauthenticated visitors to /gate. Public-by-default paths
// (configurable) are allowed through unconditionally.

import { NextResponse, type NextRequest } from "next/server";
import { verifyCookie } from "./cookie";

export const COOKIE_NAME = "syntarie_gate";

export type GateOptions = {
  /** Path of the gate page (default: "/gate"). Always public. */
  gatePath?: string;
  /** Path prefix(es) that should never be gated. Static assets etc.
   *  Always includes "/_next/static", "/_next/image", "/favicon.ico", the gate
   *  itself, and "/api/access". */
  publicPrefixes?: string[];
  /** Cookie name override. Default: "syntarie_gate". */
  cookieName?: string;
};

export function createGateMiddleware(secret: string, opts: GateOptions = {}) {
  const gatePath = opts.gatePath ?? "/gate";
  const cookieName = opts.cookieName ?? COOKIE_NAME;
  const baseAllow = [
    gatePath,
    "/api/access",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];
  const allow = [...baseAllow, ...(opts.publicPrefixes ?? [])];

  return async function gateMiddleware(req: NextRequest): Promise<NextResponse> {
    const { pathname, search } = req.nextUrl;

    // Public paths are always allowed.
    if (allow.some((p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p))) {
      return NextResponse.next();
    }

    // Verify cookie.
    const cookie = req.cookies.get(cookieName)?.value;
    const result = await verifyCookie(cookie, secret);
    if (result) return NextResponse.next();

    // Redirect to gate, preserving the destination so we can hop back after auth.
    const url = req.nextUrl.clone();
    url.pathname = gatePath;
    url.search = "";
    const dest = pathname + (search || "");
    if (dest && dest !== "/") url.searchParams.set("from", dest);
    return NextResponse.redirect(url);
  };
}
