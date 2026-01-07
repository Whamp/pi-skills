#!/usr/bin/env node
/**
 * zread-structure.js - Get repository directory structure
 */

import { callMcp, parseResponse, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length < 1) {
  showHelp(
    "zread-structure.js <owner/repo>",
    "Get the directory structure and file list of a GitHub repository.",
    [
      "zread-structure.js vitejs/vite",
      "zread-structure.js vercel/next.js",
      "zread-structure.js facebook/react",
    ]
  );
}

const repoName = args[0];

if (!repoName.includes("/")) {
  console.error("Error: repo must be in format owner/repo (e.g., vitejs/vite)");
  process.exit(1);
}

const response = callMcp("get_repo_structure", {
  repo_name: repoName,
});

console.log(parseResponse(response));
