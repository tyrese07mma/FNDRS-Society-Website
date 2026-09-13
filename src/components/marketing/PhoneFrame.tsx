import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Device shell for app screenshots. Sized by its container: set a width on the
 * parent and the frame keeps the phone aspect ratio.
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 22rem, 70vw",
  className,
  glare = true,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  glare?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[900/1957] w-full rounded-[2.4rem] border border-line-strong bg-[#0d0d10] p-[0.4rem]",
        "shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(244,241,233,0.04)_inset]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.05rem] bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover object-top"
        />
        {glare ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(244,241,233,0.07),transparent_38%)]"
          />
        ) : null}
      </div>
    </div>
  );
}
