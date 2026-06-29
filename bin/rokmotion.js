#!/usr/bin/env node
/**
 * Rokmotion CLI — forwards to the video render engine.
 * Usage: npx rokmotion render <CompositionId> out/video.mp4
 */
const { spawnSync } = require("child_process");
const path = require("path");

const engineBin = path.join(__dirname, "..", "node_modules", ".bin", "remotion");
const configFile = path.join(__dirname, "..", "rokmotion.config.ts");

const args = process.argv.slice(2);
const hasConfig = args.some(
  (arg) => arg === "--config" || arg.startsWith("--config="),
);
const forwardedArgs = hasConfig ? args : ["--config", configFile, ...args];

const result = spawnSync(engineBin, forwardedArgs, {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);