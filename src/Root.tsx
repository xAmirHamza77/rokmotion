import "./index.css";
import { Composition } from "remotion";
import { z } from "zod";
import { calculatePaperRokmotionStartMetadata } from "./calculate-metadata/paper-rokmotion-start";
import { calculateRokmotionTutorialMetadata } from "./calculate-metadata/rokmotion-tutorial";
import { calculateUserVoiceoverMetadata } from "./calculate-metadata/user-voiceover";
import { calculateVideoToVideoMetadata } from "./calculate-metadata/video-to-video";
import { userVoiceoverSchema, videoToVideoSchema } from "./lib/video-modes";
import { PaperRokmotionStart } from "./PaperRokmotionStart";
import { RokmotionTutorial } from "./RokmotionTutorial";
import { UserVoiceoverVideo } from "./UserVoiceoverVideo";
import { VideoToVideoEnhance } from "./VideoToVideoEnhance";
import { BannerRokmotion } from "./showcase/BannerRokmotion";
import {
  DataVizShowcase,
  GlassUIShowcase,
  KineticTypeShowcase,
  NeonGridShowcase,
  PaperCraftShowcase,
  RetroWaveShowcase,
} from "./showcase/ShowcaseSamples";

export const rokmotionTutorialSchema = z.object({
  voiceoverEnabled: z.boolean(),
});

const defaultScenePlan = {
  projectId: "demo",
  sourceVideo: "uploads/demo/source.mp4",
  durationInSeconds: 30,
  scenes: [
    {
      type: "source" as const,
      startSeconds: 0,
      endSeconds: 8,
      title: "Opening",
    },
    {
      type: "animated" as const,
      startSeconds: 8,
      endSeconds: 18,
      title: "Animated overlay",
      pip: {
        enabled: true,
        shape: "circle" as const,
        position: "bottom-right" as const,
        size: 0.2,
      },
    },
    {
      type: "source" as const,
      startSeconds: 18,
      endSeconds: 30,
      title: "Closing",
    },
  ],
};

export const RokmotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="UserVoiceoverVideo"
        component={UserVoiceoverVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={userVoiceoverSchema}
        defaultProps={{
          mode: "user-voiceover",
          projectId: "demo",
          audioFile: "uploads/demo/voiceover.mp3",
          durationInSeconds: 30,
        }}
        calculateMetadata={calculateUserVoiceoverMetadata}
      />
      <Composition
        id="VideoToVideoEnhance"
        component={VideoToVideoEnhance}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={videoToVideoSchema.extend({
          audioFile: z.string().optional(),
        })}
        defaultProps={{
          mode: "video-to-video",
          projectId: "demo",
          sourceVideo: "uploads/demo/source.mp4",
          audioFile: "uploads/demo/source-audio.mp3",
          scenePlan: defaultScenePlan,
        }}
        calculateMetadata={calculateVideoToVideoMetadata}
      />
      <Composition
        id="PaperRokmotionStart"
        component={PaperRokmotionStart}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={z.object({})}
        defaultProps={{}}
        calculateMetadata={calculatePaperRokmotionStartMetadata}
      />
      <Composition
        id="RokmotionTutorial"
        component={RokmotionTutorial}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={rokmotionTutorialSchema}
        defaultProps={{
          voiceoverEnabled: false,
        }}
        calculateMetadata={calculateRokmotionTutorialMetadata}
      />
      <Composition id="BannerRokmotion" component={BannerRokmotion} durationInFrames={60} fps={30} width={1080} height={500} />
      <Composition id="Showcase-PaperCraft" component={PaperCraftShowcase} durationInFrames={90} fps={30} width={640} height={360} />
      <Composition id="Showcase-NeonGrid" component={NeonGridShowcase} durationInFrames={90} fps={30} width={640} height={360} />
      <Composition id="Showcase-RetroWave" component={RetroWaveShowcase} durationInFrames={90} fps={30} width={640} height={360} />
      <Composition id="Showcase-KineticType" component={KineticTypeShowcase} durationInFrames={90} fps={30} width={640} height={360} />
      <Composition id="Showcase-DataViz" component={DataVizShowcase} durationInFrames={90} fps={30} width={640} height={360} />
      <Composition id="Showcase-GlassUI" component={GlassUIShowcase} durationInFrames={90} fps={30} width={640} height={360} />
    </>
  );
};