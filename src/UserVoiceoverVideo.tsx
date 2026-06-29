import {
  AbsoluteFill,
  Audio,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import { AnimatedScenePlaceholder } from "./components/AnimatedScenePlaceholder";
import {
  secondsToFrames,
  type UserVoiceoverProps,
} from "./lib/video-modes";

export const UserVoiceoverVideo: React.FC<UserVoiceoverProps> = ({
  audioFile,
  durationInSeconds,
}) => {
  const { fps } = useVideoConfig();
  const total = secondsToFrames(durationInSeconds, fps);
  const segment = Math.floor(total / 3);

  return (
    <AbsoluteFill style={{ backgroundColor: "#08080c" }}>
      <Audio src={staticFile(audioFile)} />
      <Series>
        <Series.Sequence durationInFrames={segment}>
          <AnimatedScenePlaceholder title="Scene 1" accentColor="#00d4ff" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={segment}>
          <AnimatedScenePlaceholder title="Scene 2" accentColor="#a855f7" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={total - segment * 2}>
          <AnimatedScenePlaceholder title="Scene 3" accentColor="#22c55e" />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};