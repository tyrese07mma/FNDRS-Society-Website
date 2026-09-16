import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PageHero } from "@/components/marketing/PageHero";
import { ProductPreview } from "@/components/marketing/ProductPreview";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Smart Match, founder profiles, opportunities, messaging, communities, events and the FNDRS Copilot — every surface inside the app.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        index="/features"
        eyebrow="Product"
        title={<>Everything is pointed at one outcome</>}
        lead="Find the person, skill or project you’re missing — and get to a real conversation quickly. Here’s what the app does, surface by surface."
      />
      <ProductPreview index="01" />
      <FeatureGrid detailed index="02" />
      <CtaBand
        title="See it for yourself."
        lead="Early access opens in batches. Put your name down and we’ll let you know when the next one goes out."
      />
    </>
  );
}
