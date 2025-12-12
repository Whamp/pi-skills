---
name: transcribe
description: Speech-to-text transcription using Groq Whisper API. Supports m4a, mp3, wav, ogg, flac, webm.
---

# Transcribe

Speech-to-text using Groq Whisper API.

## Setup

First check if already configured:
```bash
cat {baseDir}/config
```

If config doesn't exist, guide the user through setup:
1. Ask if they have a Groq API key
2. If not, have them sign up at https://console.groq.com/ and create an API key
3. Create the config file:
   ```bash
   echo 'GROQ_API_KEY="<their-api-key>"' > {baseDir}/config
   ```

## Usage

```bash
{baseDir}/transcribe.sh <audio-file>
```

## Supported Formats

- m4a, mp3, wav, ogg, flac, webm
- Max file size: 25MB

## Output

Returns plain text transcription with punctuation and proper capitalization to stdout.
