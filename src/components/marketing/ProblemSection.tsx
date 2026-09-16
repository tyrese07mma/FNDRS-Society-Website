import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const gaps = [
  {
    have: "the idea",
    missing: "the skill set",
    body: "You can see the product clearly. You can’t build it on your own, and hiring is a long way off.",
  },
  {
    have: "the skill set",
    missing: "the project",
    body: "You can ship. What’s missing is something worth shipping, with people who work to your standard.",
  },
  {
    have: "the company",
    missing: "the person",
    body: "One problem is holding everything up, and nobody currently in the room has solved it before.",
  },
];

export function ProblemSection() {
  return (
    <Section id="why">
      <SectionHeading
        index="01"
        eyebrow="The gap"
        title={<>Most founders don&rsquo;t stall for lack of ideas.</>}
        lead="They stall because the right person wasn’t in the room. A technical co-founder. Someone who has shipped this exact thing before. A designer who understands the product, not just the screens."
      />

      {/* Hairlines rather than boxes: three facets of one problem, not three products. */}
      <div className="mt-16 grid border-t border-line sm:grid-cols-3">
        {gaps.map((gap, index) => (
          <Reveal key={gap.have} delay={index * 90} className="block">
            <div
              className={`group h-full border-b border-line px-0 py-8 transition-colors duration-500 sm:border-b-0 sm:py-10 ${
                index > 0 ? "sm:border-l sm:border-line sm:pl-8 lg:pl-10" : "sm:pr-8 lg:pr-10"
              } ${index === 1 ? "sm:pr-8 lg:pr-10" : ""}`}
            >
              <span className="label text-faint">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-5 font-display text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-2xl">
                You have {gap.have},
                <br />
                <span className="text-gold transition-colors duration-500 group-hover:text-gold-light">
                  not {gap.missing}.
                </span>
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{gap.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <p className="mt-16 max-w-4xl font-display text-[1.75rem] leading-[1.15] tracking-[-0.03em] text-cream sm:text-[2.5rem] lg:text-[3rem]">
          The gap is almost never ambition.
          <br className="hidden sm:block" /> <span className="text-muted">It&rsquo;s access.</span>
        </p>
      </Reveal>
    </Section>
  );
}
