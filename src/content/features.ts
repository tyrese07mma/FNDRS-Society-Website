import type { IconName } from "@/components/ui/Icon";

export type Feature = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  icon: IconName;
};

/** Primary surfaces — the ones that carry the core promise of the product. */
export const coreFeatures: Feature[] = [
  {
    id: "smart-match",
    title: "Smart Match",
    summary: "Ranked matches, not an endless directory.",
    detail:
      "Matching reads what you're building, the stage you're at, the skills you bring and the ones you're missing, then scores the people worth your attention. You review a shortlist and decide — skip, save, or reach out.",
    icon: "sparkles",
  },
  {
    id: "profiles",
    title: "Founder profiles",
    summary: "What you're building and what you need, in one place.",
    detail:
      "A profile built for collaboration rather than recruitment: your project, your stack, your strengths, your interests, and the role or skill set you're actively looking for.",
    icon: "userCheck",
  },
  {
    id: "opportunities",
    title: "Opportunities",
    summary: "Open roles and co-founder searches.",
    detail:
      "Post the seat you need filled — technical co-founder, first designer, growth lead — or browse what other founders are searching for. Intent is stated up front, so nobody wastes a conversation.",
    icon: "briefcase",
  },
  {
    id: "issues",
    title: "Problems worth solving",
    summary: "Post the blocker. Find the person who has solved it.",
    detail:
      "Not every gap is a hire. Sometimes it's one specific problem — pricing, infrastructure, a stalled launch. Put it in front of people who have already been through it.",
    icon: "lifebuoy",
  },
  {
    id: "startups",
    title: "Startups & projects",
    summary: "See what's actually being built.",
    detail:
      "Launches, side projects and early companies from across the network. Follow the ones you care about, or find the one you want to help build.",
    icon: "rocket",
  },
  {
    id: "messaging",
    title: "Messaging",
    summary: "From match to conversation without a cold email.",
    detail:
      "Chat directly with matches and with founders whose profiles you land on. Context travels with the conversation, so the first message is never a blank page.",
    icon: "message",
  },
];

/** Supporting surfaces — the network layer around the matching core. */
export const networkFeatures: Feature[] = [
  {
    id: "communities",
    title: "Communities",
    summary: "Topic-based rooms — AI, fintech, design, whatever you're deep in.",
    detail: "Topic-based rooms — AI, fintech, design, whatever you're deep in.",
    icon: "users",
  },
  {
    id: "events",
    title: "Events",
    summary: "Pitch nights, meetups and sessions run by and for the network.",
    detail: "Pitch nights, meetups and sessions run by and for the network.",
    icon: "calendar",
  },
  {
    id: "investors",
    title: "Investors",
    summary: "Direct contacts instead of a forwarded deck and silence.",
    detail: "Direct contacts instead of a forwarded deck and silence.",
    icon: "trendingUp",
  },
  {
    id: "mentors",
    title: "Mentors",
    summary: "Book one-to-one sessions with operators who have shipped it before.",
    detail: "Book one-to-one sessions with operators who have shipped it before.",
    icon: "graduationCap",
  },
  {
    id: "knowledge",
    title: "Knowledge",
    summary: "Practical guides for the parts of building nobody hands you.",
    detail: "Practical guides for the parts of building nobody hands you.",
    icon: "bookOpen",
  },
  {
    id: "challenges",
    title: "Challenges",
    summary: "Weekly prompts that turn intention into shipped work.",
    detail: "Weekly prompts that turn intention into shipped work.",
    icon: "trophy",
  },
];

export const copilot: Feature = {
  id: "copilot",
  title: "FNDRS Copilot",
  summary: "An AI layer that knows what you're building.",
  detail:
    "Pitch feedback, outreach drafts and hiring plans, written against your actual profile and project rather than a generic prompt. It suggests who to talk to next and why.",
  icon: "bot",
};
