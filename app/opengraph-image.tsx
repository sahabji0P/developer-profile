import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Shashwat Jain";
export const size = {
  width: 1280,
  height: 720,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0c0c0b",
          color: "#e8e6e1",
          padding: "80px 96px",
          fontFamily:
            'ui-sans-serif, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            lineHeight: 1.4,
            color: "rgba(232, 230, 225, 0.55)",
            maxWidth: 960,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 20,
            color: "#5ecfc0",
            letterSpacing: "-0.02em",
          }}
        >
          shashwatjain.tech
        </div>
      </div>
    ),
    { ...size },
  );
}
