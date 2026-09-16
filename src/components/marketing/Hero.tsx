import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { screenshots } from "@/content/screenshots";
import { PhoneFrame } from "./PhoneFrame";

const assurances = ["Free during the beta", "English and German", "Built mobile-first"];

const byId = (id: string) => screenshots.find((screen) => screen.id === id)!;

export function Hero() {
  const main = byId("home");
  const left = byId("discover");
  const right = byId("match");

  return (
    <section className="relative overflow-hidden pb-0 pt-28 sm:pt-32 lg:pt-40">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[46rem]" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-10">
          <div className="flex flex-col items-start">
            <Reveal>
              <span className="label inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold-deep/50 px-3.5 py-2 text-gold-light">
                <span className="size-1.5 rounded-full bg-gold-light" aria-hidden="true" />
                Private beta
                <span className="text-gold/50" aria-hidden="true">
                  /
                </span>
                Onboarding founders
              </span>
            </Reveal>

            <SplitText
              as="h1"
              lines={["Find what’s", "missing."]}
              delay={180}
              stagger={70}
              className="mt-7 text-[2.875rem] leading-[0.95] tracking-[-0.045em] sm:text-[4rem] lg:text-[5rem] xl:text-[5.5rem]"
            />

            <Reveal delay={420}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Co-founders, skills, projects and the people who move an idea forward. FNDRS matches
                founders and builders on what they are looking for right now — not on what their CV
                says they did.
              </p>
            </Reveal>

            <Reveal delay={510}>
              <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <ButtonLink href="/beta" size="lg" trailingArrow className="w-full sm:w-auto">
                  Get early access
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
                  See how it works
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={600} className="w-full">
              <div className="mt-10 border-t border-line pt-5">
                <ul className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  {assurances.map((item) => (
                    <li key={item} className="label flex items-center gap-2 whitespace-nowrap text-faint">
                      <Icon name="check" size={13} className="shrink-0 text-gold" strokeWidth={2.4} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={340} className="lg:pl-4">
            <div className="relative mx-auto flex w-full max-w-[19rem] items-center justify-center sm:max-w-[38rem] lg:max-w-[34rem]">
              <div
                data-parallax="34"
                className="hidden w-[34%] translate-y-10 -rotate-6 opacity-65 sm:-mr-[9%] sm:block"
              >
                <PhoneFrame src={left.src} alt={left.alt} sizes="(min-width: 640px) 12rem, 0px" glare={false} />
              </div>

              <div data-parallax="-22" className="relative z-10 w-full sm:w-[46%]">
                <PhoneFrame
                  src={main.src}
                  alt={main.alt}
                  priority
                  sizes="(min-width: 1024px) 16rem, (min-width: 640px) 18rem, 76vw"
                />
              </div>

              <div
                data-parallax="34"
                className="hidden w-[34%] translate-y-10 rotate-6 opacity-65 sm:-ml-[9%] sm:block"
              >
                <PhoneFrame src={right.src} alt={right.alt} sizes="(min-width: 640px) 12rem, 0px" glare={false} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hands the eye to the first section rather than ending on empty space. */}
        <Reveal delay={700}>
          <div className="mt-16 flex items-center justify-between gap-6 border-t border-line py-5 lg:mt-24">
            <span className="label flex items-center gap-2.5 text-faint">
              <Icon name="arrowRight" size={13} className="rotate-90 text-gold" />
              Scroll
            </span>
            <span className="label text-faint">
              01 <span className="text-line-strong">/</span> The gap
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
