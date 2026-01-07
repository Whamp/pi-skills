---
name: zai-vision
description: Image and video analysis via z.ai GLM-4.6V vision model. Use for analyzing screenshots, extracting text/code from images (OCR), diagnosing errors from screenshots, understanding technical diagrams, reading charts/dashboards, comparing UI screenshots, and analyzing videos. Powered by MCP.
---

# z.ai Vision

Image and video analysis using z.ai's GLM-4.6V vision model via MCP (Model Context Protocol).

## Setup

1. Get a z.ai API key from https://docs.z.ai
2. Create a `.env` file in the skill directory (`{baseDir}/.env`):
   ```bash
   Z_AI_API_KEY="your-api-key-here"
   Z_AI_MODE="ZAI"
   ```
3. Install dependencies (run once):
   ```bash
   cd {baseDir}
   npm install
   ```

## Tools

### Analyze Image (General Purpose)

```bash
{baseDir}/zai-image.js <image-path-or-url> [prompt]
{baseDir}/zai-image.js ./screenshot.png "What is shown in this image?"
{baseDir}/zai-image.js https://example.com/photo.jpg "Describe this"
```

### Extract Text from Screenshot (OCR)

```bash
{baseDir}/zai-ocr.js <image-path-or-url>
{baseDir}/zai-ocr.js ./terminal-output.png
{baseDir}/zai-ocr.js ./code-screenshot.png
```

Best for: code snippets, terminal output, documents, any text in images.

### Diagnose Error Screenshot

```bash
{baseDir}/zai-error.js <image-path-or-url> [context]
{baseDir}/zai-error.js ./error-dialog.png
{baseDir}/zai-error.js ./stack-trace.png "Running pytest on Flask app"
```

Analyzes error messages and proposes actionable fixes.

### Understand Technical Diagram

```bash
{baseDir}/zai-diagram.js <image-path-or-url> [question]
{baseDir}/zai-diagram.js ./architecture.png
{baseDir}/zai-diagram.js ./flowchart.png "What happens after user login?"
```

Interprets: architecture diagrams, flowcharts, UML, ER diagrams, system diagrams.

### Analyze Data Visualization

```bash
{baseDir}/zai-chart.js <image-path-or-url> [question]
{baseDir}/zai-chart.js ./sales-dashboard.png
{baseDir}/zai-chart.js ./metrics.png "What's the trend for Q4?"
```

Reads charts, graphs, and dashboards to surface insights.

### UI to Artifact

```bash
{baseDir}/zai-ui.js <image-path-or-url> --type <code|prompt|spec|description> [instructions]
{baseDir}/zai-ui.js ./mockup.png --type code "Generate React component"
{baseDir}/zai-ui.js ./design.png --type spec
{baseDir}/zai-ui.js ./screenshot.png --type prompt "For Midjourney"
```

Converts UI screenshots into code, AI prompts, design specs, or descriptions.

### UI Diff Check

```bash
{baseDir}/zai-diff.js <image1> <image2> [context]
{baseDir}/zai-diff.js ./before.png ./after.png
{baseDir}/zai-diff.js ./design.png ./implementation.png "Check for visual differences"
```

Compares two UI screenshots to flag visual or implementation drift.

### Analyze Video

```bash
{baseDir}/zai-video.js <video-path-or-url> [prompt]
{baseDir}/zai-video.js ./demo.mp4 "Summarize what happens"
{baseDir}/zai-video.js ./screencast.mov "List the steps performed"
```

Supports: MP4, MOV, M4V (max 8MB). Describes scenes, moments, and entities.

## When to Use

- **zai-ocr.js**: Extract text/code from screenshots, terminal output, documents
- **zai-error.js**: Diagnose error dialogs, stack traces, crash screenshots
- **zai-diagram.js**: Understand architecture, flowcharts, UML, system diagrams
- **zai-chart.js**: Read charts, graphs, dashboards, data visualizations
- **zai-ui.js**: Convert UI mockups to code, specs, or prompts
- **zai-diff.js**: Compare before/after screenshots, design vs implementation
- **zai-video.js**: Analyze video content, screencasts, demos
- **zai-image.js**: General image analysis when others don't fit
