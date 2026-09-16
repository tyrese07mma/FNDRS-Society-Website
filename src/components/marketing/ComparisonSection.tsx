import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const rows: { career: string; fndrs: string }[] = [
  { career: "What someone did", fndrs: "What someone wants to build next" },
  { career: "Job titles and company logos", fndrs: "Skills, stage and the gap they’re filling" },
  { career: "People already in your network", fndrs: "People you would never have found" },
  { career: "Cold outreach into an inbox", fndrs: "A conversation both sides opted into" },
];

export function ComparisonSection() {
  return (
    <Section id="difference" className="border-y border-line bg-band">
      <SectionHeading
        index="02"
        eyebrow="Why not a business network"
        title={<>A network built for r&eacute;sum&eacute;s won&rsquo;t find you a co-founder.</>}
        lead="Career networks are excellent at what they were designed for: showing what people have already done. Finding someone to build with is a different question, and it needs different signals."
      />

      {/* Read as one table: the same four rows, answered two ways. */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line lg:grid-cols-2">
        <Reveal className="block bg-band">
          <div className="h-full p-6 sm:p-8">
            <h3 className="label text-faint">A career network shows you</h3>
            <ul className="mt-7 flex flex-col">
              {rows.map((row) => (
                <li
                  key={row.career}
                  className="flex items-start gap-3 border-b border-line py-4 text-[0.9375rem] text-muted last:border-b-0"
                >
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-faint" />
                  {row.career}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={110} className="block">
          <div className="h-full bg-[linear-gradient(155deg,rgba(187,156,99,0.14),rgba(10,10,12,0.96)_62%)] p-6 sm:p-8">
            <h3 className="label text-gold-light">FNDRS shows you</h3>
            <ul className="mt-7 flex flex-col">
              {rows.map((row) => (
                <li
                  key={row.fndrs}
                  className="flex items-start gap-3 border-b border-gold/15 py-4 text-[0.9375rem] text-cream/90 last:border-b-0"
                >
                  <Icon name="check" size={16} strokeWidth={2.2} className="mt-0.5 shrink-0 text-gold" />
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
