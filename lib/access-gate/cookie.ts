// Edge-compatible HMAC-SHA-256 cookie signing using Web Crypto API.
// Format: <visitorId>.<expEpochSec>.<base64urlSig>
// All three pieces are URL-safe and stored as a single string in the cookie.

const TEXT = new TextEncoder();

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    TEXT.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, TEXT.encode(payload));
  return b64url(sig);
}

/** Constant-time string compare to avoid leaking length/content via timing. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signCookie(
  visitorId: string,
  ttlSeconds: number,
  secret: string,
): Promise<string> {
  if (!visitorId || /[^A-Za-z0-9_-]/.test(visitorId)) throw new Error("invalid visitorId");
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${visitorId}.${exp}`;
  const sig = await sign(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyCookie(
  token: string | undefined,
  secret: string,
): Promise<{ visitorId: string; exp: number } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [visitorId, expRaw, sig] = parts;
  if (!/^[A-Za-z0-9_-]+$/.test(visitorId)) return null;
  if (!/^\d+$/.test(expRaw)) return null;

  const expected = await sign(`${visitorId}.${expRaw}`, secret);
  if (!safeEqual(sig, expected)) return null;

  const exp = parseInt(expRaw, 10);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  return { visitorId, exp };
}

/** Cryptographically random visitor id, URL-safe base64. */
export function randomVisitorId(byteLen = 16): string {
  const bytes = new Uint8Array(byteLen);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
