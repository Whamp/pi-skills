#!/usr/bin/env node
/**
 * zai-diagram.js - Understand technical diagrams
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp(
    "zai-diagram.js <image-path-or-url> [question]",
    "Interpret technical diagrams: architecture, flowcharts, UML, ER, system diagrams.",
    [
      "zai-diagram.js ./architecture.png",
      'zai-diagram.js ./flowchart.png "What happens after user login?"',
      "zai-diagram.js ./er-diagram.png",
    ]
  );
}

const imageSource = resolveImageSource(args[0]);
const question = args.slice(1).join(" ") || undefined;

const response = callMcp("understand_technical_diagram", {
  image_source: imageSource,
  question: question,
});

console.log(parseResponse(response));
