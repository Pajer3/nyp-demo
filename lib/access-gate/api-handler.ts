// Node-runtime POST handler for /api/access. Compose with your route file:
//
//   import { createAccessHandler } from "@/lib/access-gate/api-handler";
//   export const runtime = "nodejs";
//   export const POST = createAccessHandler();

import { NextResponse, type NextRequest } from "next/server";
import { signCookie, randomVisitorId } from "./cookie";
import { rateLimit, clearRateLimit } from "./rate-limit";
import { verifyCode } from "./verify-code";
import { sendVisitNotification } from "./email";
import { COOKIE_NAME } from "./middleware";

const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export type AccessHandlerOptions = {
  cookieName?: string;
  cookieTtlSeconds?: number;
  cookieDomain?: string;
};

export function createAccessHandler(opts: AccessHandlerOptions = {}) {
  const cookieName = opts.cookieName ?? COOKIE_NAME;
  const ttl = opts.cookieTtlSeconds ?? COOKIE_TTL_SECONDS;

  return async function POST(req: NextRequest): Promise<NextResponse> {
    const expectedCode = process.env.ACCESS_CODE;
    const secret = process.env.ACCESS_SECRET;
    if (!expectedCode || !secret) {
      return NextResponse.json(
        { ok: false, error: "Server niet geconfigureerd." },
        { status: 500 },
      );
    }

    const ip = getIp(req);
    const rl = rateLimit(`gate:${ip}`, MAX_ATTEMPTS, ATTEMPT_WINDOW_MS);
    if (!rl.ok) {
      const retry = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000));
      return NextResponse.json(
        { ok: false, error: "Te veel pogingen. Probeer over enkele minuten opnieuw." },
        { status: 429, headers: { "Retry-After": String(retry) } },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Ongeldig verzoek." }, { status: 400 });
    }
    const code = (body as { code?: unknown })?.code;
    if (typeof code !== "string" || code.length === 0 || code.length > 64) {
      return NextResponse.json({ ok: false, error: "Code ongeldig." }, { status: 400 });
    }

    if (!verifyCode(code, expectedCode)) {
      // Slow brute-force; wrong-code response time stays comparable to right-code.
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json({ ok: false, error: "Code klopt niet." }, { status: 401 });
    }

    // Code matched.
    clearRateLimit(`gate:${ip}`);
    const visitorId = randomVisitorId();
    const cookieValue = await signCookie(visitorId, ttl, secret);

    // Fire-and-forget the notification — never let it block the response.
    sendVisitNotification({
      siteName: process.env.SITE_NAME ?? "demo",
      visitorIp: ip,
      userAgent: req.headers.get("user-agent") ?? "unknown",
      referer: req.headers.get("referer") ?? undefined,
      fromUrl: (body as { from?: string })?.from,
    }).catch((err) => {
      console.error("[access-gate] email failed:", err?.message ?? err);
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(cookieName, cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ttl,
      ...(opts.cookieDomain ? { domain: opts.cookieDomain } : {}),
    });
    return res;
  };
}

/** Optional logout handler — clears the cookie. */
export function createLogoutHandler(opts: AccessHandlerOptions = {}) {
  const cookieName = opts.cookieName ?? COOKIE_NAME;
  return async function POST(): Promise<NextResponse> {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(cookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  };
}
