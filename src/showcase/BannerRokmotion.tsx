import { loadFont } from "@remotion/google-fonts/Inter";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});

const BLUE = "#0b84f3";
const BLUE_DARK = "#0660b8";
const BG = "#0a1020";

export const BannerRokmotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const glow = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [0.35, 0.85, 0.35],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const shimmer = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 90% 80% at 50% 40%, rgba(11,132,243,${glow * 0.35}) 0%, ${BG} 65%)`,
        fontFamily,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,132,243,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(11,132,243,0.08) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${-20 + shimmer * 140}%`,
          top: 0,
          bottom: 0,
          width: "30%",
          background:
            "linear-gradient(90deg,transparent,rgba(11,132,243,0.12),transparent)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 28,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_DARK} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 800,
            color: "#fff",
            boxShadow: `0 0 ${30 + glow * 40}px rgba(11,132,243,${glow})`,
          }}
        >
          R
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Created with
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -1,
              textShadow: `0 0 ${20 + glow * 50}px rgba(11,132,243,${glow * 0.9})`,
            }}
          >
            <span style={{ color: BLUE }}>Rok</span>
            <span>motion</span>
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${BLUE}, transparent)`,
          opacity: glow,
        }}
      />
    </AbsoluteFill>
  );
};