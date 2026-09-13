import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Shashwat Jain";
export const size = {
  width: 1280,
  height: 720,
};
export const contentType = "image/png";

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), "public/fonts/texgyrepagella-regular.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#1b1a19",
          color: "#f4f1eb",
          padding: "80px 96px",
          fontFamily: "TeX Gyre Pagella",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.15 }}>
          {site.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            lineHeight: 1.4,
            color: "#aaa59e",
            maxWidth: 960,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 20,
            color: "#2DD4BF",
          }}
        >
          shashwatjain.tech
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "TeX Gyre Pagella",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
