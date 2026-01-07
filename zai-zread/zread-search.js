#!/usr/bin/env node
/**
 * zread-search.js - Search repository documentation
 */

import { callMcp, parseResponse, showHelp } from "./mcp-helper.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h") || args.length < 2) {
  showHelp(
    "zread-search.js <owner/repo> <query> [--lang en|zh]",
    "Search documentation, issues, commits, and knowledge base for a GitHub repository.",
    [
      'zread-search.js vitejs/vite "how does HMR work"',
      'zread-search.js facebook/react "hooks lifecycle"',
      'zread-search.js pytorch/pytorch "distributed training" --lang en',
    ]
  );
}

// Parse --lang flag
let language = "en";
const langIndex = args.indexOf("--lang");
if (langIndex !== -1 && args[langIndex + 1]) {
  language = args[langIndex + 1];
  args.splice(langIndex, 2);
}

const repoName = args[0];
const query = args.slice(1).join(" ");

if (!repoName.includes("/")) {
  console.error("Error: repo must be in format owner/repo (e.g., vitejs/vite)");
  process.exit(1);
}

const response = callMcp("search_doc", {
  repo_name: repoName,
  query: query,
  language: language,
});

console.log(parseResponse(response));
