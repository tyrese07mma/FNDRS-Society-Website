"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tracks the pointer once for a whole grid and hands the position to whichever
 * `.spotlight` card it is over. One listener for the group rather than one per
 * card, and the card does the rest in CSS.
 */
export function SpotlightGroup({ children, className }: { children: ReactNode; className?: string }) {
  const active = useRef<HTMLElement | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    // Coarse pointers have no hover, so there is nothing to follow.
    if (event.pointerType !== "mouse") return;

    const card = (event.target as HTMLElement).closest<HTMLElement>(".spotlight");
    if (card !== active.current) active.current = card;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className={cn(className)} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
