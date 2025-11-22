# 📦 Guia de Commit para GitHub

> Este guia explica exatamente quais arquivos devem ser commitados ao GitHub

## ✅ ARQUIVOS QUE DEVEM IR PARA O GITHUB

### 📄 Documentação Principal
```
✅ README.md
✅ ARCHITECTURE.md
✅ API_REFERENCE.md
✅ DEPLOYMENT.md
✅ FAQ.md
✅ QUICK_START.md
✅ PRESENTATION_SCRIPT.md
✅ PUBLISHING_GUIDE.md
✅ FOLDER_STRUCTURE.md
✅ CONTRIBUTING.md
✅ CHANGELOG.md
✅ CODE_OF_CONDUCT.md
✅ SECURITY.md
✅ LICENSE
```

### ⚙️ Arquivos de Configuração
```
✅ .gitignore
✅ .env.example (APENAS O EXEMPLO!)
✅ package.json
✅ docker-compose.yml (se existir)
```

### 🔧 Scripts e Hooks
```
✅ .githooks/pre-commit
✅ scripts/sanitize.js
```

### 📋 Templates do GitHub
```
✅ .github/ISSUE_TEMPLATE.md
✅ .github/PULL_REQUEST_TEMPLATE.md
```

### 📁 Todas as Pastas com README.md
```
✅ docs/images/README.md
✅ docs/diagrams/README.md
✅ docs/videos/README.md
✅ docs/presentations/README.md
✅ workflows/individual/README.md
✅ examples/demo-data/README.md
✅ examples/api-calls/README.md
✅ config/README.md
✅ templates/README.md
✅ tests/README.md
```

### 📊 Dados de Exemplo (FICTÍCIOS)
```
✅ examples/demo-data/candidates.example.json
✅ examples/api-calls/github-search.sh
```

### 🔧 Configuração de Exemplo
```
✅ config/orchestrate-agent.example.json
```

### 📧 Templates de Email
```
✅ templates/email-invitation.html
```

---

## ❌ ARQUIVOS QUE **NUNCA** DEVEM IR PARA O GITHUB

### 🔐 Credenciais e Secrets
```
❌ .env (NUNCA!)
❌ .env.local
❌ .env.production
❌ credentials.json
❌ token.json
❌ *-token.txt
❌ *-key.json
❌ *.pem
❌ *.p12
❌ id_rsa
```

### 📊 Dados Reais
```
❌ Qualquer arquivo com dados reais de candidatos
❌ Emails reais
❌ Números de telefone reais
❌ Tokens reais do Telegram
❌ IDs de webhooks reais
```

### 📦 Dependências
```
❌ node_modules/
❌ package-lock.json (opcional)
❌ yarn.lock (opcional)
```

### 🗂️ Arquivos Temporários
```
❌ *.log
❌ *.tmp
❌ .DS_Store
❌ Thumbs.db
```

### 💾 Bancos de Dados
```
❌ *.db
❌ *.sqlite
❌ *.sql
❌ database.sqlite
```

---

## 🚀 Como Fazer o Primeiro Commit

### Passo 1: Verificar os Arquivos
```bash
# Ver quais arquivos serão commitados
git status

# Se aparecer .env ou outros arquivos sensíveis, PARE!
```

### Passo 2: Adicionar Arquivos Seguros
```bash
# Adicionar tudo que está no .gitignore automaticamente ignora arquivos sensíveis
git add .

# OU adicionar arquivos específicos:
git add README.md
git add ARCHITECTURE.md
git add .gitignore
git add package.json
# ... etc
```

### Passo 3: Commit
```bash
git commit -m "Initial commit: AI Tech Recruiter - Sanitized version"
```

### Passo 4: Push para GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-tech-recruiter.git
git branch -M main
git push -u origin main
```

---

## ✅ Checklist Antes de Fazer Push

Antes de fazer `git push`, verifique:

- [ ] Arquivo `.env` NÃO está sendo commitado
- [ ] Nenhum email real (apenas example.com)
- [ ] Nenhum token do Telegram real
- [ ] Nenhum webhook ID real
- [ ] Nenhum número de telefone real
- [ ] Apenas dados fictícios nos exemplos
- [ ] README.md tem o aviso de segurança no topo
- [ ] Todos os `{{PLACEHOLDERS}}` estão no lugar

---

## 🔍 Comandos Úteis para Verificação

### Buscar por Dados Sensíveis
```bash
# Buscar emails suspeitos
git grep -i "iavendas"
git grep -i "@gmail.com" -- ':!*.example.*'

# Buscar tokens
git grep -i "8578320748"
git grep -i "8415226231"
git grep -i "8010413033"

# Buscar webhook IDs
git grep -i "8e4c32fe"
git grep -i "c3c47fb3"
git grep -i "b89c1605"

# Se qualquer um desses comandos retornar algo, NÃO FAÇA PUSH!
```

### Verificar o que Será Commitado
```bash
# Ver lista de arquivos
git ls-files

# Ver conteúdo de um arquivo específico
git show HEAD:README.md
```

---

## 📋 Resumo: Lista Completa de Arquivos para GitHub

### Estrutura Completa que DEVE estar no GitHub:
```
ai-tech-recruiter/
├── .gitignore ✅
├── .env.example ✅
├── package.json ✅
├── README.md ✅
├── ARCHITECTURE.md ✅
├── API_REFERENCE.md ✅
├── DEPLOYMENT.md ✅
├── FAQ.md ✅
├── QUICK_START.md ✅
├── PRESENTATION_SCRIPT.md ✅
├── PUBLISHING_GUIDE.md ✅
├── FOLDER_STRUCTURE.md ✅
├── CONTRIBUTING.md ✅
├── CHANGELOG.md ✅
├── CODE_OF_CONDUCT.md ✅
├── SECURITY.md ✅
├── LICENSE ✅
│
├── .githooks/
│   └── pre-commit ✅
│
├── .github/
│   ├── ISSUE_TEMPLATE.md ✅
│   └── PULL_REQUEST_TEMPLATE.md ✅
│
├── scripts/
│   └── sanitize.js ✅
│
├── docs/
│   ├── images/README.md ✅
│   ├── diagrams/README.md ✅
│   ├── videos/README.md ✅
│   └── presentations/README.md ✅
│
├── workflows/
│   └── individual/README.md ✅
│
├── examples/
│   ├── demo-data/
│   │   ├── README.md ✅
│   │   └── candidates.example.json ✅
│   └── api-calls/
│       ├── README.md ✅
│       └── github-search.sh ✅
│
├── config/
│   ├── README.md ✅
│   └── orchestrate-agent.example.json ✅
│
├── templates/
│   ├── README.md ✅
│   └── email-invitation.html ✅
│
└── tests/
    └── README.md ✅
```

### Total: ~30 arquivos seguros para commit

---

## ⚠️ IMPORTANTE

1. **SEMPRE** revise o conteúdo antes de fazer push
2. **NUNCA** commite arquivos .env ou credenciais
3. **USE** apenas dados fictícios (example.com, placeholders)
4. **TESTE** sua aplicação localmente antes de publicar
5. **DOCUMENTE** tudo no README.md

---

## 🆘 Se Você Commitou Algo Sensível

Se acidentalmente commitou dados sensíveis:

```bash
# 1. NÃO FAÇA PUSH! Se já fez push, delete o repositório e crie um novo

# 2. Remover do histórico local
git reset --soft HEAD~1
git reset HEAD nome-do-arquivo-sensivel.env
rm nome-do-arquivo-sensivel.env

# 3. Adicionar ao .gitignore
echo "nome-do-arquivo-sensivel.env" >> .gitignore

# 4. Fazer novo commit sem o arquivo sensível
git add .
git commit -m "Remove sensitive file"

# 5. IMPORTANTE: Trocar todas as credenciais que foram expostas!
```

---

## ✅ Você Está Pronto?

Se todos os itens abaixo são verdadeiros, você pode fazer push com segurança:

- [x] Todos os dados sensíveis foram removidos
- [x] Apenas arquivos .example foram incluídos
- [x] README.md tem aviso de segurança
- [x] .gitignore está configurado corretamente
- [x] Dados de exemplo são todos fictícios
- [x] Nenhum token ou credencial real está presente

**Então pode fazer `git push` com tranquilidade! 🚀**
