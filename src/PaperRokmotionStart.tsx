import { loadFont } from "@remotion/google-fonts/PatrickHand";
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
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
import { paperRokmotionStartTiming as T } from "./voiceover/PaperRokmotionStart.timing";

const { fontFamily: handFont } = loadFont();
const { fontFamily: bodyFont } = loadNunito("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});

const PAPER = "#faf6ee";
const KRAFT = "#e8dcc8";
const INK = "#2d2926";
const MUTED = "#6b5e54";
const ACCENT = "#e85d4c";
const ACCENT2 = "#3d7a5f";
const TAPE = "rgba(255, 220, 120, 0.75)";

const sceneFade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 10, end - 10, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const paperEnter = (frame: number, start: number, fps: number) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

const wobble = (frame: number, seed = 0) =>
  Math.sin(frame * 0.35 + seed) * 1.8;

const PaperTexture: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(160deg, ${PAPER} 0%, ${KRAFT} 55%, #dfd0b8 100%)`,
    }}
  >
    <AbsoluteFill
      style={{
        opacity: 0.08,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }}
    />
  </AbsoluteFill>
);

const Tape: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: 72,
      height: 26,
      background: TAPE,
      borderRadius: 2,
      boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
      ...style,
    }}
  />
);

const PaperCard: React.FC<{
  children: React.ReactNode;
  rotate?: number;
  width?: number | string;
  style?: React.CSSProperties;
}> = ({ children, rotate = -2, width = 720, style }) => (
  <div
    style={{
      width,
      background: PAPER,
      borderRadius: 4,
      padding: "40px 48px",
      boxShadow:
        "0 2px 0 #d9cdb8, 0 8px 24px rgba(45,41,38,0.18), 0 16px 40px rgba(45,41,38,0.08)",
      border: "1px solid rgba(45,41,38,0.06)",
      position: "relative",
      rotate: `${rotate}deg`,
      ...style,
    }}
  >
    {children}
  </div>
);

const StepLabel: React.FC<{ n: number; color?: string }> = ({
  n,
  color = ACCENT,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 52,
      height: 52,
      borderRadius: "50%",
      background: color,
      color: "#fff",
      fontFamily: handFont,
      fontSize: 28,
      fontWeight: 700,
      boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
      marginBottom: 20,
    }}
  >
    {n}
  </div>
);

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneFade(frame, T.intro.start, T.intro.end);
  const enter = paperEnter(frame, T.intro.start + 2, fps);
  const titleY = interpolate(enter, [0, 1], [80, 0]);
  const pieces = [0, 1, 2].map((i) =>
    interpolate(frame, [T.intro.start + 8 + i * 6, T.intro.start + 20 + i * 6], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    }),
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <PaperCard
        rotate={wobble(frame, 1)}
        width={820}
        style={{
          opacity: enter,
          translate: `0 ${titleY}px`,
        }}
      >
        <Tape style={{ top: -10, left: "38%", rotate: "-4deg" }} />
        <h1
          style={{
            fontFamily: handFont,
            fontSize: 72,
            color: INK,
            margin: 0,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Start Rokmotion
          <br />
          with Grok
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: 32,
          }}
        >
          {["✂️", "📄", "🎬"].map((emoji, i) => (
            <div
              key={emoji}
              style={{
                scale: pieces[i],
                width: 64,
                height: 64,
                background: KRAFT,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                boxShadow: "0 3px 0 #c9b89a",
                rotate: `${wobble(frame, i + 2)}deg`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: 26,
            color: MUTED,
            textAlign: "center",
            marginTop: 28,
            opacity: interpolate(frame, [T.intro.start + 18, T.intro.start + 28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Paper animation · synced with audio
        </p>
      </PaperCard>
    </AbsoluteFill>
  );
};

const Step1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneFade(frame, T.step1.start, T.step1.end);
  const enter = paperEnter(frame, T.step1.start + 2, fps);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity }}
    >
      <PaperCard
        rotate={-3 + wobble(frame, 3)}
        style={{ opacity: enter, translate: `0 ${interpolate(enter, [0, 1], [50, 0])}px` }}
      >
        <Tape style={{ top: -8, right: 40, rotate: "8deg" }} />
        <StepLabel n={1} />
        <h2 style={{ fontFamily: handFont, fontSize: 48, color: INK, margin: "0 0 20px" }}>
          Open Grok
        </h2>
        <p style={{ fontFamily: bodyFont, fontSize: 24, color: MUTED, margin: "0 0 28px" }}>
          Type the slash command to invoke Rokmotion
        </p>
        <div
          style={{
            background: "#fffef9",
            border: `3px dashed ${ACCENT}`,
            borderRadius: 12,
            padding: "22px 28px",
            fontFamily: handFont,
            fontSize: 42,
            color: ACCENT,
            textAlign: "center",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          /rokmotion
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

const Step2Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneFade(frame, T.step2.start, T.step2.end);
  const enter = paperEnter(frame, T.step2.start + 2, fps);
  const noteRotate = -6 + wobble(frame, 4);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity }}
    >
      <PaperCard
        rotate={2 + wobble(frame, 5)}
        width={780}
        style={{ opacity: enter, translate: `0 ${interpolate(enter, [0, 1], [40, 0])}px` }}
      >
        <StepLabel n={2} color={ACCENT2} />
        <h2 style={{ fontFamily: handFont, fontSize: 46, color: INK, margin: "0 0 16px" }}>
          Describe your video
        </h2>
        <div
          style={{
            position: "relative",
            marginTop: 12,
          }}
        >
          <div
            style={{
              background: "#fff9c4",
              padding: "28px 32px",
              borderRadius: 4,
              rotate: `${noteRotate}deg`,
              boxShadow: "0 4px 0 #e6d56c, 0 8px 20px rgba(0,0,0,0.1)",
              fontFamily: handFont,
              fontSize: 28,
              color: INK,
              lineHeight: 1.45,
              maxWidth: 520,
            }}
          >
            Make a 30 second paper animation tutorial — synced with ElevenLabs audio!
          </div>
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

const Step3Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneFade(frame, T.step3.start, T.step3.end);
  const enter = paperEnter(frame, T.step3.start + 2, fps);

  const layers = [0, 1, 2].map((i) =>
    interpolate(frame, [T.step3.start + 6 + i * 8, T.step3.start + 18 + i * 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity }}
    >
      <PaperCard
        rotate={wobble(frame, 6)}
        width={800}
        style={{ opacity: enter }}
      >
        <StepLabel n={3} />
        <h2 style={{ fontFamily: handFont, fontSize: 46, color: INK, margin: "0 0 24px" }}>
          Grok builds your scenes
        </h2>
        <div style={{ position: "relative", height: 200 }}>
          {[
            { label: "Intro", color: "#ffd6a5", offset: 0 },
            { label: "Steps", color: "#caffbf", offset: 28 },
            { label: "Outro", color: "#bdb2ff", offset: 56 },
          ].map((layer, i) => (
            <div
              key={layer.label}
              style={{
                position: "absolute",
                left: 40 + layer.offset,
                top: 20 + i * 8,
                width: 280,
                height: 120,
                background: layer.color,
                borderRadius: 6,
                border: "2px solid rgba(45,41,38,0.12)",
                boxShadow: "0 6px 0 rgba(0,0,0,0.08)",
                rotate: `${-4 + i * 3 + wobble(frame, i + 7)}deg`,
                opacity: layers[i],
                translate: `0 ${interpolate(layers[i], [0, 1], [30, 0])}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: handFont,
                fontSize: 32,
                color: INK,
              }}
            >
              {layer.label}
            </div>
          ))}
        </div>
        <p style={{ fontFamily: bodyFont, fontSize: 22, color: MUTED, marginTop: 16 }}>
          Cut-paper style Remotion composition
        </p>
      </PaperCard>
    </AbsoluteFill>
  );
};

const Step4Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneFade(frame, T.step4.start, T.step4.end);
  const enter = paperEnter(frame, T.step4.start + 2, fps);
  const waveProgress = interpolate(
    frame,
    [T.step4.start + 8, T.step4.end - 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bars = 24;

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity }}
    >
      <PaperCard rotate={-2 + wobble(frame, 8)} style={{ opacity: enter }}>
        <Tape style={{ top: -10, left: 24, rotate: "-6deg" }} />
        <StepLabel n={4} color="#6c63ff" />
        <h2 style={{ fontFamily: handFont, fontSize: 46, color: INK, margin: "0 0 20px" }}>
          Sync audio to scenes
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            height: 100,
            marginBottom: 20,
          }}
        >
          {Array.from({ length: bars }).map((_, i) => {
            const h = 20 + Math.sin(i * 0.7) * 30 + Math.cos(i * 1.2) * 15;
            const active = i / bars < waveProgress;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: active ? h : 8,
                  background: active ? "#6c63ff" : KRAFT,
                  borderRadius: 3,
                  opacity: active ? 1 : 0.4,
                  transition: "none",
                }}
              />
            );
          })}
        </div>
        <p style={{ fontFamily: bodyFont, fontSize: 22, color: MUTED }}>
          ElevenLabs voiceover · scene timing from alignment
        </p>
      </PaperCard>
    </AbsoluteFill>
  );
};

const Step5Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = sceneFade(frame, T.step5.start, T.step5.end);
  const enter = paperEnter(frame, T.step5.start + 2, fps);
  const progress = interpolate(
    frame,
    [T.step5.start + 6, T.step5.start + 24],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );
  const checkScale = interpolate(
    frame,
    [T.step5.start + 20, T.step5.start + 32],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.6)),
    },
  );

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity }}
    >
      <PaperCard
        rotate={wobble(frame, 9)}
        width={760}
        style={{
          opacity: enter,
          textAlign: "center",
        }}
      >
        <StepLabel n={5} />
        <h2 style={{ fontFamily: handFont, fontSize: 50, color: INK, margin: "0 0 24px" }}>
          Render your MP4
        </h2>
        <div
          style={{
            height: 18,
            background: KRAFT,
            borderRadius: 9,
            overflow: "hidden",
            marginBottom: 20,
            border: "2px solid rgba(45,41,38,0.08)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${ACCENT2}, ${ACCENT})`,
              borderRadius: 7,
            }}
          />
        </div>
        <p
          style={{
            fontFamily: handFont,
            fontSize: 24,
            color: MUTED,
            margin: "0 0 16px",
          }}
        >
          npx remotion render PaperRokmotionStart out/video.mp4
        </p>
        <div
          style={{
            scale: checkScale,
            fontSize: 56,
            color: ACCENT2,
          }}
        >
          ✓ Ready!
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

export const PaperRokmotionStart: React.FC = () => {
  return (
    <AbsoluteFill>
      <PaperTexture />
      <IntroScene />
      <Step1Scene />
      <Step2Scene />
      <Step3Scene />
      <Step4Scene />
      <Step5Scene />
      <Audio src={staticFile("voiceover/PaperRokmotionStart/narration.mp3")} />
    </AbsoluteFill>
  );
};