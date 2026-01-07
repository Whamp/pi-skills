# z.ai Vision Skill

Image and video analysis using z.ai's GLM-4.6V vision model via MCP.

## What It Does

This Pi skill provides CLI tools that wrap the [z.ai Vision MCP Server](https://docs.z.ai/devpack/mcp/vision-mcp-server), giving AI agents (and humans) access to powerful vision capabilities:

| Tool | Purpose |
|------|---------|
| `zai-image.js` | General image analysis |
| `zai-ocr.js` | Extract text from screenshots (OCR) |
| `zai-error.js` | Diagnose error screenshots |
| `zai-diagram.js` | Interpret technical diagrams |
| `zai-chart.js` | Analyze charts and dashboards |
| `zai-ui.js` | Convert UI screenshots to code/specs |
| `zai-diff.js` | Compare two UI screenshots |
| `zai-video.js` | Analyze video content |

## Setup

1. **Get a z.ai API key** from https://docs.z.ai

2. **Create `.env` file** in this directory:
   ```bash
   Z_AI_API_KEY="your-api-key-here"
   Z_AI_MODE="ZAI"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

```bash
# General image analysis
./zai-image.js ./photo.png "What is in this image?"

# OCR - extract text from screenshots
./zai-ocr.js ./terminal-output.png

# Diagnose errors
./zai-error.js ./error-dialog.png "Running my Flask app"

# Understand diagrams
./zai-diagram.js ./architecture.png "Explain the data flow"

# Analyze charts
./zai-chart.js ./metrics.png "What's the trend?"

# UI to code
./zai-ui.js ./mockup.png --type code "Generate React component"

# Compare screenshots
./zai-diff.js ./before.png ./after.png

# Analyze video (MP4/MOV/M4V, max 8MB)
./zai-video.js ./demo.mp4 "Summarize what happens"
```

All tools support `--help` for usage details.

## How It Works

Each tool calls the z.ai Vision MCP Server via [mcporter](https://github.com/steipete/mcporter). The MCP server runs the GLM-4.6V vision model to analyze images/videos and returns structured responses.

```
User -> CLI Tool -> mcporter -> z.ai MCP Server -> GLM-4.6V -> Response
```

## Requirements

- Node.js >= 22.0.0
- z.ai API key
- mcporter (installed automatically via npx)

## Pi Integration

This skill is automatically discovered by Pi when placed in a configured skill directory. Pi will load the `SKILL.md` file when vision-related tasks are detected.

## License

MIT
