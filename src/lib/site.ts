/**
 * Single source of truth for brand copy, routes and the handful of values that
 * have to be supplied from outside the codebase (domain, socials, contact).
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "FNDRS Society",
  shortName: "FNDRS",
  /** Override with NEXT_PUBLIC_SITE_URL once the production domain is live. */
  url: (rawUrl && rawUrl.replace(/\/$/, "")) || "https://fndrs-society.com",
  tagline: "Find what's missing.",
  /** Meta description — kept under 160 characters so search results don't truncate it. */
  description:
    "A matching platform for founders and builders. Find a co-founder, the skill your team is missing, or a project worth joining.",
  /** Used for OpenGraph and social cards, where a little more room is fine. */
  shortDescription:
    "Find co-founders, skills and projects. FNDRS matches founders and builders on what they are actually looking for.",
  /** Long form, used for structured data rather than meta tags. */
  longDescription:
    "FNDRS Society is a matching platform for founders and builders. Find a co-founder, the skill your team is missing, a project worth joining, or the person who can solve the problem in front of you.",
  locale: "en",
  status: "Private beta",
} as const;

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

/**
 * Keeps a deployment out of search results. Set for preview and staging URLs
 * so they never compete with — or leak ahead of — the real site. It flips both
 * the robots meta tag and robots.txt.
 */
export const noIndex = ["1", "true", "yes"].includes(
  (process.env.NEXT_PUBLIC_NOINDEX ?? "").trim().toLowerCase(),
);

export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Product", href: "/features", description: "Everything inside FNDRS" },
  { label: "How it works", href: "/how-it-works", description: "From profile to co-founder" },
  { label: "About", href: "/about", description: "Why FNDRS exists" },
  { label: "FAQ", href: "/faq", description: "Answers before you join" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "/features" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Early access", href: "/beta" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Imprint", href: "/imprint" },
    ],
  },
];

/**
 * Social profiles render only once their URL is configured, so the footer can
 * never ship a dead link. Set these in .env.local (see .env.example).
 */
export const socialLinks = (
  [
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
    { label: "X", href: process.env.NEXT_PUBLIC_X_URL },
  ] satisfies { label: string; href?: string }[]
)
  .map((item) => ({ label: item.label, href: item.href?.trim() ?? "" }))
  .filter((item) => item.href.length > 0);

export const seoKeywords = [
  "find co-founder",
  "co-founder platform",
  "founder network",
  "founder matching",
  "startup networking",
  "startup community",
  "find startup partners",
  "find developers for startup",
  "entrepreneur networking",
];
