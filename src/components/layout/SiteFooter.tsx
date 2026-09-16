import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { contactEmail, footerNav, siteConfig, socialLinks } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-band">
      <Container className="pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="-m-1 w-fit p-1" aria-label="FNDRS Society — home">
              <Logo withSociety size="md" />
            </Link>
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-muted">
              Find what&rsquo;s missing — co-founders, skills, projects and the people who move an idea forward.
            </p>
            <span className="label inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold-deep/50 px-3 py-1.5 text-gold-light">
              <span className="size-1.5 rounded-full bg-gold-light" aria-hidden="true" />
              {siteConfig.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-5">
                <h2 className="label text-faint">{group.title}</h2>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block text-[0.9375rem] text-muted transition-[color,transform] duration-300 ease-[var(--ease-out-expo)] hover:translate-x-0.5 hover:text-cream"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-5">
              <h2 className="label text-faint">Social</h2>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-cream"
                    >
                      {item.label}
                      <Icon
                        name="arrowUpRight"
                        size={13}
                        className="text-faint transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                      />
                    </a>
                  </li>
                ))}
                {contactEmail ? (
                  <li>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-[0.9375rem] text-muted transition-colors hover:text-cream"
                    >
                      Contact
                    </a>
                  </li>
                ) : null}
                {socialLinks.length === 0 && !contactEmail ? (
                  <li className="text-[0.9375rem] text-faint">Announced at launch</li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* The wordmark as a closing mark rather than another line of text. */}
      <Container className="pt-14">
        <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
          <span className="block whitespace-nowrap font-display text-[clamp(3.25rem,23vw,22rem)] font-light uppercase leading-[0.78] tracking-[0.05em] text-cream/[0.055]">
            FNDRS
          </span>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-3 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-faint">
            &copy; {year} {siteConfig.name}
          </p>
          <p className="label text-faint">Built for founders, in Europe</p>
        </div>
      </Container>
    </footer>
  );
}
