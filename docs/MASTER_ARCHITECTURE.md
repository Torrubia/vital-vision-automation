# VITAL VISION — MASTER ARCHITECTURE
## Documento de Arquitetura Definitiva da Plataforma

**Versao:** 1.0
**Data:** 2026-07-14
**Status:** DESIGN — nenhuma acao executada
**Baseado em:** docs/architecture-audit-v1.md

---

## PRINCIPIO FUNDAMENTAL

```
vital-vision-automation  =  EXECUTOR  (scripts, agents, Claude commands, CI)
vital-vision-system      =  CEREBRO   (brand, products, compliance, knowledge)
```

Eles nao sao concorrentes. Sao camadas complementares da mesma plataforma.

O executor roda. O cerebro pensa. Jarvis conecta os dois.

---

## DIAGRAMA GERAL

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LUCY (Fundadora)                              │
│                   Aprovacoes, Estrategia, Visao                      │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         JARVIS                                        │
│              Orquestrador Central da Plataforma                       │
│   entende objetivos · cria planos · chama agentes · registra memoria │
│   controla loops · controla routines · envia tarefas · reporta       │
└──┬──────────┬──────────┬──────────┬──────────┬──────────┬───────────┘
   │          │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼          ▼
BRAND     CONTENT   PRODUCTS  PUBLISHING  GROWTH    SECURITY
LAYER     LAYER     LAYER     LAYER       LAYER     LAYER
   │          │          │          │          │          │
   └──────────┴──────────┴──────────┴──────────┴──────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       SECOND BRAIN                                    │
│        vital-vision-system/ — Fonte de Verdade da Plataforma         │
│   brand · products · compliance · research · knowledge · assets       │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          APIs & TOOLS                                 │
│  Shopify · Meta · Instagram · Canva · Google · Gemini · Claude        │
│  GitHub · Omnisend · Apify · Supabase · ChatGPT Bridge                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 1. JARVIS — ORQUESTRADOR CENTRAL

### Identidade

Jarvis nao e um agente. Jarvis e o sistema nervoso central da plataforma.

Ele nao executa tarefas diretamente. Ele entende o objetivo, seleciona os agentes corretos, define a sequencia, controla os loops, monitora resultados e registra o que aprendeu.

### Responsabilidades

```
┌─────────────────────────────────────────────────────────────────┐
│  JARVIS — responsabilidades                                      │
│                                                                  │
│  1. Interpretar intencao de Lucy                                 │
│  2. Decompor em tarefas atomicas                                 │
│  3. Selecionar agente correto para cada tarefa                   │
│  4. Sequenciar execucao com dependencias                         │
│  5. Controlar loops (conteudo, compliance, analytics)            │
│  6. Controlar routines (daily, weekly, monthly, quarterly)       │
│  7. Registrar memoria persistente (o que funcionou, o que nao)  │
│  8. Sinalizar necessidade de aprovacao humana                    │
│  9. Reportar status e resultados                                 │
│  10. Escalar erros para Lucy                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Localizacao planejada

```
.claude/commands/jarvis.md          <- comando de entrada
agents/jarvis-orchestrator.md       <- prompt completo do orquestrador
vital-vision-system/jarvis/         <- memoria e estado
  ├── memory.md                     <- o que Jarvis aprendeu
  ├── active-plan.md                <- plano em execucao
  ├── loop-state.md                 <- estado atual dos loops
  ├── routine-log.md                <- historico de routines
  └── escalations.md                <- itens que precisam de Lucy
```

### Fluxo de entrada

```
Lucy fala com Claude Code
        │
        ▼
Jarvis interpreta
        │
        ├── e uma tarefa simples? ──► chama agente direto
        │
        ├── e um loop? ──► inicia/retoma loop correto
        │
        ├── e uma routine? ──► executa checklist da routine
        │
        └── e um objetivo estrategico? ──► decompoe em plano multi-agente
```

---

## 2. AGENTES

### Principio de design

Cada agente tem:
- **Dominio unico** — nao duplica responsabilidade
- **Input definido** — sabe o que esperar
- **Output definido** — sabe o que entregar
- **Dependencias claras** — sabe onde buscar contexto

### Mapa de agentes

```
┌──────────────────────────────────────────────────────────────────┐
│  CAMADA DE MARCA E CONHECIMENTO                                   │
├──────────────────────┬──────────────────────────────────────────┤
│ Brand Agent           │ voz, posicionamento, identidade visual   │
│ Compliance Agent      │ FTC, FDA, claims, revisao de copy       │
│ Product Agent         │ fichas, formulas, diferenciais          │
│ Research Agent        │ tendencias, insights de mercado         │
└──────────────────────┴──────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  CAMADA DE CONTEUDO                                               │
├──────────────────────┬──────────────────────────────────────────┤
│ Organic Content Agent │ hooks, captions, scripts, pilares        │
│ QA Agent             │ revisao de copy antes de publicar        │
│ Competitor Agent     │ analise de concorrentes, adaptacao       │
│ Documentation Agent  │ estrutura, changelogs, memoria           │
└──────────────────────┴──────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  CAMADA DE PUBLICACAO                                             │
├──────────────────────┬──────────────────────────────────────────┤
│ Publishing Agent     │ calendarios, aprovacoes, filas           │
│ Meta Agent           │ Instagram, Facebook, stories, reels      │
│ Shopify Agent        │ produtos, PDPs, quiz, SEO                │
└──────────────────────┴──────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  CAMADA DE CRESCIMENTO                                            │
├──────────────────────┬──────────────────────────────────────────┤
│ Growth Agent         │ CRO, testes, otimizacao de funil         │
│ Analytics Agent      │ metricas, relatorios, insights           │
│ Quiz Agent           │ Shopify Native Quiz, resultados, rotas   │
└──────────────────────┴──────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  CAMADA DE OPERACOES                                              │
├──────────────────────┬──────────────────────────────────────────┤
│ Security Agent       │ permissoes, API keys, auditoria          │
│ Automation Agent     │ n8n, pipelines, integracao de tools      │
└──────────────────────┴──────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  MODULO SUPLIFUL (JA ATIVO)                                       │
├──────────────────────┬──────────────────────────────────────────┤
│ premium-label-architect        │ especificacao de layout         │
│ luxury-packaging-director      │ direcao criativa                │
│ label-design-system-manager    │ Master Label Standard           │
│ label-consistency-reviewer     │ consistencia da linha           │
│ supliful-dashboard-design-op.  │ execucao no dashboard           │
│ premium-label-qa-reviewer      │ READY / REVISE / ESCALATE       │
└──────────────────────┴──────────────────────────────────────────┘
```

### Localizacao dos agentes

```
agents/                                  <- agentes gerais (chamados por commands)
  ├── jarvis-orchestrator.md
  ├── brand-agent.md
  ├── compliance-agent.md
  ├── organic-content-agent.md
  ├── competitor-agent.md
  ├── publishing-agent.md
  ├── analytics-agent.md
  ├── quiz-agent.md
  ├── shopify-agent.md
  ├── meta-agent.md
  ├── research-agent.md
  ├── product-agent.md
  ├── growth-agent.md
  ├── qa-agent.md
  ├── security-agent.md
  ├── documentation-agent.md
  └── automation-agent.md

vital-vision-system/supliful-label-ops/agents/   <- agentes do modulo label (ja existe)
```

---

## 3. LOOPS

Loops sao ciclos continuos que a plataforma executa em repeticao.
Jarvis inicia, monitora e reinicia cada loop.

### Loop de Conteudo

```
CONTEUDO LOOP
─────────────────────────────────────────────────────────
Trigger: novo insight de concorrente OU agenda semanal
        │
        ▼
Competitor Agent analisa tendencias
        │
        ▼
Organic Content Agent gera hooks + captions + scripts
        │
        ▼
Compliance Agent revisa claims e linguagem
        │
        ▼
QA Agent faz revisao final
        │
        ▼
Lucy aprova (nenhum conteudo sai sem aprovacao)
        │
        ▼
Publishing Agent agenda nas plataformas
        │
        ▼
Analytics Agent monitora performance (48h, 7d, 30d)
        │
        ▼
Growth Agent extrai aprendizados
        │
        └──► volta ao inicio com novo contexto
─────────────────────────────────────────────────────────
Frequencia: semanal (batch de conteudo)
Output: 5-10 posts / semana por canal ativo
```

### Loop de Produtos

```
PRODUTOS LOOP
─────────────────────────────────────────────────────────
Trigger: novo produto OU atualizacao de produto existente
        │
        ▼
Product Agent atualiza ficha de produto
        │
        ▼
Compliance Agent revisa claims do produto
        │
        ▼
Brand Agent valida voz e posicionamento
        │
        ▼
Shopify Agent atualiza PDP, SEO, metadados
        │
        ▼
Quiz Agent atualiza rotas de recomendacao
        │
        ▼
Supliful Label Ops revisa e atualiza label
        │
        └──► notifica Lucy para aprovacao final
─────────────────────────────────────────────────────────
Frequencia: sob demanda (por produto)
Output: produto atualizado em todos os canais
```

### Loop de Compliance

```
COMPLIANCE LOOP
─────────────────────────────────────────────────────────
Trigger: novo conteudo gerado OU revisao periodica
        │
        ▼
Compliance Agent varre todo conteudo pendente
        │
        ▼
Classifica: APROVADO / REVISAR / BLOQUEADO
        │
        ├── BLOQUEADO ──► retorna para Organic Content Agent
        │
        ├── REVISAR   ──► sinaliza para Lucy
        │
        └── APROVADO  ──► libera para Publishing Agent
─────────────────────────────────────────────────────────
Frequencia: por demanda + revisao mensal de backlog
Output: backlog de conteudo sempre compliance-safe
```

### Loop de Concorrentes

```
CONCORRENTES LOOP
─────────────────────────────────────────────────────────
Trigger: semanal (Google Sheets → n8n → Claude)
        │
        ▼
n8n le linhas novas do Google Sheets (AI Status vazio)
        │
        ▼
Competitor Agent analisa via Claude Haiku
        │
        ▼
Escreve AI Insight + AI Status = Analyzed no Sheet
        │
        ▼
Research Agent extrai padroes e salva em
vital-vision-system/research/
        │
        ▼
Organic Content Agent usa insights no proximo loop
        │
        └──► ciclo repete na proxima semana
─────────────────────────────────────────────────────────
Frequencia: semanal automatico (MVP ja validado)
Output: insights de concorrentes no Second Brain
```

### Loop de Analytics

```
ANALYTICS LOOP
─────────────────────────────────────────────────────────
Trigger: semanal
        │
        ▼
Analytics Agent coleta metricas de:
  Shopify · Meta · Google Sheets · Omnisend
        │
        ▼
Compara com semana anterior
        │
        ▼
Identifica top performers e bottom performers
        │
        ▼
Growth Agent recomenda ajustes
        │
        ▼
Jarvis inclui aprendizados na memoria
        │
        └──► alimenta loop de conteudo proximo ciclo
─────────────────────────────────────────────────────────
Frequencia: semanal
Output: relatorio de performance + proximas acoes
```

### Loop de Performance (Conversao)

```
PERFORMANCE LOOP
─────────────────────────────────────────────────────────
Trigger: mensal
        │
        ▼
Growth Agent analisa funil completo:
  Quiz → PDP → Adicionar ao Carrinho → Compra
        │
        ▼
Identifica pontos de atrito
        │
        ▼
Propoe testes A/B de copy, imagem ou CTA
        │
        ▼
Lucy aprova os testes
        │
        ▼
Shopify Agent implementa variacoes
        │
        └──► Analytics Agent monitora resultados
─────────────────────────────────────────────────────────
Frequencia: mensal
Output: melhorias incrementais de conversao
```

### Loop de SEO

```
SEO LOOP
─────────────────────────────────────────────────────────
Trigger: mensal
        │
        ▼
Shopify Agent audita PDPs e metadados
        │
        ▼
Research Agent identifica termos de busca relevantes
        │
        ▼
Brand Agent + Compliance Agent revisam copy de SEO
        │
        ▼
Shopify Agent atualiza titles, descriptions, alt text
        │
        └──► Analytics Agent monitora posicoes
─────────────────────────────────────────────────────────
Frequencia: mensal
Output: PDPs otimizados para busca organica
```

---

## 4. ROUTINES

### Daily Routine

```
DAILY (executar toda manha)
────────────────────────────────────────────────
[ ] Verificar pendencias de aprovacao (Jarvis)
[ ] Verificar erros de script (Security Agent)
[ ] Confirmar que nenhum conteudo foi publicado sem aprovacao
[ ] Ver fila de publicacao do dia (Publishing Agent)
[ ] Verificar respostas no Google Sheets de concorrentes
[ ] Atualizar vital-vision-system/logs/claude-actions.md
────────────────────────────────────────────────
Duracao estimada: 5-10 minutos com Jarvis
```

### Weekly Routine

```
WEEKLY (toda segunda-feira)
────────────────────────────────────────────────
[ ] Executar Loop de Concorrentes
[ ] Executar Loop de Conteudo (gerar batch da semana)
[ ] Executar Loop de Analytics
[ ] Revisar e aprovar fila de publicacao semanal
[ ] Checar estado do Shopify Native Quiz
[ ] Atualizar Second Brain com novos insights
[ ] Revisao de compliance do batch gerado
[ ] Commit dos arquivos de conhecimento novos
────────────────────────────────────────────────
Duracao estimada: 1-2 horas com Jarvis
```

### Monthly Routine

```
MONTHLY (primeiro dia util do mes)
────────────────────────────────────────────────
[ ] Executar Loop de Performance (CRO)
[ ] Executar Loop de SEO
[ ] Executar Loop de Compliance (revisao de backlog)
[ ] Executar Loop de Produtos (atualizar fichas)
[ ] Revisar labels Supliful (batch review — workflow 06)
[ ] Relatorio de crescimento organico
[ ] Revisao de custos de API
[ ] Atualizar roadmap com progresso real
[ ] Revisao de seguranca (audit de API keys ativas)
[ ] Commit completo de tudo nao rastreado
────────────────────────────────────────────────
Duracao estimada: 4-6 horas com Jarvis
```

### Quarterly Routine

```
QUARTERLY (a cada 3 meses)
────────────────────────────────────────────────
[ ] Auditoria completa de arquitetura (nova versao de audit)
[ ] Revisao de agentes (aposentar orphaned, criar novos)
[ ] Revisao de skills (atualizar formato e conteudo)
[ ] Revisao de roadmap (avancar fases)
[ ] Revisao de segunda camada do ChatGPT Bridge
[ ] Avaliacao de novos produtos para adicionar
[ ] Revisao de todas as integrracoes de API
[ ] Decisao sobre proximas plataformas organicas
[ ] Limpar backups e arquivos legacy aprovados
[ ] Atualizar MASTER_ARCHITECTURE.md com nova versao
────────────────────────────────────────────────
Duracao estimada: 1 dia completo com Jarvis
```

---

## 5. SECOND BRAIN

O Second Brain e o repositorio centralizado de conhecimento da plataforma.
Reside inteiramente dentro de `vital-vision-system/`.

### Mapa do Second Brain

```
vital-vision-system/                     <- SECOND BRAIN
│
├── brand/                               <- IDENTIDADE
│   ├── brand-voice.md                   <- tom, linguagem, personalidade
│   ├── visual-rules.md                  <- cores, tipografia, estetica
│   ├── compliance-rules.md              <- claims permitidos e proibidos
│   ├── cta-library.md                   <- CTAs aprovados
│   ├── positioning-and-compliance.md    <- documento master (35KB)
│   ├── approved-language.md             <- linguagem aprovada por produto
│   ├── forbidden-language.md            <- linguagem nunca usar
│   └── story.md                         <- historia da fundadora e marca
│
├── products/                            <- PRODUTOS
│   ├── inner-bloom.md                   <- probiotic formula
│   ├── inner-calm.md                    <- magnesium glycinate
│   ├── inner-balance.md                 <- multivitamin
│   ├── inner-grow.md                    <- hair skin nails
│   └── product-comparison.md            <- diferenciais comparativos
│
├── compliance/                          <- COMPLIANCE (a popular)
│   ├── approved-claims.md               <- claims FTC/FDA aprovados
│   ├── forbidden-claims.md              <- claims proibidos
│   ├── fda-disclaimer.md                <- disclaimer padrao
│   ├── product-claim-map.md             <- mapa claim → produto
│   └── review-checklist.md              <- checklist de revisao
│
├── research/                            <- PESQUISA
│   ├── competitor-insights/             <- insights por concorrente
│   ├── customer-voice/                  <- linguagem real dos clientes
│   ├── hook-patterns/                   <- padroes de hook que funcionam
│   └── trends/                          <- tendencias de mercado
│
├── content-pillars/                     <- ESTRATEGIA EVERGREEN
│   ├── education.md
│   ├── routine.md
│   ├── product-angles.md
│   ├── objections.md
│   ├── soft-sell.md
│   ├── founder-journey.md
│   ├── trust-building.md
│   └── competitor-adaptation.md
│
├── learned-knowledge/                   <- O QUE A PLATAFORMA APRENDEU
│   ├── what-worked.md                   <- conteudos e testes que funcionaram
│   ├── what-failed.md                   <- o que nao funcionou e por que
│   ├── seasonal-patterns.md             <- padroes sazonais
│   └── audience-insights.md             <- o que a audiencia responde
│
├── approved-assets/                     <- ASSETS APROVADOS
│   ├── logos/
│   ├── bottles/
│   ├── backgrounds/
│   ├── lifestyle/
│   └── canva-exports/
│
├── customer-voice/                      <- VOZ DO CLIENTE
│   ├── reviews-mining.md                <- frases reais de reviews
│   ├── comment-patterns.md              <- padroes de comentarios
│   ├── objection-language.md            <- como clientes verbalizam objecoes
│   └── desire-language.md               <- como clientes expressam desejos
│
└── supliful-label-ops/                  <- MODULO DE LABEL (ja ativo)
    ├── agents/                          <- 15 agentes ativos
    ├── workflows/                       <- 12 workflows
    ├── prompts/                         <- 14 prompts
    ├── checklists/
    ├── templates/
    ├── api/
    └── logs/
```

---

## 6. APIS — MAPA DE INTEGRACOES

### Status atual

```
┌───────────────────────┬──────────────┬──────────────────────────────┐
│ API                   │ Status       │ Uso atual                    │
├───────────────────────┼──────────────┼──────────────────────────────┤
│ Shopify Admin API     │ ATIVO        │ SEO, produtos, quiz nativo   │
│ Google Sheets API     │ ATIVO        │ competitor research tracker  │
│ Google Service Acct   │ ATIVO        │ auth para Sheets             │
│ Gemini (Google AI)    │ ATIVO        │ geracao de imagem            │
│ Claude / Anthropic    │ ATIVO        │ orquestracao, n8n            │
│ GitHub API            │ ATIVO        │ git, versionamento           │
│ Meta Business         │ PLANEJADO    │ publicacao organica          │
│ Instagram Graph       │ PLANEJADO    │ posts, reels, stories        │
│ Canva API             │ PLANEJADO    │ geracao de criativos         │
│ Omnisend              │ PLANEJADO    │ email marketing              │
│ OpenAI                │ PLANEJADO    │ ChatGPT Bridge               │
│ Apify                 │ FUTURO       │ web scraping de concorrentes │
│ Supabase              │ FUTURO       │ banco de dados persistente   │
└───────────────────────┴──────────────┴──────────────────────────────┘
```

### Localizacao das configs de API

```
vital-vision-system/integrations/
  ├── shopify/        <- credenciais, endpoints, rate limits
  ├── meta/           <- app ID, permissoes, scopes
  ├── canva/          <- API key, brand kit ID
  ├── github/         <- tokens, repo, branches protegidos
  ├── n8n/            <- webhook URLs, workflow IDs
  ├── omnisend/       <- API key, listas, templates
  ├── google/         <- service account, sheet IDs
  ├── gemini/         <- modelo, safe mode config
  ├── apify/          <- atores planejados
  └── supabase/       <- schema planejado

scripts/
  └── [cada API tem scripts dedicados em sua propria subpasta]
```

### Regras de seguranca de API

```
- Todas as chaves ficam em .env (nunca em Git)
- .env.example documenta as variaveis sem valores reais
- vital-vision-system/security/api-key-rules.md define rotacao
- Nenhum script faz escrita sem --write flag ou aprovacao humana
- Rate limits sao respeitados em todos os scripts
- Logs de erros de API ficam em vital-vision-system/logs/errors.md
```

---

## 7. DASHBOARDS

Dashboards sao visoes de status geradas por agentes, nao UIs visuais.
Cada dashboard e um comando Jarvis que agrega dados e apresenta estado atual.

### Dashboard de Producao

```
Mostra: o que esta em producao agora
  - Produtos ativos no Shopify
  - Labels Supliful: status por produto
  - Quiz status por produto
  - PDP status por produto
  - Ultima atualizacao de SEO
```

### Dashboard Organico

```
Mostra: estado do conteudo organico
  - Fila de publicacao (proximos 7 dias)
  - Posts pendentes de aprovacao
  - Posts publicados esta semana
  - Performance dos ultimos 30 dias
  - Top 3 hooks da semana
  - Proxima acao recomendada
```

### Dashboard de Produtos

```
Mostra: estado de cada produto
  - Ficha de produto: atualizada / desatualizada
  - Label: aprovada / em revisao / pendente
  - Compliance: aprovado / pendente
  - Quiz route: ativa / ausente
  - PDP: completo / em draft / ausente
  - SEO: otimizado / desatualizado
```

### Dashboard de Conteudo

```
Mostra: inventario de conteudo
  - Drafts em andamento
  - Aprovados aguardando publicacao
  - Publicados este mes
  - Rejeitados (com razao)
  - Backlog de ideias
```

### Dashboard de Analytics

```
Mostra: numeros da plataforma
  - Alcance organico (semana)
  - Sessoes Shopify (semana)
  - Taxa de conversao quiz → compra
  - Abertura de email (Omnisend)
  - Top produto por visitas
  - Top conteudo por engajamento
```

### Dashboard de Automacao

```
Mostra: estado dos loops e integrracoes
  - Ultimo run: Loop de Concorrentes
  - Ultimo run: Loop de Conteudo
  - Ultimo run: Loop de Analytics
  - n8n: status dos workflows
  - Scripts: ultimo erro registrado
  - APIs: status de conectividade
```

### Dashboard de Custos

```
Mostra: gastos de API e ferramentas
  - Claude API: tokens usados / mes
  - Gemini API: imagens geradas / mes
  - Apify: runs / mes (quando ativo)
  - Shopify: plano e apps ativos
  - Total estimado do mes
  - Projecao proximo mes
```

---

## 8. SCRIPTS — CLASSIFICACAO DEFINITIVA

```
scripts/
│
├── [UTILITY]           <- ferramentas de suporte e verificacao
│   ├── image/check-env.js
│   ├── image/generate-image-placeholder.js
│   ├── seo/check-seo-copy-compliance.js
│   └── seo/check-result-page-compliance.js
│
├── [AUTOMATION]        <- scripts que rodam em loops / n8n
│   ├── queue-competitors-from-master.js
│   ├── generate-organic-content-queue.js
│   ├── format-organic-content-queue.js
│   └── update-organic-queue-meta-only.js
│
├── [MAINTENANCE]       <- manutencao de estado do sistema
│   ├── supliful-label-ops/create-label-review.sh
│   └── supliful-label-ops/create-product-label-folder.sh
│
├── [PUBLISHING]        <- publicacao assistida (nunca automatica)
│   ├── shopify/update-product-seo.js
│   └── pagefly/apply-hero-sections.js
│
├── [SYNC]              <- sincronizacao entre sistemas
│   └── [a criar: sync-shopify-products.js]
│   └── [a criar: sync-google-sheets.js]
│
├── [MIGRATION]         <- migracao de estrutura (uso unico)
│   └── [a criar: migrate-config-to-system.js]
│   └── [a criar: migrate-content-to-publishing.js]
│
└── [LEGACY — VQB]      <- STATUS: LEGACY. Nao expandir.
    └── vqb/            <- arquivar apos confirmacao de Lucy
```

---

## 9. ESTRUTURA DEFINITIVA DE PASTAS

> Esta e a estrutura alvo. Nenhum arquivo foi movido ainda.
> A migracao sera feita gradualmente conforme o roadmap.

```
vital-vision-automation/                 <- RAIZ OPERACIONAL
│
├── .claude/                             <- CLAUDE CODE — NAO MOVER
│   ├── commands/                        <- comandos invocaveis por /comando
│   │   ├── jarvis.md                    <- [a criar] entrada do orquestrador
│   │   ├── vv-automation-ops.md         <- ja existe
│   │   ├── vv-growth-cro.md             <- ja existe
│   │   └── vv-qa-guard.md               <- ja existe
│   └── skills/                          <- skills no formato oficial
│       ├── vv-copy-engine/SKILL.md      <- ja existe
│       ├── vv-premium-label-architect/  <- ja existe (untracked)
│       └── [novas skills aqui]
│
├── agents/                              <- AGENTES GERAIS
│   ├── jarvis-orchestrator.md           <- [a criar]
│   ├── brand-agent.md                   <- [a criar / refatorar]
│   ├── compliance-agent.md              <- [a criar / refatorar]
│   ├── organic-content-agent.md         <- refatorar de vv-organic-content-engine-agent.md
│   ├── competitor-agent.md              <- [a criar]
│   ├── publishing-agent.md              <- refatorar de vv-publishing-ops-agent.md
│   ├── analytics-agent.md              <- [a criar]
│   ├── quiz-agent.md                    <- [a criar]
│   ├── shopify-agent.md                 <- [a criar]
│   ├── meta-agent.md                    <- [a criar]
│   ├── research-agent.md                <- [a criar]
│   ├── product-agent.md                 <- [a criar]
│   ├── growth-agent.md                  <- refatorar de growth-cro-agent.md
│   ├── qa-agent.md                      <- refatorar de vv-qa-card-creative-agent.md
│   ├── security-agent.md                <- refatorar de qa-security-devops-guard.md
│   ├── documentation-agent.md           <- [a criar]
│   └── automation-agent.md              <- refatorar de automation-ops-agent.md
│
├── scripts/                             <- EXECUTOR DE SCRIPTS
│   ├── image/                           <- geracao de imagem (Gemini)
│   ├── shopify/                         <- Shopify API scripts
│   ├── seo/                             <- checagem de SEO
│   ├── pagefly/                         <- automacao de PageFly
│   ├── supliful-label-ops/              <- shell scripts de label
│   ├── queue-competitors-from-master.js
│   ├── generate-organic-content-queue.js
│   ├── format-organic-content-queue.js
│   └── update-organic-queue-meta-only.js
│
├── docs/                                <- DOCUMENTACAO DA PLATAFORMA
│   ├── architecture-audit-v1.md         <- ja existe
│   ├── MASTER_ARCHITECTURE.md           <- este arquivo
│   └── [changelogs, decisoes, ADRs]
│
├── vital-vision-system/                 <- SECOND BRAIN (modulo de conhecimento)
│   ├── CLAUDE.md                        <- guia operacional (ja existe)
│   ├── README.md                        <- descricao do sistema (ja existe)
│   ├── .env.example                     <- template de variaveis (ja existe)
│   ├── .gitignore                       <- regras de ignore do modulo
│   ├── brand/                           <- FONTE DE VERDADE DE MARCA
│   ├── products/                        <- FONTE DE VERDADE DE PRODUTOS
│   ├── compliance/                      <- CLAIMS E REGRAS FDA/FTC
│   ├── research/                        <- PESQUISA DE MERCADO
│   ├── content-pillars/                 <- ESTRATEGIA EVERGREEN
│   ├── templates/                       <- TEMPLATES DE CONTEUDO
│   ├── approved-assets/                 <- ASSETS FINAIS
│   ├── publishing/                      <- CONTEUDO APROVADO E CALENDARIOS
│   ├── automations/                     <- DOCUMENTACAO DE PIPELINES
│   ├── integrations/                    <- NOTAS DE CONEXAO POR API
│   ├── analytics/                       <- METRICAS E RELATORIOS
│   ├── logs/                            <- REGISTRO DE ACOES CLAUDE
│   ├── security/                        <- PERMISSOES E REGRAS DE API
│   ├── reverse-engineering/             <- ANALISE DE CONCORRENTES
│   ├── learned-knowledge/               <- [a criar] o que a plataforma aprendeu
│   ├── customer-voice/                  <- [a criar] voz do cliente
│   ├── jarvis/                          <- [a criar] memoria e estado do Jarvis
│   ├── chatgpt-bridge/                  <- [a criar] integracao com ChatGPT
│   └── supliful-label-ops/              <- MODULO DE LABEL (mais ativo)
│
├── drafts/                              <- WORK IN PROGRESS
│   ├── shopify-pages/                   <- PDPs em desenvolvimento
│   ├── shopify-quiz/                    <- quiz pages em desenvolvimento
│   ├── pagefly/                         <- editor PageFly
│   └── seo/                             <- drafts de SEO
│
├── assets/                              <- OUTPUTS DE RUNTIME
│   ├── generated/                       <- imagens geradas (ignorado no git)
│   ├── prompts/                         <- JSONs de prompt (ignorado no git)
│   ├── templates/                       <- templates de imagem
│   └── personal-reference/              <- fotos pessoais (ignorado no git)
│
├── backups/                             <- SNAPSHOTS PRE-ESCRITA (ignorado no git)
├── exports/                             <- OUTPUTS DE N8N (ignorado no git)
├── reports/                             <- RELATORIOS HISTORICOS
│
├── [LEGACY — a migrar ou arquivar]
│   ├── config/                          <- migrar para vital-vision-system/
│   ├── content/                         <- migrar para vital-vision-system/publishing/
│   ├── automations/                     <- migrar para vital-vision-system/automations/
│   ├── skills/                          <- aposentar (conteudo migravel para .claude/skills/)
│   ├── logs/                            <- migrar para vital-vision-system/logs/
│   └── content-calendar/               <- arquivar
│
├── .env                                 <- NUNCA NO GIT
├── .env.backup                          <- NUNCA NO GIT
├── .gitignore                           <- regras de ignore da raiz
└── package.json                         <- npm scripts da plataforma
```

### Principio de escalabilidade

A estrutura acima suporta 10, 50, 100 e 1000 produtos porque:

- Produtos vivem em `vital-vision-system/products/` como arquivos individuais (um por produto)
- Labels vivem em `supliful-label-ops/` com subpastas por produto
- PDPs vivem em `drafts/shopify-pages/` com prefixo de produto
- Scripts nao sao acoplados a nomes de produto — usam parametros
- Agentes nao tem produto hardcoded — recebem produto como input
- O Second Brain cresce horizontalmente sem reorganizar estrutura pai

---

## 10. ROADMAP OFICIAL

### STATUS VQB

```
Visual Quiz Builder = LEGACY
Todos os arquivos em scripts/vqb/, config/vqb-*, backups/vqb/ e
reports/vqb/ sao classificados como: LEGACY / ARCHIVE / HISTORICAL

NAO construir: novos agentes VQB · novas integracoes VQB · novos workflows VQB

QUIZ OFICIAL: Shopify Native + Claude Code
```

### Estado atual do Shopify Native Quiz

```
Inner Bloom   — READY (precisa de QA)
Inner Calm    — MISSING
Inner Grow    — MISSING
Inner Balance — MISSING

Falta construir:
  [ ] Roteamento entre produtos (logica de decisao)
  [ ] QA de todas as rotas e resultados
  [ ] Analytics de quiz (qual rota converte mais)
  [ ] Otimizacao mobile (layout responsivo)
  [ ] Revisao de compliance de todas as paginas de resultado
  [ ] Fallback (o que mostrar quando nenhum produto encaixa)
```

---

### FASE 1 — CONSOLIDACAO E SEGURANCA
**Objetivo:** estabilizar o que existe antes de construir novo
**Duracao estimada:** 2-3 semanas

```
[ ] Auditoria de historico Git (verificar .env em commits antigos)
[ ] Commit de todos os arquivos untracked validos:
    - vital-vision-system/supliful-label-ops/ (inteiro)
    - .claude/skills/vv-premium-label-architect/
    - scripts/ novos (queue, format, update-organic)
    - Modificacoes em CLAUDE.md, README.md, .env.example, .gitignore
[ ] Remover vital-vision-system/.claude/ (vazio, nunca lido)
[ ] Resolver divergencia brand-voice e compliance-rules
    (config/ vs vital-vision-system/brand/)
[ ] Migrar skills/ raiz para .claude/skills/ ou arquivar
[ ] Popular vital-vision-system/compliance/ com conteudo real
[ ] Popular vital-vision-system/security/ com conteudo real
[ ] Criar docs/ARCHITECTURE_DECISIONS.md com decisoes tomadas
```

### FASE 2 — SHOPIFY NATIVE QUIZ
**Objetivo:** quiz funcional para todos os 4 produtos
**Duracao estimada:** 3-4 semanas

```
[ ] QA completo do Inner Bloom quiz (rotas, mobile, compliance)
[ ] Construir quiz Inner Calm (drafts/shopify-quiz/)
[ ] Construir quiz Inner Grow (drafts/shopify-quiz/)
[ ] Construir quiz Inner Balance (drafts/shopify-quiz/)
[ ] Construir logica de roteamento entre produtos
[ ] Implementar analytics de quiz no Shopify
[ ] Compliance review de todas as paginas de resultado
[ ] Fallback page (nenhum match)
[ ] QA mobile de todos os quizzes
[ ] Lucy aprova todos antes de publicar
[ ] Quiz Agent criado para gerenciar futuras atualizacoes
```

### FASE 3 — JARVIS E AGENTES CORE
**Objetivo:** orquestrador e agentes principais funcionando
**Duracao estimada:** 2-3 semanas

```
[ ] Criar jarvis-orchestrator.md em agents/
[ ] Criar .claude/commands/jarvis.md
[ ] Criar vital-vision-system/jarvis/ (memoria e estado)
[ ] Refatorar agents existentes para novo mapa de agentes
[ ] Criar Brand Agent
[ ] Criar Compliance Agent
[ ] Criar Product Agent
[ ] Criar Research Agent
[ ] Criar Quiz Agent
[ ] Criar Shopify Agent
[ ] Testar ciclo basico: Jarvis → Agente → Output → Lucy aprova
```

### FASE 4 — LOOPS ATIVOS
**Objetivo:** loops automatizados rodando com supervissao humana
**Duracao estimada:** 3-4 semanas

```
[ ] Ativar Loop de Conteudo (semanal)
[ ] Ativar Loop de Compliance (por demanda)
[ ] Ativar Loop de Concorrentes (ja tem MVP — escalar)
[ ] Criar Analytics Agent
[ ] Ativar Loop de Analytics (semanal)
[ ] Criar Growth Agent
[ ] Ativar Loop de Performance (mensal)
[ ] Ativar Loop de SEO (mensal)
[ ] Implementar Daily Routine com Jarvis
[ ] Implementar Weekly Routine com Jarvis
```

### FASE 5 — CANAIS ORGANICOS
**Objetivo:** producao sistematica de conteudo em todos os canais
**Duracao estimada:** 4-6 semanas

```
[ ] Criar Meta Agent (Instagram + Facebook)
[ ] Ativar publicacao assistida no Instagram
[ ] Ativar publicacao assistida no Facebook
[ ] Mapear fluxo Pinterest (Organic Content Agent → Publishing Agent)
[ ] Mapear fluxo TikTok (quando relevante)
[ ] Mapear fluxo YouTube Shorts (quando relevante)
[ ] Mapear fluxo Blog Shopify
[ ] Ativar Email Marketing (Omnisend) via Publishing Agent
[ ] Primeiro batch de conteudo multi-canal aprovado por Lucy
[ ] Medir performance por canal no Loop de Analytics
```

### FASE 6 — PRODUCAO ESCALAVEL
**Objetivo:** plataforma rodando em producao com supervisao minima
**Duracao estimada:** 4-8 semanas

```
[ ] Implementar Monthly Routine com Jarvis
[ ] Ativar Dashboard de Producao
[ ] Ativar Dashboard Organico
[ ] Ativar Dashboard de Analytics
[ ] Integrar Apify para scraping automatico de concorrentes
[ ] Integrar Supabase para persistencia de dados (metricas, memoria)
[ ] Implementar Quarterly Routine com Jarvis
[ ] Construir ChatGPT Bridge (ver secao 11)
[ ] 10 produtos suportados sem reorganizar estrutura
[ ] Documentacao completa de todos os agentes e workflows
```

---

## 11. CHATGPT BRIDGE — INTEGRACAO FUTURA

### Conceito

O ChatGPT Bridge permite que o ChatGPT atue como consultor estrategico externo da plataforma, sem ter acesso ao repositorio ou a dados sensiveis.

Claude Code permanece como executor e orquestrador.
ChatGPT entra como segunda opiniao estrategica.

### Localizacao planejada

```
vital-vision-system/chatgpt-bridge/
  ├── README.md                 <- como usar o bridge
  ├── context-export.md         <- o que exportar para o ChatGPT
  ├── prompt-templates/         <- prompts padronizados para consulta
  │   ├── strategy-review.md    <- revisao de estrategia
  │   ├── copy-second-opinion.md <- segunda opiniao de copy
  │   ├── competitor-analysis.md <- analise de concorrente
  │   └── growth-consulting.md  <- consultoria de crescimento
  └── session-logs/             <- o que o ChatGPT respondeu
```

### Fluxo do Bridge

```
Claude Code (Jarvis) gera OUTPUT
        │
        ▼
context-export.md empacota o contexto relevante
(brand brief + produto + objetivo + constraints)
        │
        ▼
Lucy cola o contexto no ChatGPT com prompt-template
        │
        ▼
ChatGPT responde com perspectiva estrategica
        │
        ▼
Lucy traz resposta de volta para Claude Code
        │
        ▼
Jarvis integra a perspectiva no plano atual
        │
        ▼
session-logs/ registra o que foi consultado e aprendido
```

### Principio de seguranca

```
- Nunca enviar para o ChatGPT: API keys, dados de cliente, metricas financeiras
- Sempre enviar: context anonimizado de marca, desafios estrategicos, drafts de copy
- O ChatGPT nao tem acesso ao repositorio
- Toda decisao final passa por Lucy e Claude Code
```

---

## 12. ESCALABILIDADE

### Design para crescimento

A arquitetura foi projetada para escalar sem reorganizacao estrutural.

```
┌────────────────────────────────────────────────────────────────┐
│  ESCALA POR PRODUTO                                             │
│                                                                  │
│  4 produtos hoje    <- estrutura atual suporta                  │
│  10 produtos        <- adicionar arquivos, nao pastas novas     │
│  50 produtos        <- agentes recebem produto como parametro   │
│  100 produtos       <- Supabase (Fase 6) gerencia persistencia  │
│  1000 produtos      <- mesmo modelo, dados em banco             │
└────────────────────────────────────────────────────────────────┘
```

### Como adicionar um novo produto

```
1. Criar vital-vision-system/products/[novo-produto].md
2. Criar vital-vision-system/supliful-label-ops/logs/[novo-produto]/
3. Executar Loop de Produtos via Jarvis
4. Agentes recebem [novo-produto] como parametro — sem hardcode
5. Quiz Agent adiciona rota para novo produto
6. Shopify Agent cria/atualiza PDP
7. Compliance Agent revisa claims
8. Lucy aprova antes de publicar
```

### Design para volume de conteudo

```
┌────────────────────────────────────────────────────────────────┐
│  ESCALA POR CONTEUDO                                            │
│                                                                  │
│  5 posts/semana hoje         <- capacidade atual               │
│  20 posts/semana             <- Loop de Conteudo automatizado  │
│  100 posts/semana            <- multi-canal (5 canais x 20)    │
│  500 posts/semana            <- Apify + scraping automatico    │
└────────────────────────────────────────────────────────────────┘
```

---

## 13. ESCALA DO ORGANICO

### Principio: um cerebro, multiplos canais

Os mesmos agentes geram conteudo para todos os canais.
A diferenca e o formato de output, nao o processo.

```
Organic Content Agent gera:
  HOOK + MENSAGEM CENTRAL + CTA + COMPLIANCE CHECK
          │
          ▼
  ┌───────┴────────────────────────────────────────────┐
  │                                                     │
  ▼                                                     ▼
Publishing Agent formata por canal            Publishing Agent calendariza
  │                                                     │
  ├── Instagram   <- caption + hashtags + collab?      │
  ├── Facebook    <- caption longa + link              │
  ├── Pinterest   <- descricao + board + keywords      │
  ├── TikTok      <- script de video curto             │
  ├── YouTube     <- script de short                   │
  ├── Blog        <- artigo longo com SEO              │
  └── Email       <- subject + body Omnisend           │
                                                       ▼
                                              Lucy aprova por canal
                                                       │
                                                       ▼
                                              Meta Agent publica IG + FB
                                              Publishing Agent publica resto
```

### Adicionar novo canal

```
1. Criar template em vital-vision-system/templates/[canal]/
2. Publishing Agent ja tem o conteudo — adapta formato
3. Criar script em scripts/publishing/[canal]-publisher.js
4. Adicionar canal ao Loop de Analytics
5. Nenhum agente novo necessario
```

---

## 14. PLANOS ESPECIFICOS

### Plano: Finalizar o Shopify Native Quiz

```
SPRINT QUIZ (Fase 2 detalhada)

Semana 1 — Inner Bloom QA
  [ ] Revisar todas as rotas existentes de Inner Bloom
  [ ] Testar em mobile (iOS + Android)
  [ ] Compliance review da pagina de resultado
  [ ] Corrigir issues encontrados
  [ ] Lucy aprova Inner Bloom

Semana 2 — Inner Calm
  [ ] Criar estrutura de quiz para Inner Calm
  [ ] Definir rotas e perguntas com Quiz Agent
  [ ] Compliance review
  [ ] QA mobile
  [ ] Lucy aprova Inner Calm

Semana 3 — Inner Grow
  [ ] Criar estrutura de quiz para Inner Grow
  [ ] Definir rotas e perguntas
  [ ] Compliance review
  [ ] QA mobile
  [ ] Lucy aprova Inner Grow

Semana 4 — Inner Balance + Finalizacao
  [ ] Criar estrutura de quiz para Inner Balance
  [ ] Definir rotas e perguntas
  [ ] Logica de roteamento multi-produto
  [ ] Fallback page
  [ ] Analytics setup
  [ ] QA completo de todos os 4 quizzes
  [ ] Lucy aprova tudo
  [ ] Publicar
```

### Plano: Construir Jarvis

```
SPRINT JARVIS (Fase 3 detalhada)

Etapa 1 — Prompt do Orquestrador
  [ ] Escrever agents/jarvis-orchestrator.md
  [ ] Definir como Jarvis interpreta intencao
  [ ] Definir como Jarvis seleciona agentes
  [ ] Definir formato de plano de Jarvis
  [ ] Testar com Lucy em conversas reais

Etapa 2 — Memoria
  [ ] Criar vital-vision-system/jarvis/memory.md
  [ ] Criar vital-vision-system/jarvis/active-plan.md
  [ ] Definir quando e como Jarvis atualiza memoria
  [ ] Testar persistencia entre sessoes

Etapa 3 — Comando de Entrada
  [ ] Criar .claude/commands/jarvis.md
  [ ] Testar /jarvis com objetivo simples
  [ ] Testar /jarvis com objetivo complexo multi-agente
  [ ] Ajustar baseado em feedback de Lucy

Etapa 4 — Loops via Jarvis
  [ ] Integrar Loop de Conteudo no Jarvis
  [ ] Integrar Loop de Concorrentes no Jarvis
  [ ] Integrar Loop de Analytics no Jarvis
  [ ] Testar ciclo completo supervisionado por Lucy
```

### Plano: Loops

```
SPRINT LOOPS (Fase 4 detalhada)

Loop de Conteudo — primeiros 2 ciclos manuais, depois semi-auto
Loop de Concorrentes — ja tem MVP, escalar para mais concorrentes
Loop de Analytics — criar Analytics Agent primeiro
Loop de Compliance — integrar em todos os outros loops
Loop de SEO — Fase 4 final, apos loops principais rodando
Loop de Performance — Fase 4 final, apos analytics ativo
```

### Plano: Routines

```
SPRINT ROUTINES (Fase 4 final)

[ ] Criar checklist de Daily Routine em vital-vision-system/jarvis/
[ ] Criar checklist de Weekly Routine
[ ] Criar checklist de Monthly Routine
[ ] Criar checklist de Quarterly Routine
[ ] Testar cada routine uma vez manualmente com Lucy
[ ] Ajustar baseado em feedback
[ ] Documentar tempo real de cada routine
[ ] Jarvis executa routines com comandos simples
```

---

## DECISOES ARQUITETURAIS REGISTRADAS

| Decisao | Escolha | Razao |
|---------|---------|-------|
| Repositorio raiz | vital-vision-automation | Git root, package.json, scripts, .claude/ estao aqui |
| Modulo de conhecimento | vital-vision-system/ | Mais completo, mais recente, estrutura mais limpa |
| Quiz oficial | Shopify Native | VQB descontinuado — decisao de Lucy |
| VQB | LEGACY | Status confirmado — nao expandir |
| Orquestrador | Jarvis (a construir) | Plataforma precisa de camada de coordenacao |
| Skills | .claude/skills/ (formato SKILL.md) | Unico formato lido pelo Claude Code |
| Agentes | agents/ raiz | Chamados pelos commands em .claude/commands/ |
| Segunda opiniao | ChatGPT Bridge | Sem acesso direto ao repo — bridge manual por Lucy |
| Banco de dados | Supabase (planejado, Fase 6) | Escalabilidade alem de arquivos Markdown |
| Scraping | Apify (planejado, Fase 6) | Automacao de pesquisa de concorrentes |

---

## PROXIMO PASSO IMEDIATO

```
Executar Fase 1 — Consolidacao e Seguranca

Primeira acao: Auditoria do historico Git
  git log --all --oneline -- .env .env.backup
  git show <hash>:.env   <- verificar se tem valores reais

Se historico limpo: avancar para commit dos untracked
Se historico com secrets: limpar com git filter-repo antes de qualquer push
```

---

*Documento produzido em modo read-only. Nenhum arquivo foi alterado.*
*Proxima revisao planejada: Quarterly Routine.*
