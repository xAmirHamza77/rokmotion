import * as fs from "fs";
import * as path from "path";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// Free-tier compatible premade voice (Bella). Override via ELEVENLABS_VOICE_ID.
export const DEFAULT_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

export type VoiceoverManifest = {
  compositionId: string;
  text: string;
  audioFile: string;
  durationInSeconds: number;
  voiceId: string;
  generatedAt: string;
};

export type AlignmentData = {
  characters: string[];
  characterStartTimesSeconds: number[];
  characterEndTimesSeconds: number[];
};

const FPS = 30;

const toFrames = (seconds: number): number => Math.round(seconds * FPS);

export const getApiKey = (): string => {
  const key = process.env.ELEVENLABS_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "ELEVENLABS_API_KEY is not set. Copy .env.example to .env and add your key.",
    );
  }
  return key;
};

export const getVoiceId = (): string =>
  process.env.ELEVENLABS_VOICE_ID?.trim() || DEFAULT_VOICE_ID;

export const getManifestPath = (compositionId: string): string =>
  path.join(
    process.cwd(),
    "public",
    "voiceover",
    compositionId,
    "manifest.json",
  );

export const getAudioPath = (compositionId: string): string =>
  path.join(
    process.cwd(),
    "public",
    "voiceover",
    compositionId,
    "narration.mp3",
  );

export const getPublicAudioFile = (compositionId: string): string =>
  `voiceover/${compositionId}/narration.mp3`;

export const readManifest = (
  compositionId: string,
): VoiceoverManifest | null => {
  const manifestPath = getManifestPath(compositionId);
  if (!fs.existsSync(manifestPath)) {
    return null;
  }
  return JSON.parse(
    fs.readFileSync(manifestPath, "utf-8"),
  ) as VoiceoverManifest;
};

export const generateVoiceover = async ({
  compositionId,
  text,
}: {
  compositionId: string;
  text: string;
}): Promise<VoiceoverManifest> => {
  const apiKey = getApiKey();
  const voiceId = getVoiceId();
  const client = new ElevenLabsClient({
    environment: "https://api.elevenlabs.io",
    apiKey,
  });

  const data = await client.textToSpeech.convertWithTimestamps(voiceId, {
    text,
    modelId: "eleven_multilingual_v2",
  });

  if (!data.alignment?.characterEndTimesSeconds?.length) {
    throw new Error("ElevenLabs response missing timestamp alignment");
  }

  const durationInSeconds =
    data.alignment.characterEndTimesSeconds[
      data.alignment.characterEndTimesSeconds.length - 1
    ];

  const audioPath = getAudioPath(compositionId);
  fs.mkdirSync(path.dirname(audioPath), { recursive: true });
  fs.writeFileSync(audioPath, Buffer.from(data.audioBase64, "base64"));

  const manifest: VoiceoverManifest = {
    compositionId,
    text,
    audioFile: getPublicAudioFile(compositionId),
    durationInSeconds,
    voiceId,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(getManifestPath(compositionId), JSON.stringify(manifest, null, 2));

  const alignmentPath = path.join(
    process.cwd(),
    "public",
    "voiceover",
    compositionId,
    "alignment.json",
  );
  fs.writeFileSync(
    alignmentPath,
    JSON.stringify(
      {
        characters: data.alignment.characters,
        characterStartTimesSeconds: data.alignment.characterStartTimesSeconds,
        characterEndTimesSeconds: data.alignment.characterEndTimesSeconds,
      },
      null,
      2,
    ),
  );

  writeMetaTsFile(compositionId, manifest);
  writeTimingTsFile(compositionId, text, {
    characters: data.alignment.characters,
    characterStartTimesSeconds: data.alignment.characterStartTimesSeconds,
    characterEndTimesSeconds: data.alignment.characterEndTimesSeconds,
  });

  return manifest;
};

const findPhraseStartSeconds = (
  alignment: AlignmentData,
  phrase: string,
): number | null => {
  const fullText = alignment.characters.join("");
  const index = fullText.toLowerCase().indexOf(phrase.toLowerCase());
  if (index === -1) {
    return null;
  }
  return alignment.characterStartTimesSeconds[index] ?? null;
};

const writeTimingTsFile = (
  compositionId: string,
  text: string,
  alignment: AlignmentData,
): void => {
  const markers = [
    "Step one",
    "Step two",
    "Step three",
    "Step four",
    "Step five",
  ];

  const starts = markers
    .map((marker) => findPhraseStartSeconds(alignment, marker))
    .filter((value): value is number => value !== null);

  const endSeconds =
    alignment.characterEndTimesSeconds[
      alignment.characterEndTimesSeconds.length - 1
    ] ?? 30;

  const introEnd = starts[0] ?? 3;
  const step1Start = starts[0] ?? 3;
  const step2Start = starts[1] ?? step1Start + 5;
  const step3Start = starts[2] ?? step2Start + 5;
  const step4Start = starts[3] ?? step3Start + 5;
  const step5Start = starts[4] ?? step4Start + 5;

  const timingPath = path.join(
    process.cwd(),
    "src",
    "voiceover",
    `${compositionId}.timing.ts`,
  );

  const exportName =
    compositionId.charAt(0).toLowerCase() + compositionId.slice(1) + "Timing";

  const content = `// Auto-generated from ElevenLabs alignment: npm run voiceover -- ${compositionId}
export const ${exportName} = {
  fps: ${FPS},
  durationInFrames: ${toFrames(endSeconds + 0.4)},
  intro: { start: 0, end: ${toFrames(introEnd)} },
  step1: { start: ${toFrames(step1Start)}, end: ${toFrames(step2Start)} },
  step2: { start: ${toFrames(step2Start)}, end: ${toFrames(step3Start)} },
  step3: { start: ${toFrames(step3Start)}, end: ${toFrames(step4Start)} },
  step4: { start: ${toFrames(step4Start)}, end: ${toFrames(step5Start)} },
  step5: { start: ${toFrames(step5Start)}, end: ${toFrames(endSeconds + 0.4)} },
} as const;
`;

  fs.writeFileSync(timingPath, content);
};

const writeMetaTsFile = (
  compositionId: string,
  manifest: VoiceoverManifest,
): void => {
  const metaPath = path.join(
    process.cwd(),
    "src",
    "voiceover",
    `${compositionId}.meta.ts`,
  );
  fs.mkdirSync(path.dirname(metaPath), { recursive: true });

  const exportName =
    compositionId.charAt(0).toLowerCase() + compositionId.slice(1) + "Voiceover";

  const content = `// Auto-generated by: npm run voiceover -- ${compositionId}
// Regenerate after changing narration script.

export const ${exportName} = {
  enabled: true,
  audioFile: "${manifest.audioFile}",
  durationInSeconds: ${manifest.durationInSeconds},
} as const;
`;

  fs.writeFileSync(metaPath, content);
};