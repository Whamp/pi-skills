#!/usr/bin/env node
/**
 * zai-ui.js - Convert UI screenshots to artifacts
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp(
    "zai-ui.js <image-path-or-url> --type <code|prompt|spec|description> [instructions]",
    "Convert UI screenshots into code, AI prompts, design specs, or descriptions.",
    [
      'zai-ui.js ./mockup.png --type code "Generate React component"',
      "zai-ui.js ./design.png --type spec",
      'zai-ui.js ./screenshot.png --type prompt "For Midjourney"',
      "zai-ui.js ./app.png --type description",
    ]
  );
}

// Parse --type flag
let outputType = "description";
const typeIndex = args.indexOf("--type");
if (typeIndex !== -1 && args[typeIndex + 1]) {
  outputType = args[typeIndex + 1];
  args.splice(typeIndex, 2);
}

const validTypes = ["code", "prompt", "spec", "description"];
if (!validTypes.includes(outputType)) {
  console.error(`Error: --type must be one of: ${validTypes.join(", ")}`);
  process.exit(1);
}

if (args.length === 0) {
  console.error("Error: image path or URL required");
  process.exit(1);
}

const imageSource = resolveImageSource(args[0]);
const prompt = args.slice(1).join(" ") || `Generate ${outputType} from this UI screenshot.`;

const response = callMcp("ui_to_artifact", {
  image_source: imageSource,
  output_type: outputType,
  prompt: prompt,
});

console.log(parseResponse(response));
