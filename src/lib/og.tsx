import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "./site";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/**
 * Subsetted TTFs (satori cannot read woff2). Read from disk rather than fetched
 * so the images render during the build with no network access.
 */
const fontDir = join(process.cwd(), "src", "fonts", "og");

/**
 * Shared social card. Every route renders the same composition with its own
 * label and headline, so a shared link looks deliberate wherever it lands.
 */
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const [display, body] = await Promise.all([
    readFile(join(fontDir, "InterDisplay-Bold-subset.ttf")),
    readFile(join(fontDir, "Inter-Regular-subset.ttf")),
  ]);

  // Long headlines need to stay on one or two lines inside a fixed frame.
  const fontSize = title.length > 38 ? 68 : title.length > 22 ? 84 : 100;

  // A hyphen is a legal break point, so "co-founder" would split across lines.
  // A non-breaking hyphen looks identical and forces the break to a space.
  const headline = title.replace(/-/g, "\u2011");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(900px 520px at 50% -10%, rgba(187,156,99,0.22), rgba(8,8,10,0) 70%)",
          padding: "72px 76px",
          fontFamily: "Inter",
          color: "#f4f1e9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, letterSpacing: 11, fontFamily: "InterDisplay" }}>FNDRS</div>
            <div style={{ fontSize: 15, letterSpacing: 8, color: "rgba(244,241,233,0.5)", marginTop: 8 }}>
              SOCIETY
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(187,156,99,0.42)",
              backgroundColor: "rgba(48,41,30,0.6)",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 20,
              color: "#e4cd9b",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "InterDisplay",
              fontSize,
              lineHeight: 1.03,
              letterSpacing: -3,
              display: "flex",
              maxWidth: 1048,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 29,
              lineHeight: 1.42,
              color: "rgba(244,241,233,0.62)",
              maxWidth: 880,
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Painted in DOM order — the ringed circle sits on top. */}
            <div
              style={{ display: "flex", width: 34, height: 34, borderRadius: 999, backgroundColor: "#4a5038" }}
            />
            <div
              style={{
                display: "flex",
                width: 34,
                height: 34,
                borderRadius: 999,
                backgroundColor: "#20241a",
                border: "2px solid #bb9c63",
                marginLeft: -12,
              }}
            />
          </div>
          <div style={{ fontSize: 22, color: "rgba(244,241,233,0.45)" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "InterDisplay", data: display, style: "normal", weight: 700 },
        { name: "Inter", data: body, style: "normal", weight: 400 },
      ],
    },
  );
}
