#!/usr/bin/env node
/**
 * zai-chart.js - Analyze data visualizations
 */

import { callMcp, parseResponse, resolveImageSource, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  showHelp(
    "zai-chart.js <image-path-or-url> [question]",
    "Read charts, graphs, and dashboards to surface insights and trends.",
    [
      "zai-chart.js ./sales-dashboard.png",
      'zai-chart.js ./metrics.png "What is the trend for Q4?"',
      "zai-chart.js ./bar-chart.png",
    ]
  );
}

const imageSource = resolveImageSource(args[0]);
const question = args.slice(1).join(" ") || undefined;

const response = callMcp("analyze_data_visualization", {
  image_source: imageSource,
  question: question,
});

console.log(parseResponse(response));
