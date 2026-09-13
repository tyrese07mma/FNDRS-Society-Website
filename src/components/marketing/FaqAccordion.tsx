import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { FaqItem } from "@/content/faq";

/**
 * Native disclosure elements: keyboard accessible and searchable in-page with
 * no JavaScript. The open/close transition is a progressive enhancement in
 * browsers that support ::details-content.
 */
export function FaqAccordion({
  items,
  headingLevel: Heading = "h3",
}: {
  items: FaqItem[];
  /** `h2` where the questions sit directly under the page title. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <Reveal key={item.question} delay={Math.min(index, 5) * 50}>
          <details className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <Heading className="text-[1.0625rem] leading-snug transition-colors group-hover:text-cream sm:text-[1.125rem]">
                {item.question}
              </Heading>
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-[transform,color,border-color] duration-300 ease-[var(--ease-out-soft)] group-open:rotate-45 group-open:border-gold/40 group-open:text-gold">
                <Icon name="plus" size={15} />
              </span>
            </summary>
            <div className="pb-7 pr-12">
              <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-muted">{item.answer}</p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
