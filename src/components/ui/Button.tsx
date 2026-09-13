import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-out-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

const variants: Record<Variant, string> = {
  // The app's primary action: solid cream pill on near-black.
  primary: "bg-cream text-ink hover:bg-white shadow-[0_1px_0_rgba(255,255,255,0.35)_inset]",
  secondary: "border border-line-strong bg-surface/70 text-cream hover:border-gold/45 hover:bg-surface-2",
  ghost: "text-cream/85 hover:text-cream hover:bg-surface",
  gold: "border border-gold/40 bg-gold-deep/60 text-gold-light hover:border-gold/70 hover:bg-gold-deep",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Appends a trailing arrow that nudges right on hover. */
  trailingArrow?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  trailingArrow,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], "group", className)} {...props}>
      {children}
      {trailingArrow ? <TrailingArrow /> : null}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  trailingArrow,
  ...props
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  if (external) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], "group", className)}
        rel="noreferrer noopener"
        target="_blank"
      >
        {children}
        {trailingArrow ? <TrailingArrow /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], "group", className)} {...props}>
      {children}
      {trailingArrow ? <TrailingArrow /> : null}
    </Link>
  );
}

function TrailingArrow() {
  return (
    <Icon
      name="arrowRight"
      size={17}
      className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
    />
  );
}
