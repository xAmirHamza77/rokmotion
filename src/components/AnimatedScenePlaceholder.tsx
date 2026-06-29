import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

export const AnimatedScenePlaceholder: React.FC<{
  title?: string;
  accentColor?: string;
}> = ({ title = "Animated Scene", accentColor = "#0b84f3" }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: enter,
      }}
    >
      <div
        style={{
          width: 640,
          padding: "48px 56px",
          borderRadius: 24,
          background: "rgba(255,255,255,0.06)",
          border: `2px solid ${accentColor}55`,
          textAlign: "center",
          translate: `0 ${interpolate(enter, [0, 1], [30, 0])}px`,
        }}
      >
        <p
          style={{
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: 16,
            fontWeight: 700,
          }}
        >
          Rokmotion overlay
        </p>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#f8fafc",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
    </AbsoluteFill>
  );
};