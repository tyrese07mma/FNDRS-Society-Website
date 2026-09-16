import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Who can join, how co-founder matching works, pricing during the beta, product stage, and what happens after you request access.",
  alternates: { canonical: "/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        index="/faq"
        eyebrow="FAQ"
        title={<>Questions, answered plainly</>}
        lead="If something isn’t covered here, it probably means we haven’t decided yet — and we’d rather say that than guess."
      />

      <Section spacing="tight">
        <FaqAccordion items={faqs} headingLevel="h2" />
      </Section>

      <CtaBand
        title="Still curious?"
        lead="The fastest answer is the product itself. Request early access and see it."
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
