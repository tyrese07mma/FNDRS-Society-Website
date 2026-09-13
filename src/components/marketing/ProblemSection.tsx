import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const gaps = [
  {
    have: "The idea",
    missing: "the skill set",
    body: "You can see the product clearly. You can't build it on your own, and hiring is a long way off.",
  },
  {
    have: "The skill set",
    missing: "the project",
    body: "You can ship. What's missing is something worth shipping, with people who work to your standard.",
  },
  {
    have: "The company",
    missing: "the person",
    body: "One problem is holding everything up, and nobody currently in the room has solved it before.",
  },
];

export function ProblemSection() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="The gap"
        title={<>Most founders don&rsquo;t stall for lack of ideas.</>}
        lead="They stall because the right person wasn't in the room. A technical co-founder. Someone who has shipped this exact thing before. A designer who understands the product, not just the screens."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {gaps.map((gap, index) => (
          <Reveal key={gap.have} delay={index * 80}>
            <Card className="h-full" interactive>
              <p className="font-display text-xl font-semibold leading-snug sm:text-[1.375rem]">
                You have {gap.have.toLowerCase()},
                <br />
                <span className="text-gold">not {gap.missing}.</span>
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{gap.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mx-auto mt-14 max-w-3xl text-center font-display text-2xl leading-snug text-cream/90 sm:text-[2rem]">
          The gap is almost never ambition. It&rsquo;s access.
        </p>
      </Reveal>
    </Section>
  );
}
