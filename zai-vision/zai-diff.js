#!/usr/bin/env node
/**
 * zai-diff.js - Compare two UI screenshots
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length < 2) {
  showHelp(
    "zai-diff.js <image1> <image2> [context]",
    "Compare two UI screenshots to flag visual or implementation drift.",
    [
      "zai-diff.js ./before.png ./after.png",
      'zai-diff.js ./design.png ./implementation.png "Check for differences"',
      "zai-diff.js ./v1.png ./v2.png",
    ]
  );
}

const image1 = resolveImageSource(args[0]);
const image2 = resolveImageSource(args[1]);
const context = args.slice(2).join(" ") || undefined;

const response = callMcp("ui_diff_check", {
  image_source_1: image1,
  image_source_2: image2,
  context: context,
});

console.log(parseResponse(response));
