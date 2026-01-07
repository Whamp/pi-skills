#!/usr/bin/env node
/**
 * Shared MCP helper for z.ai vision tools
 */

import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const MCP_COMMAND = "npx -y @z_ai/mcp-server";
const SERVER_NAME = "zai";

/**
 * Call an MCP tool via mcporter
 * @param {string} tool - Tool name
 * @param {object} params - Parameters
 * @returns {string} - Tool output
 */
export function callMcp(tool, params = {}) {
  const apiKey = process.env.Z_AI_API_KEY;
  const mode = process.env.Z_AI_MODE || "ZAI";

  if (!apiKey) {
    console.error("Error: Z_AI_API_KEY not set.");
    console.error("Create a .env file with: Z_AI_API_KEY=your-key");
    process.exit(1);
  }

  const paramStr = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
    .join(" ");

  const cmd = `Z_AI_API_KEY="${apiKey}" Z_AI_MODE="${mode}" npx mcporter call --stdio "${MCP_COMMAND}" --name ${SERVER_NAME} ${tool} ${paramStr}`;

  try {
    const result = execSync(cmd, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      maxBuffer: 50 * 1024 * 1024,
    });
    return result;
  } catch (error) {
    const stderr = error.stderr || "";
    const stdout = error.stdout || "";
    
    // mcporter outputs JSON with result even on "error" exit codes
    if (stdout.includes('"content"')) {
      return stdout;
    }
    
    console.error("MCP Error:", stderr || error.message);
    process.exit(1);
  }
}

/**
 * Parse MCP JSON response and extract text content
 * @param {string} response - Raw mcporter output
 * @returns {string} - Extracted text
 */
export function parseResponse(response) {
  try {
    const data = JSON.parse(response);
    if (data.content && Array.isArray(data.content)) {
      return data.content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("\n");
    }
    if (data.result && data.result.content) {
      return data.result.content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("\n");
    }
    return JSON.stringify(data, null, 2);
  } catch {
    return response;
  }
}

/**
 * Resolve image source - handle local files and URLs
 * @param {string} source - File path or URL
 * @returns {string} - Absolute path or URL
 */
export function resolveImageSource(source) {
  if (source.startsWith("http://") || source.startsWith("https://")) {
    return source;
  }
  const resolved = path.resolve(source);
  if (!existsSync(resolved)) {
    console.error(`Error: File not found: ${source}`);
    process.exit(1);
  }
  return resolved;
}

/**
 * Show help and exit
 * @param {string} usage - Usage line
 * @param {string} description - Tool description
 * @param {string[]} examples - Example commands
 */
export function showHelp(usage, description, examples = []) {
  console.log(`Usage: ${usage}`);
  console.log(`\n${description}`);
  if (examples.length > 0) {
    console.log("\nExamples:");
    examples.forEach((ex) => console.log(`  ${ex}`));
  }
  console.log("\nEnvironment:");
  console.log("  Z_AI_API_KEY  Required. Your z.ai API key (in .env file)");
  console.log("  Z_AI_MODE     Optional. Defaults to ZAI");
  process.exit(0);
}
