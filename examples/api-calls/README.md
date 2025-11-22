# API Call Examples

Example scripts for testing API endpoints and workflows.

## Available Examples

- `github-search.sh` - Test GitHub candidate search
- `telegram-send.sh` - Test Telegram message sending
- `calendar-create.sh` - Test Google Calendar event creation
- `test-full-workflow.sh` - End-to-end workflow test

## Prerequisites

- `curl` installed
- `jq` for JSON parsing (optional)
- Valid credentials configured
- n8n workflows activated

## Usage

```bash
# Make script executable
chmod +x examples/api-calls/github-search.sh

# Run the script
./examples/api-calls/github-search.sh
```

## Configuration

Update the base URL in each script:
```bash
BASE_URL="https://your-n8n-domain.com"
