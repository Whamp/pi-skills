#!/usr/bin/env node
/**
 * zai-ocr.js - Extract text from screenshots (OCR)
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp(
    "zai-ocr.js <image-path-or-url>",
    "Extract text from screenshots using OCR. Best for code, terminal output, documents.",
    [
      "zai-ocr.js ./terminal.png",
      "zai-ocr.js ./code-screenshot.png",
      "zai-ocr.js https://example.com/document.jpg",
    ]
  );
}

const imageSource = resolveImageSource(args[0]);

const response = callMcp("extract_text_from_screenshot", {
  image_source: imageSource,
});

console.log(parseResponse(response));
