import type { IconName } from "@/components/ui/Icon";

export type Audience = {
  title: string;
  body: string;
  icon: IconName;
};

export const audiences: Audience[] = [
  {
    title: "Founders",
    body: "You’re building and something is missing — a co-founder, a first hire, a specialist for one hard problem.",
    icon: "rocket",
  },
  {
    title: "Future founders",
    body: "You have the idea and the appetite. You’re looking for the people who make it real.",
    icon: "zap",
  },
  {
    title: "Engineers",
    body: "You can ship. You want a project worth shipping, with people who match your standard.",
    icon: "layers",
  },
  {
    title: "Designers",
    body: "You want product ownership from day one, not a ticket queue.",
    icon: "compass",
  },
  {
    title: "Marketers & growth",
    body: "You know how to find the first thousand users. You’re looking for something worth putting them onto.",
    icon: "megaphone",
  },
  {
    title: "Operators & experts",
    body: "You’ve done the hard part before. You want to do it again — as a co-founder, an advisor, or a mentor.",
    icon: "graduationCap",
  },
];
