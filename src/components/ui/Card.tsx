import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/**
 * The app's card: near-black surface, hairline border, 22px radius. The `gold`
 * tone mirrors the highlighted cards (Smart Match, FNDRS Pro) in the product.
 */
export function Card({
  children,
  className,
  tone = "default",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "gold" | "bare";
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-card)] p-6 sm:p-7",
        tone === "default" && "border border-line bg-surface",
        tone === "gold" &&
          "border border-gold/35 bg-[linear-gradient(150deg,rgba(187,156,99,0.13),rgba(19,19,23,0.9)_58%)]",
        tone === "bare" && "border border-transparent",
        interactive &&
          "transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Rounded-square icon container used throughout the app for feature glyphs. */
export function IconTile({
  name,
  tone = "default",
  size = "md",
  className,
}: {
  name: IconName;
  tone?: "default" | "gold" | "olive";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-tile)] border",
        size === "sm" ? "size-9" : "size-12",
        tone === "default" && "border-line bg-elevated text-cream/80",
        tone === "gold" && "border-gold/25 bg-gold-deep text-gold-light",
        tone === "olive" && "border-olive/35 bg-olive/20 text-olive-light",
        className,
      )}
    >
      <Icon name={name} size={size === "sm" ? 17 : 21} />
    </span>
  );
}

/** Small pill label, as used on the app's onboarding card. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] text-cream/75",
        className,
      )}
    >
      {children}
    </span>
  );
}
