import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

const points = [
  "Early access to the beta app, in batches",
  "Your profile live before the network opens up",
  "Free for the whole beta period",
  "A say in what gets built next",
];

export function BetaSection() {
  return (
    <Section id="beta">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Early access"
            title={<>Get in before the network fills up</>}
            lead="FNDRS is in private beta. Spots are released in batches so every new member arrives to a network that already has people worth matching with."
          />

          <Reveal delay={120}>
            <ul className="mt-8 flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-muted">
                  <Icon name="check" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
            <h3 className="text-xl">Request your spot</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              One field to get on the list. The rest is optional and helps us match you faster.
            </p>
            <WaitlistForm className="mt-6" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
