# ⚡ Quick Start - AI Tech Recruiter

## Comece em 10 Minutos

Este guia rápido te coloca no ar em **10 minutos**. Para instruções completas, veja [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🎯 Pré-requisitos

- ✅ Node.js 18+ instalado
- ✅ Docker instalado (opcional, mas recomendado)
- ✅ Contas: IBM Cloud, GitHub, Telegram, Google

---

## 🚀 Instalação Rápida

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/YOUR_USERNAME/ai-tech-recruiter.git
cd ai-tech-recruiter
```

### 2️⃣ Configure Variáveis de Ambiente

```bash
# Copie o template
cp .env.example .env

# Edite com suas credenciais
nano .env
```

**Mínimo necessário:**
```bash
# Telegram
TELEGRAM_BOT_TOKEN=seu_token_aqui

# GitHub (opcional para demo)
GITHUB_API_TOKEN=seu_token_aqui

# Google
GOOGLE_CLIENT_ID=seu_client_id_aqui
GOOGLE_CLIENT_SECRET=seu_secret_aqui
```

### 3️⃣ Inicie n8n

**Opção A: Docker (Recomendado)**
```bash
docker-compose up -d
```

**Opção B: Local**
```bash
npx n8n
```

Acesse: http://localhost:5678

### 4️⃣ Importe Workflows

1. Abra n8n: http://localhost:5678
2. Faça login (user/password do .env)
3. Click **Import from File**
4. Selecione `workflows/IBM-Watson.sanitized.json`
5. Click **Import**

### 5️⃣ Configure Credenciais no n8n

**Telegram:**
- Credentials → Add Credential → Telegram API
- Cole seu `TELEGRAM_BOT_TOKEN`

**Google Calendar/Gmail:**
- Credentials → Add Credential → Google OAuth2
- Cole Client ID e Secret
- Click "Connect my account"
- Autorize

### 6️⃣ Configure no watsonx Orchestrate

1. Acesse IBM Cloud
2. Abra watsonx Orchestrate
3. Create Agent → Import configuration
4. Use `config/orchestrate-agent.example.json` como base
5. Atualize URLs dos webhooks com seu domínio n8n

---

## 🎮 Teste Rápido

### Teste 1: Buscar Candidatos

No Orchestrate Chat:
```
Find a Senior Python Developer in Brazil
```

**Resultado esperado:** Lista com 5 candidatos

### Teste 2: Enviar Telegram

```
Contact Ana Silva
```

**Resultado esperado:** Mensagem enviada no Telegram

### Teste 3: Workflow Completo

```
Find a Senior Python Developer
[Aprovar contato]
[Aguardar resposta no Telegram]
[Aprovar agendamento]
[Aprovar email final]
```

**Resultado esperado:** 
- ✅ Candidato contactado
- ✅ Resposta recebida
- ✅ Entrevista agendada
- ✅ Email enviado

---

## 📱 Setup do Telegram Bot

### Criar Bot

1. Abra Telegram
2. Busque `@BotFather`
3. Envie `/newbot`
4. Nome: `AI Tech Recruiter Bot`
5. Username: `ai_tech_recruiter_bot`
6. Copie o **token**

### Obter Chat ID

```bash
# Envie mensagem pro bot primeiro
# Depois rode:
curl https://api.telegram.org/bot<SEU_TOKEN>/getUpdates
```

Copie o `chat.id` do resultado.

---

## 🔧 Troubleshooting Rápido

### ❌ "Webhook timeout"

**Problema:** n8n não está acessível

**Solução:**
```bash
# Verificar se n8n está rodando
docker ps | grep n8n

# Ver logs
docker logs n8n

# Restart
docker-compose restart
```

### ❌ "Authentication failed"

**Problema:** Token incorreto

**Solução:**
1. Verificar `.env`
2. Verificar credenciais no n8n
3. Regenerar tokens se necessário

### ❌ "Telegram não envia"

**Problema:** Bot não iniciado ou chat_id errado

**Solução:**
1. Inicie conversa com bot no Telegram
2. Verifique chat_id com `/getUpdates`
3. Atualize `.env` com chat_id correto

### ❌ "Calendar não cria evento"

**Problema:** OAuth não autorizado

**Solução:**
1. n8n → Credentials → Google OAuth
2. Click "Reconnect"
3. Autorize novamente

---

## 📚 Próximos Passos

Agora que está funcionando:

1. 📖 Leia [ARCHITECTURE.md](./ARCHITECTURE.md) - Entenda como funciona
2. 🔧 Customize `templates/` - Ajuste mensagens
3. 🎨 Modifique workflows - Adicione sua lógica
4. 🧪 Execute testes - Garanta qualidade
5. 🚀 Deploy produção - Veja [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🆘 Precisa de Ajuda?

- 📧 Email: demo@ai-recruiter-project.com
- 💬 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/ai-tech-recruiter/issues)
- 📚 Docs completos: [README.md](./README.md)
- ❓ FAQ: [FAQ.md](./FAQ.md)

---

## 🎓 Recursos de Aprendizado

### Vídeos
- 🎥 [Demo Completa (5min)](https://youtu.be/demo)
- 🎥 [Setup Tutorial (10min)](https://youtu.be/setup)

### Documentação
- 📖 [IBM watsonx Orchestrate Docs](https://www.ibm.com/docs/watsonx-orchestrate)
- 📖 [n8n Documentation](https://docs.n8n.io)
- 📖 [Telegram Bot API](https://core.telegram.org/bots/api)

---

## ⚡ Comandos Úteis

```bash
# Iniciar tudo
docker-compose up -d

# Parar tudo
docker-compose down

# Ver logs
docker-compose logs -f

# Reinstalar workflows
npm run import-workflows

# Sanitizar dados
npm run sanitize

# Testar webhooks
npm run test-webhooks

# Backup
npm run backup
```

---

## 🎉 Pronto!

Se chegou até aqui, você tem o AI Tech Recruiter rodando localmente!

**Próximos passos sugeridos:**
1. ✅ Customize as mensagens em `templates/`
2. ✅ Adicione mais candidatos em `examples/demo-data/`
3. ✅ Configure seu próprio agente no Orchestrate
4. ✅ Integre com seu ATS existente (se tiver)
5. ✅ Contribua com o projeto! 🤝

---

<div align="center">

**Construído com ❤️ para IBM watsonx Orchestrate Hackathon**

⭐ Se ajudou, dê uma estrela no GitHub!

[⬆ Voltar ao topo](#-quick-start---ai-tech-recruiter)

</div>