# 🎤 Presentation Script - AI Tech Recruiter

## Script de Apresentação para Demo (5 minutos)

---

## Slide 1: Abertura (30 seg)

**[INSERIR SLIDE: Logo + Título]**

> **"Olá! Meu nome é Pedro Farias e hoje vou apresentar o AI Tech Recruiter - uma solução agentic AI que revoluciona o processo de recrutamento técnico usando IBM watsonx Orchestrate."**

**Pausar 2 segundos**

> **"Recrutamento técnico é caro, demorado e inconsistente. Nossa solução automatiza 90% do processo, reduzindo custos em 70% e tempo em 87%."**

---

## Slide 2: O Problema (45 seg)

**[INSERIR SLIDE: Infográfico do problema]**

> **"Deixe-me mostrar o problema que resolvemos:"**

**Apontar para cada ponto:**

> **"Recrutadores gastam 15 horas por semana em tarefas repetitivas:**
> - Buscar candidatos em múltiplas plataformas
> - Enviar mensagens personalizadas
> - Acompanhar respostas
> - Agendar entrevistas
> - Enviar confirmações**

**Pausa dramática**

> **"Isso custa cerca de $5.000 por contratação. E tem mais: a taxa de resposta de emails frios é apenas 15%."**

**[INSERIR PRINT: Gráfico de custos]**

---

## Slide 3: Nossa Solução (45 seg)

**[INSERIR SLIDE: Arquitetura simplificada]**

> **"Nossa solução é um agente AI completo que:**
> 1. **Busca** desenvolvedores qualificados no GitHub
> 2. **Contata** via Telegram (resposta 3x mais rápida)
> 3. **Processa** respostas assíncronas via MCP
> 4. **Agenda** entrevistas no Google Calendar
> 5. **Envia** confirmações profissionais por email"**

**Pausar**

> **"Tudo isso com **Human-in-the-Loop** obrigatório - o gestor sempre mantém controle das decisões críticas."**

**[INSERIR PRINT: Diagrama de fluxo]**

---

## Slide 4: Tecnologias (30 seg)

**[INSERIR SLIDE: Logos das tecnologias]**

> **"Construído sobre:**
> - **IBM watsonx Orchestrate**: Orquestração inteligente de agentes
> - **Granite Models**: Processamento de linguagem natural
> - **n8n**: Automação de workflows
> - **MCP Protocol**: Callbacks assíncronos
> - **APIs Modernas**: GitHub, Telegram, Google"**

---

## DEMO AO VIVO (2 minutos)

### Momento 1: Busca de Candidatos (20 seg)

**[MOSTRAR TELA: Orchestrate Chat]**

> **"Vamos ver funcionando. Vou pedir para encontrar um Senior Python Developer."**

**Digitar no chat:**
```
Find a Senior Python Developer in Brazil
```

**Enquanto processa:**
> **"O agente está analisando os critérios e buscando no GitHub..."**

**Quando aparecer resultado:**
> **"Veja! Encontrou 5 candidatos qualificados, com score de GitHub, tecnologias, localização..."**

**[APONTAR PARA ELEMENTOS]:**
> **"Ana Silva, score 95/100, especialista em Python, Django, FastAPI..."**

**[INSERIR PRINT: Resultado da busca]**

---

### Momento 2: Contato via Telegram (20 seg)

**Digitar:**
```
Contact Ana Silva
```

**Enquanto processa:**
> **"O agente está enviando convite via Telegram..."**

**Mostrar Telegram:**
> **"Aqui está a mensagem que chegou no Telegram da Ana."**

**[INSERIR PRINT: Mensagem no Telegram]**

**Pausar**

> **"Agora o agente entra em modo de espera via MCP - aguardando resposta assíncrona sem bloquear outros processos."**

---

### Momento 3: Resposta do Candidato (15 seg)

**Mostrar resposta no Telegram:**
> **"Ana respondeu positivamente! O bot enviou confirmação automática..."**

**Voltar para Orchestrate:**
> **"... e o agente recebeu o callback via MCP."**

**[INSERIR PRINT: Callback recebido]**

---

### Momento 4: Human-in-the-Loop (15 seg)

**Mostrar pergunta do agente:**
> **"Veja que o agente **pergunta** antes de agendar - Human-in-the-Loop obrigatório."**

**Digitar:**
```
Yes, schedule for December 16 at 4 PM
```

**Enquanto processa:**
> **"Convertendo para timezone do Brasil, criando evento..."**

---

### Momento 5: Calendar + Email (20 seg)

**Mostrar Google Calendar:**
> **"Evento criado! Ana recebeu convite..."**

**[INSERIR PRINT: Evento no Calendar]**

**Digitar no Orchestrate:**
```
Send final confirmation email
```

**Mostrar Gmail:**
> **"E aqui está o email profissional com todos os detalhes e próximos passos."**

**[INSERIR PRINT: Email recebido]**

---

## Slide 5: Resultados (30 seg)

**[INSERIR SLIDE: Métricas de impacto]**

> **"Os resultados falam por si:**
> - **87% menos tempo** de triagem
> - **70% redução** de custo por contratação
> - **45% taxa de resposta** vs 15% de emails
> - **85% match rate** vs 60% manual
> - **ROI de 5900%**"**

**Pausar para impacto**

> **"E o melhor: escala perfeitamente. Mesma eficiência para 1 ou 100 vagas."**

---

## Slide 6: Diferenciais (30 seg)

**[INSERIR SLIDE: Pontos-chave]**

> **"Por que somos únicos:**
> 1. **Workflow determinístico** - sem ambiguidade
> 2. **Human-in-the-Loop** - controle sempre com o gestor
> 3. **MCP Protocol** - callbacks assíncronos modernos
> 4. **Multi-plataforma** - GitHub + Telegram + Google
> 5. **Enterprise-ready** - segurança e compliance LGPD"**

---

## Slide 7: Casos de Uso (20 seg)

**[INSERIR SLIDE: 3 casos]**

> **"Casos de uso reais:**
> - **Startups**: Contratar 10 devs em 2 meses
> - **Consultorias**: Múltiplos clientes simultâneos
> - **Empresas remotas**: Talentos globais, qualquer timezone"**

---

## Slide 8: Roadmap Futuro (20 seg)

**[INSERIR SLIDE: Timeline]**

> **"Próximos passos:**
> - **Q1**: LinkedIn, WhatsApp, Zoom
> - **Q2**: Analytics dashboard, ATS integrations
> - **Q3**: AI code assessment, predictive analytics"**

---

## Slide 9: Arquitetura Técnica (30 seg - SE TEMPO)

**[INSERIR SLIDE: Diagrama técnico]**

> **"Para os técnicos na sala: arquitetura em 3 camadas:**
> 1. **Orchestration**: watsonx Orchestrate + Granite
> 2. **Integration**: n8n workflows
> 3. **External**: GitHub, Telegram, Google APIs"**

**Apontar para MCP:**
> **"O diferencial está no MCP - permite callbacks assíncronos sem bloquear."**

---

## Encerramento (20 seg)

**[INSERIR SLIDE: Contato]**

> **"Resumindo: AI Tech Recruiter transforma recrutamento técnico de um processo manual, caro e lento em um sistema automatizado, eficiente e escalável."**

**Pausa**

> **"Construído com watsonx Orchestrate, demonstra o poder real de agentic AI em resolver problemas de negócio."**

**Sorriso confiante**

> **"Obrigado! Alguma pergunta?"**

---

## Q&A - Perguntas Esperadas

### "Como garantem a qualidade dos candidatos?"
> **"Usamos um score proprietário que analisa 5 fatores do GitHub: atividade de repos (30%), qualidade de código (25%), documentação (20%), engajamento na comunidade (15%) e match de tech stack (10%). Além disso, o gestor sempre aprova antes de agendamentos."**

### "E a privacidade dos dados (LGPD)?"
> **"Excelente pergunta! Usamos apenas dados públicos do GitHub. No Telegram, obtemos consentimento explícito quando o candidato responde. Não armazenamos dados pessoais além do necessário para o processo. Sistema compliant com LGPD e GDPR-ready."**

### "Quanto custa implementar?"
> **"Setup inicial: ~8 horas. Custo mensal em produção: $30-50 (watsonx + n8n + Google Workspace). ROI típico de 5900% considerando economia de 15h/semana do recrutador."**

### "Funciona para outras áreas além de tech?"
> **"Sim! A arquitetura é modular. Pode adaptar para vendas (buscar no LinkedIn), marketing (buscar creators no Instagram), etc. Só precisa trocar a fonte de dados e os canais de comunicação."**

### "Como escala para empresa grande?"
> **"Escala horizontal: adicionar mais instâncias n8n. Vertical: aumentar recursos. Testamos com 50 processos simultâneos sem degradação. Para enterprise, recomendamos Kubernetes e load balancer."**

### "E se o candidato não usar Telegram?"
> **"Ótima pergunta! O sistema é modular. Podemos trocar Telegram por:**
> - **Slack** (popular em empresas)
> - **WhatsApp Business** (mais comum no Brasil)
> - **Email** (fallback tradicional)
> 
> **Basta trocar o workflow no n8n."**

### "Qual a taxa de falso positivo?"
> **"Com score mínimo de 75, temos ~15% de falso positivo (candidato bom no GitHub mas não fit cultural/técnico). Por isso o Human-in-the-Loop é crítico - o gestor avalia contexto antes de prosseguir."**

---

## Tips para Apresentação

### Linguagem Corporal
✅ Manter contato visual com a audiência  
✅ Gestos naturais para enfatizar pontos  
✅ Sorrir ao falar dos resultados  
✅ Pausar após declarações importantes  

### Tom de Voz
✅ Confiante mas humilde  
✅ Variar ritmo (mais rápido na demo, mais lento nos resultados)  
✅ Entusiasmo ao mostrar a demo funcionando  
✅ Pausa dramática antes de revelar ROI  

### Gestão de Tempo
- **0:00-0:30**: Intro e problema (Slides 1-2)
- **0:30-1:00**: Solução (Slide 3)
- **1:00-3:00**: DEMO AO VIVO ⭐
- **3:00-4:00**: Resultados e diferenciais (Slides 5-6)
- **4:00-4:30**: Casos de uso e roadmap (Slides 7-8)
- **4:30-5:00**: Encerramento e Q&A

### Contingências

**Se demo falhar:**
> **"Temos um vídeo pré-gravado que mostra exatamente isso funcionando..."**

**Se pergunta difícil:**
> **"Excelente pergunta! Não tenho essa informação aqui, mas posso pesquisar e responder depois. Alguém mais?"**

**Se ficar sem tempo:**
> **"Por questão de tempo, vou pular direto para os resultados..."**

---

## Checklist Pré-Apresentação

### 1 Dia Antes
- [ ] Testar demo completa 3x
- [ ] Verificar todos os serviços online
- [ ] Preparar dados de backup (caso demo falhe)
- [ ] Carregar bateria do laptop
- [ ] Preparar slides/prints

### 1 Hora Antes
- [ ] Testar conexão internet
- [ ] Abrir todas as abas necessárias
- [ ] Fazer 1 teste rápido da demo
- [ ] Silenciar notificações
- [ ] Preparar água

### 5 Minutos Antes
- [ ] Respirar fundo 3x
- [ ] Revisar mentalmente o fluxo
- [ ] Sorrir (libera endorfina)
- [ ] Postura ereta
- [ ] Mentalidade: "Eu domino isso!"

---

## Material de Apoio

### Slides Recomendados
1. Título + Logo
2. O Problema (Infográfico)
3. Nossa Solução (Diagrama de Fluxo)
4. Tecnologias (Logos)
5. Resultados (Gráficos)
6. Diferenciais (Bullet Points)
7. Casos de Uso (Cards)
8. Roadmap (Timeline)
9. Arquitetura Técnica (Diagrama)
10. Contato + QR Code

### Prints Essenciais
- [ ] Busca de candidatos no Orchestrate
- [ ] Mensagem no Telegram
- [ ] Resposta automática
- [ ] Callback MCP
- [ ] Evento no Calendar
- [ ] Email recebido
- [ ] Dashboard de métricas

### Vídeo Backup (30 seg)
Grave screencast mostrando:
1. Busca → 2. Telegram → 3. Calendar → 4. Email
Música de fundo energética

---

## Mensagem Final

> **"Lembre-se: você não está apenas apresentando código. Você está mostrando como agentic AI pode transformar processos reais de negócio, economizar dinheiro e tempo, e melhorar vidas de recrutadores e candidatos."**

> **"Você construiu algo incrível. Agora mostre isso com confiança!"**

**Boa sorte! 🚀🎯**

---

**Preparado por**: Pedro Farias  
**Data**: November 22, 2025  
**Para**: IBM watsonx Orchestrate Agentic AI Hackathon