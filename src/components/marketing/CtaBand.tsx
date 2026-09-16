import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export function CtaBand({
  title = "Your next co-founder might already be here.",
  lead = "Join the private beta and find out what you’ve been missing.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-band py-24 sm:py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="brand-glow pointer-events-none absolute inset-x-0 bottom-0 h-[32rem] opacity-70"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <span className="label text-gold">Early access</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-[2.125rem] leading-[1.03] tracking-[-0.04em] sm:text-[3rem] lg:text-[3.75rem]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">{lead}</p>
          </Reveal>
          <Reveal delay={200} className="mt-10 w-full max-w-xl">
            <WaitlistForm variant="compact" />
          </Reveal>
          <Reveal delay={260}>
            <p className="label mt-5 text-faint">
              Free during the beta <span className="text-line-strong">/</span> no newsletter{" "}
              <span className="text-line-strong">/</span> unsubscribe in one click
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
