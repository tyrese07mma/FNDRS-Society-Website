import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductTour } from "./ProductTour";

export function ProductPreview() {
  return (
    <Section id="preview">
      <SectionHeading
        eyebrow="Product preview"
        title="The app, as it is today"
        lead="Real screens from the private beta — not a rendering of a roadmap."
      />
      <ProductTour />
    </Section>
  );
}
