/**
 * Real screens from the FNDRS beta app.
 *
 * To swap in a new capture: drop the file into /public/app, keep the same
 * 9:19.5-ish phone aspect ratio, and point `src` at it. Width and height only
 * describe the intrinsic size of the file — layout is driven by the frame.
 */
export type Screenshot = {
  id: string;
  src: string;
  width: number;
  height: number;
  /** Short tab label. */
  label: string;
  /** Headline shown beside the screen. */
  title: string;
  /** One or two sentences describing what the screen does. */
  body: string;
  /** Accessible description of the image itself. */
  alt: string;
  /** Three short facts about the screen, shown as chips beside it. */
  highlights: string[];
};

export const screenshots: Screenshot[] = [
  {
    id: "match",
    src: "/app/match.webp",
    width: 900,
    height: 1957,
    label: "Smart Match",
    title: "A shortlist, not a search engine",
    body: "Matching scores people against what you’re building and what you’re missing. You get a ranked queue you can move through in a minute — skip, save, or reach out.",
    alt: "The FNDRS Smart Match screen showing the matching queue and its skip, save and connect actions.",
    highlights: ["Ranked queue", "Match score with reasons", "Skip, save or connect"],
  },
  {
    id: "home",
    src: "/app/home.webp",
    width: 900,
    height: 1957,
    label: "Home",
    title: "Your network, in one glance",
    body: "New matches, profile progress and updates from the founders you follow. Post a milestone, an open role, a poll or a question straight from the top of the feed.",
    alt: "The FNDRS home screen with a smart match card, profile completion card and the update composer.",
    highlights: ["New matches", "Profile progress", "Milestones, roles, polls"],
  },
  {
    id: "discover",
    src: "/app/discover.webp",
    width: 900,
    height: 1957,
    label: "Discover",
    title: "Everything around the match",
    body: "Startups, open opportunities, communities, events, investors, mentors, guides and weekly challenges — the layer that keeps the network useful between matches.",
    alt: "The FNDRS discover screen with cards for startups, opportunities, events, communities, investors, mentors, knowledge and challenges.",
    highlights: ["Startups and opportunities", "Communities and events", "Investors and mentors"],
  },
  {
    id: "inbox",
    src: "/app/inbox.webp",
    width: 900,
    height: 1957,
    label: "Messages",
    title: "Conversations with context",
    body: "Every thread starts with both sides knowing what the other is building. Filter to unread or to matches when the inbox gets busy.",
    alt: "The FNDRS messages screen with filters for all, unread and matches.",
    highlights: ["All, unread or matches", "Context on both sides", "No cold outreach"],
  },
  {
    id: "onboarding",
    src: "/app/onboarding.webp",
    width: 900,
    height: 1957,
    label: "Getting started",
    title: "Set up in minutes, in your language",
    body: "Tell FNDRS what you’re building, what you bring and what you need. The app runs in English and German, switchable at any time.",
    alt: "The FNDRS onboarding screen with a language switch between German and English and a create account button.",
    highlights: ["English and German", "Set up in minutes", "No resume required"],
  },
];

export const heroScreens = ["home", "match", "discover"] as const;
