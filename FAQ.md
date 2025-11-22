# ❓ FAQ - AI Tech Recruiter

## Perguntas Frequentes

---

## Geral

### O que é o AI Tech Recruiter?
É uma solução de recrutamento técnico automatizado que usa IBM watsonx Orchestrate para orquestrar todo o processo de contratação, desde a busca de candidatos no GitHub até o agendamento de entrevistas e envio de ofertas.

### Como funciona a integração com o GitHub?
O sistema busca desenvolvedores usando a API do GitHub, filtrando por tecnologia, localização e senioridade. Analisa repositórios, contribuições e atividade para calcular um score de 0-100.

### Por que usar Telegram para contato?
Telegram oferece:
- ✅ Resposta mais rápida que email
- ✅ API robusta e gratuita
- ✅ Suporte a rich media
- ✅ Popular entre desenvolvedores

---

## Técnicas

### Quais tecnologias são usadas?
- **IBM watsonx Orchestrate**: Orquestração de agentes
- **n8n**: Workflow automation
- **Telegram Bot API**: Comunicação
- **Google Calendar API**: Agendamento
- **Gmail API**: Emails formais
- **GitHub API**: Busca de candidatos

### O sistema funciona offline?
Não. Todas as integrações dependem de APIs externas e conectividade com internet.

### Qual o limite de candidatos?
- **GitHub Search**: Até 1000 resultados por busca
- **Telegram**: Sem limite de contatos
- **Calendar**: Sem limite de eventos
- **Gmail**: 100 emails/dia (tier gratuito)

### Como funciona o MCP (Model Context Protocol)?
MCP permite callbacks assíncronos:
1. Orchestrate chama tool e fornece callback_url
2. Tool responde "waiting" e pausa
3. Evento externo acontece (ex: resposta no Telegram)
4. Tool chama callback_url
5. Orchestrate retoma workflow

---

## Configuração

### Como obtenho acesso ao watsonx Orchestrate?
Durante o hackathon:
1. Registre-se no evento
2. Solicite conta IBM Cloud
3. Acesse watsonx Orchestrate provisionado

Pós-hackathon:
1. https://www.ibm.com/products/watsonx-orchestrate
2. Solicite trial ou contrate

### Preciso de cartão de crédito?
**Hackathon**: Não, conta provisionada gratuita  
**Produção**: Sim, após período de trial

### Como crio um Telegram Bot?
```
1. Abra Telegram
2. Busque @BotFather
3. Envie /newbot
4. Siga as instruções
5. Copie o token
```

### Como configuro o Google Calendar?
```
1. Acesse Google Cloud Console
2. Crie projeto
3. Habilite Calendar API
4. Crie OAuth credentials
5. Configure no n8n
```

---

## Uso

### Como inicio uma busca?
No Orchestrate Chat:
```
"Find a Senior Python Developer in Brazil"
```

O agente vai:
1. Extrair critérios
2. Buscar no GitHub
3. Retornar lista formatada
4. Perguntar se quer contactar

### Posso buscar múltiplas tecnologias?
Sim:
```
"Find developers with Python and React experience"
```

### Como cancelo um workflow em andamento?
No Orchestrate:
```
"Cancel current process"
```

Ou no n8n:
1. Acesse Executions
2. Encontre o workflow ativo
3. Clique em "Stop Execution"

### Posso agendar para data específica?
Sim, especifique na resposta:
```
"Schedule for December 16, 2025 at 4:00 PM"
```

O sistema converte para timezone do Brasil automaticamente.

---

## Customização

### Posso mudar o template do email?
Sim, edite o node "Code" no workflow "Send Email":
```javascript
const emailHTML = `
  <!-- Seu template aqui -->
`;
```

### Posso adicionar mais campos de busca?
Sim, modifique:
1. **Orchestrate**: Schema do tool searchGitHubCandidates
2. **n8n**: Lógica de filtro no Code node

Exemplo: adicionar "years_of_experience":
```javascript
{
  "experience_years": {
    "type": "integer",
    "minimum": 0
  }
}
```

### Posso integrar com LinkedIn?
Sim, mas requer:
1. LinkedIn API access (pago)
2. Novo workflow no n8n
3. Novo tool no Orchestrate

---

## Troubleshooting

### "Tool execution failed"
**Causas comuns:**
- Webhook n8n inacessível
- Credenciais expiradas
- Rate limit excedido
- Timeout de rede

**Soluções:**
```bash
# 1. Testar webhook
curl -X POST https://seu-n8n.com/webhook/test

# 2. Verificar credenciais
n8n → Credentials → Test connection

# 3. Verificar logs
docker logs n8n

# 4. Aumentar timeout
Orchestrate → Tool → Timeout: 60s
```

### "Telegram bot not responding"
**Checklist:**
- ✅ Bot está ativo no @BotFather?
- ✅ Token correto no n8n?
- ✅ chat_id válido?
- ✅ Usuário iniciou conversa com bot?
- ✅ Rate limit não excedido?

### "Calendar event not created"
**Checklist:**
- ✅ OAuth autorizado?
- ✅ Calendar API habilitada?
- ✅ Formato de data correto (ISO 8601)?
- ✅ Timezone especificado?
- ✅ Permissões do calendar corretas?

### "Email not sent"
**Checklist:**
- ✅ Gmail API habilitada?
- ✅ OAuth autorizado?
- ✅ Email do destinatário válido?
- ✅ Limite diário não excedido?
- ✅ HTML do email válido?

---

## Performance

### Quanto tempo leva o processo completo?
**Médias:**
- GitHub Search: 1-2 segundos
- Telegram Send: 0.3 segundos
- Aguardar resposta: Variável (horas/dias)
- Calendar Create: 0.5 segundos
- Email Send: 0.8 segundos

**Total (sem espera)**: ~5 segundos

### Quantos candidatos posso processar simultaneamente?
**Limites práticos:**
- GitHub: 1000 por busca
- Telegram: 30 mensagens/segundo
- Calendar: Ilimitado
- Gmail: 100/dia (free tier)

**Recomendação**: Processar em lotes de 10-20 candidatos

### Como melhorar a performance?
1. **Cache**: Armazenar buscas recentes
2. **Parallel**: Contatar múltiplos candidatos em paralelo
3. **Batch**: Agrupar operações similares
4. **CDN**: Hospedar n8n em região próxima

---

## Segurança

### Como proteger as credenciais?
✅ Use environment variables  
✅ Nunca commite secrets no git  
✅ Rotacione keys regularmente  
✅ Use OAuth quando possível  
✅ Limite permissões ao mínimo necessário  

### Os dados dos candidatos são armazenados?
**No sistema demo**: Não, apenas processamento em memória  
**Para produção**: Recomenda-se:
- Banco de dados criptografado
- Backup com retenção definida
- Conformidade com LGPD
- Direito ao esquecimento implementado

### Como garantir conformidade com LGPD?
1. **Consentimento explícito**: Candidato deve aceitar no Telegram
2. **Transparência**: Informar uso dos dados
3. **Minimização**: Coletar apenas dados necessários
4. **Segurança**: Criptografia e acesso controlado
5. **Direito ao esquecimento**: Permitir exclusão de dados

---

## Custos

### Quanto custa rodar o sistema?
**Hackathon**: Gratuito (conta provisionada)

**Produção**:
- **watsonx Orchestrate**: A partir de $0.10/execução
- **n8n Cloud**: $20/mês (starter)
- **Google Workspace**: $6/usuário/mês (Calendar + Gmail)
- **GitHub API**: Gratuito (5000 req/hora)
- **Telegram**: Gratuito
- **Hosting (VPS)**: $5-20/mês

**Total estimado**: $30-50/mês

### Vale a pena versus recrutamento manual?
**ROI Típico:**
- Tempo economizado: 15h/semana
- Custo/hora recrutador: $50
- Economia mensal: $3,000
- Custo sistema: $50/mês
- **ROI: 5900%** 🎯

---

## Escalabilidade

### Quantas vagas posso processar simultaneamente?
**Limites teóricos:**
- watsonx Orchestrate: 100+ conversas paralelas
- n8n: 10-50 workflows simultâneos (depende do hardware)
- APIs externas: Varia por rate limit

**Recomendação prática**: 5-10 processos ativos

### Como escalar para mais usuários?
1. **Horizontal**: Adicionar mais instâncias n8n
2. **Vertical**: Aumentar recursos (CPU/RAM)
3. **Queue**: Implementar fila de jobs (Redis)
4. **Load Balancer**: Distribuir carga entre instâncias

---

## Integrações

### Posso integrar com meu ATS?
Sim, se o ATS tiver API. Exemplos:
- **Greenhouse**: REST API
- **Lever**: REST API
- **Workable**: REST API

Adicione novo workflow no n8n para sincronizar dados.

### Funciona com Slack ao invés de Telegram?
Sim! Substitua:
1. Tool sendTelegramInvitation → sendSlackMessage
2. Telegram Trigger → Slack Trigger
3. Credenciais: Slack OAuth

### Posso usar Zoom para entrevistas?
Sim! Substitua Google Calendar por Zoom:
1. Habilite Zoom API
2. Crie OAuth app
3. Modifique workflow scheduleInterview
4. Use endpoint `/users/me/meetings`

---

## Compliance

### É legal fazer scraping do GitHub?
✅ Sim, desde que:
- Use API oficial (não scraping)
- Respeite rate limits
- Dados são públicos
- Para uso comercial permitido nos Terms

### Posso enviar emails sem consentimento?
❌ Não para email frio  
✅ Sim se candidato respondeu no Telegram (opt-in implícito)  
✅ Sim se inscrito em job board  

**Recomendação**: Sempre obter consentimento explícito

### Como lidar com GDPR (Europa)?
Se recrutar na Europa:
1. Obter consentimento explícito
2. Informar processamento de dados
3. Permitir export de dados
4. Permitir exclusão de dados
5. Designar DPO (Data Protection Officer)

---

## Suporte

### Como reportar bugs?
1. GitHub Issues: [LINK]
2. Email: demo@example.com
3. Telegram: @ai_tech_recruiter_support

### Onde encontro mais documentação?
- [README.md](./README.md): Visão geral
- [ARCHITECTURE.md](./ARCHITECTURE.md): Detalhes técnicos
- [API_REFERENCE.md](./API_REFERENCE.md): Referência de APIs
- [DEPLOYMENT.md](./DEPLOYMENT.md): Guia de deploy

### Oferecem consultoria?
Sim! Entre em contato:
- **Email**: demo@example.com
- **Serviços**:
  - Setup e configuração
  - Customização
  - Treinamento
  - Suporte contínuo

---

## Roadmap

### Quais features estão planejadas?
**Q1 2026:**
- [ ] LinkedIn integration
- [ ] WhatsApp support
- [ ] Video interview scheduling (Zoom)
- [ ] AI-powered resume parsing

**Q2 2026:**
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app
- [ ] ATS integrations (Greenhouse, Lever)

**Q3 2026:**
- [ ] AI code assessment
- [ ] Predictive hiring analytics
- [ ] Candidate matching ML
- [ ] Interview recording & transcription

### Como contribuir?
1. Fork do repositório
2. Crie branch: `feature/nova-feature`
3. Commit: `git commit -m 'Add nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra Pull Request

**Diretrizes**:
- Código bem documentado
- Testes unitários
- Seguir style guide
- Atualizar documentação

---

## Conclusão

Esta FAQ cobre os aspectos mais comuns do AI Tech Recruiter. Para perguntas não listadas, consulte a documentação completa ou entre em contato com o suporte.

---

**Last Updated**: November 22, 2025  
**Version**: 1.0.0
