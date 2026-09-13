import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { screenshots } from "@/content/screenshots";
import { PhoneFrame } from "./PhoneFrame";

const assurances = ["Free during the beta", "English and German", "Built mobile-first"];

const byId = (id: string) => screenshots.find((screen) => screen.id === id)!;

export function Hero() {
  const main = byId("home");
  const left = byId("discover");
  const right = byId("match");

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[46rem]" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-12">
          <div className="flex flex-col items-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-deep/50 px-3.5 py-1.5 text-[0.75rem] font-medium tracking-wide text-gold-light">
                <span className="size-1.5 rounded-full bg-gold-light" aria-hidden="true" />
                Private beta &middot; onboarding founders now
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mt-6 text-[2.75rem] leading-[0.98] sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem]">
                Find what&rsquo;s
                <br />
                missing.
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Co-founders, skills, projects and the people who move an idea forward. FNDRS matches
                founders and builders on what they are looking for right now — not on what their CV says
                they did.
              </p>
            </Reveal>

            <Reveal delay={190}>
              <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <ButtonLink href="/beta" size="lg" trailingArrow className="w-full sm:w-auto">
                  Get early access
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
                  See how it works
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                {assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.875rem] text-faint">
                    <Icon name="check" size={15} className="text-gold" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:pl-4">
            <div className="relative mx-auto flex w-full max-w-[19rem] items-center justify-center sm:max-w-[38rem] lg:max-w-[34rem]">
              <div className="hidden w-[34%] translate-y-10 -rotate-6 opacity-65 sm:-mr-[9%] sm:block">
                <PhoneFrame src={left.src} alt={left.alt} sizes="(min-width: 640px) 12rem, 0px" glare={false} />
              </div>

              <div className="relative z-10 w-full sm:w-[46%]">
                <PhoneFrame
                  src={main.src}
                  alt={main.alt}
                  priority
                  sizes="(min-width: 1024px) 16rem, (min-width: 640px) 18rem, 76vw"
                />
              </div>

              <div className="hidden w-[34%] translate-y-10 rotate-6 opacity-65 sm:-ml-[9%] sm:block">
                <PhoneFrame src={right.src} alt={right.alt} sizes="(min-width: 640px) 12rem, 0px" glare={false} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
