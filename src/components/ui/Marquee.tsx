import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Continuous ticker. The track is rendered twice and translated by exactly half
 * its width, which makes the loop seamless without measuring anything. It pauses
 * on hover and stops entirely under reduced motion.
 */
export function Marquee({
  items,
  duration = 48,
  className,
  renderItem,
}: {
  items: string[];
  /** Seconds for one full pass. */
  duration?: number;
  className?: string;
  renderItem?: (item: string) => ReactNode;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "marquee-viewport relative overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div className="marquee" style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length ? true : undefined}
            className="flex shrink-0 items-center gap-6 pr-6"
          >
            {renderItem ? renderItem(item) : <span className="whitespace-nowrap">{item}</span>}
            <span className="size-1 rounded-full bg-gold/50" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
