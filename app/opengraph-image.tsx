import { ImageResponse } from "next/og";
import { AUTHOR_NAME, SITE_NAME } from "@/constants/seo";

export const runtime = "edge";

export const alt = `${AUTHOR_NAME} Open Graph Image`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const headline = "Building systems that scale";
const tags = ["Systems", "Scalable", "Architecture"];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(198,166,93,0.22), transparent 34%), linear-gradient(135deg, #0d0c09 0%, #141310 48%, #1a1712 100%)",
          color: "#fcfbf8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 130,
            width: 520,
            height: 220,
            display: "flex",
            background:
              "radial-gradient(circle, rgba(213,181,111,0.14) 0%, rgba(213,181,111,0.05) 44%, transparent 76%)",
            opacity: 0.95,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(198,166,93,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(198,166,93,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            opacity: 0.12,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 40,
            right: 76,
            width: 220,
            height: 220,
            display: "flex",
            border: "1px solid rgba(198,166,93,0.08)",
            opacity: 0.24,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            display: "flex",
            border: "1px solid rgba(198,166,93,0.06)",
            opacity: 0.2,
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "44px 52px 34px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "36px 46px 30px",
              border: "1px solid rgba(198,166,93,0.14)",
              background:
                "linear-gradient(180deg, rgba(27,24,19,0.98) 0%, rgba(19,18,15,0.99) 100%)",
              boxShadow: "0 28px 72px rgba(0,0,0,0.34)",
              outline: "1px solid rgba(198,166,93,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "rgba(207,177,106,0.78)",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                {SITE_NAME}
              </div>

              <div
                style={{
                  display: "flex",
                  width: 80,
                  height: 1,
                  background: "rgba(198,166,93,0.38)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                maxWidth: "720px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#fffefc",
                  fontSize: 92,
                  fontWeight: 800,
                  lineHeight: 0.88,
                  letterSpacing: "-0.07em",
                  textShadow: "0 10px 28px rgba(0,0,0,0.24)",
                }}
              >
                {AUTHOR_NAME}
              </div>

              <div
                style={{
                  display: "flex",
                  color: "#d5b56f",
                  fontSize: 30,
                  fontWeight: 600,
                  lineHeight: 1.16,
                  letterSpacing: "-0.04em",
                  maxWidth: "520px",
                }}
              >
                {headline}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "9px 14px",
                    border: "1px solid rgba(213,181,111,0.18)",
                    background: "rgba(22,21,18,0.92)",
                    color: "rgba(248,247,246,0.82)",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
