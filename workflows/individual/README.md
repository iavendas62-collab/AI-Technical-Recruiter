# Individual Workflows

Separate n8n workflow files for each component.

## Available Workflows

Each workflow can be imported individually into n8n:

- `github-search.json` - GitHub candidate search workflow
- `telegram-contact.json` - Telegram invitation workflow
- `telegram-callback.json` - MCP callback handler
- `schedule-interview.json` - Google Calendar scheduling
- `send-email.json` - Gmail email delivery

## Usage

1. Open n8n interface
2. Go to Workflows → Import from File
3. Select the workflow JSON file
4. Configure credentials for each node
5. Activate the workflow
6. Test with sample data

## Configuration

Each workflow requires specific credentials:
- GitHub: Personal Access Token
- Telegram: Bot Token
- Google: OAuth 2.0 or Service Account
