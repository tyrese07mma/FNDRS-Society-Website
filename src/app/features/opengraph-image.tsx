import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "FNDRS Society — Everything is pointed at one outcome";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Product",
    title: "Everything is pointed at one outcome",
    subtitle: "Smart Match, profiles, opportunities, messaging and the FNDRS Copilot.",
  });
}
