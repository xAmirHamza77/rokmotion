import type { CalculateMetadataFunction } from "remotion";
import {
  ROKMOTION_TUTORIAL_FALLBACK_FRAMES,
  VOICEOVER_END_PADDING_SECONDS,
} from "../lib/voiceover";
import { rokmotionTutorialVoiceover } from "../voiceover/RokmotionTutorial.meta";

export type RokmotionTutorialProps = {
  voiceoverEnabled: boolean;
};

const FPS = 30;

export const calculateRokmotionTutorialMetadata: CalculateMetadataFunction<
  RokmotionTutorialProps
> = async ({ props }) => {
  if (!props.voiceoverEnabled || !rokmotionTutorialVoiceover.enabled) {
    return { durationInFrames: ROKMOTION_TUTORIAL_FALLBACK_FRAMES };
  }

  const durationInFrames = Math.ceil(
    (rokmotionTutorialVoiceover.durationInSeconds +
      VOICEOVER_END_PADDING_SECONDS) *
      FPS,
  );

  return {
    durationInFrames: Math.max(
      durationInFrames,
      ROKMOTION_TUTORIAL_FALLBACK_FRAMES,
    ),
  };
};