"use client";

import { Fragment, useCallback, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Headline whose words rise into place one after another.
 *
 * Splitting by word rather than by line means nothing has to be measured, so
 * the text wraps exactly as it would untouched and there is no reflow flash.
 * Real space nodes sit between the words, so selection and screen readers are
 * unaffected. Without scripting the words are simply visible — the hidden
 * state lives behind the `js` class.
 */
export function SplitText({
  lines,
  className,
  delay = 0,
  stagger = 52,
  as: Tag = "span",
}: {
  /** One entry per rendered line; the component does not insert its own breaks. */
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
}) {
  // A callback ref rather than an effect: the class lands on the very next
  // frame after the element exists, so the transition always has a start value
  // to move from — no flash of finished text.
  const attach = useCallback((node: HTMLElement | null) => {
    if (node) requestAnimationFrame(() => node.classList.add("split-ready"));
  }, []);

  let index = 0;

  return (
    <Tag ref={attach} className={cn(className)}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, wordIndex, words) => {
            const style = { "--word-delay": `${delay + index++ * stagger}ms` } as CSSProperties;
            return (
              <Fragment key={wordIndex}>
                <span className="split-word" style={style}>
                  {word}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
