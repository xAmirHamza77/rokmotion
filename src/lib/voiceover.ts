export type VoiceoverManifest = {
  compositionId: string;
  text: string;
  audioFile: string;
  durationInSeconds: number;
  voiceId: string;
  generatedAt: string;
};

export const ROKMOTION_TUTORIAL_FALLBACK_FRAMES = 900;
export const VOICEOVER_END_PADDING_SECONDS = 0.5;