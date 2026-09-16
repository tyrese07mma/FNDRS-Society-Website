import { Card, IconTile } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/SpotlightGroup";
import { coreFeatures, copilot, networkFeatures } from "@/content/features";

export function FeatureGrid({ detailed = false, index = "05" }: { detailed?: boolean; index?: string }) {
  return (
    <Section id="features" className="border-t border-line bg-band">
      <SectionHeading
        index={index}
        eyebrow="Inside FNDRS"
        title="Built around one question: what are you missing?"
        lead="Every surface in the app exists to answer it — matching first, and a network layer that keeps the answer useful over time."
      />

      <SpotlightGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coreFeatures.map((feature, position) => (
          <Reveal key={feature.id} delay={(position % 3) * 80} className="block h-full">
            <Card className="flex h-full flex-col" interactive spotlight>
              <div className="flex items-start justify-between gap-4">
                <IconTile name={feature.icon} tone="gold" />
                <span className="label text-faint">{String(position + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-lg tracking-[-0.02em] sm:text-xl">{feature.title}</h3>
              <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-cream/80">
                {feature.summary}
              </p>
              {detailed ? (
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{feature.detail}</p>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </SpotlightGroup>

      <Reveal delay={90}>
        <Card tone="gold" className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 sm:p-9">
          <IconTile name={copilot.icon} tone="gold" className="size-14" />
          <div className="max-w-2xl">
            <span className="label text-gold-light/80">AI layer</span>
            <h3 className="mt-2 text-lg tracking-[-0.02em] sm:text-xl">{copilot.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/80">{copilot.detail}</p>
          </div>
        </Card>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h3 className="label border-t border-line pt-6 text-faint">And the network around it</h3>
        </Reveal>
        <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {networkFeatures.map((feature, position) => (
            <Reveal key={feature.id} delay={(position % 3) * 70}>
              <div className="group flex gap-4">
                <IconTile
                  name={feature.icon}
                  size="sm"
                  className="transition-colors duration-500 group-hover:border-gold/30 group-hover:text-gold-light"
                />
                <div>
                  <h4 className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em]">
                    {feature.title}
                  </h4>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{feature.summary}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <p className="mt-14 max-w-3xl border-t border-line pt-6 text-[0.875rem] leading-relaxed text-faint">
          FNDRS is in private beta. These surfaces are live in the beta app; depth varies while the
          network grows, and access is released in batches so early members find real matches rather
          than an empty feed.
        </p>
      </Reveal>
    </Section>
  );
}
