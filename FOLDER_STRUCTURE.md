# 📁 Estrutura de Pastas - AI Tech Recruiter

## Estrutura Completa do Repositório Git

```
ai-tech-recruiter/
│
├── 📄 README.md                          ✅ Documento principal
├── 📄 ARCHITECTURE.md                    ✅ Arquitetura técnica
├── 📄 API_REFERENCE.md                   ✅ Documentação de APIs
├── 📄 DEPLOYMENT.md                      ✅ Guia de instalação
├── 📄 FAQ.md                             ✅ Perguntas frequentes
├── 📄 PRESENTATION_SCRIPT.md             ✅ Script de apresentação
├── 📄 PUBLISHING_GUIDE.md                ✅ Guia de publicação
├── 📄 SECURITY.md                        ✅ Política de segurança
├── 📄 LICENSE                            ✅ MIT License
├── 📄 CHANGELOG.md                       ✅ Histórico de versões
├── 📄 CONTRIBUTING.md                    ✅ Como contribuir
├── 📄 CODE_OF_CONDUCT.md                 ✅ Código de conduta
│
├── 📄 .gitignore                         ✅ Arquivos ignorados
├── 📄 .env.example                       ✅ Template de variáveis
├── 📄 package.json                       ✅ Dependências Node
├── 📄 docker-compose.yml                 ✅ Container config
│
├── 📁 docs/                              ✅ TODA documentação
│   ├── 📁 images/                        ✅ Screenshots
│   │   ├── orchestrate-chat-search.png
│   │   ├── telegram-invitation.png
│   │   ├── telegram-response.png
│   │   ├── calendar-event.png
│   │   ├── gmail-confirmation.png
│   │   ├── n8n-workflow-github.png
│   │   ├── n8n-workflow-telegram.png
│   │   ├── n8n-workflow-calendar.png
│   │   ├── n8n-workflow-email.png
│   │   ├── architecture-diagram.png
│   │   ├── mcp-flow-diagram.png
│   │   ├── performance-metrics.png
│   │   └── roi-comparison.png
│   │
│   ├── 📁 diagrams/                      ✅ Diagramas editáveis
│   │   ├── architecture.drawio
│   │   ├── workflow-sequence.mermaid
│   │   └── data-flow.plantuml
│   │
│   ├── 📁 videos/                        ✅ Vídeos (ou links)
│   │   └── demo-link.txt                 (Link do YouTube)
│   │
│   ├── 📁 presentations/                 ✅ Slides
│   │   ├── hackathon-demo.pdf
│   │   └── technical-deep-dive.pdf
│   │
│   ├── 📄 PRIVACY_POLICY.md              ✅ Política de privacidade
│   ├── 📄 TERMS_OF_SERVICE.md            ✅ Termos de uso
│   └── 📄 SECURITY_BEST_PRACTICES.md     ✅ Boas práticas
│
├── 📁 workflows/                         ✅ Workflows n8n
│   ├── 📄 IBM-Watson.sanitized.json      ✅ Workflow sanitizado
│   ├── 📄 README.md                      ✅ Como importar
│   └── 📁 individual/                    ✅ Workflows separados
│       ├── github-search.json
│       ├── telegram-contact.json
│       ├── telegram-response.json
│       ├── schedule-interview.json
│       └── send-email.json
│
├── 📁 scripts/                           ✅ Scripts utilitários
│   ├── 📄 sanitize.js                    ✅ Sanitização de dados
│   ├── 📄 setup.sh                       ✅ Setup inicial
│   ├── 📄 backup.sh                      ✅ Backup de dados
│   └── 📄 test-webhooks.sh               ✅ Testar endpoints
│
├── 📁 .githooks/                         ✅ Git hooks
│   ├── 📄 pre-commit                     ✅ Verificação pré-commit
│   └── 📄 pre-push                       ✅ Verificação pré-push
│
├── 📁 examples/                          ✅ Exemplos
│   ├── 📁 demo-data/                     ✅ Dados de demonstração
│   │   ├── candidates.example.json
│   │   ├── payloads.example.json
│   │   └── responses.example.json
│   │
│   ├── 📁 api-calls/                     ✅ Exemplos de chamadas
│   │   ├── github-search.sh
│   │   ├── telegram-send.sh
│   │   ├── calendar-create.sh
│   │   └── email-send.sh
│   │
│   └── 📄 README.md                      ✅ Como usar exemplos
│
├── 📁 config/                            ✅ Configurações
│   ├── 📄 orchestrate-agent.example.json ✅ Config do agente
│   ├── 📄 n8n.example.json               ✅ Config do n8n
│   └── 📄 README.md                      ✅ Instruções
│
├── 📁 templates/                         ✅ Templates
│   ├── 📄 email-invitation.html          ✅ Email de convite
│   ├── 📄 email-confirmation.html        ✅ Email de confirmação
│   ├── 📄 telegram-message.txt           ✅ Mensagem Telegram
│   └── 📄 calendar-event.json            ✅ Evento de calendário
│
├── 📁 tests/                             ✅ Testes (futuro)
│   ├── 📄 unit/
│   ├── 📄 integration/
│   └── 📄 e2e/
│
└── 📁 .github/                           ✅ GitHub config
    ├── 📄 ISSUE_TEMPLATE.md              ✅ Template de issue
    ├── 📄 PULL_REQUEST_TEMPLATE.md       ✅ Template de PR
    ├── 📄 FUNDING.yml                    ✅ Sponsor (opcional)
    └── 📁 workflows/                     ✅ GitHub Actions (futuro)
        └── 📄 security-scan.yml
```

---

## ✅ O Que VAI para o Git (Commitar)

### Documentação
```bash
✅ README.md
✅ ARCHITECTURE.md
✅ API_REFERENCE.md
✅ DEPLOYMENT.md
✅ FAQ.md
✅ PRESENTATION_SCRIPT.md
✅ PUBLISHING_GUIDE.md
✅ SECURITY.md
✅ LICENSE
✅ CHANGELOG.md
✅ CONTRIBUTING.md
✅ CODE_OF_CONDUCT.md
```

### Configuração
```bash
✅ .gitignore
✅ .env.example           # Template SEM secrets
✅ package.json
✅ docker-compose.yml
```

### Código e Scripts
```bash
✅ scripts/sanitize.js
✅ scripts/setup.sh
✅ .githooks/pre-commit
```

### Workflows
```bash
✅ workflows/IBM-Watson.sanitized.json   # Versão LIMPA
✅ workflows/README.md
```

### Imagens e Diagramas
```bash
✅ docs/images/*.png                     # TODOS os screenshots
✅ docs/diagrams/*.drawio
✅ docs/presentations/*.pdf
```

### Exemplos
```bash
✅ examples/demo-data/*.json             # Dados fictícios
✅ examples/api-calls/*.sh
```

---

## ❌ O Que NÃO VAI para o Git (Ignorado)

### Secrets e Credenciais
```bash
❌ .env                                  # Secrets REAIS
❌ credentials.json
❌ token.json
❌ *.key
❌ *.pem
```

### Dados Pessoais
```bash
❌ personal/
❌ private/
❌ real-data/
```

### Logs e Cache
```bash
❌ *.log
❌ logs/
❌ .cache/
❌ node_modules/
```

### Arquivos de Trabalho
```bash
❌ workflows/IBM-Watson.json             # Versão COM secrets
❌ tmp/
❌ *.tmp
❌ .DS_Store
```

### Builds e Outputs
```bash
❌ dist/
❌ build/
❌ .n8n/
```

---

## 📋 Checklist de Arquivos para Git

### Antes do Primeiro Commit

```bash
# 1. Criar todos os diretórios
mkdir -p docs/images docs/diagrams docs/videos docs/presentations
mkdir -p workflows/individual
mkdir -p scripts
mkdir -p .githooks
mkdir -p examples/demo-data examples/api-calls
mkdir -p config
mkdir -p templates
mkdir -p .github

# 2. Mover arquivos sanitizados
cp workflows/IBM-Watson.json workflows/IBM-Watson.sanitized.json
node scripts/sanitize.js

# 3. Adicionar README em cada pasta
echo "# Images" > docs/images/README.md
echo "# Workflows" > workflows/README.md
echo "# Examples" > examples/README.md
echo "# Scripts" > scripts/README.md
echo "# Config" > config/README.md
echo "# Templates" > templates/README.md

# 4. Verificar .gitignore
cat .gitignore  # Deve incluir .env, *.key, *.log, etc.

# 5. Verificar que não há secrets
npm run security-scan

# 6. Git add (vai respeitar .gitignore)
git add .

# 7. Verificar o que será commitado
git status
git diff --cached

# 8. Se tudo OK, commitar
git commit -m "Initial commit: AI Tech Recruiter"
```

---

## 🎯 Comandos Úteis

### Ver tamanho do repositório
```bash
du -sh .git
```

### Listar arquivos que serão commitados
```bash
git ls-files
```

### Verificar se há secrets
```bash
git secrets --scan
```

### Ver arquivos ignorados
```bash
git status --ignored
```

### Remover arquivo do histórico (se commitou por engano)
```bash
git filter-repo --path .env --invert-paths
```

---

## 📊 Tamanho Estimado do Repo

```
Arquivos de texto (MD, JSON, JS):  ~5 MB
Screenshots (PNG, 1080p):           ~50 MB
Diagramas (Drawio, PDF):            ~10 MB
Vídeos (links, não arquivos):       ~1 KB

Total estimado:                     ~65 MB
```

✅ **Perfeito para GitHub** (limite: 100 GB)

---

## 🚀 Como Organizar Antes de Commitar

### 1. Screenshots
```bash
# Tirar todos os prints COM dados fictícios
# Salvar como:
docs/images/orchestrate-chat-search.png
docs/images/telegram-invitation.png
docs/images/telegram-response.png
docs/images/calendar-event.png
docs/images/gmail-confirmation.png
docs/images/n8n-workflow-github.png
docs/images/n8n-workflow-telegram.png
docs/images/n8n-workflow-calendar.png
docs/images/n8n-workflow-email.png
docs/images/architecture-diagram.png
```

### 2. Workflows
```bash
# Criar versão sanitizada
node scripts/sanitize.js

# Resultado:
workflows/IBM-Watson.sanitized.json   ✅ Commitar este
workflows/IBM-Watson.json             ❌ NÃO commitar (tem secrets)
```

### 3. Diagramas
```bash
# Criar diagramas editáveis
docs/diagrams/architecture.drawio      # Draw.io
docs/diagrams/workflow.mermaid         # Mermaid
docs/diagrams/dataflow.plantuml        # PlantUML

# Exportar como PNG
docs/images/architecture-diagram.png   # Para README
```

### 4. Vídeo
```bash
# NÃO commitar vídeo (muito grande)
# Apenas link
echo "https://youtu.be/SEU_VIDEO_ID" > docs/videos/demo-link.txt
```

---

## 📝 README.md em Cada Pasta

### docs/images/README.md
```markdown
# Screenshots

Todos os screenshots com **dados fictícios** para demonstração.

## Lista de Imagens

- `orchestrate-chat-search.png` - Busca de candidatos no Orchestrate
- `telegram-invitation.png` - Convite enviado via Telegram
- `telegram-response.png` - Resposta do candidato
- `calendar-event.png` - Evento criado no Google Calendar
- `gmail-confirmation.png` - Email de confirmação
- `n8n-workflow-*.png` - Workflows do n8n
- `architecture-diagram.png` - Diagrama da arquitetura

## Como Usar

Referencie nas documentações usando:

\`\`\`markdown
![Alt text](./docs/images/nome-da-imagem.png)
\`\`\`
```

### workflows/README.md
```markdown
# Workflows n8n

## Importar

1. Abra n8n: http://localhost:5678
2. Click em **Import from File**
3. Selecione `IBM-Watson.sanitized.json`
4. Configure credenciais:
   - Telegram Bot Token
   - GitHub API Key
   - Google OAuth
5. Ative o workflow

## Workflows Individuais

Se preferir importar separadamente:
- `github-search.json` - Busca no GitHub
- `telegram-contact.json` - Envio via Telegram
- `schedule-interview.json` - Agendamento
- `send-email.json` - Envio de email

## Configuração

Veja [DEPLOYMENT.md](../DEPLOYMENT.md) para instruções completas.
```

---

## ✅ Comando Final

```bash
# Estrutura completa
tree -L 3 -I 'node_modules|.git'

# Adicionar tudo
git add .

# Revisar
git status

# Commitar
git commit -m "feat: initial commit with complete documentation and workflows"

# Push
git push origin main
```

---

**Pronto! Tudo organizado e seguro para o Git! 📦✅**

Quer que eu crie mais algum arquivo ou README para alguma pasta específica? 🚀