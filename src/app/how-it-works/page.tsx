import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PageHero } from "@/components/marketing/PageHero";
import { ProductPreview } from "@/components/marketing/ProductPreview";
import { Card, IconTile } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From founder profile to co-founder in five steps: say what you’re building, name what’s missing, get matched, connect and build.",
  alternates: { canonical: "/how-it-works" },
};

const signals = [
  {
    icon: "layers" as const,
    title: "Stage",
    body: "Idea, prototype, launched, revenue. Matching pairs people whose timelines actually line up.",
  },
  {
    icon: "sparkles" as const,
    title: "Skills and gaps",
    body: "What you bring and what you’re missing are separate fields — so a match can be strong precisely because you’re different.",
  },
  {
    icon: "compass" as const,
    title: "Focus",
    body: "The space you’re building in, and the spaces you want to work in next.",
  },
  {
    icon: "globe" as const,
    title: "Location and mode",
    body: "City, timezone, and whether you’re looking for someone in the room or online.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to find a co-founder on FNDRS Society",
  description:
    "Build a founder profile, state what you are missing, review ranked matches, start a conversation and build together.",
  totalTime: "PT10M",
  step: [
    { "@type": "HowToStep", name: "Build your profile", text: "Add what you’re building, what you’re good at and where you are." },
    { "@type": "HowToStep", name: "Name what’s missing", text: "State the co-founder, skill, role or problem you’re looking for." },
    { "@type": "HowToStep", name: "Get matched", text: "Smart Match scores people against your stage, skills, intent and location." },
    { "@type": "HowToStep", name: "Connect", text: "Skip, save or message the people worth a conversation." },
    { "@type": "HowToStep", name: "Build", text: "Turn a match into a co-founder, a first hire or a solved problem." },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        index="/how-it-works"
        eyebrow="How it works"
        title={<>From a profile to a co-founder</>}
        lead={`No introductions to chase and no gatekeeping. ${siteConfig.shortName} turns "I need someone who can do X" into a shortlist of people who can.`}
      />

      <HowItWorks withCta={false} index="01" />

      <Section id="signals" className="border-y border-line bg-band">
        <SectionHeading
          index="02"
          eyebrow="What matching reads"
          title="Four signals, weighted against each other"
          lead="Match scores aren’t a popularity ranking. They compare what two people are trying to do and how well one fills the other’s gap."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {signals.map((signal, index) => (
            <Reveal key={signal.title} delay={(index % 2) * 80}>
              <Card className="h-full" interactive>
                <IconTile name={signal.icon} tone="gold" />
                <h3 className="mt-5 text-lg sm:text-xl">{signal.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{signal.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 max-w-3xl text-[0.875rem] leading-relaxed text-faint">
            You always see the score and the reason behind it, and you always make the call. Matching
            narrows the field; it doesn&rsquo;t decide who you work with.
          </p>
        </Reveal>
      </Section>

      <ProductPreview index="03" />

      <CtaBand
        title="Ideas need the right people."
        lead="Join the private beta and start with a shortlist instead of a blank page."
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
