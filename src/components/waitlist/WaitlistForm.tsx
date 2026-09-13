"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { contactEmail } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "duplicate" | "error" | "not_configured";

/*
 * Fields sit on the darkest surface with a stronger hairline so they stay
 * legible whether the form is placed on a card or straight onto the page.
 */
const fieldBase =
  "w-full border border-line-strong bg-ink text-[0.9375rem] text-cream shadow-[0_1px_2px_rgba(0,0,0,0.4)_inset] transition-colors duration-200 outline-none placeholder:text-faint hover:border-[color-mix(in_oklab,var(--color-gold)_35%,var(--color-line-strong))] focus-visible:border-gold/70";

const inputClass = `${fieldBase} h-[3.25rem] rounded-full px-5`;

const textareaClass = `${fieldBase} min-h-[5.5rem] rounded-[1.25rem] px-5 py-3.5 leading-relaxed`;

export function WaitlistForm({
  variant = "full",
  className,
}: {
  /** `compact` renders just the email row — used inside CTA bands. */
  variant?: "full" | "compact";
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const emailId = `${baseId}-email`;
  const errorId = `${baseId}-error`;

  const isDone = status === "success" || status === "duplicate";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          name: data.get("name"),
          role: data.get("role"),
          building: data.get("building"),
          lookingFor: data.get("lookingFor"),
          company: data.get("company"),
        }),
      });

      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
      };

      if (body.ok) {
        setStatus(body.code === "duplicate" ? "duplicate" : "success");
        form.reset();
        return;
      }

      if (body.code === "not_configured") {
        setStatus("not_configured");
        return;
      }

      setStatus("error");
      setMessage(body.message ?? "Something went wrong. Try again.");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  if (isDone) {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-card)] border border-gold/35 bg-[linear-gradient(150deg,rgba(187,156,99,0.14),rgba(19,19,23,0.9)_58%)] p-7 sm:p-8",
          className,
        )}
        role="status"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-tile)] border border-gold/30 bg-gold-deep text-gold-light">
          <Icon name="check" size={20} strokeWidth={2} />
        </span>
        <h3 className="mt-5 text-[1.5rem]">
          {status === "duplicate" ? "You're already in." : "You're in."}
        </h3>
        <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-cream/75">
          {status === "duplicate"
            ? "This address is already on the list — no need to sign up twice. We'll be in touch when your spot opens."
            : "We'll email you when your spot is ready. Access goes out in batches, so the network stays balanced across skills and regions."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <div className={cn("flex w-full flex-col gap-3", variant === "compact" && "sm:flex-row")}>
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            aria-invalid={status === "error" || undefined}
            aria-describedby={status === "error" ? errorId : undefined}
            className={inputClass}
          />
        </div>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor={`${baseId}-company`}>Company</label>
          <input id={`${baseId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className={cn(variant === "compact" ? "sm:w-auto" : "w-full sm:w-auto")}
        >
          {status === "submitting" ? "Sending…" : "Request access"}
        </Button>
      </div>

      {variant === "full" ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              setShowDetails((open) => !open);
              if (!showDetails) {
                requestAnimationFrame(() => detailsRef.current?.querySelector("input")?.focus());
              }
            }}
            aria-expanded={showDetails}
            aria-controls={`${baseId}-details`}
            className="inline-flex items-center gap-1.5 rounded-full text-[0.875rem] text-muted transition-colors hover:text-cream"
          >
            <Icon
              name="plus"
              size={14}
              className={cn("transition-transform duration-300", showDetails && "rotate-45")}
            />
            {showDetails ? "Hide extra details" : "Add a few details (optional)"}
          </button>

          <div
            id={`${baseId}-details`}
            ref={detailsRef}
            hidden={!showDetails}
            className="mt-5 grid gap-3 sm:grid-cols-2"
          >
            <div>
              <label htmlFor={`${baseId}-name`} className="sr-only">
                Name
              </label>
              <input
                id={`${baseId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-role`} className="sr-only">
                What you do
              </label>
              <input
                id={`${baseId}-role`}
                name="role"
                type="text"
                placeholder="Founder, engineer, designer…"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${baseId}-building`} className="sr-only">
                What you are building
              </label>
              <textarea
                id={`${baseId}-building`}
                name="building"
                placeholder="What are you building?"
                className={textareaClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${baseId}-looking`} className="sr-only">
                What you are looking for
              </label>
              <textarea
                id={`${baseId}-looking`}
                name="lookingFor"
                placeholder="What are you looking for?"
                className={textareaClass}
              />
            </div>
          </div>
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Submitting your request" : ""}
      </p>

      {status === "error" ? (
        <p id={errorId} role="alert" className="mt-4 text-[0.875rem] text-coral">
          {message}
        </p>
      ) : null}

      {status === "not_configured" ? (
        <div
          role="alert"
          className="mt-4 rounded-[1.25rem] border border-gold/30 bg-gold-deep/40 p-4 text-[0.875rem] leading-relaxed text-gold-light"
        >
          Signups aren&rsquo;t open through the site yet — the waitlist opens with the next beta batch.
          {contactEmail ? (
            <>
              {" "}
              In the meantime,{" "}
              <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
                email us
              </a>{" "}
              and we&rsquo;ll add you manually.
            </>
          ) : null}
        </div>
      ) : null}

      {variant === "full" && status !== "not_configured" ? (
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-faint">
          We use your email only to tell you when your spot opens. No newsletter, no sharing.
        </p>
      ) : null}
    </form>
  );
}
