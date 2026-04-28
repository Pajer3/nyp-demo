import { createGateMiddleware } from "@/lib/access-gate/middleware";

const SECRET = process.env.ACCESS_SECRET;
if (!SECRET) {
  // Log loudly during build/dev. We still build so missing env doesn't break local dev.
  // In production the middleware will fail-closed (reject everyone) when the secret is empty.
  console.warn("[access-gate] ACCESS_SECRET env var is missing — gate will reject all requests until set.");
}

const gate = createGateMiddleware(SECRET ?? "MISSING_SECRET_DO_NOT_USE", {
  gatePath: "/gate",
  publicPrefixes: [
    // Allow brand assets so the gate page itself can show the logo.
    "/assets/brand",
  ],
});

export default gate;

export const config = {
  // Match everything except Next internals so prerendered pages also go through the gate.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image).*)"],
};
