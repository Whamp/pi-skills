#!/usr/bin/env node
/**
 * zai-video.js - Analyze video content
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp(
    "zai-video.js <video-path-or-url> [prompt]",
    "Analyze video content. Supports MP4, MOV, M4V (max 8MB).",
    [
      'zai-video.js ./demo.mp4 "Summarize what happens"',
      'zai-video.js ./screencast.mov "List the steps performed"',
      "zai-video.js https://example.com/clip.mp4",
    ]
  );
}

const videoSource = resolveImageSource(args[0]);
const prompt = args.slice(1).join(" ") || "Describe what happens in this video.";

const response = callMcp("analyze_video", {
  video_source: videoSource,
  prompt: prompt,
});

console.log(parseResponse(response));
