# 📡 API Reference - AI Tech Recruiter

## Visão Geral

Este documento descreve todas as APIs e endpoints utilizados no sistema AI Tech Recruiter, incluindo os webhooks do n8n, APIs externas integradas e o protocolo MCP (Model Context Protocol).

---

## Sumário

1. [n8n Webhook APIs](#n8n-webhook-apis)
2. [External APIs](#external-apis)
3. [MCP Protocol](#mcp-protocol)
4. [Error Codes](#error-codes)
5. [Rate Limits](#rate-limits)
6. [Authentication](#authentication)

---

## n8n Webhook APIs

### Base URL
```
https://seu-n8n-domain.com/webhook
```

### Authentication
Todos os webhooks usam validação por signature:
```
X-Signature: sha256=<hmac_signature>
```

---

## 1. Search GitHub Candidates

Busca candidatos no GitHub com base em critérios técnicos.

### Endpoint
```
POST /webhook/github-search
```

### Request Headers
```http
Content-Type: application/json
X-Signature: sha256=abc123...
```

### Request Body
```json
{
  "technology": "Python",
  "seniority": "Senior",
  "location": "Brazil",
  "min_score": 75,
  "max_results": 10
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| technology | string | Yes | Programming language or tech stack |
| seniority | string | No | Junior, Mid-level, Mid-Senior, Senior |
| location | string | No | Country or city (default: "Brazil") |
| min_score | integer | No | Minimum GitHub score (0-100, default: 75) |
| max_results | integer | No | Maximum candidates to return (default: 10) |

### Response

#### Success (200 OK)
```json
{
  "success": true,
  "total_found": 5,
  "candidates": [
    {
      "id": 1,
      "nome_candidato": "Ana Silva",
      "score_repos": 95,
      "url_github": "https://github.com/anasilva-dev",
      "url_contato": "ana.silva@exemplo.com",
      "contact_number": "(11) 98765-4321",
      "technologies": "Python, Django, FastAPI, PostgreSQL, Redis",
      "location": "São Paulo, Brazil",
      "experience_years": 6,
      "seniority": "Senior",
      "repos": [
        {
          "name": "ml-pipeline",
          "stars": 234,
          "language": "Python",
          "updated_at": "2025-11-15T10:30:00Z"
        }
      ],
      "is_test_candidate": false
    }
  ],
  "query": {
    "technology": "Python",
    "seniority": "Senior",
    "location": "Brazil",
    "min_score": 75
  },
  "mode": "demo"
}
```

#### Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Invalid technology parameter",
  "code": "INVALID_PARAM"
}
```

### Code Examples

#### cURL
```bash
curl -X POST https://seu-n8n.com/webhook/github-search \
  -H "Content-Type: application/json" \
  -H "X-Signature: sha256=abc123..." \
  -d '{
    "technology": "Python",
    "seniority": "Senior",
    "location": "Brazil",
    "min_score": 85
  }'
```

#### Python
```python
import requests

url = "https://seu-n8n.com/webhook/github-search"
headers = {
    "Content-Type": "application/json",
    "X-Signature": "sha256=abc123..."
}
payload = {
    "technology": "Python",
    "seniority": "Senior",
    "location": "Brazil",
    "min_score": 85
}

response = requests.post(url, json=payload, headers=headers)
candidates = response.json()["candidates"]
```

#### JavaScript
```javascript
const response = await fetch('https://seu-n8n.com/webhook/github-search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Signature': 'sha256=abc123...'
  },
  body: JSON.stringify({
    technology: 'Python',
    seniority: 'Senior',
    location: 'Brazil',
    min_score: 85
  })
});

const data = await response.json();
console.log(data.candidates);
```

**[INSERIR PRINT: Teste do endpoint no Postman/Insomnia]**

---

## 2. Send Telegram Invitation

Envia convite de entrevista para candidato via Telegram.

### Endpoint
```
POST /webhook/telegram-contact
```

### Request Body
```json
{
  "candidate_name": "Ana Silva",
  "candidate_email": "ana.silva@exemplo.com",
  "chat_id": "123456789",
  "role": "Senior Python Developer",
  "message_text": "Hi Ana, we would like to invite you for an interview for the Senior Python Developer role. Are you available?"
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate_name | string | Yes | Full name of the candidate |
| candidate_email | string | Yes | Email for follow-up |
| chat_id | string | Yes | Telegram chat ID |
| role | string | Yes | Job position title |
| message_text | string | No | Custom message (uses template if not provided) |

### Response

#### Success (200 OK)
```json
{
  "success": true,
  "message_sent": true,
  "message_id": 12345,
  "chat_id": "123456789",
  "timestamp": "2025-11-22T15:30:00Z"
}
```

#### Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Invalid chat_id",
  "code": "INVALID_CHAT_ID"
}
```

### Message Template
```
🤖 *Convite para Entrevista*

Olá {candidate_name}!

Encontramos seu perfil no GitHub e ficamos impressionados com suas contribuições.

Gostaríamos de convidá-lo(a) para uma entrevista para a vaga de *{role}*.

Você tem interesse?

---
_Mensagem enviada por AI Tech Recruiter_
```

**[INSERIR PRINT: Mensagem no Telegram]**

---

## 3. Wait For Acceptance (MCP Callback)

Pausa a execução do workflow e aguarda resposta do candidato via MCP callback.

### Endpoint (Initial Request)
```
POST /webhook/wait-acceptance
```

### Request Body
```json
{
  "candidate_id": 1,
  "candidate_name": "Ana Silva",
  "chat_id": "123456789",
  "callback_url": "https://orchestrate.ibm.com/api/mcp/callback/abc123",
  "timeout": 86400
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate_id | integer | Yes | Unique candidate identifier |
| candidate_name | string | Yes | Candidate full name |
| chat_id | string | Yes | Telegram chat ID |
| callback_url | string | Yes | MCP callback endpoint |
| timeout | integer | No | Timeout in seconds (default: 86400 = 24h) |

### Response (Initial)

#### Success (202 Accepted)
```json
{
  "success": true,
  "status": "waiting",
  "wait_id": "wait_abc123",
  "expires_at": "2025-11-23T15:30:00Z"
}
```

### MCP Callback (When candidate responds)

#### Callback Request
```
POST {callback_url}
```

#### Callback Body
```json
{
  "wait_id": "wait_abc123",
  "candidate_id": 1,
  "candidate_name": "Ana Silva",
  "chat_id": "123456789",
  "response_text": "Yes, I'm interested! Please schedule for December 16, 2025 at 4:00 PM.",
  "accepted": true,
  "timestamp": "2025-11-22T16:45:00Z"
}
```

### Callback Response
```json
{
  "received": true,
  "continue_workflow": true
}
```

**[INSERIR PRINT: Fluxo MCP no diagrama de sequência]**

---

## 4. Schedule Interview

Agenda entrevista no Google Calendar.

### Endpoint
```
POST /webhook/schedule-interview
```

### Request Body
```json
{
  "candidate_name": "Ana Silva",
  "candidate_email": "ana.silva@exemplo.com",
  "interview_datetime": "2025-12-16T16:00:00Z",
  "duration_minutes": 30,
  "interviewer_email": "recruiter@empresa.com",
  "meeting_type": "technical"
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate_name | string | Yes | Candidate full name |
| candidate_email | string | Yes | Candidate email |
| interview_datetime | string | Yes | ISO 8601 format (UTC) |
| duration_minutes | integer | No | Interview duration (default: 30) |
| interviewer_email | string | No | Interviewer email |
| meeting_type | string | No | technical, behavioral, cultural |

### Response

#### Success (200 OK)
```json
{
  "success": true,
  "event_created": true,
  "event_id": "abc123xyz",
  "calendar_link": "https://calendar.google.com/event?eid=abc123xyz",
  "meet_link": "https://meet.google.com/abc-defg-hij",
  "interview_details": {
    "start_time": "2025-12-16T13:00:00-03:00",
    "end_time": "2025-12-16T13:30:00-03:00",
    "timezone": "America/Sao_Paulo",
    "attendees": [
      "ana.silva@exemplo.com",
      "recruiter@empresa.com"
    ]
  }
}
```

#### Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Invalid datetime format",
  "code": "INVALID_DATETIME"
}
```

### Timezone Conversion
```javascript
// Input: UTC
"2025-12-16T16:00:00Z"

// Output: Brazil timezone
"2025-12-16T13:00:00-03:00"

// Conversion logic
const utcDate = new Date(interview_datetime);
const brazilOffset = -3 * 60; // -180 minutes
const brazilDate = new Date(utcDate.getTime() + brazilOffset * 60000);
```

**[INSERIR PRINT: Evento criado no Google Calendar]**

---

## 5. Send Final Offer Email

Envia email de confirmação/oferta para o candidato.

### Endpoint
```
POST /webhook/send-offer-email
```

### Request Body
```json
{
  "candidate_name": "Ana Silva",
  "candidate_email": "ana.silva@exemplo.com",
  "final_status": "Aprovado",
  "vaga_skill": "Senior Python Developer",
  "additional_info": {
    "salary_range": "R$ 15.000 - R$ 20.000",
    "benefits": ["Vale Refeição", "Plano de Saúde", "Home Office"],
    "start_date": "2026-01-15"
  }
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| candidate_name | string | Yes | Candidate full name |
| candidate_email | string | Yes | Candidate email |
| final_status | string | Yes | Aprovado, Aceito, Contratado |
| vaga_skill | string | Yes | Job position title |
| additional_info | object | No | Extra details for the email |

### Response

#### Success (200 OK)
```json
{
  "success": true,
  "email_sent": true,
  "message_id": "msg_abc123",
  "recipient": "ana.silva@exemplo.com",
  "subject": "🎉 Parabéns! Você foi aprovado(a) - Senior Python Developer",
  "timestamp": "2025-11-22T17:00:00Z"
}
```

### Email Template Structure
```html
<div class="email-container">
  <!-- Header -->
  <div class="header">
    <h1>🎉 Parabéns! Você foi aprovado(a)!</h1>
  </div>
  
  <!-- Content -->
  <div class="content">
    <p>Prezado(a) <strong>{candidate_name}</strong>,</p>
    
    <div class="highlight-box">
      <h3>✅ Detalhes da Aprovação</h3>
      <ul>
        <li>Vaga: {vaga_skill}</li>
        <li>Status: {final_status}</li>
        <li>Salário: {salary_range}</li>
      </ul>
    </div>
    
    <div class="next-steps">
      <h3>📋 Próximos Passos</h3>
      <ol>
        <li>Contato do RH em 2 dias úteis</li>
        <li>Documentação necessária</li>
        <li>Reunião de onboarding</li>
        <li>Início: {start_date}</li>
      </ol>
    </div>
  </div>
  
  <!-- Footer -->
  <div class="footer">
    <p>AI Tech Recruiter<br/>Powered by IBM watsonx Orchestrate</p>
  </div>
</div>
```

**[INSERIR PRINT: Email recebido]**

---

## External APIs

### GitHub API

#### Base URL
```
https://api.github.com
```

#### Authentication
```
Authorization: Bearer {GITHUB_TOKEN}
```

#### Search Users
```
GET /search/users?q=language:Python+location:Brazil
```

**Response**:
```json
{
  "total_count": 1234,
  "incomplete_results": false,
  "items": [
    {
      "login": "anasilva-dev",
      "id": 12345,
      "avatar_url": "https://avatars.githubusercontent.com/u/12345",
      "html_url": "https://github.com/anasilva-dev",
      "type": "User",
      "score": 95.3
    }
  ]
}
```

#### Get User Repositories
```
GET /users/{username}/repos
```

**[INSERIR PRINT: GitHub API response]**

---

### Telegram Bot API

#### Base URL
```
https://api.telegram.org/bot{BOT_TOKEN}
```

#### Send Message
```
POST /sendMessage
```

**Request**:
```json
{
  "chat_id": "123456789",
  "text": "Hello from AI Tech Recruiter!",
  "parse_mode": "Markdown"
}
```

**Response**:
```json
{
  "ok": true,
  "result": {
    "message_id": 12345,
    "from": {
      "id": 987654321,
      "is_bot": true,
      "first_name": "AI Tech Recruiter"
    },
    "chat": {
      "id": 123456789,
      "first_name": "Ana",
      "type": "private"
    },
    "date": 1700000000,
    "text": "Hello from AI Tech Recruiter!"
  }
}
```

#### Get Updates (Webhook)
```
POST /setWebhook
```

**Request**:
```json
{
  "url": "https://seu-n8n.com/webhook/telegram-updates",
  "allowed_updates": ["message"]
}
```

**[INSERIR PRINT: Telegram Bot API docs]**

---

### Google Calendar API

#### Base URL
```
https://www.googleapis.com/calendar/v3
```

#### Authentication
```
Authorization: Bearer {OAUTH_TOKEN}
```

#### Create Event
```
POST /calendars/{calendarId}/events
```

**Request**:
```json
{
  "summary": "Entrevista - Ana Silva",
  "description": "Entrevista técnica com Ana Silva",
  "start": {
    "dateTime": "2025-12-16T13:00:00-03:00",
    "timeZone": "America/Sao_Paulo"
  },
  "end": {
    "dateTime": "2025-12-16T13:30:00-03:00",
    "timeZone": "America/Sao_Paulo"
  },
  "attendees": [
    {"email": "ana.silva@exemplo.com"}
  ],
  "conferenceData": {
    "createRequest": {
      "requestId": "random-string"
    }
  }
}
```

**Response**:
```json
{
  "id": "abc123xyz",
  "status": "confirmed",
  "htmlLink": "https://calendar.google.com/event?eid=abc123xyz",
  "hangoutLink": "https://meet.google.com/abc-defg-hij"
}
```

**[INSERIR PRINT: Google Calendar API response]**

---

### Gmail API

#### Base URL
```
https://gmail.googleapis.com/gmail/v1
```

#### Send Email
```
POST /users/me/messages/send
```

**Request**:
```json
{
  "raw": "base64_encoded_email"
}
```

**Email Format (before base64)**:
```
From: AI Tech Recruiter <noreply@empresa.com>
To: ana.silva@exemplo.com
Subject: =?UTF-8?B?8J+OiSBQYXJhYsOpbnMh?=
Content-Type: text/html; charset=UTF-8

<html>
  <body>
    <h1>Parabéns!</h1>
    ...
  </body>
</html>
```

**[INSERIR PRINT: Gmail API send]**

---

## MCP Protocol

### Model Context Protocol Specification

#### Overview
MCP permite callbacks assíncronos entre IBM watsonx Orchestrate e sistemas externos.

#### Flow
```
1. Orchestrate calls tool with callback_url
   ↓
2. Tool responds with 202 Accepted + wait_id
   ↓
3. Tool enters waiting state
   ↓
4. External event triggers (e.g., Telegram message)
   ↓
5. Tool calls callback_url with result
   ↓
6. Orchestrate resumes workflow
```

#### Callback Structure
```json
{
  "protocol": "mcp",
  "version": "1.0",
  "wait_id": "wait_abc123",
  "status": "completed",
  "result": {
    "candidate_accepted": true,
    "response_text": "Yes, I'm interested!",
    "timestamp": "2025-11-22T16:45:00Z"
  }
}
```

#### Timeout Handling
```javascript
// If no response within timeout
{
  "protocol": "mcp",
  "version": "1.0",
  "wait_id": "wait_abc123",
  "status": "timeout",
  "error": "No response received within 24 hours"
}
```

**[INSERIR PRINT: MCP flow diagram]**

---

## Error Codes

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 202 | Accepted | Request accepted, waiting for callback |
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Invalid or missing authentication |
| 403 | Forbidden | Valid auth but insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Service temporarily down |

### Custom Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| INVALID_PARAM | Invalid parameter value | Check parameter format |
| INVALID_CHAT_ID | Invalid Telegram chat ID | Verify chat ID |
| INVALID_DATETIME | Invalid date format | Use ISO 8601 format |
| CANDIDATE_NOT_FOUND | Candidate not found | Check candidate ID |
| GITHUB_API_ERROR | GitHub API error | Retry or use fallback |
| TELEGRAM_RATE_LIMIT | Telegram rate limit | Wait and retry |
| CALENDAR_CONFLICT | Calendar slot occupied | Choose different time |
| EMAIL_SEND_FAILED | Email delivery failed | Check email address |

### Error Response Format
```json
{
  "success": false,
  "error": "Detailed error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-11-22T17:00:00Z",
  "request_id": "req_abc123"
}
```

**[INSERIR PRINT: Error handling dashboard]**

---

## Rate Limits

### n8n Webhooks
- **Limit**: 100 requests/minute per IP
- **Burst**: 10 requests/second
- **Headers**: 
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1700000000
  ```

### GitHub API
- **Authenticated**: 5,000 requests/hour
- **Search**: 30 requests/minute
- **Headers**:
  ```
  X-RateLimit-Limit: 5000
  X-RateLimit-Remaining: 4999
  X-RateLimit-Reset: 1700000000
  ```

### Telegram Bot API
- **Group messages**: 20 messages/minute
- **Private messages**: 30 messages/second
- **Global**: 30 messages/second

### Google Calendar API
- **Queries**: 1,000,000 requests/day
- **Per user**: 500 requests/100 seconds

### Gmail API
- **Send**: 100 messages/day (free tier)
- **Read**: 1,000,000,000 quota units/day

**[INSERIR PRINT: Rate limit monitoring]**

---

## Authentication

### API Key Authentication
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/endpoint
```

### OAuth 2.0 Flow
```
1. Redirect to authorization URL
   https://accounts.google.com/o/oauth2/auth?
     client_id=YOUR_CLIENT_ID&
     redirect_uri=YOUR_REDIRECT_URI&
     scope=https://www.googleapis.com/auth/calendar&
     response_type=code

2. User authorizes

3. Receive authorization code

4. Exchange code for token
   POST https://oauth2.googleapis.com/token
   {
     "code": "AUTH_CODE",
     "client_id": "YOUR_CLIENT_ID",
     "client_secret": "YOUR_CLIENT_SECRET",
     "redirect_uri": "YOUR_REDIRECT_URI",
     "grant_type": "authorization_code"
   }

5. Receive access_token and refresh_token

6. Use access_token in API requests
   Authorization: Bearer ACCESS_TOKEN

7. Refresh when expired
   POST https://oauth2.googleapis.com/token
   {
     "refresh_token": "REFRESH_TOKEN",
     "client_id": "YOUR_CLIENT_ID",
     "client_secret": "YOUR_CLIENT_SECRET",
     "grant_type": "refresh_token"
   }
```

**[INSERIR PRINT: OAuth flow diagram]**

---

## Testing

### Postman Collection
```json
{
  "info": {
    "name": "AI Tech Recruiter API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Search Candidates",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"technology\": \"Python\",\n  \"seniority\": \"Senior\"\n}"
        },
        "url": {
          "raw": "{{base_url}}/webhook/github-search",
          "host": ["{{base_url}}"],
          "path": ["webhook", "github-search"]
        }
      }
    }
  ]
}
```

**[LINK]** Download Postman Collection

**[INSERIR PRINT: Postman collection]**

---

## Conclusão

Esta API reference documenta todas as integrações do sistema AI Tech Recruiter, fornecendo:

✅ Especificações completas de endpoints  
✅ Exemplos de request/response  
✅ Códigos de erro e rate limits  
✅ Exemplos de código em múltiplas linguagens  
✅ Diagramas de fluxo e autenticação  

Para suporte técnico, consulte [SUPPORT.md](./SUPPORT.md)

---

**Last Updated**: November 22, 2025  
**API Version**: 1.0.0