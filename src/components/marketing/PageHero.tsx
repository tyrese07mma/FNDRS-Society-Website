import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";

export function PageHero({
  eyebrow,
  index = "00",
  title,
  lead,
  children,
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-40">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[32rem]" />
      <Container className="relative">
        <Reveal>
          <SectionIndex index={index} label={eyebrow} />
        </Reveal>
        <div className="max-w-3xl">
          <Reveal delay={70}>
            <h1 className="mt-7 text-[2.5rem] leading-[0.98] tracking-[-0.045em] sm:text-[3.5rem] lg:text-[4.25rem]">
              {title}
            </h1>
          </Reveal>
          {lead ? (
            <Reveal delay={140}>
              <p className="mt-7 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={200}>{children}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}
