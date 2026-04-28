// Node runtime — uses node:crypto timingSafeEqual for constant-time compare.
import { timingSafeEqual } from "node:crypto";

export function verifyCode(input: string, expected: string): boolean {
  if (typeof input !== "string" || typeof expected !== "string") return false;
  if (input.length === 0 || expected.length === 0) return false;
  // Pad both to the same length to also avoid early-exit before timingSafeEqual.
  const max = Math.max(input.length, expected.length, 64);
  const a = Buffer.alloc(max, 0);
  const b = Buffer.alloc(max, 0);
  a.write(input);
  b.write(expected);
  // length must match for timingSafeEqual; we guarantee that with the buffers above.
  let equal = timingSafeEqual(a, b);
  // Plus the actual length must match — otherwise short input that prefix-matches passes.
  if (input.length !== expected.length) equal = false;
  return equal;
}
