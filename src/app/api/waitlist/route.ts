import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail, isWaitlistConfigured, storeSubmission } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FIELD = 500;

const clean = (value: unknown): string =>
  typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "Too many attempts. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see. Answer as if
  // the signup worked so bots gain no signal from the response.
  if (clean(payload.company).length > 0) {
    return NextResponse.json({ ok: true, code: "stored" });
  }

  const email = clean(payload.email).toLowerCase();
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, code: "invalid_email", message: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  if (!isWaitlistConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message: "The waitlist isn't connected yet.",
      },
      { status: 503 },
    );
  }

  const result = await storeSubmission({
    email,
    name: clean(payload.name),
    role: clean(payload.role),
    building: clean(payload.building),
    lookingFor: clean(payload.lookingFor),
    referrer: request.headers.get("referer") ?? undefined,
    locale: request.headers.get("accept-language")?.split(",")[0] ?? undefined,
  });

  switch (result.status) {
    case "stored":
      return NextResponse.json({ ok: true, code: "stored" });
    case "duplicate":
      return NextResponse.json({ ok: true, code: "duplicate" });
    case "not_configured":
      return NextResponse.json(
        { ok: false, code: "not_configured", message: "The waitlist isn't connected yet." },
        { status: 503 },
      );
    default:
      return NextResponse.json(
        { ok: false, code: "error", message: "Something went wrong on our side. Try again." },
        { status: 502 },
      );
  }
}
