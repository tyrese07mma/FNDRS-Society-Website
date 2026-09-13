import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/content/steps";

export function HowItWorks({ withCta = true }: { withCta?: boolean }) {
  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="Five steps from profile to co-founder"
        lead="No pitch deck, no gatekeeping, no waiting for an introduction that never comes."
      />

      <ol className="mt-14 border-t border-line">
        {steps.map((step, index) => (
          <Reveal key={step.number} as="li" delay={index * 60} className="block">
            <div className="group grid gap-2 border-b border-line py-7 transition-colors duration-300 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6 sm:py-8 lg:grid-cols-[6rem_16rem_minmax(0,1fr)] lg:items-baseline lg:gap-10">
              <span className="font-display text-[0.8125rem] font-medium tracking-[0.22em] text-gold">
                {step.number}
              </span>
              <h3 className="text-xl leading-snug sm:text-[1.375rem]">{step.title}</h3>
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted sm:col-start-2 lg:col-start-3">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      {withCta ? (
        <Reveal delay={80}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/beta" size="lg" trailingArrow className="w-full sm:w-auto">
              Request your spot
            </ButtonLink>
            <p className="text-[0.875rem] text-faint sm:ml-2">
              Access is released in batches so the network stays balanced.
            </p>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
