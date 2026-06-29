import { loadFont } from "@remotion/google-fonts/Inter";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  DURATION_IN_FRAMES,
  SCENE1_END,
  SCENE1_START,
  SCENE2_END,
  SCENE2_START,
  SCENE3_END,
  SCENE3_START,
  SCENE4_END,
  SCENE4_START,
  SCENE5_END,
  SCENE5_START,
} from "./timing";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const BG = "#08080c";
const ACCENT = "#f5f5f7";
const MUTED = "#8b8b9a";
const GROK = "#ffffff";
const REMOTION_BLUE = "#0b84f3";

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start: number, fps: number) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, DURATION_IN_FRAMES], [0.3, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 20%, rgba(11,132,243,${glow * 0.15}) 0%, ${BG} 70%)`,
      }}
    />
  );
};

const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - SCENE1_START;
  const opacity = fade(frame, SCENE1_START, SCENE1_END);
  const grokScale = slideUp(frame, SCENE1_START + 4, fps);
  const remotionScale = slideUp(frame, SCENE1_START + 10, fps);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          transform: `scale(${interpolate(grokScale, [0, 1], [0.85, 1])})`,
          opacity: grokScale,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 800,
            color: GROK,
          }}
        >
          𝕏
        </div>
        <span style={{ fontSize: 64, fontWeight: 300, color: MUTED }}>+</span>
        <div
          style={{
            transform: `scale(${interpolate(remotionScale, [0, 1], [0.85, 1])})`,
            opacity: remotionScale,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: REMOTION_BLUE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            R
          </div>
          <span style={{ fontSize: 52, fontWeight: 700, color: ACCENT }}>
            Remotion
          </span>
        </div>
      </div>
      <p
        style={{
          marginTop: 36,
          fontSize: 28,
          color: MUTED,
          opacity: interpolate(local, [18, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Programmatic video with AI
      </p>
    </AbsoluteFill>
  );
};

const ScaffoldScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, SCENE2_START, SCENE2_END);
  const enter = slideUp(frame, SCENE2_START, fps);
  const typed = Math.floor(
    interpolate(frame, [SCENE2_START + 8, SCENE2_START + 28], [0, 28], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }),
  );
  const command = "npx create-video@latest --blank my-video";

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        fontFamily,
        padding: 80,
      }}
    >
      <div style={{ width: "100%", maxWidth: 900, transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`, opacity: enter }}>
        <p style={{ fontSize: 22, color: REMOTION_BLUE, fontWeight: 700, marginBottom: 16, letterSpacing: 2 }}>
          STEP 1
        </p>
        <h2 style={{ fontSize: 44, fontWeight: 700, color: ACCENT, margin: "0 0 32px" }}>
          Scaffold your project
        </h2>
        <div
          style={{
            background: "#111118",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "28px 32px",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 26,
            color: "#7ee787",
            boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
          }}
        >
          <span style={{ color: MUTED }}>$ </span>
          {command.slice(0, typed)}
          <span
            style={{
              opacity: Math.sin(frame / 4) > 0 ? 1 : 0,
              color: ACCENT,
            }}
          >
            ▌
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const GrokScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, SCENE3_START, SCENE3_END);
  const enter = slideUp(frame, SCENE3_START, fps);
  const bubble1 = interpolate(frame, [SCENE3_START + 6, SCENE3_START + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubble2 = interpolate(frame, [SCENE3_START + 18, SCENE3_START + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        fontFamily,
        padding: 80,
      }}
    >
      <div style={{ width: "100%", maxWidth: 860, transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`, opacity: enter }}>
        <p style={{ fontSize: 22, color: REMOTION_BLUE, fontWeight: 700, marginBottom: 16, letterSpacing: 2 }}>
          STEP 2
        </p>
        <h2 style={{ fontSize: 44, fontWeight: 700, color: ACCENT, margin: "0 0 28px" }}>
          Describe your video to Grok
        </h2>
        <div
          style={{
            background: "#111118",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "78%",
              background: "rgba(11,132,243,0.2)",
              border: "1px solid rgba(11,132,243,0.35)",
              borderRadius: "18px 18px 4px 18px",
              padding: "16px 20px",
              fontSize: 22,
              color: ACCENT,
              opacity: bubble1,
              transform: `translateY(${interpolate(bubble1, [0, 1], [16, 0])}px)`,
            }}
          >
            Make a 10s intro with synced audio & motion graphics
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "82%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "18px 18px 18px 4px",
              padding: "16px 20px",
              fontSize: 22,
              color: "#d4d4dc",
              opacity: bubble2,
              transform: `translateY(${interpolate(bubble2, [0, 1], [16, 0])}px)`,
            }}
          >
            ✓ Building Remotion composition with Sequences & Audio…
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SyncScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, SCENE4_START, SCENE4_END);
  const enter = slideUp(frame, SCENE4_START, fps);
  const playhead = interpolate(frame, [SCENE4_START + 6, SCENE4_END - 6], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        fontFamily,
        padding: 80,
      }}
    >
      <div style={{ width: "100%", maxWidth: 900, transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`, opacity: enter }}>
        <p style={{ fontSize: 22, color: REMOTION_BLUE, fontWeight: 700, marginBottom: 16, letterSpacing: 2 }}>
          STEP 3
        </p>
        <h2 style={{ fontSize: 44, fontWeight: 700, color: ACCENT, margin: "0 0 28px" }}>
          Sync audio & graphics
        </h2>
        <div
          style={{
            background: "#111118",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 24,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["Audio", "Title", "Scene 2", "Scene 3"].map((label, i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 8,
                  background:
                    i === 0
                      ? "linear-gradient(90deg, #0b84f3 0%, #6366f1 100%)"
                      : `hsl(${210 + i * 30}, 70%, 55%)`,
                  opacity: playhead > i * 22 ? 1 : 0.35,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: `${12 + playhead * 0.76}%`,
              top: 12,
              bottom: 12,
              width: 3,
              background: "#ff4466",
              borderRadius: 2,
              boxShadow: "0 0 12px rgba(255,68,102,0.8)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff4466" }} />
            <span style={{ fontSize: 18, color: MUTED }}>
              &lt;Sequence from=&#123;15&#125;&gt; + &lt;Audio /&gt;
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const RenderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, SCENE5_START, SCENE5_END + 20);
  const enter = slideUp(frame, SCENE5_START, fps);
  const progress = interpolate(frame, [SCENE5_START + 4, SCENE5_START + 18], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        fontFamily,
        padding: 80,
      }}
    >
      <div
        style={{
          textAlign: "center",
          transform: `scale(${interpolate(enter, [0, 1], [0.9, 1])})`,
          opacity: enter,
        }}
      >
        <h2 style={{ fontSize: 52, fontWeight: 800, color: ACCENT, margin: "0 0 36px" }}>
          Render your video
        </h2>
        <div
          style={{
            width: 420,
            height: 12,
            borderRadius: 6,
            background: "rgba(255,255,255,0.1)",
            margin: "0 auto 20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${REMOTION_BLUE}, #6366f1)`,
              borderRadius: 6,
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 22,
            color: "#7ee787",
          }}
        >
          npx remotion render GrokRemotionIntro out/video.mp4
        </p>
        <p style={{ fontSize: 20, color: MUTED, marginTop: 16 }}>
          {Math.round(progress)}% — Done!
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const GrokRemotionIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Background />
      <TitleScene />
      <ScaffoldScene />
      <GrokScene />
      <SyncScene />
      <RenderScene />
      <Audio src={staticFile("narration.mp3")} />
    </AbsoluteFill>
  );
};