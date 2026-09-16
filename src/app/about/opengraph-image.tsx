import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "FNDRS Society — A network for the thing you can’t do alone";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "About",
    title: "A network for the thing you can’t do alone",
    subtitle: "What FNDRS Society is, who it is for, and why career networks miss this.",
  });
}
