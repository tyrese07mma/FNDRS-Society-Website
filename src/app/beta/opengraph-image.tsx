import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "FNDRS Society — Get in before the network fills up";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Early access",
    title: "Get in before the network fills up",
    subtitle: "FNDRS Society is in private beta. Spots are released in batches.",
  });
}
