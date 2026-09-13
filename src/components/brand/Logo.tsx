import { cn } from "@/lib/cn";

/**
 * The FNDRS wordmark: wide-tracked uppercase, light weight, with the optional
 * SOCIETY line beneath it — matching the lockup on the app's onboarding screen.
 */
export function Logo({
  withSociety = false,
  className,
  size = "md",
}: {
  withSociety?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none text-cream", className)}>
      <span
        className={cn(
          "font-display font-light uppercase",
          size === "sm" && "text-[0.95rem] tracking-[0.34em]",
          size === "md" && "text-[1.15rem] tracking-[0.34em]",
          size === "lg" && "text-[1.6rem] tracking-[0.34em]",
        )}
      >
        FNDRS
      </span>
      {withSociety ? (
        <span
          className={cn(
            "font-display font-light uppercase text-cream/55",
            size === "sm" && "mt-[0.3em] text-[0.5rem] tracking-[0.52em]",
            size === "md" && "mt-[0.35em] text-[0.5625rem] tracking-[0.52em]",
            size === "lg" && "mt-[0.4em] text-[0.75rem] tracking-[0.52em]",
          )}
        >
          Society
        </span>
      ) : null}
    </span>
  );
}
