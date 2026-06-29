import type { CalculateMetadataFunction } from "remotion";
import { secondsToFrames, type UserVoiceoverProps } from "../lib/video-modes";

export const calculateUserVoiceoverMetadata: CalculateMetadataFunction<
  UserVoiceoverProps
> = async ({ props }) => ({
  durationInFrames: secondsToFrames(props.durationInSeconds + 0.3),
});