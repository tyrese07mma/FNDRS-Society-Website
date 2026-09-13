"use client";

import { useId, useRef, useState } from "react";
import { Chip } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { screenshots } from "@/content/screenshots";
import { PhoneFrame } from "./PhoneFrame";

/**
 * Segmented control + synced device frame, echoing the pill tab control used
 * across the app. Full keyboard support via the standard tablist pattern.
 */
export function ProductTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = screenshots[activeIndex] ?? screenshots[0]!;

  const focusTab = (index: number) => {
    const next = (index + screenshots.length) % screenshots.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(screenshots.length - 1);
        break;
    }
  };

  return (
    <div className="mt-12">
      <Reveal>
        <div className="-mx-[var(--page-gutter)] overflow-x-auto px-[var(--page-gutter)] pb-1 [scrollbar-width:none] max-sm:[mask-image:linear-gradient(90deg,#000_0,#000_calc(100%-2.5rem),transparent)] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="App screens"
            className="inline-flex min-w-full gap-1 rounded-full border border-line bg-surface/70 p-1 sm:min-w-0"
          >
            {screenshots.map((screen, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={screen.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  role="tab"
                  type="button"
                  id={`${baseId}-tab-${screen.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[0.875rem] font-medium transition-colors duration-200 sm:px-5",
                    selected ? "bg-cream text-ink" : "text-muted hover:text-cream",
                  )}
                >
                  {screen.label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="mt-10 grid items-center gap-10 rounded-[var(--radius-card)] border border-line bg-surface/40 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14"
      >
        <div className="order-2 lg:order-1">
          <h3 className="text-[1.5rem] leading-snug sm:text-[1.875rem]">{active.title}</h3>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
            {active.body}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {active.highlights.map((highlight) => (
              <li key={highlight}>
                <Chip>{highlight}</Chip>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-[0.8125rem] text-faint">
            Screen from the FNDRS beta app &middot; {active.label}
          </p>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[15rem] lg:order-2 lg:max-w-none">
          {/* Spacer establishes the height; frames stack on top and cross-fade. */}
          <div className="aspect-[900/1957] w-full" aria-hidden="true" />
          {screenshots.map((screen, index) => (
            <div
              key={screen.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out-soft)]",
                index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={index !== activeIndex}
            >
              <PhoneFrame src={screen.src} alt={screen.alt} sizes="(min-width: 1024px) 17rem, 15rem" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
