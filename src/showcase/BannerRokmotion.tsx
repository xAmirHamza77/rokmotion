import { loadFont } from "@remotion/google-fonts/Nunito";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["latin"],
});

const BLUE = "#0b84f3";
const BLUE_LIGHT = "#3aa0ff";
const BG_TOP = "#061428";
const BG_BOTTOM = "#0b2d6b";

export const BannerRokmotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = Math.max(
    0.15,
    spring({ frame, fps, config: { damping: 16, stiffness: 90 } }),
  );
  const pulse = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [0.5, 1, 0.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BG_TOP} 0%, ${BG_BOTTOM} 55%, ${BLUE}22 100%)`,
        fontFamily,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,132,243,${pulse * 0.45}) 0%, transparent 70%)`,
        }}
      />

      {/* Film strip — Rokmotion brand mark, not Remotion R-box */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: `translateY(-50%) scale(${interpolate(enter, [0, 1], [0.6, 1])}) rotate(${interpolate(enter, [0, 1], [-12, -4])}deg)`,
          opacity: enter,
          width: 56,
          height: 80,
          borderRadius: 8,
          background: `linear-gradient(180deg, ${BLUE_LIGHT}, ${BLUE})`,
          border: "2px solid rgba(255,255,255,0.25)",
          boxShadow: `0 0 ${24 + pulse * 30}px rgba(11,132,243,${pulse * 0.8})`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px 8px",
        }}
      >
        {[0, 1].map((row) => (
          <div key={row} style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
          </div>
        ))}
        <div style={{ flex: 1, margin: "6px 0", borderRadius: 4, background: "rgba(0,0,0,0.25)" }} />
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            transform: `scale(${interpolate(enter, [0, 1], [0.88, 1])})`,
            opacity: enter,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -2,
              textShadow: `0 0 ${30 + pulse * 40}px rgba(11,132,243,${pulse})`,
            }}
          >
            <span style={{ color: BLUE_LIGHT }}>Rok</span>
            <span style={{ color: "#ffffff" }}>motion</span>
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 24,
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Videos from code
          </div>
        </div>
      </AbsoluteFill>

      {/* Scissors accent — paper-craft brand */}
      <div
        style={{
          position: "absolute",
          right: 130,
          top: "50%",
          transform: `translateY(-50%) rotate(${12 + Math.sin(frame * 0.15) * 6}deg)`,
          fontSize: 48,
          opacity: 0.55,
        }}
      >
        ✂️
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent 0%, ${BLUE} 50%, transparent 100%)`,
          opacity: pulse,
        }}
      />
    </AbsoluteFill>
  );
};