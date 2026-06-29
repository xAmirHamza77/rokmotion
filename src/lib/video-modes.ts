import { z } from "zod";

export const VIDEO_MODES = [
  "user-voiceover",
  "elevenlabs-script",
  "video-to-video",
] as const;

export type VideoMode = (typeof VIDEO_MODES)[number];

export const pipShapeSchema = z.enum(["box", "circle"]);
export const pipPositionSchema = z.enum([
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
]);

export const scenePlanEntrySchema = z.object({
  type: z.enum(["source", "animated"]),
  startSeconds: z.number().min(0),
  endSeconds: z.number().min(0),
  title: z.string().optional(),
  pip: z
    .object({
      enabled: z.boolean(),
      shape: pipShapeSchema,
      position: pipPositionSchema,
      size: z.number().min(0.1).max(0.5).optional(),
    })
    .optional(),
});

export const scenePlanSchema = z.object({
  projectId: z.string(),
  sourceVideo: z.string(),
  durationInSeconds: z.number().positive(),
  scenes: z.array(scenePlanEntrySchema).min(1),
});

export type ScenePlanEntry = z.infer<typeof scenePlanEntrySchema>;
export type ScenePlan = z.infer<typeof scenePlanSchema>;

export const userVoiceoverSchema = z.object({
  mode: z.literal("user-voiceover"),
  projectId: z.string(),
  audioFile: z.string(),
  durationInSeconds: z.number().positive(),
});

export const elevenlabsScriptSchema = z.object({
  mode: z.literal("elevenlabs-script"),
  projectId: z.string(),
  script: z.string(),
  audioFile: z.string().optional(),
});

export const videoToVideoSchema = z.object({
  mode: z.literal("video-to-video"),
  projectId: z.string(),
  sourceVideo: z.string(),
  scenePlan: scenePlanSchema,
});

export type UserVoiceoverProps = z.infer<typeof userVoiceoverSchema>;
export type ElevenlabsScriptProps = z.infer<typeof elevenlabsScriptSchema>;
export type VideoToVideoProps = z.infer<typeof videoToVideoSchema>;

export const secondsToFrames = (seconds: number, fps = 30): number =>
  Math.ceil(seconds * fps);