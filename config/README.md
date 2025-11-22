# Configuration

Configuration templates and examples for the AI Tech Recruiter system.

## Available Configurations

- `orchestrate-agent.example.json` - Agent configuration for watsonx Orchestrate
- `n8n-credentials.example.json` - Credential templates for n8n
- `environment-variables.md` - Complete environment variable reference

## Setup Instructions

1. Copy example files and remove `.example` suffix
2. Fill in your actual values
3. Never commit files with real credentials
4. Use environment variables when possible

## Security Notes

- Store sensitive configs outside of git
- Use secrets managers in production
- Rotate credentials regularly
- Follow principle of least privilege
