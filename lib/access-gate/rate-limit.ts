// Per-IP token-bucket rate limit. In-memory only — fine for single-region demo
// deployments. For multi-region or serverless cold-start resilience, swap for
// Upstash/Redis. Returns true if the request is allowed.

type Bucket = { count: number; resetAt: number };

const STORE = new Map<string, Bucket>();
const MAX_KEYS = 5000;

function gc(now: number) {
  if (STORE.size < MAX_KEYS) return;
  for (const [k, v] of STORE) {
    if (v.resetAt <= now) STORE.delete(k);
  }
}

export function rateLimit(
  key: string,
  max: number,
  windowMs: number,
): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  gc(now);
  const cur = STORE.get(key);
  if (!cur || cur.resetAt <= now) {
    const resetAt = now + windowMs;
    STORE.set(key, { count: 1, resetAt });
    return { ok: true, remaining: max - 1, resetAt };
  }
  if (cur.count >= max) {
    return { ok: false, remaining: 0, resetAt: cur.resetAt };
  }
  cur.count += 1;
  return { ok: true, remaining: max - cur.count, resetAt: cur.resetAt };
}

/** Manually drop a key's bucket — call after a successful auth so a legit user
 *  doesn't burn through their attempts. */
export function clearRateLimit(key: string): void {
  STORE.delete(key);
}
