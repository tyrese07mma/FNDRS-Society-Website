import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductTour } from "./ProductTour";

export function ProductPreview({ index = "04" }: { index?: string }) {
  return (
    <Section id="preview">
      <SectionHeading
        index={index}
        eyebrow="Product preview"
        title="The app, as it is today"
        lead="Real screens from the private beta — not a rendering of a roadmap."
      />
      <ProductTour />
    </Section>
  );
}
