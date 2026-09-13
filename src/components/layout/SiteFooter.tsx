import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { contactEmail, footerNav, siteConfig, socialLinks } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-band">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="-m-1 w-fit p-1" aria-label="FNDRS Society — home">
              <Logo withSociety size="md" />
            </Link>
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-muted">
              Find what&rsquo;s missing — co-founders, skills, projects and the people who move an idea forward.
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold-deep/50 px-3 py-1.5 text-[0.75rem] font-medium tracking-wide text-gold-light">
              <span className="size-1.5 rounded-full bg-gold-light" aria-hidden="true" />
              {siteConfig.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-faint">
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.9375rem] text-muted transition-colors hover:text-cream"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-faint">Social</h2>
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
                        className="text-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
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

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-faint">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[0.8125rem] text-faint">Built for founders, in Europe.</p>
        </div>
      </Container>
    </footer>
  );
}
