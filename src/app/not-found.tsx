import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[72dvh] items-center overflow-hidden py-28">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[30rem]" />
      <Container className="relative">
        <SectionIndex index="404" label="Page not found" />
        <div className="max-w-2xl">
          <h1 className="mt-7 text-[2.5rem] leading-[0.98] tracking-[-0.045em] sm:text-[3.5rem]">
            This one really is missing.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            The page you were looking for doesn&rsquo;t exist. Everything else is one step away.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" trailingArrow className="w-full sm:w-auto">
              Back home
            </ButtonLink>
            <ButtonLink href="/beta" variant="secondary" size="lg" className="w-full sm:w-auto">
              Get early access
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
