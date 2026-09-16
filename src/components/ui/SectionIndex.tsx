import { cn } from "@/lib/cn";

/**
 * Numbered section marker. The page argues a case in order — the gap, why other
 * networks miss it, how matching closes it — so the numbering carries real
 * structure rather than decorating the layout.
 */
export function SectionIndex({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="label text-gold">{index}</span>
      <span className="label text-muted">{label}</span>
      <span className="rule-out ml-2 hidden flex-1 sm:block" aria-hidden="true" />
    </div>
  );
}
