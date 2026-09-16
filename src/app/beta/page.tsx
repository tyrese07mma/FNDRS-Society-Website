import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { PhoneFrame } from "@/components/marketing/PhoneFrame";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { faqs } from "@/content/faq";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { screenshots } from "@/content/screenshots";

export const metadata: Metadata = {
  title: "Early access",
  description:
    "FNDRS Society is in private beta. Request early access to find a co-founder, the skill your team is missing, or a project worth joining.",
  alternates: { canonical: "/beta" },
};

const included = [
  "Access to the beta app as spots are released",
  "Your profile live before the network opens up",
  "Free for the whole beta period",
  "Direct line to the team on what to build next",
];

const timeline = [
  {
    label: "Now",
    title: "Private beta",
    body: "A closed group of founders and builders is using the app and shaping what gets built next.",
  },
  {
    label: "Next",
    title: "Batched early access",
    body: "Waitlist spots open in groups, balanced across skills and regions so matching stays useful.",
  },
  {
    label: "Then",
    title: "Public launch",
    body: "Open signups and store availability, announced to the waitlist first.",
  },
];

export default function BetaPage() {
  const hero = screenshots.find((screen) => screen.id === "match")!;

  return (
    <>
      <PageHero
        index="/beta"
        eyebrow="Early access"
        title={<>Get in before the network fills up</>}
        lead="FNDRS Society is in private beta. Spots go out in batches so every new member arrives to a network that already has people worth matching with."
      />

      <Section spacing="tight">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-9">
              <h2 className="text-[1.5rem] sm:text-[1.75rem]">Request your spot</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                One field gets you on the list. The optional details help us place you in the right
                batch and match you faster.
              </p>
              <WaitlistForm className="mt-7" />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal delay={80}>
              <div>
                <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-faint">
                  What early access includes
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-muted">
                      <Icon name="check" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mx-auto w-full max-w-[13rem] lg:mx-0">
                <PhoneFrame src={hero.src} alt={hero.alt} sizes="13rem" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-y border-line bg-band">
        <SectionHeading index="01" eyebrow="Where we are" title="What happens between now and launch" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-3">
          {timeline.map((phase, index) => (
            <Reveal key={phase.label} as="li" delay={index * 80} className="block">
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-gold">
                  {phase.label}
                </span>
                <h3 className="mt-4 text-lg">{phase.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{phase.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading index="02" eyebrow="Before you sign up" title="The short version" />
        <div className="mt-12">
          <FaqAccordion items={faqs.filter((faq) => ["Is FNDRS free?", "Who can join?", "What stage is the product at?", "What happens after I request early access?"].includes(faq.question))} />
        </div>
      </Section>
    </>
  );
}
