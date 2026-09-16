"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One scroll listener for the whole page.
 *
 * Writes reading progress to the document and a parallax offset to any element
 * carrying `data-parallax="<pixels>"`, both as custom properties so the browser
 * animates them on the compositor. Everything runs inside a single rAF tick, so
 * adding another effect later costs no extra listener.
 */
export function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    let frame = 0;

    const update = () => {
      frame = 0;

      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", max > 8 ? String(Math.min(1, window.scrollY / max)) : "0");

      const viewport = window.innerHeight;
      for (const layer of layers) {
        const rect = layer.getBoundingClientRect();
        if (rect.bottom < -viewport || rect.top > viewport * 2) continue;
        const strength = Number(layer.dataset.parallax) || 0;
        // -0.5 when the element sits a screen below, 0.5 when a screen above.
        const offset = (viewport / 2 - (rect.top + rect.height / 2)) / viewport;
        layer.style.setProperty("--parallax-y", `${(offset * strength).toFixed(2)}px`);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
