#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Rendering Rokmotion banner..."
npx rokmotion render BannerRokmotion /tmp/rokmotion-banner.mp4 --log=error

echo "Converting to GIF..."
ffmpeg -y -i /tmp/rokmotion-banner.mp4 \
  -filter_complex "[0:v]fps=10,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" \
  -loop 0 assets/rokmotion-banner.gif

ffmpeg -y -i /tmp/rokmotion-banner.mp4 -vframes 1 assets/rokmotion-banner.png

rm -f /tmp/rokmotion-banner.mp4 assets/rokmotion-banner.apng
echo "Done: assets/rokmotion-banner.gif + .png"