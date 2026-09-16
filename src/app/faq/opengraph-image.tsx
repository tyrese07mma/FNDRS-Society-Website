import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "FNDRS Society — Questions, answered plainly";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "FAQ",
    title: "Questions, answered plainly",
    subtitle: "Who can join, how matching works, pricing during the beta and what comes next.",
  });
}
