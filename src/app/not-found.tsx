import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70dvh] items-center overflow-hidden py-28">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[30rem]" />
      <Container className="relative">
        <div className="max-w-xl">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-4 text-[2.5rem] leading-[1.05] sm:text-[3.25rem]">
            This one really is missing.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            The page you were looking for doesn&rsquo;t exist. Everything else is one step away.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" className="w-full sm:w-auto">
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
