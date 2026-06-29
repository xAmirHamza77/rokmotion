import * as dotenv from "dotenv";
import { generateVoiceover, getManifestPath } from "./client";

dotenv.config();

const NARRATIONS: Record<string, string> = {
  RokmotionTutorial: `Welcome to Rokmotion with Grok. Create stunning programmatic videos using React and Remotion. Step one: open Grok and type slash rokmotion. Step two: describe your video — the duration, style, and content you need. Step three: Grok writes your Remotion code and renders an MP4 file. Your video is ready. Try it today.`,
  PaperRokmotionStart: `Want to make videos with code? Here's how to start Rokmotion with Grok. Step one: open Grok and type slash rokmotion. Step two: describe your video — like a thirty second paper animation, synced with audio. Step three: Grok builds your Remotion composition with cut paper style scenes. Step four: ElevenLabs adds voiceover and syncs the timing to each scene. Step five: run the render command and your MP4 is ready. Start creating today.`,
};

const main = async () => {
  const compositionId = process.argv[2];
  const customText = process.argv.slice(3).join(" ").trim();

  if (!compositionId) {
    console.error(
      "Usage: npm run voiceover -- <CompositionId> [custom text]\n" +
        "Example: npm run voiceover -- RokmotionTutorial",
    );
    process.exit(1);
  }

  const text = customText || NARRATIONS[compositionId];
  if (!text) {
    console.error(
      `No narration script for "${compositionId}". Pass custom text as additional arguments.`,
    );
    process.exit(1);
  }

  console.log(`Generating voiceover for ${compositionId}...`);
  const manifest = await generateVoiceover({ compositionId, text });

  console.log("Voiceover generated:");
  console.log(`  Audio: public/${manifest.audioFile}`);
  console.log(`  Duration: ${manifest.durationInSeconds.toFixed(2)}s`);
  console.log(`  Manifest: ${getManifestPath(compositionId)}`);
};

main().catch((err) => {
  console.error("Voiceover generation failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});