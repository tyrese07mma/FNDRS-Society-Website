export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Build your profile",
    body: "What you’re building, what you’re good at, and where you are. Five minutes, no résumé.",
  },
  {
    number: "02",
    title: "Name what’s missing",
    body: "A co-founder, a specific skill, a first hire, or one problem you can’t get past. Say it plainly.",
  },
  {
    number: "03",
    title: "Get matched",
    body: "Smart Match scores people against your stage, skills, intent and location, and puts a shortlist in front of you.",
  },
  {
    number: "04",
    title: "Connect",
    body: "Skip, save or reach out. Conversations start with context on both sides, so the first message goes somewhere.",
  },
  {
    number: "05",
    title: "Build",
    body: "Turn a match into a co-founder, a first hire, or a solved problem — and get back to work.",
  },
];
