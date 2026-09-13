import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

/** Shared shell for the legal routes: hero, meta line and prose column. */
export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="pb-24 pt-28 sm:pt-32 lg:pt-40">
      <Container width="narrow">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 text-[2.25rem] leading-[1.05] sm:text-[3rem]">{title}</h1>
        <p className="mt-5 text-[0.8125rem] text-faint">Last updated: {lastUpdated}</p>
        {intro ? <div className="prose-fndrs mt-8">{intro}</div> : null}
        <div className="prose-fndrs mt-10">{children}</div>
      </Container>
    </article>
  );
}

/**
 * Marks information that has to come from the operator of the site. Visible on
 * purpose: an incomplete legal page should look incomplete, not authoritative.
 */
export function TodoNote({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-[1.25rem] border border-gold/35 bg-gold-deep/40 p-4 text-[0.875rem] leading-relaxed text-gold-light">
      <Icon name="lifebuoy" size={17} className="mt-0.5 shrink-0" />
      <div>
        <strong className="font-semibold text-gold-light">To be supplied — </strong>
        {children}
      </div>
    </div>
  );
}
