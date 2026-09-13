import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const rows: { career: string; fndrs: string }[] = [
  { career: "What someone did", fndrs: "What someone wants to build next" },
  { career: "Job titles and company logos", fndrs: "Skills, stage and the gap they're filling" },
  { career: "People already in your network", fndrs: "People you would never have found" },
  { career: "Cold outreach into an inbox", fndrs: "A conversation both sides opted into" },
];

export function ComparisonSection() {
  return (
    <Section id="difference" className="border-y border-line bg-band">
      <SectionHeading
        eyebrow="Why not a business network"
        title={<>A network built for r&eacute;sum&eacute;s won&rsquo;t find you a co-founder.</>}
        lead="Career networks are excellent at what they were designed for: showing what people have already done. Finding someone to build with is a different question, and it needs different signals."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface/60 p-6 sm:p-8">
            <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-faint">
              A career network shows you
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {rows.map((row) => (
                <li key={row.career} className="flex items-start gap-3 text-[0.9375rem] text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 rounded-full bg-faint"
                  />
                  {row.career}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="h-full rounded-[var(--radius-card)] border border-gold/35 bg-[linear-gradient(150deg,rgba(187,156,99,0.13),rgba(19,19,23,0.9)_58%)] p-6 sm:p-8">
            <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-gold-light">
              FNDRS shows you
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {rows.map((row) => (
                <li key={row.fndrs} className="flex items-start gap-3 text-[0.9375rem] text-cream/90">
                  <Icon name="check" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gold" />
                  {row.fndrs}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
