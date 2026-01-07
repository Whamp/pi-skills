---
name: zai-zread
description: Search and read GitHub repository documentation, code, structure, issues, and PRs via z.ai. Use when exploring unfamiliar repositories, understanding codebases, finding documentation, or reading specific files from GitHub repos without cloning.
---

# z.ai Zread

Search and read GitHub repositories via z.ai's Zread MCP server. Explore documentation, understand code structure, and read files without cloning.

## Setup

1. Get a z.ai API key from https://docs.z.ai
2. Configure mcporter with the zread server (run once):
   ```bash
   source {baseDir}/.env
   npx mcporter config add zread --url "https://api.z.ai/api/mcp/zread/mcp" --header "Authorization=Bearer $Z_AI_API_KEY" --scope home --description "z.ai GitHub repo reader"
   ```
   Or create `{baseDir}/.env` with your key:
   ```bash
   Z_AI_API_KEY="your-api-key-here"
   ```

## Tools

### Search Repository Documentation

```bash
{baseDir}/zread-search.js <owner/repo> <query> [--lang en|zh]
{baseDir}/zread-search.js vitejs/vite "how does HMR work"
{baseDir}/zread-search.js facebook/react "hooks lifecycle"
{baseDir}/zread-search.js pytorch/pytorch "distributed training" --lang en
```

Searches documentation, issues, commits, and knowledge base for a GitHub repository.

### Get Repository Structure

```bash
{baseDir}/zread-structure.js <owner/repo>
{baseDir}/zread-structure.js vitejs/vite
{baseDir}/zread-structure.js vercel/next.js
```

Returns directory structure and file list to understand project organization.

### Read File Content

```bash
{baseDir}/zread-file.js <owner/repo> <file-path>
{baseDir}/zread-file.js vitejs/vite src/node/server/index.ts
{baseDir}/zread-file.js facebook/react packages/react/index.js
```

Reads the complete content of a specific file from the repository.

## When to Use

- **zread-search.js**: Understand how a library works, find documentation, explore issues/PRs
- **zread-structure.js**: Get an overview of project organization before diving in
- **zread-file.js**: Read specific source files without cloning the entire repo
