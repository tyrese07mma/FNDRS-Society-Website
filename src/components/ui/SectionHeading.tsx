import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  headingLevel: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={60}>
        <Heading className="text-[2rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem]">{title}</Heading>
      </Reveal>
      {lead ? (
        <Reveal delay={120}>
          <p className="text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
