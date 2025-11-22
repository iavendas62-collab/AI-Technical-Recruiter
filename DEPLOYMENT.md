# 🚀 Deployment Guide - AI Tech Recruiter

## Visão Geral

Este guia fornece instruções completas para deploy do sistema AI Tech Recruiter em diferentes ambientes.

---

## Pré-requisitos

### Contas Necessárias

- ✅ IBM Cloud account (com watsonx Orchestrate provisionado)
- ✅ n8n instance (self-hosted ou cloud)
- ✅ GitHub account com API token
- ✅ Telegram Bot (criado via @BotFather)
- ✅ Google Cloud account (Calendar + Gmail APIs habilitadas)

### Ferramentas Locais

```bash
# Node.js 18+
node --version

# Docker & Docker Compose
docker --version
docker-compose --version

# Git
git --version

# cURL (para testes)
curl --version
```

---

## Parte 1: IBM watsonx Orchestrate

### 1.1 Acessar o Orchestrate

1. Login no IBM Cloud
2. Navegue para **Resource List**
3. Expanda **AI / Machine Learning**
4. Clique em **watsonx-Hackathon Orchestrate**
5. Clique em **Launch watsonx Orchestrate**

**[INSERIR PRINT: IBM Cloud dashboard]**

---

### 1.2 Criar o Agente

#### Profile Configuration

1. No Orchestrate, clique em **Create Agent**
2. Escolha **Start from scratch**
3. Preencha:

```yaml
Name: AI Tech Recruiter
Description: |
  AI Technical Recruiter built on IBM watsonx Orchestrate. 
  Automates the full hiring funnel using an agentic, 
  tool-driven workflow. Searches GitHub for qualified developers, 
  contacts candidates via Telegram, handles asynchronous responses 
  through MCP callbacks, requests manager approval for key decisions, 
  schedules interviews with Google Calendar, and sends final 
  confirmation emails.

Welcome Message: |
  Hello. I am your AI Technical Recruiter. 
  How can I support your hiring workflow today?

Quick Start Prompts:
  - Senior Solutions Architect
  - Mid-level Full Stack Developer
  - Senior Data Engineer
```

**[INSERIR PRINT: Agent creation form]**

---

#### LLM Model Selection

1. Em **Agent Builder**, clique em **Model**
2. Selecione: **IBM Granite 3.1 8B Instruct**
3. Configure parameters:
   ```yaml
   Temperature: 0.7
   Max Tokens: 2048
   Top P: 0.9
   ```

**[INSERIR PRINT: Model selection]**

---

### 1.3 Upload Knowledge Base

1. Clique em **Knowledge**
2. **Add knowledge source** → **Upload files**
3. Faça upload de `recruitment-guidelines.txt`:

```text
# Technical Recruiter Guidelines

## Candidate Evaluation Criteria

### GitHub Score Calculation
- Repository activity: 30%
- Code quality: 25%
- Documentation: 20%
- Community engagement: 15%
- Technology stack match: 10%

### Minimum Score Thresholds
- Senior: 85/100
- Mid-Senior: 75/100
- Mid-level: 65/100
- Junior: 55/100

## Interview Process

### Phone Screen (15-20 min)
1. Introduction and background
2. Technical overview
3. Availability and expectations
4. Next steps

### Technical Interview (45-60 min)
1. Live coding challenge
2. System design discussion
3. Code review exercise
4. Q&A session

### Behavioral Interview (30 min)
1. Past experiences
2. Team collaboration
3. Problem-solving approach
4. Cultural fit

## Compliance Rules

### LGPD (Brazilian Data Protection Law)
- Always obtain explicit consent
- Inform data usage purpose
- Allow data deletion requests
- Maintain audit trail

### Equal Opportunity
- No discrimination by age, gender, race, religion
- Focus on technical skills only
- Structured interview process
- Documented evaluation criteria
```

4. Clique em **Save**

**[INSERIR PRINT: Knowledge upload]**

---

### 1.4 Configurar Tools

#### Tool 1: searchGitHubCandidates

1. Clique em **Tools** → **Add tool**
2. **Create custom tool**
3. Preencha:

```yaml
Name: searchGitHubCandidates
Description: |
  Busca por perfis de desenvolvedores no GitHub com base em 
  tecnologia, senioridade e localização.

Operation: searchGitHubCandidates

HTTP Method: POST
Endpoint URL: https://seu-n8n.com/webhook/8e4c32fe-e68a-4ff0-8256-e13e78d6289a

Request Body Schema:
{
  "type": "object",
  "properties": {
    "technology": {
      "type": "string",
      "description": "Programming language or tech stack"
    },
    "seniority": {
      "type": "string",
      "enum": ["Junior", "Mid-level", "Mid-Senior", "Senior"]
    },
    "location": {
      "type": "string",
      "default": "Brazil"
    },
    "min_score": {
      "type": "integer",
      "minimum": 0,
      "maximum": 100,
      "default": 75
    }
  },
  "required": ["technology"]
}

Response Schema:
{
  "type": "object",
  "properties": {
    "success": { "type": "boolean" },
    "total_found": { "type": "integer" },
    "candidates": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "nome_candidato": { "type": "string" },
          "score_repos": { "type": "integer" },
          "url_github": { "type": "string" },
          "technologies": { "type": "string" },
          "location": { "type": "string" },
          "seniority": { "type": "string" }
        }
      }
    }
  }
}
```

4. Clique em **Save**
5. **Test** → Execute teste com payload exemplo
6. Verifique resposta

**[INSERIR PRINT: Tool configuration]**

---

#### Tool 2: sendTelegramInvitation

```yaml
Name: sendTelegramInvitation
Description: Envia convite de entrevista via Telegram para o chat_id fornecido.
Operation: sendTelegramInvitation
HTTP Method: POST
Endpoint URL: https://seu-n8n.com/webhook/c3c47fb3-ecac-4b4d-be06-3f55f737778c

Request Body Schema:
{
  "type": "object",
  "properties": {
    "candidate_name": { "type": "string" },
    "chat_id": { "type": "string" },
    "message_text": { "type": "string" }
  },
  "required": ["candidate_name", "chat_id"]
}
```

**[INSERIR PRINT: sendTelegramInvitation tool]**

---

#### Tool 3: waitForAcceptance

```yaml
Name: waitForAcceptance
Description: |
  Inicia o processo de espera no workflow do n8n e aguarda o aceite 
  do candidato via MCP callback.
Operation: waitForAcceptance
HTTP Method: POST
Endpoint URL: https://seu-n8n.com/webhook/wait-acceptance

Request Body Schema:
{
  "type": "object",
  "properties": {
    "candidate_id": { "type": "integer" },
    "candidate_name": { "type": "string" },
    "chat_id": { "type": "string" },
    "callback_url": { "type": "string" }
  },
  "required": ["candidate_id", "chat_id", "callback_url"]
}

Response Schema:
{
  "type": "object",
  "properties": {
    "success": { "type": "boolean" },
    "status": { "type": "string", "enum": ["waiting"] },
    "wait_id": { "type": "string" }
  }
}
```

**[INSERIR PRINT: waitForAcceptance tool]**

---

#### Tool 4: scheduleInterview

```yaml
Name: scheduleInterview
Description: Agenda a entrevista e envia a confirmação de agendamento.
Operation: scheduleInterview
HTTP Method: POST
Endpoint URL: https://seu-n8n.com/webhook/b89c1605-d928-4654-88df-768de805dca9

Request Body Schema:
{
  "type": "object",
  "properties": {
    "candidate_name": { "type": "string" },
    "candidate_email": { "type": "string", "format": "email" },
    "interview_datetime": { "type": "string", "format": "date-time" }
  },
  "required": ["candidate_name", "candidate_email", "interview_datetime"]
}
```

**[INSERIR PRINT: scheduleInterview tool]**

---

#### Tool 5: sendFinalOfferEmail

```yaml
Name: sendFinalOfferEmail
Description: Envia a comunicação final ao candidato (e-mail de oferta ou aceite).
Operation: sendFinalOfferEmail
HTTP Method: POST
Endpoint URL: https://seu-n8n.com/webhook/b89c1605-d928-4654-88df-768de805dca8

Request Body Schema:
{
  "type": "object",
  "properties": {
    "candidate_name": { "type": "string" },
    "candidate_email": { "type": "string", "format": "email" },
    "final_status": { "type": "string" },
    "vaga_skill": { "type": "string" }
  },
  "required": ["candidate_name", "candidate_email", "final_status", "vaga_skill"]
}
```

**[INSERIR PRINT: sendFinalOfferEmail tool]**

---

### 1.5 Configurar Instructions & Guidelines

#### Instructions

1. Clique em **Behavior** → **Instructions**
2. Cole:

```markdown
🧠 AI TECH RECRUITER — BEHAVIOR (FINAL)

You are an AI Technical Recruiter Agent built on IBM watsonx Orchestrate.

## MANDATORY WORKFLOW LOGIC

1. When user provides job role:
   - Extract: technology, role, seniority, location
   - Call searchGitHubCandidates
   - Return results in mandatory format
   - Ask: "Would you like me to contact them via Telegram?"

2. When user approves contact:
   - Call sendTelegramInvitation for selected candidates
   - Call waitForAcceptance immediately
   - Respond: "Invitation sent. Waiting for response."

3. When candidate responds (MCP callback):
   - Never assume acceptance
   - Always ask: "Should I proceed with interview scheduling?"

4. When manager approves scheduling:
   - Call scheduleInterview
   - Confirm date/time
   - Ask: "Send final confirmation email?"

5. When user approves email:
   - Call sendFinalOfferEmail
   - Respond: "Email sent. Hiring flow complete."

## MANDATORY RESULT FORMAT

✅ Found [N] candidates:

1. **[Name]** — [Seniority] — Score: [X]/100  
   GitHub: [url]  
   Tech: [technologies]  
   Location: [location]

## RESTRICTIONS

- Never invent candidate data
- Do not skip workflow steps
- Avoid autonomous decisions
- Maintain professional tone
- Follow deterministic execution order
```

**[INSERIR PRINT: Instructions panel]**

---

#### Guidelines

1. Clique em **Add Guideline**
2. Crie as seguintes guidelines:

**Guideline 1: Human Approval Before Scheduling**
```
Never schedule interviews without explicit manager approval. 
Always ask: "Should I proceed with interview scheduling?"
```

**Guideline 2: Standard Output Format**
```
Always return candidate lists in exact specified format.
Include: name, seniority, score, GitHub, tech, location.
```

**Guideline 3: No Hallucination**
```
Never invent candidate data. 
Only return actual results from tools.
If no candidates found, say so clearly.
```

**Guideline 4: MCP Callback Only**
```
Never assume candidate acceptance.
Wait for MCP callback confirmation.
```

**Guideline 5: Tool Usage Order**
```
1. searchGitHubCandidates
2. sendTelegramInvitation
3. waitForAcceptance
4. scheduleInterview
5. sendFinalOfferEmail

Never skip or reorder.
```

**[INSERIR PRINT: Guidelines configuration]**

---

### 1.6 Deploy Agent

1. Clique em **Deploy** no canto superior direito
2. Selecione **Home page** para exibir na interface do Orchestrate
3. Clique em **Deploy agent**
4. Aguarde confirmação: ✅ "Agent deployed successfully"

**[INSERIR PRINT: Deploy confirmation]**

---

## Parte 2: n8n Workflows

### 2.1 Setup n8n

#### Opção A: Docker Compose (Recomendado)

Crie `docker-compose.yml`:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_secure_password
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://seu-dominio.com/
      - GENERIC_TIMEZONE=America/Sao_Paulo
    volumes:
      - n8n_data:/home/node/.n8n
      - ./workflows:/workflows

volumes:
  n8n_data:
```

Inicie:
```bash
docker-compose up -d
```

**[INSERIR PRINT: Docker container running]**

---

#### Opção B: n8n Cloud

1. Acesse https://n8n.io/cloud
2. Crie conta ou faça login
3. Crie novo workspace
4. Note a URL do webhook: `https://seu-workspace.n8n.cloud/webhook/`

**[INSERIR PRINT: n8n Cloud dashboard]**

---

### 2.2 Importar Workflows

1. Acesse n8n UI: `http://localhost:5678`
2. Login com credenciais
3. Clique em **Import from File**
4. Selecione `IBM Watson.json`
5. Clique em **Import**

**Ou crie workflows manualmente conforme abaixo:**

---

### 2.3 Workflow 1: GitHub Search

**[INSERIR PRINT: Workflow completo GitHub]**

#### Configuração dos Nodes:

**Node 1: Webhook (GITHUB)**
```yaml
Type: Webhook
HTTP Method: POST
Path: 8e4c32fe-e68a-4ff0-8256-e13e78d6289a
Response Mode: Response Node
```

**Node 2: Code (Demo Database)**
```javascript
// Cole o código completo da base de candidatos
const candidatosDemo = [
  // ... 20 candidatos
];

// Filtro e retorno
return [{
  json: {
    success: true,
    total_found: candidatosDemo.length,
    candidates: candidatosDemo,
    mode: "demo"
  }
}];
```

**Node 3: Respond to Webhook**
```yaml
Response Mode: Text
```

---

### 2.4 Workflow 2: Telegram Contact

**[INSERIR PRINT: Workflow Telegram]**

**Node 1: Webhook (Bot 1)**
```yaml
Path: c3c47fb3-ecac-4b4d-be06-3f55f737778c
```

**Node 2: Edit Fields**
```yaml
Field 1:
  Name: chat_id
  Value: 123456789
  
Field 2:
  Name: telegram_message
  Value: {{ $json.body.message_text }}
```

**Node 3: Telegram Send**
```yaml
Chat ID: {{ $json.chat_id }}
Text: {{ $json.telegram_message }}
Parse Mode: Markdown
Append n8n Attribution: false
```

---

### 2.5 Workflow 3: Telegram Response

**[INSERIR PRINT: Workflow resposta automática]**

**Node 1: Telegram Trigger**
```yaml
Updates: message
```

**Node 2: Telegram Send (Auto-response)**
```yaml
Chat ID: {{ $json.message.chat.id }}
Text: |
  Hello, thank you very much! I'm interested, 
  please schedule it for December 16, 2025, at 4:00 PM. 
  I will await the confirmation email until then.
```

---

### 2.6 Workflow 4: Schedule Interview

**[INSERIR PRINT: Workflow Calendar]**

**Node 1: Webhook**
```yaml
Path: b89c1605-d928-4654-88df-768de805dca9
```

**Node 2: Code (DateTime Processing)**
```javascript
// Cole o código de processamento de timezone
const formatWithBrazilTimezone = (date) => {
  // ...
};
```

**Node 3: Google Calendar**
```yaml
Credential: Google Calendar OAuth2
Operation: Create Event
Calendar: demo@example.com
Start: {{ $json.interview_start }}
End: {{ $json.interview_end }}
Summary: {{ $json.summary }}
Description: {{ $json.description }}
```

---

### 2.7 Workflow 5: Send Email

**[INSERIR PRINT: Workflow Gmail]**

**Node 1: Webhook**
```yaml
Path: b89c1605-d928-4654-88df-768de805dca8
```

**Node 2: Code (Email Template)**
```javascript
// Cole o código do template HTML
const emailHTML = `...`;
```

**Node 3: Gmail**
```yaml
Credential: Gmail OAuth2
Operation: Send
To: {{ $json.to }}
Subject: {{ $json.subject }}
Message: {{ $json.body }}
Message Type: HTML
```

---

## Parte 3: Credenciais e Integrações

### 3.1 Telegram Bot

#### Criar Bot

1. Abra Telegram
2. Busque @BotFather
3. Envie `/newbot`
4. Siga instruções:
   ```
Name: AI Tech Recruiter Bot
Username: ai_tech_recruiter_bot
```
5. Copie o **token**: `{{TELEGRAM_BOT_TOKEN}}`

**[INSERIR PRINT: BotFather conversation]**

#### Configurar Webhook

```bash
curl -X POST "https://api.telegram.org/bot{TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://seu-n8n.com/webhook/telegram-updates"
  }'
```

#### Adicionar Credencial no n8n

1. **Credentials** → **Add Credential**
2. Selecione **Telegram API**
3. Cole o **Access Token**
4. **Save**

**[INSERIR PRINT: Telegram credential n8n]**

---

### 3.2 Google Calendar & Gmail

#### Criar Projeto no Google Cloud

1. Acesse https://console.cloud.google.com
2. **Create Project** → `AI Tech Recruiter`
3. **APIs & Services** → **Enable APIs**
4. Habilite:
   - Google Calendar API
   - Gmail API

**[INSERIR PRINT: Google Cloud console]**

#### Criar OAuth Credentials

1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Authorized redirect URIs:
   ```
   https://seu-n8n.com/rest/oauth2-credential/callback
   ```
5. Copie:
   - Client ID
   - Client Secret

**[INSERIR PRINT: OAuth credentials]**

#### Configurar no n8n

**Google Calendar:**
1. **Credentials** → **Add Credential**
2. Selecione **Google Calendar OAuth2 API**
3. Cole Client ID e Client Secret
4. Clique em **Connect my account**
5. Autorize permissões

**Gmail:**
1. **Credentials** → **Add Credential**
2. Selecione **Gmail OAuth2**
3. Repita processo

**[INSERIR PRINT: Google OAuth flow]**

---

### 3.3 GitHub API (Opcional)

#### Gerar Token

1. GitHub → **Settings** → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. **Generate new token**
4. Scopes:
   - `read:user`
   - `user:email`
5. Copie o token

#### Adicionar no n8n

1. **Credentials** → **Add Credential**
2. Selecione **GitHub API**
3. Cole o token
4. **Save**

**[INSERIR PRINT: GitHub token]**

---

## Parte 4: Testes

### 4.1 Teste Completo End-to-End

#### Passo 1: Buscar Candidatos

No Orchestrate Chat:
```
Find a Senior Python Developer in Brazil
```

Resultado esperado:
```
✅ Found 5 candidates:

1. **Ana Silva** — Senior — Score: 95/100
   GitHub: https://github.com/anasilva-dev
   ...
```

**[INSERIR PRINT: Busca bem-sucedida]**

---

#### Passo 2: Contatar via Telegram

```
User: Contact Ana Silva and Carlos Mendes
```

Verificar:
- ✅ Mensagens enviadas no Telegram
- ✅ Status "Invitations sent. Waiting..."

**[INSERIR PRINT: Telegram mensagens]**

---

#### Passo 3: Resposta do Candidato

No Telegram do candidato:
```
Sim, tenho interesse!
```

Verificar:
- ✅ Auto-resposta enviada
- ✅ Orchestrate recebe callback
- ✅ Pergunta sobre agendamento aparece

**[INSERIR PRINT: Callback recebido]**

---

#### Passo 4: Agendar Entrevista

```
User: Yes, schedule for December 16, 2025 at 4:00 PM
```

Verificar:
- ✅ Evento criado no Google Calendar
- ✅ Convite enviado para candidato
- ✅ Confirmação no Orchestrate

**[INSERIR PRINT: Evento no Calendar]**

---

#### Passo 5: Email Final

```
User: Send final email
```

Verificar:
- ✅ Email recebido no Gmail
- ✅ Template HTML correto
- ✅ Informações do candidato corretas

**[INSERIR PRINT: Email recebido]**

---

### 4.2 Testes Unitários

#### Teste Webhook GitHub
```bash
curl -X POST https://seu-n8n.com/webhook/github-search \
  -H "Content-Type: application/json" \
  -d '{
    "technology": "Python",
    "seniority": "Senior",
    "location": "Brazil"
  }'
```

#### Teste Telegram
```bash
curl -X POST https://seu-n8n.com/webhook/telegram-contact \
  -H "Content-Type: application/json" \
  -d '{
    "candidate_name": "Ana Silva",
    "chat_id": "123456789",
    "message_text": "Test message"
  }'
```

**[INSERIR PRINT: Testes cURL]**

---

## Parte 5: Monitoramento

### 5.1 Logs do n8n

Acesse:
```
n8n UI → Executions
```

Visualize:
- ✅ Execuções bem-sucedidas (verde)
- ❌ Execuções com erro (vermelho)
- 🔄 Execuções em andamento (amarelo)

**[INSERIR PRINT: Execution logs]**

---

### 5.2 Logs do Orchestrate

Acesse:
```
Orchestrate → Agent → Analytics
```

Métricas:
- Total de conversas
- Taxa de sucesso
- Tempo médio de resposta
- Tools mais utilizados

**[INSERIR PRINT: Orchestrate analytics]**

---

## Troubleshooting

### Problema 1: Webhook não responde

**Sintomas:**
- Timeout ao chamar tool
- "Failed to fetch" error

**Solução:**
```bash
# Verificar se n8n está rodando
docker ps | grep n8n

# Testar webhook diretamente
curl -X POST https://seu-n8n.com/webhook/test

# Verificar logs
docker logs n8n
```

---

### Problema 2: Telegram não envia

**Sintomas:**
- Erro "Forbidden" ou "Unauthorized"

**Solução:**
1. Verificar token do bot
2. Confirmar chat_id correto
3. Bot deve ter iniciado conversa com usuário
4. Verificar rate limits

---

### Problema 3: Calendar não cria evento

**Sintomas:**
- "Invalid credentials"
- "Calendar not found"

**Solução:**
1. Reautorizar OAuth no n8n
2. Verificar calendar ID correto
3. Confirmar permissões da API
4. Verificar formato de data (RFC3339)

---

## Conclusão

✅ watsonx Orchestrate configurado  
✅ n8n workflows importados  
✅ Credenciais integradas  
✅ Sistema testado end-to-end  
✅ Monitoramento ativo  

O sistema está pronto para produção!

Para suporte: **demo@example.com**

---

**Deployment completed**: November 22, 2025
