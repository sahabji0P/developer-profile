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
          background: "#f7f7f4",
          color: "#26251e",
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
            color: "rgba(38, 37, 30, 0.6)",
            maxWidth: 960,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 20,
            color: "#f54e00",
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
