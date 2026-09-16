import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "FNDRS Society — From a profile to a co-founder";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "How it works",
    title: "From a profile to a co-founder",
    subtitle: "Five steps, no pitch deck and no waiting for an introduction.",
  });
}
