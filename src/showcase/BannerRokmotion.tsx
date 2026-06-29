import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BannerRokmotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("rokmotion-logo-blue.svg")}
          style={{
            height: 96,
            width: "auto",
            transform: `scale(${interpolate(enter, [0, 1], [0.94, 1])})`,
            opacity: enter,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};