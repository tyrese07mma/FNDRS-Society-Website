import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label, mirroring the section labels used in the app. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted", className)}>
      {children}
    </p>
  );
}
