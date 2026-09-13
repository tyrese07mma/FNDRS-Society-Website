/**
 * Waitlist storage.
 *
 * Two adapters, both driven purely by environment variables so the site can be
 * deployed before a backend exists and wired up later without a code change:
 *
 *   1. Supabase  — SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *                  (talks to PostgREST over fetch, so no client library is
 *                  needed and the service key never reaches the browser)
 *   2. Webhook   — WAITLIST_WEBHOOK_URL (Zapier, Make, n8n, a Slack hook, …)
 *
 * With neither configured the endpoint reports `not_configured` and the form
 * says so honestly rather than pretending a signup was stored.
 */

export type WaitlistSubmission = {
  email: string;
  name?: string;
  role?: string;
  building?: string;
  lookingFor?: string;
  referrer?: string;
  locale?: string;
};

export type WaitlistResult =
  | { status: "stored" }
  | { status: "duplicate" }
  | { status: "not_configured" }
  | { status: "error"; message: string };

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

/** The table the SQL migration in /supabase creates. */
const TABLE = process.env.WAITLIST_TABLE ?? "waitlist_signups";

export function isWaitlistConfigured(): boolean {
  return Boolean((supabaseUrl && supabaseKey) || webhookUrl);
}

export async function storeSubmission(submission: WaitlistSubmission): Promise<WaitlistResult> {
  if (supabaseUrl && supabaseKey) return storeInSupabase(submission);
  if (webhookUrl) return storeViaWebhook(submission);
  return { status: "not_configured" };
}

async function storeInSupabase(submission: WaitlistSubmission): Promise<WaitlistResult> {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${TABLE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey!,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: submission.email,
        name: submission.name || null,
        role: submission.role || null,
        building: submission.building || null,
        looking_for: submission.lookingFor || null,
        referrer: submission.referrer || null,
        locale: submission.locale || null,
        source: "website",
      }),
      cache: "no-store",
    });

    if (response.ok) return { status: "stored" };

    // 23505 is Postgres' unique-violation code — the address is already listed.
    if (response.status === 409) return { status: "duplicate" };

    const body = await response.text();
    if (body.includes("23505")) return { status: "duplicate" };

    console.error("[waitlist] Supabase rejected the signup", response.status, body);
    return { status: "error", message: "Storage rejected the signup." };
  } catch (error) {
    console.error("[waitlist] Supabase request failed", error);
    return { status: "error", message: "Storage is unreachable." };
  }
}

async function storeViaWebhook(submission: WaitlistSubmission): Promise<WaitlistResult> {
  try {
    const response = await fetch(webhookUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...submission, source: "website", receivedAt: new Date().toISOString() }),
      cache: "no-store",
    });

    if (response.ok) return { status: "stored" };

    console.error("[waitlist] Webhook rejected the signup", response.status);
    return { status: "error", message: "Storage rejected the signup." };
  } catch (error) {
    console.error("[waitlist] Webhook request failed", error);
    return { status: "error", message: "Storage is unreachable." };
  }
}

/** Deliberately permissive: rejects the obviously broken, never a real address. */
export function isValidEmail(value: string): boolean {
  if (value.length < 6 || value.length > 254) return false;
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value);
}
