import { Card, IconTile } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreFeatures, copilot, networkFeatures } from "@/content/features";

export function FeatureGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <Section id="features" className="border-t border-line bg-band">
      <SectionHeading
        eyebrow="Inside FNDRS"
        title="Built around one question: what are you missing?"
        lead="Every surface in the app exists to answer it — matching first, and a network layer that keeps the answer useful over time."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coreFeatures.map((feature, index) => (
          <Reveal key={feature.id} delay={(index % 3) * 70}>
            <Card className="flex h-full flex-col" interactive>
              <IconTile name={feature.icon} tone="gold" />
              <h3 className="mt-5 text-lg sm:text-xl">{feature.title}</h3>
              <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-cream/80">
                {feature.summary}
              </p>
              {detailed ? (
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{feature.detail}</p>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <Card tone="gold" className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 sm:p-9">
          <IconTile name={copilot.icon} tone="gold" className="size-14" />
          <div className="max-w-2xl">
            <h3 className="text-lg sm:text-xl">{copilot.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/80">{copilot.detail}</p>
          </div>
        </Card>
      </Reveal>

      <div className="mt-14">
        <Reveal>
          <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-faint">
            And the network around it
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {networkFeatures.map((feature, index) => (
            <Reveal key={feature.id} delay={(index % 3) * 60}>
              <div className="flex gap-4">
                <IconTile name={feature.icon} size="sm" />
                <div>
                  <h4 className="font-display text-[1.0625rem] font-semibold tracking-tight">
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
        <p className="mt-12 max-w-3xl text-[0.875rem] leading-relaxed text-faint">
          FNDRS is in private beta. These surfaces are live in the beta app; depth varies while the
          network grows, and access is released in batches so early members find real matches rather
          than an empty feed.
        </p>
      </Reveal>
    </Section>
  );
}
