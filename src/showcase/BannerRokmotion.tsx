import { loadFont } from "@remotion/google-fonts/Nunito";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BLUE = "#0b84f3";
const BLUE_LIGHT = "#3aa0ff";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const RokmotionIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 68 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={BLUE_LIGHT} />
        <stop offset="100%" stopColor={BLUE} />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="52" height="72" rx="8" fill="url(#iconGrad)" stroke={BLUE_LIGHT} strokeWidth="2" />
    <rect x="12" y="20" width="36" height="16" rx="3" fill="rgba(0,0,0,0.2)" />
    <rect x="12" y="44" width="36" height="16" rx="3" fill="rgba(0,0,0,0.2)" />
    <circle cx="12" cy="28" r="3" fill="rgba(255,255,255,0.5)" />
    <circle cx="48" cy="28" r="3" fill="rgba(255,255,255,0.5)" />
    <circle cx="12" cy="52" r="3" fill="rgba(255,255,255,0.5)" />
    <circle cx="48" cy="52" r="3" fill="rgba(255,255,255,0.5)" />
  </svg>
);

export const BannerRokmotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const iconProgress = interpolate(frame, [0, 22], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const textProgress = interpolate(frame, [10, 32], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const settle = interpolate(frame, [32, durationInFrames], [0, 1], clamp);
  const breathe = interpolate(settle, [0, 0.5, 1], [1, 1.018, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const glowStrength = interpolate(settle, [0, 0.5, 1], [0.35, 0.7, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  const iconScale = interpolate(iconProgress, [0, 1], [0.82, 1]);
  const iconOpacity = iconProgress;
  const textX = interpolate(textProgress, [0, 1], [36, 0]);
  const textOpacity = textProgress;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            transform: `scale(${breathe})`,
          }}
        >
          <div
            style={{
              opacity: iconOpacity,
              transform: `scale(${iconScale})`,
              filter: `drop-shadow(0 4px 18px rgba(11,132,243,${glowStrength}))`,
            }}
          >
            <RokmotionIcon size={112} />
          </div>
          <div
            style={{
              opacity: textOpacity,
              transform: `translateX(${textX}px)`,
              fontFamily,
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
              background: `linear-gradient(135deg, ${BLUE_LIGHT} 0%, ${BLUE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: `drop-shadow(0 6px 24px rgba(11,132,243,${glowStrength * 0.85}))`,
            }}
          >
            Rokmotion
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};