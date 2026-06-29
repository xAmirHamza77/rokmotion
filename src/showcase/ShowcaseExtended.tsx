import { ThemeIcon, type ThemeIconName } from "../components/ThemeIcons";
import { loadFont } from "@remotion/google-fonts/Inter";
import { WorldMapRoute } from "./WorldMapRoute";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ShowcaseCard: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bg: string;
}> = ({ title, subtitle, children, bg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  return (
    <AbsoluteFill style={{ background: bg, fontFamily, overflow: "hidden" }}>
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.72) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 16,
          right: 16,
          opacity: enter,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{title}</div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.72)",
            marginTop: 3,
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MusicVisualsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.22) * 0.5 + 0.5;
  return (
    <ShowcaseCard
      title="Banger Show"
      subtitle="High quality music visuals without learning 3D"
      bg="radial-gradient(ellipse at 50% 30%, #2d0a4e 0%, #050010 70%)"
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(168,85,247,${0.35 + pulse * 0.25}), transparent 55%)`,
        }}
      />
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2 + frame * 0.03;
        const r = 90 + Math.sin(frame * 0.15 + i) * 25;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 320 + Math.cos(angle) * r,
              top: 180 + Math.sin(angle) * r * 0.55,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: `hsl(${260 + i * 4}, 90%, 65%)`,
              boxShadow: `0 0 8px hsl(${260 + i * 4}, 90%, 55%)`,
              opacity: 0.5 + pulse * 0.5,
            }}
          />
        );
      })}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", flexDirection: "row", gap: 5, paddingBottom: 70 }}>
        {Array.from({ length: 32 }).map((_, i) => {
          const h = interpolate(
            Math.sin(frame * 0.4 + i * 0.45) * Math.cos(frame * 0.08 + i * 0.2),
            [-1, 1],
            [18, 140],
            clamp,
          );
          return (
            <div
              key={i}
              style={{
                width: 7,
                height: h,
                borderRadius: 4,
                background: `linear-gradient(180deg, hsl(${280 + i * 5},95%,68%), hsl(${210 + i * 3},85%,42%))`,
                boxShadow: `0 0 14px hsl(${270 + i * 5},90%,55%)`,
              }}
            />
          );
        })}
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "38%",
          transform: "translate(-50%,-50%)",
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(168,85,247,0.2))",
          boxShadow: `0 0 ${40 + pulse * 30}px rgba(168,85,247,0.8)`,
        }}
      />
    </ShowcaseCard>
  );
};

export const ViralShortsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [20, 35, 50], [1, 1.18, 1], clamp);
  const capLine = Math.floor(interpolate(frame, [8, 70], [0, 3.99], clamp));
  const captions = ["Wait for it…", "THIS changes everything", "Follow for more"];
  return (
    <ShowcaseCard
      title="Submagic"
      subtitle="Captions, B-Rolls, Zooms and Sound Effects"
      bg="linear-gradient(160deg,#0f0f14,#1a1030)"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          transform: `translate(-50%,-50%) scale(${zoom})`,
          width: 200,
          height: 355,
          borderRadius: 22,
          background: "#111",
          border: "3px solid #2a2a35",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            height: "62%",
            background: "linear-gradient(135deg,#ff6b6b 0%,#845ef7 50%,#4ecdc4 100%)",
          }}
        />
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 4 }}>
          {["#ff6b6b", "#ffd43b", "#51cf66"].map((c) => (
            <div key={c} style={{ width: 28, height: 28, borderRadius: 6, background: c, opacity: 0.9 }} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 12,
            right: 12,
            background: "rgba(0,0,0,0.75)",
            borderRadius: 8,
            padding: "8px 10px",
            fontSize: 13,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            border: "2px solid #ffd43b",
          }}
        >
          {captions[capLine]}
        </div>
      </div>
    </ShowcaseCard>
  );
};

export const CodeAnimateShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = [
    { text: 'import { Composition } from "remotion";', color: "#cba6f7" },
    { text: 'const fps = 30;', color: "#89dceb" },
    { text: '<Sequence from={0} durationInFrames={90}>', color: "#a6e3a1" },
    { text: '  <AnimatedCode />', color: "#cdd6f4" },
    { text: '</Sequence>', color: "#a6e3a1" },
  ];
  const active = Math.floor(interpolate(frame, [0, 80], [0, 4.99], clamp));
  return (
    <ShowcaseCard
      title="Hackreels"
      subtitle="Animate your code in seconds"
      bg="linear-gradient(180deg,#0d0d14,#16162a)"
    >
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 28,
          right: 28,
          background: "#11111b",
          borderRadius: 12,
          border: "1px solid #313244",
          overflow: "hidden",
          boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ height: 28, background: "#181825", display: "flex", alignItems: "center", gap: 6, paddingLeft: 12 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.7 }}>
          {lines.map((line, i) => (
            <div
              key={line.text}
              style={{
                color: line.color,
                opacity: interpolate(frame, [i * 10, i * 10 + 12], [0, 1], clamp),
                background: i === active ? "rgba(11,132,243,0.18)" : "transparent",
                borderLeft: i === active ? "3px solid #0b84f3" : "3px solid transparent",
                paddingLeft: 8,
                marginLeft: -8,
              }}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </ShowcaseCard>
  );
};

export const YearReviewShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const commits = Math.round(interpolate(frame, [0, 90], [0, 847], { ...clamp, easing: Easing.out(Easing.quad) }));
  const prs = Math.round(interpolate(frame, [15, 90], [0, 124], { ...clamp, easing: Easing.out(Easing.quad) }));
  return (
    <ShowcaseCard
      title="GitHub Unwrapped"
      subtitle="Personalized year-in-review campaign"
      bg="radial-gradient(ellipse at 50% 0%, #1f2a44 0%, #0d1117 65%)"
    >
      <div style={{ position: "absolute", top: 28, left: 28, right: 28, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Array.from({ length: 52 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: i % 7 === 0 ? "#39d353" : i % 5 === 0 ? "#26a641" : "#21262d",
              opacity: interpolate(frame, [i * 0.8, i * 0.8 + 8], [0.2, 1], clamp),
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", top: 110, left: 28, display: "flex", gap: 16 }}>
        <div style={{ background: "rgba(88,166,255,0.15)", border: "1px solid rgba(88,166,255,0.4)", borderRadius: 12, padding: "14px 18px" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#58a6ff" }}>{commits}</div>
          <div style={{ fontSize: 11, color: "#8b949e" }}>commits</div>
        </div>
        <div style={{ background: "rgba(163,113,247,0.15)", border: "1px solid rgba(163,113,247,0.4)", borderRadius: 12, padding: "14px 18px" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#a371f7" }}>{prs}</div>
          <div style={{ fontSize: 11, color: "#8b949e" }}>pull requests</div>
        </div>
      </div>
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 19 + frame * 3) % 100}%`,
            top: `${(i * 13) % 70}%`,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: ["#58a6ff", "#a371f7", "#39d353"][i % 3],
            opacity: interpolate(frame, [i, i + 20], [0, 0.8], clamp),
          }}
        />
      ))}
    </ShowcaseCard>
  );
};

export const ScreenRecordShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [25, 45, 65], [1, 1.22, 1.05], clamp);
  const cursorX = interpolate(frame, [0, 90], [80, 280], clamp);
  const cursorY = interpolate(frame, [0, 90], [100, 200], clamp);
  return (
    <ShowcaseCard
      title="Vibrantsnap"
      subtitle="Product demos with auto layouts & 4K export"
      bg="linear-gradient(180deg,#0b1220,#111827)"
    >
      <div
        style={{
          position: "absolute",
          inset: 32,
          borderRadius: 14,
          background: "#1e293b",
          border: "2px solid #334155",
          transform: `scale(${zoom})`,
          transformOrigin: "55% 45%",
          overflow: "hidden",
        }}
      >
        <div style={{ height: 30, background: "#0f172a", display: "flex", alignItems: "center", gap: 6, paddingLeft: 12 }}>
          {["#ef4444", "#eab308", "#22c55e"].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
          <div style={{ marginLeft: 12, fontSize: 10, color: "#64748b" }}>app.rokmotion.dev</div>
        </div>
        <div style={{ padding: 20, display: "flex", gap: 12 }}>
          <div style={{ flex: 1, height: 120, borderRadius: 8, background: "linear-gradient(135deg,#0b84f3,#6366f1)" }} />
          <div style={{ width: 80, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ height: 36, borderRadius: 6, background: "#334155" }} />
            <div style={{ height: 36, borderRadius: 6, background: "#334155" }} />
            <div style={{ height: 36, borderRadius: 6, background: "#334155" }} />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "2px solid #fff",
            boxShadow: "0 0 0 2px rgba(11,132,243,0.8)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 72,
          right: 36,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#0b84f3,#3b82f6)",
          border: "3px solid #fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        }}
      />
    </ShowcaseCard>
  );
};

export const EcommerceAdsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 90], [40, -200], clamp);
  const products: { icon: ThemeIconName; name: string; price: string; color: string }[] = [
    { icon: "sneaker", name: "Air Max", price: "$129", color: "#e85d4c" },
    { icon: "bag", name: "Leather Bag", price: "$89", color: "#8b5cf6" },
    { icon: "watch", name: "Smart Watch", price: "$249", color: "#0b84f3" },
    { icon: "headphones", name: "Pro Buds", price: "$59", color: "#14b8a6" },
  ];
  return (
    <ShowcaseCard
      title="AdmoveAI"
      subtitle="Automated eCommerce ad campaigns"
      bg="linear-gradient(135deg,#fff7ed,#fef3c7)"
    >
      <div style={{ position: "absolute", top: 44, left: 0, display: "flex", gap: 14, transform: `translateX(${slide}px)`, paddingLeft: 24 }}>
        {products.map((p, i) => (
          <div
            key={p.name}
            style={{
              width: 130,
              background: "#fff",
              borderRadius: 14,
              padding: 14,
              boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
              transform: `rotate(${interpolate(frame, [i * 6, i * 6 + 20], [-4, 0], clamp)}deg)`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
              <ThemeIcon name={p.icon} size={40} color={p.color} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginTop: 8 }}>{p.name}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#e85d4c", marginTop: 4 }}>{p.price}</div>
            <div style={{ marginTop: 10, background: "#0b84f3", color: "#fff", fontSize: 11, fontWeight: 700, textAlign: "center", borderRadius: 6, padding: "6px 0" }}>
              Shop Now
            </div>
          </div>
        ))}
      </div>
    </ShowcaseCard>
  );
};

export const KaraokeShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 90], [0, 1], clamp);
  const words = ["Sing", "along", "with", "Rokmotion", "tonight"];
  const active = Math.floor(progress * words.length);
  return (
    <ShowcaseCard
      title="MyKaraoke"
      subtitle="Karaoke & lyric videos with AI vocal removal"
      bg="radial-gradient(ellipse at 50% 100%, #4a0e6e 0%, #0f0518 70%)"
    >
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 60 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: interpolate(Math.sin(frame * 0.5 + i * 0.6), [-1, 1], [8, 48], clamp),
                borderRadius: 3,
                background: "linear-gradient(180deg,#ff6ec7,#a855f7)",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", maxWidth: 500, padding: "0 24px" }}>
          {words.map((w, i) => (
            <span
              key={w}
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: i < active ? "#ff6ec7" : i === active ? "#fff" : "rgba(255,255,255,0.25)",
                textShadow: i <= active ? "0 0 20px rgba(255,110,199,0.8)" : "none",
                transform: i === active ? "scale(1.08)" : "scale(1)",
              }}
            >
              {w}
            </span>
          ))}
        </div>
        <div style={{ width: 320, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: "linear-gradient(90deg,#ff6ec7,#a855f7)" }} />
        </div>
      </AbsoluteFill>
    </ShowcaseCard>
  );
};

export const WatercolorMapShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [5, 75], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  return (
    <ShowcaseCard
      title="Watercolor Map"
      subtitle="Travel animation with watercolor effects"
      bg="#d4ecf7"
    >
      <WorldMapRoute progress={progress} fromLabel="Paris" toLabel="Tokyo" />
    </ShowcaseCard>
  );
};

export const WeatherAppShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const temp = Math.round(interpolate(frame, [0, 90], [11, 26], clamp));
  const cloudX = interpolate(frame, [0, 90], [-20, 40], clamp);
  return (
    <ShowcaseCard
      title="Hello Météo"
      subtitle="Daily weather report generator"
      bg="linear-gradient(180deg,#4facfe 0%,#87CEEB 45%,#E0F4FF 100%)"
    >
      <div style={{ position: "absolute", top: 30 + cloudX, left: 60, opacity: 0.7 }}>
        <ThemeIcon name="cloud" size={44} color="#fff" />
      </div>
      <div style={{ position: "absolute", top: 50, right: 80, opacity: 0.5 }}>
        <ThemeIcon name="cloud" size={34} color="#fff" />
      </div>
      <div
        style={{
          position: "absolute",
          top: 48,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.92)",
          borderRadius: 24,
          padding: "28px 44px",
          textAlign: "center",
          color: "#1e3a5f",
          boxShadow: "0 16px 40px rgba(30,58,95,0.15)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ThemeIcon name="sun" size={52} color="#f59e0b" />
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, marginTop: 4 }}>{temp}°C</div>
        <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>Paris · Partly sunny</div>
        <div style={{ display: "flex", gap: 16, marginTop: 16, justifyContent: "center" }}>
          {["Mon", "Tue", "Wed"].map((d, i) => (
            <div key={d} style={{ fontSize: 11, opacity: interpolate(frame, [20 + i * 10, 35 + i * 10], [0.3, 1], clamp) }}>
              <div>{d}</div>
              <div style={{ fontWeight: 800 }}>{18 + i * 3}°</div>
            </div>
          ))}
        </div>
      </div>
    </ShowcaseCard>
  );
};

export const AutomationToolShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const flow = interpolate(frame, [0, 90], [0, 1], clamp);
  const steps: { label: string; icon: ThemeIconName }[] = [
    { label: "Webhook", icon: "lightning" },
    { label: "Transform", icon: "gear" },
    { label: "Render", icon: "film" },
  ];
  return (
    <ShowcaseCard
      title="Relay.app"
      subtitle="Programmatic instructional videos"
      bg="linear-gradient(180deg,#f8fafc,#e2e8f0)"
    >
      <div style={{ position: "absolute", top: 70, left: 40, right: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 110,
                padding: "16px 12px",
                borderRadius: 14,
                background: flow > i / steps.length ? "#0b84f3" : "#e2e8f0",
                color: flow > i / steps.length ? "#fff" : "#94a3b8",
                fontWeight: 700,
                fontSize: 13,
                textAlign: "center",
                boxShadow: flow > i / steps.length ? "0 8px 20px rgba(11,132,243,0.35)" : "none",
                transform: `scale(${interpolate(flow, [i / steps.length, (i + 0.5) / steps.length], [1, 1.06], clamp)})`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ThemeIcon name={s.icon} size={24} color="currentColor" />
              </div>
              <div style={{ marginTop: 6 }}>{s.label}</div>
            </div>
            {i < steps.length - 1 ? (
              <div
                style={{
                  width: 36,
                  height: 3,
                  background: `linear-gradient(90deg, #0b84f3 ${interpolate(flow, [(i + 0.3) / steps.length, (i + 0.7) / steps.length], [0, 100], clamp)}%, #e2e8f0 100%)`,
                  margin: "0 4px",
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </ShowcaseCard>
  );
};

export const VideoStatsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const views = Math.round(interpolate(frame, [0, 90], [0, 24800], { ...clamp, easing: Easing.out(Easing.quad) }));
  const watch = interpolate(frame, [0, 90], [0, 78], clamp);
  return (
    <ShowcaseCard
      title="MUX"
      subtitle="Dynamic animated video stats"
      bg="#000"
    >
      <div style={{ position: "absolute", inset: 24, borderRadius: 10, background: "#111", border: "1px solid #333", overflow: "hidden" }}>
        <div style={{ height: "72%", background: "linear-gradient(135deg,#1a1a2e,#16213e)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, display: "flex", alignItems: "flex-end", gap: 3, padding: "0 12px 10px" }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: interpolate(Math.sin(i * 0.5 + frame * 0.2), [-1, 1], [4, 28], clamp),
                background: "#0b84f3",
                borderRadius: 2,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.85)", padding: "10px 14px", borderRadius: 10, border: "1px solid #333" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 800, color: "#0b84f3" }}>
            <ThemeIcon name="play" size={16} color="#0b84f3" />
            {views.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{Math.round(watch)}% watched · 4K</div>
        </div>
      </div>
    </ShowcaseCard>
  );
};

export const AnimStatsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [0, 90], [0, 97], { ...clamp, easing: Easing.out(Easing.quad) }));
  const bars = [40, 65, 52, 88, 72];
  return (
    <ShowcaseCard
      title="AnimStats"
      subtitle="Statistics into animated GIFs & videos"
      bg="linear-gradient(135deg,#0b84f3,#2563eb)"
    >
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontSize: 88, fontWeight: 900, color: "#fff", textShadow: "0 4px 30px rgba(0,0,0,0.2)" }}>{n}%</div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>Quarterly growth</div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 70, marginTop: 24 }}>
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: interpolate(frame, [i * 8, i * 8 + 30], [0, b], { ...clamp, easing: Easing.out(Easing.quad) }),
                borderRadius: 6,
                background: "rgba(255,255,255,0.9)",
              }}
            />
          ))}
        </div>
      </AbsoluteFill>
    </ShowcaseCard>
  );
};

export const FluidBackgroundShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame * 0.04;
  return (
    <ShowcaseCard
      title="Fluidmotion"
      subtitle="Animated backgrounds for apps & videos"
      bg={`linear-gradient(${135 + Math.sin(t) * 20}deg, #667eea, #764ba2)`}
    >
      {[
        { x: 25 + Math.sin(t) * 15, y: 30 + Math.cos(t * 0.8) * 10, s: 180, c: "rgba(240,147,251,0.55)" },
        { x: 65 + Math.cos(t * 0.7) * 12, y: 55 + Math.sin(t * 0.9) * 8, s: 220, c: "rgba(102,126,234,0.5)" },
        { x: 45 + Math.sin(t * 1.1) * 10, y: 70 + Math.cos(t) * 12, s: 160, c: "rgba(118,75,162,0.45)" },
      ].map((blob, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: blob.s,
            height: blob.s,
            borderRadius: "50%",
            background: blob.c,
            filter: "blur(40px)",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
    </ShowcaseCard>
  );
};

export const ScreencastShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const rec = frame % 24 < 12;
  const trail = Array.from({ length: 6 }).map((_, i) => ({
    x: interpolate(frame, [0, 90], [60, 340], clamp) - i * 12,
    y: interpolate(frame, [0, 90], [80, 220], clamp) - i * 6,
    o: 0.6 - i * 0.1,
  }));
  return (
    <ShowcaseCard
      title="Rokmotion Recorder"
      subtitle="Screen recording built with Rokmotion"
      bg="#1c1c1e"
    >
      <div style={{ position: "absolute", top: 18, left: 18, display: "flex", alignItems: "center", gap: 8, color: rec ? "#ff4444" : "#666", fontWeight: 700, fontSize: 13 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: rec ? "#ff4444" : "#666", boxShadow: rec ? "0 0 8px #ff4444" : "none" }} />
        REC · 00:{String(Math.floor(frame / 30)).padStart(2, "0")}
      </div>
      <div style={{ position: "absolute", inset: 44, borderRadius: 10, background: "#2c2c2e", border: "1px solid #3a3a3c", overflow: "hidden" }}>
        <div style={{ height: 28, background: "#1c1c1e", display: "flex", gap: 5, alignItems: "center", paddingLeft: 10 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ height: 70, borderRadius: 8, background: "#3a3a3c" }} />
          <div style={{ height: 70, borderRadius: 8, background: "#3a3a3c" }} />
          <div style={{ height: 70, borderRadius: 8, background: "#0b84f3", opacity: 0.6, gridColumn: "span 2" }} />
        </div>
        {trail.map((p, i) => (
          <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 8, height: 8, borderRadius: "50%", background: "#fff", opacity: p.o }} />
        ))}
      </div>
    </ShowcaseCard>
  );
};

export const NextJsTutorialShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [8, 35], [0, 1], clamp);
  const highlight = Math.floor(interpolate(frame, [20, 70], [0, 2.99], clamp));
  const codeLines = ["export default function Page() {", "  return <Hero />;", "}"];
  return (
    <ShowcaseCard
      title="Next.js"
      subtitle="Visual video tutorials for developers"
      bg="#000"
    >
      <div style={{ position: "absolute", left: 20, top: 36, width: "48%", opacity: reveal, background: "#111", borderRadius: 10, padding: 14, border: "1px solid #333" }}>
        {codeLines.map((line, i) => (
          <div
            key={line}
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: i === highlight ? "#7ee787" : "#cdd6f4",
              background: i === highlight ? "rgba(11,132,243,0.2)" : "transparent",
              padding: "2px 4px",
              borderRadius: 4,
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 44,
          width: "42%",
          height: 200,
          borderRadius: 12,
          background: "linear-gradient(135deg,#0b84f3,#6366f1)",
          opacity: reveal,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 900,
          color: "#fff",
        }}
      >
        Preview
      </div>
    </ShowcaseCard>
  );
};

export const ElectricityMapsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const emissions = Math.round(interpolate(frame, [0, 90], [180, 520], clamp));
  const intensity = interpolate(frame, [0, 90], [0.3, 1], clamp);
  const regions = [
    { x: 120, y: 120, w: 80, h: 60, co2: 320 },
    { x: 220, y: 100, w: 70, h: 55, co2: 180 },
    { x: 300, y: 130, w: 90, h: 50, co2: 420 },
    { x: 180, y: 170, w: 100, h: 45, co2: 260 },
  ];
  return (
    <ShowcaseCard
      title="Electricity Maps"
      subtitle="Heavy electricity data visualization"
      bg="radial-gradient(ellipse at 50% 30%, #0f2847 0%, #050d18 70%)"
    >
      <svg width="100%" height="100%" viewBox="0 0 640 360" style={{ position: "absolute", inset: 0 }}>
        <ellipse cx="280" cy="155" rx="200" ry="110" fill="rgba(11,132,243,0.08)" stroke="rgba(11,132,243,0.25)" strokeWidth="1.5" />
        {regions.map((r, i) => (
          <rect
            key={i}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            rx="6"
            fill={`rgba(34,211,238,${0.15 + (r.co2 / 500) * intensity * 0.5})`}
            stroke="rgba(34,211,238,0.5)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => {
          const x1 = 150 + i * 45;
          const y1 = 140 + Math.sin(i) * 20;
          const x2 = x1 + 60;
          const y2 = y1 + 30;
          const dash = interpolate(frame, [i * 4, i * 4 + 40], [0, 80], clamp);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#22d3ee"
              strokeWidth="2"
              strokeDasharray={`${dash} 80`}
              opacity="0.7"
            />
          );
        })}
      </svg>
      <div style={{ position: "absolute", top: 28, left: 28, fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Europe · Live grid</div>
      <div style={{ position: "absolute", bottom: 72, right: 28, textAlign: "right" }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#22d3ee" }}>{emissions}</div>
        <div style={{ fontSize: 12, color: "#64748b" }}>gCO₂/kWh</div>
      </div>
    </ShowcaseCard>
  );
};

export const StorytellingShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = Math.floor(interpolate(frame, [0, 90], [0, 2.99], clamp));
  const stories = [
    { bg: "linear-gradient(135deg,#667eea,#764ba2)", text: "Once upon a time in Tokyo…" },
    { bg: "linear-gradient(135deg,#f093fb,#f5576c)", text: "AI wrote the perfect script" },
    { bg: "linear-gradient(135deg,#4facfe,#00f2fe)", text: "Rokmotion rendered it in 4K" },
  ];
  const current = stories[slide];
  return (
    <ShowcaseCard
      title="Revid"
      subtitle="AI-powered storytelling social videos"
      bg="#0a0a12"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: "translate(-50%,-50%)",
          width: 220,
          height: 390,
          borderRadius: 20,
          overflow: "hidden",
          border: "3px solid #222",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ height: "100%", background: current.bg, display: "flex", alignItems: "flex-end", padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.4, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            {current.text}
          </div>
        </div>
      </div>
    </ShowcaseCard>
  );
};

export const ProductVideoShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const callout = interpolate(frame, [30, 50], [0, 1], clamp);
  return (
    <ShowcaseCard
      title="SuperMotion"
      subtitle="Product promo videos from screen recordings"
      bg="linear-gradient(180deg,#f1f5f9,#e2e8f0)"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          transform: `translate(-50%,-50%) scale(${interpolate(enter, [0, 1], [0.75, 1])})`,
          width: 130,
          height: 220,
          borderRadius: 22,
          background: "#1e293b",
          border: "4px solid #334155",
          boxShadow: "0 24px 50px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "68%", background: "linear-gradient(180deg,#0b84f3,#6366f1)" }} />
        <div style={{ padding: 12, fontSize: 11, fontWeight: 700, color: "#94a3b8" }}>Feature highlight</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "62%",
          top: "32%",
          opacity: callout,
          background: "#0b84f3",
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
          padding: "8px 12px",
          borderRadius: 8,
          boxShadow: "0 8px 20px rgba(11,132,243,0.4)",
        }}
      >
        Auto zoom →
      </div>
    </ShowcaseCard>
  );
};