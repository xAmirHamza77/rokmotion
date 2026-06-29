import {
  AbsoluteFill,
  Audio,
  Easing,
  Series,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { RokmotionTutorialProps } from "./calculate-metadata/rokmotion-tutorial";

const BG = "#0a0a12";
const ACCENT = "#00d4ff";
const ACCENT2 = "#a855f7";
const TEXT = "#f8fafc";
const MUTED = "#94a3b8";

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const SceneShell: React.FC<{
  children: React.ReactNode;
  accent?: string;
}> = ({ children, accent = ACCENT }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const glowX = interpolate(frame, [0, 60], [width * 0.2, width * 0.8], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily,
        color: TEXT,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${glowX}px ${height * 0.35}px, ${accent}33 0%, transparent 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 80% 80%, ${ACCENT2}22 0%, transparent 45%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const fadeUp = (frame: number, start: number, duration = 20) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

const slideUp = (frame: number, start: number, duration = 20) =>
  interpolate(frame, [start, start + duration], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeUp(frame, 0);
  const titleY = slideUp(frame, 0);
  const subOpacity = fadeUp(frame, 12);
  const subY = slideUp(frame, 12);
  const badgeOpacity = fadeUp(frame, 28);
  const badgeScale = interpolate(frame, [28, 48], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <SceneShell>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            opacity: badgeOpacity,
            scale: badgeScale,
            background: `linear-gradient(135deg, ${ACCENT}33, ${ACCENT2}33)`,
            border: `1px solid ${ACCENT}55`,
            borderRadius: 999,
            padding: "10px 28px",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 32,
          }}
        >
          Programmatic Video
        </div>
        <h1
          style={{
            opacity: titleOpacity,
            translate: `0 ${titleY}px`,
            fontSize: 96,
            fontWeight: 800,
            margin: 0,
            textAlign: "center",
            background: `linear-gradient(135deg, ${TEXT}, ${ACCENT})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rokmotion + Grok
        </h1>
        <p
          style={{
            opacity: subOpacity,
            translate: `0 ${subY}px`,
            fontSize: 36,
            color: MUTED,
            marginTop: 24,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Create motion graphics with AI — rendered in seconds
        </p>
      </AbsoluteFill>
    </SceneShell>
  );
};

const StepScene: React.FC<{
  step: number;
  title: string;
  detail: string;
  command?: string;
  accent?: string;
}> = ({ step, title, detail, command, accent = ACCENT }) => {
  const frame = useCurrentFrame();

  const stepScale = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.7)),
  });
  const titleOpacity = fadeUp(frame, 8);
  const titleY = slideUp(frame, 8);
  const detailOpacity = fadeUp(frame, 18);
  const detailY = slideUp(frame, 18);
  const cmdOpacity = fadeUp(frame, 30);
  const cmdY = slideUp(frame, 30);
  const cursorBlink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  return (
    <SceneShell accent={accent}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 1100,
          }}
        >
          <div
            style={{
              scale: stepScale,
              width: 88,
              height: 88,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${accent}, ${ACCENT2})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              marginBottom: 36,
              boxShadow: `0 0 40px ${accent}44`,
            }}
          >
            {step}
          </div>
          <h2
            style={{
              opacity: titleOpacity,
              translate: `0 ${titleY}px`,
              fontSize: 64,
              fontWeight: 700,
              margin: 0,
              textAlign: "center",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              opacity: detailOpacity,
              translate: `0 ${detailY}px`,
              fontSize: 32,
              color: MUTED,
              marginTop: 20,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {detail}
          </p>
          {command ? (
            <div
              style={{
                opacity: cmdOpacity,
                translate: `0 ${cmdY}px`,
                marginTop: 48,
                width: "100%",
                background: "#111827",
                border: `1px solid ${accent}44`,
                borderRadius: 16,
                padding: "28px 36px",
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: 30,
                color: ACCENT,
                boxShadow: `0 20px 60px #00000066`,
              }}
            >
              <span style={{ color: ACCENT2 }}>$ </span>
              {command}
              <span style={{ opacity: cursorBlink, color: TEXT }}>▌</span>
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const CodeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const panelOpacity = fadeUp(frame, 0);
  const line1 = fadeUp(frame, 10);
  const line2 = fadeUp(frame, 18);
  const line3 = fadeUp(frame, 26);
  const line4 = fadeUp(frame, 34);

  const codeLines = [
    { opacity: line1, text: 'import { interpolate, Sequence } from "remotion";', color: ACCENT },
    { opacity: line2, text: "", color: TEXT },
    { opacity: line3, text: "<Sequence from={30}>", color: ACCENT2 },
    { opacity: line4, text: "  <Title text=\"Your video idea\" />", color: "#4ade80" },
  ];

  return (
    <SceneShell accent={ACCENT2}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        <div style={{ width: "100%", maxWidth: 1200 }}>
          <h2
            style={{
              fontSize: 56,
              fontWeight: 700,
              marginBottom: 36,
              textAlign: "center",
            }}
          >
            Grok writes your Remotion code
          </h2>
          <div
            style={{
              opacity: panelOpacity,
              background: "#111827",
              border: `1px solid ${ACCENT2}44`,
              borderRadius: 20,
              padding: "40px 48px",
              fontFamily: '"SF Mono", "Fira Code", monospace',
              fontSize: 26,
              lineHeight: 1.8,
              boxShadow: `0 24px 80px #00000088`,
            }}
          >
            {codeLines.map((line, i) => (
              <div key={i} style={{ opacity: line.opacity, color: line.color }}>
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>
          <p
            style={{
              opacity: fadeUp(frame, 42),
              fontSize: 28,
              color: MUTED,
              textAlign: "center",
              marginTop: 32,
            }}
          >
            React components · precise timing · pixel-perfect layout
          </p>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const checkScale = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });
  const titleOpacity = fadeUp(frame, 12);
  const pathOpacity = fadeUp(frame, 24);
  const pathY = slideUp(frame, 24);

  return (
    <SceneShell>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            scale: checkScale,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}, #22c55e)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            marginBottom: 40,
            boxShadow: `0 0 60px ${ACCENT}55`,
          }}
        >
          ✓
        </div>
        <h2
          style={{
            opacity: titleOpacity,
            fontSize: 72,
            fontWeight: 800,
            margin: 0,
            textAlign: "center",
          }}
        >
          Your video is ready
        </h2>
        <p
          style={{
            opacity: pathOpacity,
            translate: `0 ${pathY}px`,
            fontSize: 30,
            color: MUTED,
            marginTop: 28,
            textAlign: "center",
          }}
        >
          MP4 saved to{" "}
          <span style={{ color: ACCENT, fontFamily: "monospace" }}>
            out/RokmotionTutorial.mp4
          </span>
        </p>
        <p
          style={{
            opacity: fadeUp(frame, 36),
            fontSize: 26,
            color: ACCENT2,
            marginTop: 20,
            fontWeight: 600,
          }}
        >
          Try it: /rokmotion make a 30s promo video
        </p>
      </AbsoluteFill>
    </SceneShell>
  );
};

export const RokmotionTutorial: React.FC<RokmotionTutorialProps> = ({
  voiceoverEnabled,
}) => {
  return (
    <AbsoluteFill>
      {voiceoverEnabled ? (
        <Audio src={staticFile("voiceover/RokmotionTutorial/narration.mp3")} />
      ) : null}
      <Series>
      <Series.Sequence durationInFrames={90}>
        <IntroScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <StepScene
          step={1}
          title="Invoke the skill"
          detail="Open Grok and type the slash command to start"
          command="/rokmotion"
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <StepScene
          step={2}
          title="Describe your video"
          detail="Tell Grok what you want — duration, style, text, and format"
          command='/rokmotion make a 30s tutorial video'
          accent={ACCENT2}
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <CodeScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <StepScene
          step={3}
          title="Render the video"
          detail="Grok builds the composition and renders an MP4 with Remotion"
          command="npx remotion render RokmotionTutorial out/video.mp4"
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <OutroScene />
      </Series.Sequence>
    </Series>
    </AbsoluteFill>
  );
};