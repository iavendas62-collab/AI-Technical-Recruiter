# Templates

Email and message templates for candidate communication.

## Available Templates

- `email-invitation.html` - Interview invitation email
- `email-confirmation.html` - Interview confirmation email
- `email-offer.html` - Job offer email
- `telegram-invitation.md` - Telegram invitation message
- `telegram-followup.md` - Follow-up message template

## Template Variables

All templates support variable substitution:

- `{{candidate_name}}` - Candidate's name
- `{{job_title}}` - Job position title
- `{{interview_date}}` - Interview date
- `{{interview_time}}` - Interview time
- `{{interview_link}}` - Meeting link
- `{{company_name}}` - Company name

## Usage

Templates are loaded by n8n workflows and populated with actual values at runtime.
