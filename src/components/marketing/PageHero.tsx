import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-40">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[32rem]" />
      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 text-[2.5rem] leading-[1.02] sm:text-[3.25rem] lg:text-[4rem]">{title}</h1>
          </Reveal>
          {lead ? (
            <Reveal delay={120}>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={180}>{children}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}
