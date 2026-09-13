import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export function CtaBand({
  title = "Your next co-founder might already be here.",
  lead = "Join the private beta and find out what you've been missing.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-band py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="brand-glow pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] opacity-70"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <h2 className="text-[2rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.25rem]">{title}</h2>
          </Reveal>
          <Reveal delay={70}>
            <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">{lead}</p>
          </Reveal>
          <Reveal delay={130} className="mt-9 w-full max-w-xl">
            <WaitlistForm variant="compact" />
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-[0.8125rem] text-faint">
              Free during the beta &middot; no newsletter &middot; unsubscribe in one click
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
