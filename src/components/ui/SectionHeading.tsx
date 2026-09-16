import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { SectionIndex } from "./SectionIndex";

export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  className,
  headingLevel: Heading = "h2",
}: {
  eyebrow?: string;
  /** Section number. Given together with `eyebrow`, renders the indexed marker. */
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      {eyebrow ? (
        <Reveal className={cn("mb-7", align === "center" ? "w-full max-w-3xl" : "w-full")}>
          {index ? <SectionIndex index={index} label={eyebrow} /> : <Eyebrow>{eyebrow}</Eyebrow>}
        </Reveal>
      ) : null}

      <Reveal delay={60} className={cn(align === "center" && "mx-auto", "max-w-3xl")}>
        <Heading className="text-[2.125rem] leading-[1.04] tracking-[-0.035em] sm:text-[2.75rem] lg:text-[3.35rem]">
          {title}
        </Heading>
      </Reveal>

      {lead ? (
        <Reveal delay={120} className={cn(align === "center" && "mx-auto", "max-w-2xl")}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-[1.0625rem]">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
