#!/usr/bin/env node
/**
 * zai-error.js - Diagnose error screenshots
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp(
    "zai-error.js <image-path-or-url> [context]",
    "Analyze error screenshots and propose actionable fixes.",
    [
      "zai-error.js ./error-dialog.png",
      'zai-error.js ./stack-trace.png "Running pytest on Flask app"',
      "zai-error.js ./crash-screenshot.png",
    ]
  );
}

const imageSource = resolveImageSource(args[0]);
const context = args.slice(1).join(" ") || undefined;

const response = callMcp("diagnose_error_screenshot", {
  image_source: imageSource,
  context: context,
});

console.log(parseResponse(response));
