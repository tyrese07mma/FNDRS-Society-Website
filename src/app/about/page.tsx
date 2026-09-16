import type { Metadata } from "next";
import { AudienceSection } from "@/components/marketing/AudienceSection";
import { ComparisonSection } from "@/components/marketing/ComparisonSection";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { Card, IconTile } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "What FNDRS Society is, who it is for, and why a network built for resumes will not find you a co-founder.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: "sparkles" as const,
    title: "Intent over history",
    body: "What you want to build next matters more than what you shipped three years ago. Every profile leads with intent, and matching reads it first.",
  },
  {
    icon: "users" as const,
    title: "Small, then useful",
    body: "A matching product with nobody in it is a directory of empty pages. We release access in batches and keep the network balanced across skills and regions.",
  },
  {
    icon: "shield" as const,
    title: "No performance layer",
    body: "There is no follower count to farm and no reason to post for reach. FNDRS is a place to find people, not an audience to build.",
  },
  {
    icon: "zap" as const,
    title: "Short path to a conversation",
    body: "Discovery is worth nothing if the first message never gets sent. Everything is designed to shorten the distance between seeing someone and talking to them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="/about"
        eyebrow="About"
        title={<>A network for the thing you can&rsquo;t do alone</>}
        lead="FNDRS Society connects founders, builders and experts around one question: what’s missing right now? A co-founder, a skill, a project worth joining, or one problem nobody in the room has solved before."
      />

      <Section spacing="tight">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                Almost every early company hits the same wall. The idea is clear, the ambition is
                there, and progress stops anyway — because one specific person is missing. A technical
                co-founder. Someone who has run this exact playbook before. A designer who can turn a
                vague product into something people understand in five seconds.
              </p>
              <p>
                Finding that person is mostly luck. You ask around, you post somewhere, you hope
                someone in your network happens to know the right person and happens to remember you
                at the right moment. Most founders lose months to it. Some lose the company.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                FNDRS exists to make that search deliberate. You state what you&rsquo;re building and
                what you need. Other people state the same. Matching does the work that used to depend
                on knowing the right people already.
              </p>
              <p className="text-cream/90">
                It cuts both ways. If you have the skills and no project, you are not the one asking
                for a favour — you are exactly what half the network is looking for.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="principles" className="border-y border-line bg-band">
        <SectionHeading
          index="01"
          eyebrow="How we build it"
          title="Four decisions that shape the product"
          lead="Not a manifesto — just the trade-offs we keep making, and what they cost."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={(index % 2) * 80}>
              <Card className="h-full" interactive>
                <IconTile name={principle.icon} tone="gold" />
                <h3 className="mt-5 text-lg sm:text-xl">{principle.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{principle.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <ComparisonSection />
      <AudienceSection />
      <CtaBand
        title="Built for what’s next."
        lead="FNDRS Society is in private beta. Get on the list and we’ll tell you when your spot opens."
      />
    </>
  );
}
