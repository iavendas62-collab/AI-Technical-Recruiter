# Git Hooks

This directory contains custom Git hooks for the AI Tech Recruiter project.

## Setup

To use these hooks, run:

```bash
# Make hook executable (Linux/Mac)
chmod +x pre-commit

# Or set up hook path
git config core.hooksPath .githooks
```

## Available Hooks

### pre-commit
- Prevents committing sensitive data
- Checks for API keys, emails, phone numbers
- Validates file security before commit

## For Collaborators

As a collaborator, please enable these hooks by running:

```bash
git config core.hooksPath .githooks
```

This ensures all team members follow security guidelines!

## Contact

For hook issues: demo@example.com
