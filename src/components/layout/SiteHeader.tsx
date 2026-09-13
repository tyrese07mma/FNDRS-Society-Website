"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Navigating from inside the panel closes it; handled on the links
  // themselves rather than in an effect on `pathname`.
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        data-site-header=""
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out-soft)]",
          scrolled || menuOpen
            ? "border-b border-line bg-ink/88 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between gap-4 px-[var(--page-gutter)] sm:h-[4.5rem]">
          <Link
            href="/"
            className="-m-2 rounded-lg p-2 transition-opacity hover:opacity-80"
            aria-label="FNDRS Society — home"
          >
            <Logo size="sm" />
          </Link>

          <nav aria-label="Main" data-nav="primary" className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-200",
                    active ? "bg-surface text-cream" : "text-muted hover:bg-surface/70 hover:text-cream",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than toggled with a `hidden` utility on the
                button itself: both would set `display`, and which one wins
                depends on stylesheet order rather than on intent. */}
            <div className="hidden min-[400px]:block">
              <ButtonLink href="/beta" size="md">
                Get early access
              </ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-menu-toggle=""
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-cream transition-colors hover:border-line-strong md:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-ink px-[var(--page-gutter)] pb-10 pt-6 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {primaryNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="group flex items-baseline justify-between gap-4 border-b border-line py-5"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="font-display text-[1.75rem] font-semibold tracking-tight text-cream">
                {item.label}
              </span>
              {item.description ? (
                <span className="text-right text-[0.8125rem] text-faint">{item.description}</span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink href="/beta" size="lg" className="w-full" onClick={closeMenu}>
            Get early access
          </ButtonLink>
          <p className="text-center text-[0.8125rem] text-faint">
            FNDRS Society is currently in private beta.
          </p>
        </div>
      </div>
    </header>
  );
}
