# Rokmotion

Programmatic video generation with [Remotion](https://www.remotion.dev) — built for use with Grok via the `rokmotion` skill.

## Video modes

1. **User voiceover** — sync visuals to your recorded audio
2. **ElevenLabs + script** — AI narration with alignment-based scene timing
3. **Video to video** — edit a source video, add animated overlays, optional PiP

## Setup

```bash
npm install
cp .env.example .env   # add your ElevenLabs API key (mode 2 only)
```

## Commands

```bash
npm run dev              # Remotion Studio preview
npm run render           # render a composition
npm run voiceover -- <CompositionId> [script text]
npm run import-assets -- --mode user-voiceover --project <id> --audio <path>
npm run import-assets -- --mode video-to-video --project <id> --video <path>
npm run elevenlabs:test  # verify ElevenLabs API key
```

## Compositions

| ID | Description |
|----|-------------|
| `PaperRokmotionStart` | Paper-animation tutorial (ElevenLabs synced) |
| `RokmotionTutorial` | Motion graphics tutorial |
| `UserVoiceoverVideo` | Template for user-provided audio |
| `VideoToVideoEnhance` | Template for video-to-video editing |

```bash
npx remotion render PaperRokmotionStart out/video.mp4
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ELEVENLABS_API_KEY` | Mode 2 only | Get at [elevenlabs.io](https://elevenlabs.io) |
| `ELEVENLABS_VOICE_ID` | Optional | Default: Bella (free-tier compatible) |

Never commit `.env` — it is gitignored.

## License

Remotion is free for teams of up to 3. See [Remotion license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).