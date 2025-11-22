# 📦 Publishing Guide - AI Tech Recruiter

## Checklist Completo Antes de Publicar

---

## ✅ Fase 1: Segurança (CRÍTICO)

### 1.1 Remover Dados Sensíveis

```bash
# Execute o script de sanitização
node scripts/sanitize.js

# Verifique manualmente
grep -r "iavendas62@gmail.com" .
grep -r "8010413033" .
grep -r "8578320748" .
```

**❌ Nunca publique:**
- [ ] `.env` (deve estar no .gitignore)
- [ ] Tokens de API reais
- [ ] Emails pessoais reais
- [ ] Números de telefone reais
- [ ] Chat IDs do Telegram
- [ ] IPs ou domínios de produção

**✅ Sempre use:**
- [ ] `example.com` para emails
- [ ] `{{PLACEHOLDER}}` para tokens
- [ ] Dados fictícios nos exemplos

---

### 1.2 Verificar .gitignore

```bash
# Testar se .gitignore funciona
echo "test-secret-key" > .env
git status  # .env NÃO deve aparecer

# Se aparecer, corrija:
echo ".env" >> .gitignore
```

Arquivos que **DEVEM** estar no `.gitignore`:
- [ ] `.env`
- [ ] `credentials.json`
- [ ] `*.key`
- [ ] `*.log`
- [ ] `node_modules/`
- [ ] `.n8n/`

---

### 1.3 Instalar Pre-Commit Hook

```bash
# Tornar executável
chmod +x .githooks/pre-commit

# Configurar Git
git config core.hooksPath .githooks

# Testar
git add .
git commit -m "test"  # Deve rodar verificações
```

---

### 1.4 Escanear Secrets

```bash
# Instalar ferramentas
npm install -g @gitguardian/ggshield

# Escanear
ggshield secret scan path .

# Se encontrar secrets:
# 1. Remover os arquivos
# 2. Limpar histórico do Git (se já commitou)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## ✅ Fase 2: Preparar Arquivos

### 2.1 Criar Versões Sanitizadas

```bash
# Workflows
cp "workflows/IBM Watson.json" "workflows/IBM Watson.sanitized.json"

# Editar manualmente e substituir:
# - iavendas62@gmail.com → demo@example.com
# - 8010413033 → 123456789
# - Tokens → {{TOKEN}}
```

### 2.2 Preparar Screenshots

**Tomar prints COM dados fictícios:**

```bash
# Configure temporariamente
export DEMO_MODE=true
export DEMO_EMAIL="demo@example.com"
export DEMO_CHAT_ID="123456789"

# Inicie o sistema e tire prints
# Salve em: docs/images/
```

**Prints necessários:**
1. `orchestrate-chat-search.png` - Busca de candidatos
2. `telegram-invitation.png` - Mensagem no Telegram
3. `telegram-response.png` - Resposta do candidato
4. `calendar-event.png` - Evento agendado
5. `gmail-confirmation.png` - Email recebido
6. `n8n-workflow.png` - Workflow completo
7. `architecture-diagram.png` - Diagrama da arquitetura

**⚠️ Blurre informações sensíveis:**
- URLs completas
- IPs
- Domínios reais
- Qualquer dado que identifique você

---

### 2.3 Atualizar Links

**No README.md, substitua:**

```markdown
# Antes (não funcional)
[🎥 Watch Demo](https://youtube.com/demo)

# Depois (seu link real do YouTube)
[🎥 Watch Demo](https://youtu.be/SEU_VIDEO_ID)
```

**Links para atualizar:**
- [ ] YouTube demo video
- [ ] GitHub repository URL
- [ ] Seu LinkedIn/GitHub profile
- [ ] Email de contato (use um público/profissional)

---

## ✅ Fase 3: Documentação

### 3.1 Revisar Todos os Arquivos

```bash
# Checklist de arquivos:
├── README.md              ✅ Completo e sanitizado
├── ARCHITECTURE.md        ✅ Sem dados sensíveis
├── API_REFERENCE.md       ✅ Exemplos genéricos
├── DEPLOYMENT.md          ✅ Placeholders corretos
├── FAQ.md                 ✅ Revisado
├── LICENSE                ✅ MIT License
├── SECURITY.md            ✅ Política de segurança
├── .gitignore             ✅ Configurado
├── .env.example           ✅ Template limpo
└── workflows/
    └── IBM Watson.sanitized.json  ✅ Sanitizado
```

### 3.2 Inserir Screenshots

Onde estiver escrito `**[INSERIR PRINT: ...]**`:

```markdown
# Antes
**[INSERIR PRINT: Busca no Orchestrate]**

# Depois
![Busca no Orchestrate](./docs/images/orchestrate-chat-search.png)
```

---

### 3.3 Adicionar Badges

No topo do README.md:

```markdown
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Hackathon](https://img.shields.io/badge/IBM-Hackathon_2025-0f62fe)
```

---

## ✅ Fase 4: Criar Repositório

### 4.1 Inicializar Git (se ainda não fez)

```bash
cd ai-tech-recruiter
git init
git add .
git commit -m "Initial commit: AI Tech Recruiter"
```

### 4.2 Criar Repositório no GitHub

**Opção A: Via CLI (GitHub CLI)**

```bash
# Instalar gh (se não tiver)
# Mac: brew install gh
# Linux: sudo apt install gh

# Login
gh auth login

# Criar repo público
gh repo create ai-tech-recruiter \
  --public \
  --description "Agentic AI recruitment automation with IBM watsonx Orchestrate" \
  --homepage "https://your-demo-site.com"

# Push
git remote add origin https://github.com/SEU_USER/ai-tech-recruiter.git
git branch -M main
git push -u origin main
```

**Opção B: Via Web**

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `ai-tech-recruiter`
   - **Description**: `Agentic AI recruitment automation with IBM watsonx Orchestrate`
   - **Public/Private**: Public
   - **Add .gitignore**: Não (já temos)
   - **Add license**: Não (já temos)
3. Clique "Create repository"
4. Siga instruções para push

```bash
git remote add origin https://github.com/SEU_USER/ai-tech-recruiter.git
git branch -M main
git push -u origin main
```

---

### 4.3 Configurar Repository

**Settings → General:**
- [ ] Add topics: `ibm-watsonx`, `agentic-ai`, `recruitment`, `hackathon`, `n8n`
- [ ] Add website URL
- [ ] Enable Issues
- [ ] Enable Discussions (opcional)

**Settings → Security:**
- [ ] Enable Dependabot alerts
- [ ] Enable CodeQL analysis
- [ ] Add SECURITY.md to security tab

**Settings → Actions:**
- [ ] Enable GitHub Actions (para CI/CD futuro)

---

## ✅ Fase 5: Preparar Vídeo Demo

### 5.1 Gravar Demonstração

**Script de 5 minutos:**

```
00:00 - 00:30  Introdução + Problema
00:30 - 01:00  Solução e Arquitetura
01:00 - 03:00  Demo ao vivo (workflow completo)
03:00 - 04:00  Resultados e Impacto
04:00 - 05:00  Diferenciais e Conclusão
```

**⚠️ Durante gravação:**
- [ ] Use dados fictícios APENAS
- [ ] Oculte barra de endereços (pode ter tokens)
- [ ] Desative notificações
- [ ] Use modo anônimo do browser
- [ ] Grave em 1080p mínimo
- [ ] Use microfone de qualidade

---

### 5.2 Editar e Publicar

```bash
# Ferramentas recomendadas:
# - DaVinci Resolve (gratuito, profissional)
# - OBS Studio (gravação)
# - Audacity (áudio)

# Elementos importantes:
# - Intro com logo (3-5 seg)
# - Música de fundo (baixa)
# - Legendas (para acessibilidade)
# - Call-to-action no final
```

**Publicar no YouTube:**
1. Upload como **Unlisted** (não listado) - não aparece em buscas
2. Título: "AI Tech Recruiter - IBM watsonx Orchestrate Demo"
3. Descrição: Link para GitHub repo
4. Tags: IBM, watsonx, AI, agentic-ai, recruitment
5. Thumbnail atrativo
6. Copie o link

---

## ✅ Fase 6: Submissão do Hackathon

### 6.1 Preparar Materiais

**Arquivos para submeter:**

```
submission/
├── README.pdf               # README compilado em PDF
├── ARCHITECTURE.pdf         # Documentação técnica
├── video-demo.mp4          # Vídeo demo (ou link)
├── presentation.pdf        # Slides (opcional)
└── one-pager.pdf          # Resumo executivo (1 página)
```

---

### 6.2 One-Pager (Resumo Executivo)

Crie um PDF de 1 página com:

```markdown
# AI Tech Recruiter
## Agentic AI Recruitment Automation

### The Problem
Recrutamento técnico é caro ($5,000/hire), lento (30h por processo) 
e ineficiente (15% taxa de resposta).

### Our Solution
Sistema agentic AI completo que automatiza desde busca no GitHub 
até agendamento de entrevistas, com Human-in-the-Loop obrigatório.

### Key Innovation
- Agentic AI (não apenas automação)
- MCP Protocol (callbacks assíncronos)
- Multi-plataforma (GitHub + Telegram + Google)
- IBM watsonx Orchestrate como core

### Impact
- 87% ↓ tempo de triagem
- 70% ↓ custo por contratação
- 45% ↑ taxa de resposta
- 5,900% ROI

### Tech Stack
IBM watsonx Orchestrate, Granite LLM, n8n, MCP, 
Telegram Bot API, GitHub API, Google Workspace

### Team
Pedro Farias - Solution Architect
demo@ai-recruiter-project.com

### Links
GitHub: github.com/seu-user/ai-tech-recruiter
Demo: youtu.be/seu-video
```

Converta para PDF com design profissional.

---

### 6.3 Links da Submissão

**Preparar:**

```markdown
## Submission Links

**📦 Source Code**
https://github.com/SEU_USER/ai-tech-recruiter

**🎥 Demo Video (5 min)**
https://youtu.be/SEU_VIDEO_ID

**📚 Documentation**
https://github.com/SEU_USER/ai-tech-recruiter#documentation

**📊 Presentation Slides**
https://docs.google.com/presentation/d/SEU_SLIDE_ID

**🏗️ Architecture Diagram**
https://github.com/SEU_USER/ai-tech-recruiter/blob/main/docs/architecture-diagram.png

**💬 Contact**
demo@ai-recruiter-project.com
```

---

## ✅ Fase 7: Pós-Publicação

### 7.1 Verificar Tudo Funciona

```bash
# Clone em diretório limpo (simular novo usuário)
cd /tmp
git clone https://github.com/SEU_USER/ai-tech-recruiter.git
cd ai-tech-recruiter

# Testar setup
cp .env.example .env
# Adicionar credenciais fake
docker-compose up -d

# Verificar:
# - README renderiza corretamente?
# - Imagens carregam?
# - Links funcionam?
# - Instruções são claras?
```

---

### 7.2 Compartilhar

**Onde divulgar:**
- [ ] Twitter/X com hashtag #IBMWatsonx #AgenticAI
- [ ] LinkedIn (post profissional)
- [ ] Dev.to (artigo técnico)
- [ ] Medium (caso de uso)
- [ ] Reddit r/MachineLearning (se permitido)
- [ ] Discord do hackathon
- [ ] Telegram groups de desenvolvedores

**Template de post:**

```
🤖 Acabei de lançar o AI Tech Recruiter!

Sistema agentic AI que automatiza recrutamento técnico 
usando IBM watsonx Orchestrate.

✅ 87% menos tempo
✅ 70% menos custo  
✅ 45% mais respostas

Built com: watsonx, Granite, n8n, MCP Protocol

🔗 github.com/seu-user/ai-tech-recruiter
🎥 [link do video]

#IBMWatsonx #AgenticAI #Hackathon #OpenSource
```

---

### 7.3 Monitorar

**Ferramentas:**
- [ ] GitHub Insights (views, clones, stars)
- [ ] YouTube Analytics (views, watch time)
- [ ] Google Analytics (se tiver site)

**Responder:**
- [ ] Issues no GitHub
- [ ] Comentários no YouTube
- [ ] Menções no Twitter
- [ ] DMs de interessados

---

## 🎯 Checklist Final

```markdown
## Segurança
- [ ] .env não commitado
- [ ] Todos os secrets removidos
- [ ] Pre-commit hook instalado
- [ ] Scan de secrets executado
- [ ] Dados pessoais substituídos

## Arquivos
- [ ] README.md completo
- [ ] ARCHITECTURE.md revisado
- [ ] API_REFERENCE.md atualizado
- [ ] DEPLOYMENT.md testado
- [ ] LICENSE adicionada
- [ ] SECURITY.md criada
- [ ] .gitignore configurado
- [ ] .env.example criado

## Screenshots
- [ ] Todos os prints inseridos
- [ ] Prints com dados fictícios
- [ ] Qualidade HD (1080p+)
- [ ] Informações sensíveis blurred

## Vídeo
- [ ] Demo gravado (5 min)
- [ ] Áudio claro
- [ ] Legendas adicionadas
- [ ] Publicado (Unlisted)
- [ ] Link no README

## Repositório
- [ ] GitHub repo criado
- [ ] Topics adicionados
- [ ] Description configurada
- [ ] Website URL adicionada
- [ ] Issues habilitadas

## Submissão
- [ ] One-pager criado
- [ ] Links preparados
- [ ] Formulário preenchido
- [ ] Email de confirmação recebido

## Pós-Publicação
- [ ] Testado em ambiente limpo
- [ ] Compartilhado nas redes
- [ ] Monitoramento configurado
- [ ] Pronto para responder perguntas
```

---

## 🆘 Problemas Comuns

### "Git rejeitou meu push com secrets"

```bash
# Limpar histórico
git filter-repo --path .env --invert-paths
git push --force
```

### "Screenshots têm dados reais"

```bash
# Use ferramentas:
# - https://redact.photo (online)
# - ImageMagick (CLI)
convert input.png -blur 0x8 output.png
```

### "Esqueci de sanitizar algo"

```bash
# Fazer force push (CUIDADO!)
# Corrigir localmente
node scripts/sanitize.js
git add .
git commit --amend
git push --force
```

---

## 📞 Suporte

Se tiver dúvidas:

- 📧 Email: demo@ai-recruiter-project.com
- 💬 Discord: [hackathon channel]
- 📚 Docs: [este documento]

---

**Boa sorte com a publicação! 🚀**

*Você construiu algo incrível. Agora o mundo precisa ver!*