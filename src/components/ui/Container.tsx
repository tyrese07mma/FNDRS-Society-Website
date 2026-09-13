import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page gutter + max width. Every band on the site sits inside one of these. */
export function Container({
  as: Tag = "div",
  className,
  width = "default",
  children,
}: {
  as?: ElementType;
  className?: string;
  width?: "default" | "narrow" | "wide";
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--page-gutter)]",
        width === "narrow" && "max-w-3xl",
        width === "default" && "max-w-[76rem]",
        width === "wide" && "max-w-[88rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
