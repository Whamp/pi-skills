# z.ai Zread Skill

Search and read GitHub repositories via z.ai's Zread MCP server.

## What It Does

This Pi skill provides CLI tools that wrap the [z.ai Zread MCP Server](https://docs.z.ai/devpack/mcp/zread-mcp-server), enabling exploration of GitHub repositories without cloning:

| Tool | Purpose |
|------|---------|
| `zread-search.js` | Search docs, issues, commits, knowledge base |
| `zread-structure.js` | Get directory structure and file list |
| `zread-file.js` | Read specific file content |

## Setup

1. **Get a z.ai API key** from https://docs.z.ai

2. **Configure mcporter** with the zread server:
   ```bash
   npx mcporter config add zread \
     --url "https://api.z.ai/api/mcp/zread/mcp" \
     --header "Authorization=Bearer YOUR_API_KEY" \
     --scope home \
     --description "z.ai GitHub repo reader"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

```bash
# Search repository documentation
./zread-search.js vitejs/vite "how does HMR work"
./zread-search.js facebook/react "hooks lifecycle" --lang en

# Get repository structure
./zread-structure.js vitejs/vite

# Read a specific file
./zread-file.js vitejs/vite src/node/server/index.ts
```

All tools support `--help` for usage details.

## How It Works

This skill uses a **remote HTTP MCP server** (unlike the vision skill which uses stdio). The server is pre-configured in mcporter, which handles authentication and HTTP transport.

```
User -> CLI Tool -> mcporter -> z.ai HTTP API -> Response
```

## Requirements

- z.ai API key
- mcporter configured with zread server (see Setup)

## Pi Integration

This skill is automatically discovered by Pi when placed in a configured skill directory. Pi will load the `SKILL.md` file when GitHub repository exploration tasks are detected.

## License

MIT
