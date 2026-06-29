#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

FRAMES_DIR="/tmp/rokmotion-banner-frames"
rm -rf "$FRAMES_DIR"
mkdir -p "$FRAMES_DIR"

echo "Rendering Rokmotion banner (transparent PNG sequence)..."
node bin/rokmotion.js render BannerRokmotion "$FRAMES_DIR/frame" \
  --sequence \
  --image-format=png \
  --log=error

echo "Converting to transparent GIF..."
ffmpeg -y -framerate 10 -i "$FRAMES_DIR/frame/element-%02d.png" \
  -filter_complex "[0:v]fps=10,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=reserve_transparent=1:max_colors=64[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3:alpha_threshold=128" \
  -loop 0 assets/created-with-rokmotion.gif

echo "Capturing still PNG..."
node bin/rokmotion.js still BannerRokmotion assets/created-with-rokmotion.png \
  --frame=30 \
  --image-format=png \
  --log=error

rm -rf "$FRAMES_DIR"
echo "Done: assets/created-with-rokmotion.gif + .png"