import { IconTile } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audiences } from "@/content/audience";

export function AudienceSection({ index = "06" }: { index?: string }) {
  return (
    <section id="who" className="relative border-y border-line bg-band py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          index={index}
          eyebrow="Who it’s for"
          title="Anyone who builds — and anyone who wants to"
          lead="You don’t need a company, funding or a finished product. You need something to contribute and something you’re looking for."
        />
      </Container>

      {/* Full-bleed band of the roles, before the grid explains each one. */}
      <Reveal delay={100}>
        <Marquee
          className="my-14 border-y border-line py-6"
          duration={54}
          items={audiences.map((item) => item.title)}
          renderItem={(item) => (
            <span className="whitespace-nowrap font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-cream/70 sm:text-[2.25rem]">
              {item}
            </span>
          )}
        />
      </Reveal>

      <Container>
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, position) => (
            <Reveal key={item.title} delay={(position % 3) * 80}>
              <div className="group flex h-full flex-col">
                <IconTile
                  name={item.icon}
                  tone="olive"
                  size="sm"
                  className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5"
                />
                <h3 className="mt-4 text-lg tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
