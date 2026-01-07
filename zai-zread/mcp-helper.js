#!/usr/bin/env node
/**
 * Shared MCP helper for z.ai zread tools
 * Uses HTTP MCP server via mcporter configured server
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const SERVER_NAME = "zread";

/**
 * Call an MCP tool via mcporter (uses configured HTTP server)
 * @param {string} tool - Tool name
 * @param {object} params - Parameters
 * @returns {string} - Tool output
 */
export function callMcp(tool, params = {}) {
  const paramStr = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
    .join(" ");

  const cmd = `npx mcporter call ${SERVER_NAME}.${tool} ${paramStr}`;

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
    
    if (stdout && stdout.length > 0) {
      return stdout;
    }
    
    if (stderr.includes("Unknown MCP server")) {
      console.error("Error: zread server not configured in mcporter.");
      console.error("Run this command to configure:");
      console.error('  npx mcporter config add zread --url "https://api.z.ai/api/mcp/zread/mcp" --header "Authorization=Bearer YOUR_API_KEY" --scope home');
      process.exit(1);
    }
    
    console.error("MCP Error:", stderr || error.message);
    process.exit(1);
  }
}

/**
 * Parse MCP response - extract text content or return as-is
 * @param {string} response - Raw mcporter output
 * @returns {string} - Cleaned output
 */
export function parseResponse(response) {
  // mcporter already formats output nicely for HTTP servers
  // Just clean up any JSON wrapping if present
  let output = response.trim();
  
  // Remove surrounding quotes if it's a JSON string
  if (output.startsWith('"') && output.endsWith('"')) {
    try {
      output = JSON.parse(output);
    } catch {
      // Keep as-is
    }
  }
  
  // Convert escaped newlines to real newlines
  output = output.replace(/\\n/g, '\n');
  
  return output;
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
  console.log("\nRequires mcporter zread server to be configured.");
  console.log("See SKILL.md for setup instructions.");
  process.exit(0);
}
