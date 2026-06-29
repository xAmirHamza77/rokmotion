import type { CalculateMetadataFunction } from "remotion";
import { paperRokmotionStartVoiceover } from "../voiceover/PaperRokmotionStart.meta";
import { paperRokmotionStartTiming } from "../voiceover/PaperRokmotionStart.timing";

export type PaperRokmotionStartProps = Record<string, never>;

export const calculatePaperRokmotionStartMetadata: CalculateMetadataFunction<
  PaperRokmotionStartProps
> = async () => {
  const durationInFrames = Math.max(
    paperRokmotionStartTiming.durationInFrames,
    Math.ceil((paperRokmotionStartVoiceover.durationInSeconds + 0.4) * 30),
  );

  return { durationInFrames };
};