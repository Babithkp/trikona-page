import { ImageResponse } from "next/og";

/**
 * Generated social preview card.
 *
 * Built with next/og at build time — no design tooling, no binary asset to
 * keep in sync with the brand, and Next also derives the Twitter card image
 * from this route.
 */
export const alt =
  "Trikona: UI/UX design, web and app development studio in Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand bloom */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(166,50,242,0.30), rgba(166,50,242,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(251,163,37,0.32), rgba(251,163,37,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(100deg, #a632f2, #fba325)",
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#0d0d14",
              letterSpacing: -0.5,
            }}
          >
            Trikona
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#0d0d14",
              letterSpacing: -3,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Design. Build. Scale.
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#63636f",
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            A Bengaluru product studio building websites, web apps and MVPs.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#8d8d9c",
          }}
        >
          <div
            style={{
              height: 4,
              width: 72,
              borderRadius: 9999,
              background: "linear-gradient(100deg, #a632f2, #fba325)",
            }}
          />
          trikonatech.com
        </div>
      </div>
    ),
    size,
  );
}
