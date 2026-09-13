/**
 * Best-effort in-memory rate limit.
 *
 * Enough to stop a single client hammering the form. It is per-instance, so on
 * a serverless platform it does not span regions or cold starts — put a real
 * limiter in front of the route if abuse ever becomes a problem.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 6;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [entryKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entryKey);
    }
  }

  return { allowed: true, retryAfter: 0 };
}
