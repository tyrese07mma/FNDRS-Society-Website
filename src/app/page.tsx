import type { Metadata } from "next";
import Link from "next/link";
import { AudienceSection } from "@/components/marketing/AudienceSection";
import { BetaSection } from "@/components/marketing/BetaSection";
import { ComparisonSection } from "@/components/marketing/ComparisonSection";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { ProductPreview } from "@/components/marketing/ProductPreview";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faq";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Find what’s missing`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ComparisonSection />
      <HowItWorks />
      <ProductPreview />
      <FeatureGrid />
      <AudienceSection />
      <BetaSection />

      <Section id="faq" className="border-t border-line bg-band">
        <SectionHeading index="08" eyebrow="FAQ" title="Questions people ask before joining" />
        <div className="mt-14">
          <FaqAccordion items={faqs.slice(0, 6)} />
        </div>
        <Reveal delay={80}>
          <Link
            href="/faq"
            className="group mt-10 inline-flex items-center gap-2 text-[0.9375rem] text-cream transition-colors hover:text-gold-light"
          >
            All questions
            <Icon
              name="arrowRight"
              size={16}
              className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
