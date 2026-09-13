import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  id,
  className,
  innerClassName,
  width,
  children,
  as: Tag = "section",
  spacing = "default",
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  width?: "default" | "narrow" | "wide";
  children: ReactNode;
  as?: "section" | "div" | "footer" | "header";
  spacing?: "default" | "tight" | "loose" | "none";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        spacing === "tight" && "py-14 sm:py-16",
        spacing === "default" && "py-20 sm:py-24 lg:py-28",
        spacing === "loose" && "py-24 sm:py-32 lg:py-40",
        className,
      )}
    >
      <Container width={width} className={innerClassName}>
        {children}
      </Container>
    </Tag>
  );
}
