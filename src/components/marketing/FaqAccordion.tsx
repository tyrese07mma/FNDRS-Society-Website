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
  numbered = true,
}: {
  items: FaqItem[];
  /** `h2` where the questions sit directly under the page title. */
  headingLevel?: "h2" | "h3";
  numbered?: boolean;
}) {
  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <Reveal key={item.question} delay={Math.min(index, 5) * 55}>
          <details className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start gap-5 py-6 [&::-webkit-details-marker]:hidden">
              {numbered ? (
                <span className="label mt-1 shrink-0 text-faint transition-colors duration-300 group-open:text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : null}
              <Heading className="flex-1 text-[1.0625rem] leading-snug tracking-[-0.015em] transition-colors group-hover:text-cream sm:text-[1.1875rem]">
                {item.question}
              </Heading>
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-[transform,color,border-color] duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:border-gold/40 group-open:text-gold">
                <Icon name="plus" size={15} />
              </span>
            </summary>
            <div className={`pb-7 pr-12 ${numbered ? "sm:pl-[3.25rem]" : ""}`}>
              <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-muted">{item.answer}</p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
