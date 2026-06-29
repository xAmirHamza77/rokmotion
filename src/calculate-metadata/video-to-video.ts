import type { CalculateMetadataFunction } from "remotion";
import { secondsToFrames, type VideoToVideoProps } from "../lib/video-modes";

export const calculateVideoToVideoMetadata: CalculateMetadataFunction<
  VideoToVideoProps
> = async ({ props }) => ({
  durationInFrames: secondsToFrames(
    props.scenePlan.durationInSeconds + 0.3,
  ),
});