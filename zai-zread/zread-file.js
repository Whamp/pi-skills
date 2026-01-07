#!/usr/bin/env node
/**
 * zread-file.js - Read file content from repository
 */

import { callMcp, parseResponse, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length < 2) {
  showHelp(
    "zread-file.js <owner/repo> <file-path>",
    "Read the complete content of a specific file from a GitHub repository.",
    [
      "zread-file.js vitejs/vite src/node/server/index.ts",
      "zread-file.js facebook/react packages/react/index.js",
      "zread-file.js vercel/next.js packages/next/src/server/next.ts",
    ]
  );
}

const repoName = args[0];
const filePath = args.slice(1).join(" ");

if (!repoName.includes("/")) {
  console.error("Error: repo must be in format owner/repo (e.g., vitejs/vite)");
  process.exit(1);
}

const response = callMcp("read_file", {
  repo_name: repoName,
  file_path: filePath,
});

console.log(parseResponse(response));
