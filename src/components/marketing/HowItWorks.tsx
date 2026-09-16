import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/content/steps";

export function HowItWorks({ withCta = true, index = "03" }: { withCta?: boolean; index?: string }) {
  return (
    <Section id="how-it-works">
      <SectionHeading
        index={index}
        eyebrow="How it works"
        title="Five steps from profile to co-founder"
        lead="No pitch deck, no gatekeeping, no waiting for an introduction that never comes."
      />

      <ol className="mt-16 border-t border-line">
        {steps.map((step, position) => (
          <Reveal key={step.number} as="li" delay={position * 70} className="block">
            <div className="group relative grid gap-2 border-b border-line py-7 transition-colors duration-500 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6 sm:py-9 lg:grid-cols-[6rem_17rem_minmax(0,1fr)] lg:items-baseline lg:gap-10">
              {/* A rule that draws itself across the row on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold/60 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <span className="label text-gold">{step.number}</span>
              <h3 className="text-xl leading-snug tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out-expo)] sm:text-[1.4375rem] lg:group-hover:translate-x-1">
                {step.title}
              </h3>
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted sm:col-start-2 lg:col-start-3">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      {withCta ? (
        <Reveal delay={90}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/beta" size="lg" trailingArrow className="w-full sm:w-auto">
              Request your spot
            </ButtonLink>
            <p className="label text-faint sm:ml-2">
              Access is released in batches
            </p>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
