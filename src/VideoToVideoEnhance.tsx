import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { AnimatedScenePlaceholder } from "./components/AnimatedScenePlaceholder";
import { UserVideoPiP } from "./components/UserVideoPiP";
import {
  secondsToFrames,
  type VideoToVideoProps,
} from "./lib/video-modes";

export const VideoToVideoEnhance: React.FC<
  VideoToVideoProps & { audioFile?: string }
> = ({ sourceVideo, scenePlan, audioFile }) => {
  const { fps } = useVideoConfig();
  const videoSrc = staticFile(sourceVideo);
  const audioSrc = audioFile
    ? staticFile(audioFile)
    : videoSrc;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={audioSrc} />

      {scenePlan.scenes.map((scene, index) => {
        const from = secondsToFrames(scene.startSeconds, fps);
        const duration = secondsToFrames(
          scene.endSeconds - scene.startSeconds,
          fps,
        );

        if (scene.type === "source") {
          return (
            <Sequence key={index} from={from} durationInFrames={duration}>
              <AbsoluteFill>
                <OffthreadVideo
                  src={videoSrc}
                  startFrom={from}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  muted
                />
              </AbsoluteFill>
            </Sequence>
          );
        }

        const pip = scene.pip ?? {
          enabled: true,
          shape: "circle" as const,
          position: "bottom-right" as const,
          size: 0.2,
        };

        return (
          <Sequence key={index} from={from} durationInFrames={duration}>
            <AbsoluteFill>
              {/* Full source video hidden during animated scenes */}
              <AnimatedScenePlaceholder
                title={scene.title ?? `Overlay ${index + 1}`}
              />
              {pip.enabled ? (
                <UserVideoPiP
                  src={videoSrc}
                  shape={pip.shape}
                  position={pip.position}
                  size={pip.size ?? 0.2}
                  startFrom={from}
                />
              ) : null}
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};