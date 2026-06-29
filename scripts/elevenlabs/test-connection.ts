import * as dotenv from "dotenv";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { getApiKey, getVoiceId } from "./client";

dotenv.config();

const main = async () => {
  const apiKey = getApiKey();
  const voiceId = getVoiceId();

  const client = new ElevenLabsClient({
    environment: "https://api.elevenlabs.io",
    apiKey,
  });

  const data = await client.textToSpeech.convertWithTimestamps(voiceId, {
    text: "Rokmotion voiceover test successful.",
    modelId: "eleven_multilingual_v2",
  });

  if (!data.audioBase64) {
    throw new Error("No audio returned from ElevenLabs");
  }

  const bytes = Buffer.from(data.audioBase64, "base64").length;
  const endTimes = data.alignment?.characterEndTimesSeconds ?? [];
  const duration = endTimes.length > 0 ? endTimes[endTimes.length - 1] : 0;

  console.log("ElevenLabs TTS connection OK");
  console.log(`Voice ID: ${voiceId}`);
  console.log(`Sample audio: ${bytes} bytes`);
  console.log(`Sample duration: ${duration.toFixed(2)}s`);
};

main().catch((err) => {
  console.error(
    "ElevenLabs test failed:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
});