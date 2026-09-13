import { IconTile } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audiences } from "@/content/audience";

export function AudienceSection() {
  return (
    <Section id="who" className="border-y border-line bg-band">
      <SectionHeading
        eyebrow="Who it's for"
        title="Anyone who builds — and anyone who wants to"
        lead="You don't need a company, funding or a finished product. You need something to contribute and something you're looking for."
      />

      <div className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) * 70}>
            <div className="flex h-full flex-col">
              <IconTile name={item.icon} tone="olive" size="sm" />
              <h3 className="mt-4 text-lg">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
