#!/usr/bin/env node
/**
 * zai-image.js - General purpose image analysis
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp(
    "zai-image.js <image-path-or-url> [prompt]",
    "General-purpose image analysis using z.ai GLM-4.6V vision model.",
    [
      'zai-image.js ./photo.png "What is in this image?"',
      'zai-image.js https://example.com/img.jpg "Describe this"',
      "zai-image.js ./screenshot.png",
    ]
  );
}

const imageSource = resolveImageSource(args[0]);
const prompt = args.slice(1).join(" ") || "Analyze this image and describe what you see.";

const response = callMcp("analyze_image", {
  image_source: imageSource,
  prompt: prompt,
});

console.log(parseResponse(response));
