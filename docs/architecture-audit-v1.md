# FASE 0 — CONTENÇÃO E MAPEAMENTO
# Architecture Audit v1

**Data:** 2026-07-12
**Auditora:** Claude Code (modo leitura estrita)
**Branch:** main
**Repositório:** `/Users/lucianatorrubia/Documents/vital-vision-automation`

---

## 1. RESUMO DA SITUAÇÃO ATUAL

O repositório cresceu em duas direções paralelas e nunca foi consolidado:

- **Raiz do projeto** (`/vital-vision-automation/`) acumulou pastas operacionais ad hoc: `agents/`, `skills/`, `automations/`, `config/`, `logs/`, `content/`, `assets/` — criadas entre abril e maio/2026, com scripts ativos apontando para elas.
- **`vital-vision-system/`** é uma refatoração arquitetural iniciada em junho/2026, com estrutura mais limpa, módulo `supliful-label-ops/` robusto, CLAUDE.md próprio e README formal.
- As duas estruturas **coexistem sem hierarquia definida**, criando duplicações em `brand`, `products`, `compliance`, `automations`, `publishing`, `logs`, `security`, `.claude/`, e `supliful-label-ops/`.

---

## 2. RAIZ VERDADEIRA DO REPOSITÓRIO

```
/Users/lucianatorrubia/Documents/vital-vision-automation
```

- Um único `.git` na raiz. **Nenhum submódulo ou repositório Git aninhado.**
- Branch ativa: `main`

---

## 3. ALTERAÇÕES MODIFICADAS E NÃO RASTREADAS

| Tipo | Quantidade |
|------|-----------|
| Arquivos modificados (tracked, unstaged) | 6 |
| Arquivos/pastas não rastreados (untracked) | 19 entradas |

**Modificados (unstaged):**
```
package-lock.json
package.json
vital-vision-system/.env.example
vital-vision-system/.gitignore
vital-vision-system/CLAUDE.md
vital-vision-system/README.md
```

**Não rastreados (novos, nunca commitados):**
```
.claude/skills/vv-premium-label-architect/
assets/generated/  (imagens e placeholder)
assets/prompts/    (7 arquivos JSON)
drafts/shopify-pages/  (3 novos MDs)
scripts/format-organic-content-queue.js
scripts/generate-organic-content-queue.js
scripts/queue-competitors-from-master.js
scripts/supliful-label-ops/   (2 shell scripts)
scripts/update-organic-queue-meta-only.js
vital-vision-system/supliful-label-ops/  (módulo inteiro)
```

---

## 4. ESTRUTURAS CONCORRENTES

```
vital-vision-automation/          <- RAIZ (estrutura ANTIGA, abr-maio/2026)
├── .claude/                      <- comandos + skills reais do Claude Code
├── agents/                       <- 7 arquivos .md de agentes
├── skills/                       <- 8 arquivos .md de skills (formato antigo)
├── automations/                  <- approved/, drafts/, meta/, images/
├── config/                       <- 34 arquivos de config (muito achatado)
├── logs/                         <- images/, meta/, publishing/ (root)
├── assets/                       <- generated/, personal-reference/, prompts/, templates/
├── content/                      <- approved/, drafts/, publishing-queue/
├── backups/                      <- shopify/, vqb/ (snapshots de API)
├── drafts/                       <- pagefly/, seo/, shopify-pages/, shopify-quiz/
├── exports/                      <- n8n/ exports
├── reports/                      <- vqb/, google/, shopify-pages/ (relatórios históricos)
├── references/                   <- vazio
├── content-calendar/             <- 1 arquivo
└── vital-vision-system/          <- NOVA ESTRUTURA (jun/2026+)
    ├── .claude/                  <- VAZIA (agents/, commands/, skills/ todos vazios)
    ├── brand/                    <- posicionamento, voz, compliance (mais completo)
    ├── products/                 <- 4 produtos + product-comparison.md
    ├── compliance/               <- 5 arquivos (todos vazios exceto brand/compliance-rules.md)
    ├── automations/              <- 5 pipelines (vazios)
    ├── publishing/               <- estrutura para calendário, captions, etc. (maioria vazia)
    ├── logs/                     <- 4 arquivos (todos vazios)
    ├── security/                 <- api-key-rules.md + 4 vazios
    ├── approved-assets/          <- 5 subpastas (maioria vazia)
    ├── research/                 <- competitor research, customer voice
    ├── content-pillars/          <- estratégia evergreen
    ├── reverse-engineering/      <- 10 arquivos (jun/2026)
    ├── supliful-label-ops/       <- MÓDULO ATIVO (jul/2026, mais recente)
    ├── analytics/                <- 5 arquivos (todos vazios)
    └── integrations/             <- 6 subpastas (todas vazias)
```

---

## 5. MAPA DE DUPLICAÇÕES

### 5.1 — `.claude/` raiz vs `vital-vision-system/.claude/`

| Aspecto | `.claude/` (raiz) | `vital-vision-system/.claude/` |
|---------|-------------------|-------------------------------|
| Conteúdo | `commands/` (3 MDs ativos), `skills/` (2 subpastas com SKILL.md), `settings.local.json` | `agents/` (vazio), `commands/` (vazio), `skills/` (vazio), `settings.local.json` (vazio) |
| Mais atual | Sim (jul/2026) | Não (jun/2026, criado como scaffold vazio) |
| Usado pelo Claude Code | Sim (`.claude/` na raiz do projeto é lido automaticamente) | Não (Claude Code não lê `.claude/` dentro de subpastas) |
| Referências internas | CLAUDE.md principal aponta para `/vv-premium-label-architect` (skill em `.claude/skills/`) | Nenhum arquivo aponta para ele |
| **Risco** | **BAIXO — esta é a instância operacional** | **ALTO — cria ilusão de estrutura, nunca será lida pelo Claude Code. Confusão garantida.** |

### 5.2 — `agents/` raiz vs `vital-vision-system/supliful-label-ops/agents/`

| Aspecto | `agents/` (raiz) | `vital-vision-system/supliful-label-ops/agents/` |
|---------|-----------------|--------------------------------------------------|
| Conteúdo | 7 arquivos: automation-ops, growth-cro, qa-security, organic-content, personal-brand, publishing-ops, qa-card | 15 arquivos: label-architect, luxury-packaging-director, label-design-system-manager, compliance-reviewer, etc. |
| Mais atual | Maio/2026 | Jul/2026 |
| Quem chama | `.claude/commands/` (os 3 commands referenciam estes agentes) | CLAUDE.md de `vital-vision-system/` os referencia por nome |
| Domínio | Operações gerais (conteúdo, CRO, QA) | Exclusivo de labels Supliful |
| **Risco** | **MÉDIO — sem sobreposição de domínio** | **BAIXO — domínio distinto, não duplicam** |

### 5.3 — `skills/` raiz vs `.claude/skills/`

| Aspecto | `skills/` (raiz) | `.claude/skills/` |
|---------|-----------------|-------------------|
| Conteúdo | 8 arquivos .md soltos + 3 subpastas | 2 subpastas com SKILL.md (vv-copy-engine, vv-premium-label-architect) |
| Formato | Arquivos .md avulsos (sem estrutura SKILL.md oficial) | Subpastas com SKILL.md (formato oficial Claude Code skills) |
| Mais atual | Maio/2026 | Jul/2026 |
| Usado | Referenciado em alguns MDs antigos | Ativo — `.claude/skills/` é lido pelo Claude Code |
| **Risco** | **ALTO — skills em formato antigo, nunca invocadas pelo Claude Code. Podem confundir o que é "skill real" vs "documento de referência"** | **BAIXO — estas são as skills operacionais** |

### 5.4 — `automations/` raiz vs `vital-vision-system/automations/`

| Aspecto | `automations/` (raiz) | `vital-vision-system/automations/` |
|---------|----------------------|-----------------------------------|
| Conteúdo | approved/, drafts/, meta/, images/ — com arquivos reais (aprovações VQB, workflows rascunho, manychat) | 5 subpastas: canva-pipeline, email-pipeline, organic-content-pipeline, reporting-pipeline, shopify-pipeline — **todas vazias** |
| Mais atual | Maio/2026 (conteúdo real) | Jun/2026 (scaffold vazio) |
| Usado por scripts | Sim (referências em reports e agents) | Não |
| **Risco** | **ALTO — dois lugares com mesmo nome, um com conteúdo, um vazio. Trabalho novo pode ir para o lugar errado.** | |

### 5.5 — `config/` raiz vs `vital-vision-system/brand/` + outros

| Aspecto | `config/` (raiz) | `vital-vision-system/brand/` |
|---------|-----------------|------------------------------|
| Conteúdo | 34 arquivos achatados: brand-voice, compliance-rules, product-library, safety-rules, VQB config, meta config, etc. | brand-voice.md, compliance-rules.md, cta-library.md, positioning-and-compliance.md (35KB), visual-rules.md |
| Sobreposição direta | `config/brand-voice.md` <-> `vital-vision-system/brand/brand-voice.md`; `config/compliance-rules.md` <-> `vital-vision-system/brand/compliance-rules.md` | |
| Mais atual | `config/` tem dados mais antigos; `vital-vision-system/brand/positioning-and-compliance.md` é mais completo | |
| **Risco** | **CRITICO — brand-voice e compliance-rules existem em dois lugares com conteúdo potencialmente divergente** | |

### 5.6 — `logs/` raiz vs `vital-vision-system/logs/`

| Aspecto | `logs/` (raiz) | `vital-vision-system/logs/` |
|---------|---------------|-----------------------------|
| Conteúdo | images/, meta/, publishing/ (estrutura de log operacional) | claude-actions.md, content-generated.md, content-published.md, errors.md — **todos vazios** |
| `.gitignore` | `logs/` ignorado na raiz | `vital-vision-system/logs/` explicitamente des-ignorado no .gitignore de vvs |
| **Risco** | **MÉDIO — duas localizações de log, sendo que a de vvs é a correta para rastreamento** | |

### 5.7 — `assets/` raiz vs `vital-vision-system/approved-assets/`

| Aspecto | `assets/` (raiz) | `vital-vision-system/approved-assets/` |
|---------|-----------------|----------------------------------------|
| Conteúdo | generated/ (imagens geradas), personal-reference/ (fotos pessoais), prompts/ (JSONs), templates/ | backgrounds/, bottles/, canva-exports/, lifestyle/, logos/ |
| Propósito | Saída de geração de imagens (runtime) + referências pessoais | Assets de marca aprovados |
| **Risco** | **BAIXO — propósitos distintos, mas nomes podem confundir** | |

### 5.8 — `publishing/` em múltiplos locais

| Local | Conteúdo |
|-------|---------|
| `automations/publishing/` | Vazio |
| `config/publishing/` | meta-scheduling-config.md dentro de config/meta/ |
| `vital-vision-system/publishing/` | Estrutura completa (calendar, captions, reels, stories, etc.) — maioria vazia |
| `content/` raiz | approved/, drafts/, publishing-queue/, compliance-reports/ — **com conteúdo real** |

**Risco: ALTO — conteúdo publicado real está em `content/`, mas a estrutura "oficial" está em `vital-vision-system/publishing/`. Risco de criar conteúdo no lugar errado.**

### 5.9 — `supliful-label-ops/` em dois locais

| Local | Conteúdo |
|-------|---------|
| `vital-vision-system/supliful-label-ops/` | Módulo principal — 15 agentes, 14 workflows, 14 prompts, checklists, templates, api/, logs/ |
| `scripts/supliful-label-ops/` | 2 shell scripts (create-label-review.sh, create-product-label-folder.sh) |

**Risco: BAIXO — não duplicam. Os scripts são operadores do módulo principal.**

---

## 6. AGENTES ENCONTRADOS

| Agente | Caminho | Formato | Quem chama | Dependências | Estado |
|--------|---------|---------|-----------|--------------|--------|
| vv-automation-ops | `agents/automation-ops-agent.md` | MD prompt | `.claude/commands/vv-automation-ops.md` | config/, automations/ | CONFIGURED |
| vv-growth-cro | `agents/growth-cro-agent.md` | MD prompt | `.claude/commands/vv-growth-cro.md` | config/ | CONFIGURED |
| vv-qa-security-devops | `agents/qa-security-devops-guard.md` | MD prompt | `.claude/commands/vv-qa-guard.md` | config/, scripts/ | CONFIGURED |
| vv-organic-content-engine | `agents/vv-organic-content-engine-agent.md` | MD prompt | Nao encontrado em commands | skills/, config/ | REFERENCED |
| vv-publishing-ops | `agents/vv-publishing-ops-agent.md` | MD prompt | Nao encontrado em commands | automations/, content/ | REFERENCED |
| vv-personal-brand-clone | `agents/vv-personal-brand-clone-agent.md` | MD prompt | Nao encontrado em commands | config/personal-image-clone-rules.md | REFERENCED |
| vv-qa-card-creative | `agents/vv-qa-card-creative-agent.md` | MD prompt | Nao encontrado em commands | config/qa-card-style-rules.md | REFERENCED |
| premium-label-architect | `vital-vision-system/supliful-label-ops/agents/premium-label-architect.md` | MD prompt | CLAUDE.md + `/vv-premium-label-architect` skill | supliful-label-ops/ | CONFIGURED |
| luxury-packaging-director | `vital-vision-system/supliful-label-ops/agents/luxury-packaging-director.md` | MD prompt | CLAUDE.md + skill | supliful-label-ops/ | CONFIGURED |
| label-design-system-manager | `vital-vision-system/supliful-label-ops/agents/label-design-system-manager.md` | MD prompt | CLAUDE.md + skill | supliful-label-ops/ | CONFIGURED |
| label-consistency-reviewer | `vital-vision-system/supliful-label-ops/agents/label-consistency-reviewer.md` | MD prompt | CLAUDE.md + skill | supliful-label-ops/ | CONFIGURED |
| supliful-dashboard-design-operator | `vital-vision-system/supliful-label-ops/agents/supliful-dashboard-design-operator.md` | MD prompt | CLAUDE.md + skill | supliful-label-ops/ | CONFIGURED |
| premium-label-qa-reviewer | `vital-vision-system/supliful-label-ops/agents/premium-label-qa-reviewer.md` | MD prompt | CLAUDE.md + skill | supliful-label-ops/ | CONFIGURED |
| brand-label-guardian | `vital-vision-system/supliful-label-ops/agents/brand-label-guardian.md` | MD prompt | Nao chamado diretamente | supliful-label-ops/ | PROMPT_ONLY |
| label-design-critic | `vital-vision-system/supliful-label-ops/agents/label-design-critic.md` | MD prompt | Nao chamado diretamente | supliful-label-ops/ | PROMPT_ONLY |
| label-architect (v1) | `vital-vision-system/supliful-label-ops/agents/label-architect.md` | MD prompt | Nao chamado (substituido por premium-label-architect) | supliful-label-ops/ | ORPHANED |
| qa-label-reviewer | `vital-vision-system/supliful-label-ops/agents/qa-label-reviewer.md` | MD prompt | Nao chamado (substituido por premium-label-qa-reviewer) | supliful-label-ops/ | ORPHANED |
| supliful-api-operator | `vital-vision-system/supliful-label-ops/agents/supliful-api-operator.md` | MD prompt | Nao chamado | api/ | PROMPT_ONLY |
| supliful-label-project-manager | `vital-vision-system/supliful-label-ops/agents/supliful-label-project-manager.md` | MD prompt | Nao chamado | supliful-label-ops/ | PROMPT_ONLY |
| shopify-sync-reviewer | `vital-vision-system/supliful-label-ops/agents/shopify-sync-reviewer.md` | MD prompt | Nao chamado | supliful-label-ops/ | PROMPT_ONLY |
| supplement-compliance-reviewer | `vital-vision-system/supliful-label-ops/agents/supplement-compliance-reviewer.md` | MD prompt | Nao chamado | supliful-label-ops/ | PROMPT_ONLY |

**Skills operacionais (`.claude/skills/`):**

| Skill | Caminho | Estado |
|-------|---------|--------|
| vv-copy-engine | `.claude/skills/vv-copy-engine/SKILL.md` | CONFIGURED |
| vv-premium-label-architect | `.claude/skills/vv-premium-label-architect/SKILL.md` | CONFIGURED (untracked) |

**Skills em formato antigo (raiz `skills/`):**

| Skill | Caminho | Estado |
|-------|---------|--------|
| vv-organic-content-skill | `skills/vv-organic-content-skill.md` | LEGACY |
| vv-compliance-guardian | `skills/vv-compliance-guardian.md` | LEGACY |
| vv-quiz-funnel | `skills/vv-quiz-funnel.md` | LEGACY |
| vv-canva-brief-builder | `skills/vv-canva-brief-builder.md` | LEGACY |
| vv-meta-publisher-checklist | `skills/vv-meta-publisher-checklist.md` | LEGACY |
| vv-nano-banana-prompts | `skills/vv-nano-banana-prompts.md` | LEGACY |
| content-multiplier/ | `skills/content-multiplier/` | LEGACY |
| hook-multiplier/ | `skills/hook-multiplier/` | LEGACY |
| customer-language-research/ | `skills/customer-language-research/` | LEGACY |

---

## 7. PASTAS ATIVAS

| Pasta | Classificacao | Justificativa |
|-------|--------------|---------------|
| `.claude/` (raiz) | ACTIVE_CORE | Lida pelo Claude Code; contém commands funcionais e skills no formato oficial |
| `scripts/` | ACTIVE_CORE | `package.json` aponta para todos os scripts; arquivos nao rastreados indicam desenvolvimento ativo |
| `vital-vision-system/supliful-label-ops/` | ACTIVE_CORE | Módulo mais recente (jul/2026), referenciado pelo CLAUDE.md principal, com skill ativa |
| `vital-vision-system/brand/` | ACTIVE_MODULE | CLAUDE.md define este como a fonte de verdade de marca |
| `vital-vision-system/products/` | ACTIVE_MODULE | Arquivos de produto usados pelo CLAUDE.md |
| `vital-vision-system/reverse-engineering/` | ACTIVE_MODULE | Jun/2026, vinculado ao workflow do Google Sheets/n8n |
| `vital-vision-system/research/` | ACTIVE_MODULE | Suporte ao fluxo de competitor research |
| `agents/` (raiz) | ACTIVE_MODULE | Chamados pelos 3 commands em `.claude/commands/` |
| `drafts/` | ACTIVE_MODULE | Desenvolvimento ativo de shopify-pages (versoes v1-v13 de inner-bloom) |
| `config/` | ACTIVE_MODULE | Referenciado por agents e scripts ativos — candidato a migração |
| `assets/generated/` | GENERATED_OUTPUT | Runtime output de geracao de imagens |
| `assets/prompts/` | GENERATED_OUTPUT | JSONs de prompt gerados em runtime |
| `backups/` | GENERATED_OUTPUT | Snapshots de VQB/Shopify pre-escrita |

---

## 8. PASTAS HISTÓRICAS

| Pasta | Classificacao | Justificativa |
|-------|--------------|---------------|
| `content/` | HISTORICAL_REPORTS | Conteúdo aprovado/publicado de inner-bloom phase4a (maio/2026); estado de snapshot |
| `content-calendar/` | HISTORICAL_REPORTS | Um único arquivo de abril/2026 |
| `reports/` | HISTORICAL_REPORTS | Relatórios de VQB, Google, Shopify-pages, PageFly (maio/2026) |
| `skills/` (raiz) | LEGACY | Skills em formato antigo nao invocável pelo Claude Code; precede `.claude/skills/` |
| `vital-vision-system/.claude/` | LEGACY | Scaffold criado como placeholder em jun/2026; todos os subdiretórios estao vazios; nunca lido pelo Claude Code nessa posição |
| `vital-vision-system/automations/` | LEGACY | 5 subpastas todas vazias; `automations/` raiz tem conteúdo real |
| `vital-vision-system/compliance/` | LEGACY | 5 arquivos todos com 0 bytes |
| `vital-vision-system/logs/` | LEGACY | 4 arquivos todos com 0 bytes |
| `vital-vision-system/analytics/` | LEGACY | 5 arquivos todos com 0 bytes |
| `vital-vision-system/security/` | LEGACY | 4 de 5 arquivos com 0 bytes |
| `vital-vision-system/integrations/` | LEGACY | 6 subpastas todas vazias |
| `vital-vision-system/publishing/` | LEGACY | Estrutura criada; maioria vazia; conteúdo real está em `content/` raiz |
| `vital-vision-system/approved-assets/` | LEGACY | Estrutura criada; maioria vazia; assets reais em `assets/` raiz |
| `references/` | LEGACY | Diretório vazio |
| `exports/` | ARCHIVE_CANDIDATE | Contém apenas `n8n/` exports de junho/2026 |

---

## 9. PASTAS CANDIDATAS A ARQUIVO

| Pasta | Classificacao | Razao |
|-------|--------------|-------|
| `vital-vision-system/.claude/` | ARCHIVE_CANDIDATE | Vazio, nunca lido pelo Claude Code em posicao de subpasta, confunde a arquitetura |
| `skills/` (raiz) | ARCHIVE_CANDIDATE | Formato legado substituído por `.claude/skills/`; 8 arquivos sem invocador ativo |
| `vital-vision-system/compliance/` | ARCHIVE_CANDIDATE | 5 arquivos com 0 bytes; equivalente real está em `vital-vision-system/brand/` |
| `vital-vision-system/analytics/` | ARCHIVE_CANDIDATE | 5 arquivos com 0 bytes; sem uso |
| `vital-vision-system/integrations/` | ARCHIVE_CANDIDATE | 6 subpastas com 0 arquivos; sem uso |
| `references/` | ARCHIVE_CANDIDATE | Diretório completamente vazio |
| `content-calendar/` | ARCHIVE_CANDIDATE | 1 arquivo de abr/2026 sem referências ativas |
| `agents/vv-personal-brand-clone-agent.md` | ARCHIVE_CANDIDATE | Sem command associado; feature de clone de imagem pessoal parece desativada |

---

## 10. RISCOS DE SEGURANÇA

### `.env` e `.env.backup` na raiz

| Item | Status |
|------|--------|
| `.env` (raiz) | NAO rastreado pelo Git (protegido por `.gitignore`) |
| `.env.backup` (raiz) | NAO rastreado pelo Git (coberto por `.env.*` no .gitignore) |
| `vital-vision-system/.env.example` | Rastreado pelo Git — correto para um `.example`, mas exige verificação de que nao contém valores reais |
| `vital-vision-system/.gitignore` | Rastreado — correto |

### Padrões de credencial em arquivos rastreados

O `git grep` identificou 19 arquivos rastreados que contêm os padrões `SHOPIFY`, `API_KEY`, `SECRET`, `TOKEN` ou `PASSWORD`. Todos sao arquivos de documentação (`.md`, `.json`, `.js`) que referenciam nomes de variáveis de ambiente, nao valores reais. Risco aparente: BAIXO.

| Risco | Severidade | Detalhe |
|-------|-----------|---------|
| `.env` nunca commitado no branch atual | Seguro | Nao aparece em nenhum commit atual |
| `.env` apareceu em commit histórico | VERIFICAR | `git log --all -- .env` retornou commits históricos (`0dea91d`, `7b35f13`, `15a2058`, `70f3cda`, `7ec5d00`). O commit `0dea91d` tem mensagem "secure environment files" — indica que arquivos de .env foram removidos do tracking nesse commit, mas podem estar no histórico de Git anterior. |
| `.env.backup` em histórico | VERIFICAR | Mesmo risco acima — se existiu em commits anteriores a `0dea91d`, os valores ainda estao acessíveis via `git show` |
| `vital-vision-system/.env.example` com valores reais | REVISAR | Modificado e nao commitado — deve ser revisado para garantir que nao contém tokens reais antes do próximo commit |

**Acao prioritária de segurança:** verificar se o histórico do Git anterior ao commit `0dea91d` contém valores reais de `.env`. Se sim, o histórico precisa ser limpo com `git filter-repo` ou equivalente.

---

## 11. ESTRUTURA RECOMENDADA COMO DESTINO FUTURO

> Nenhuma acao tomada nesta fase. Estrutura apenas planejada.

```
vital-vision-automation/
├── .claude/                     <- MANTER: commands/ + skills/ (formato oficial)
├── vital-vision-system/         <- CONSOLIDAR AQUI toda a base de conhecimento
│   ├── brand/                   <- fonte de verdade de marca (expandir)
│   ├── products/                <- fonte de verdade de produtos
│   ├── compliance/              <- popular com conteúdo real (mover de config/)
│   ├── research/                <- competitor research, customer voice
│   ├── content-pillars/         <- estratégia evergreen
│   ├── templates/               <- templates de conteúdo
│   ├── approved-assets/         <- assets finais (migrar de assets/)
│   ├── publishing/              <- conteúdo aprovado (migrar de content/)
│   ├── automations/             <- workflows n8n (popular)
│   ├── integrations/            <- notas de conexao (popular)
│   ├── analytics/               <- métricas (popular)
│   ├── logs/                    <- rastreamento de acoes Claude
│   ├── security/                <- regras de API e permissoes
│   ├── reverse-engineering/     <- MANTER
│   └── supliful-label-ops/      <- MANTER (mais completo)
├── agents/                      <- MANTER (chamados pelos commands)
├── scripts/                     <- MANTER (operacional)
├── assets/generated/            <- MANTER (runtime output, ignorado no git)
├── assets/prompts/              <- MANTER (runtime output, ignorado no git)
├── drafts/                      <- MANTER (work in progress de Shopify pages)
├── backups/                     <- MANTER (snapshots de API, ignorado no git)
├── exports/                     <- MANTER (outputs n8n)
├── reports/                     <- MANTER como histórico
├── config/                      <- MIGRAR gradualmente para vital-vision-system/
│                                   e aposentar após migração completa
├── content/                     <- MIGRAR para vital-vision-system/publishing/
├── automations/                 <- MIGRAR para vital-vision-system/automations/
└── skills/                      <- APOSENTAR após documentar o que tem valor
```

**O que eliminar como destino:**
- `vital-vision-system/.claude/` — remover (inutilizável nessa posicao)
- `skills/` raiz — aposentar após verificar se algum conteúdo precisa migrar para `.claude/skills/`
- Arquivos vazios (0 bytes) em `vital-vision-system/compliance/`, `analytics/`, `integrations/`, `logs/`

---

## 12. ORDEM SEGURA DE CONSOLIDAÇÃO

```
Fase 1 — Segurança (PRIORIDADE MÁXIMA)
  └── Auditar histórico Git para verificar se .env foi commitado antes de 0dea91d

Fase 2 — Remover confusao estrutural
  └── Remover vital-vision-system/.claude/ (vazio, nunca lido)
  └── Decidir destino de skills/ raiz (migrar conteúdo valioso -> .claude/skills/ ou arquivar)

Fase 3 — Consolidar configuração
  └── Comparar config/brand-voice.md <-> vital-vision-system/brand/brand-voice.md
  └── Comparar config/compliance-rules.md <-> vital-vision-system/brand/compliance-rules.md
  └── Mover config VQB (exclusivo) para vital-vision-system/integrations/ ou scripts/vqb/
  └── Aposentar config/ após migração

Fase 4 — Consolidar conteúdo ativo
  └── Mover content/ -> vital-vision-system/publishing/ (conteúdo aprovado/publicado)
  └── Popular vital-vision-system/compliance/ com conteúdo real
  └── Mover automations/ raiz -> vital-vision-system/automations/

Fase 5 — Rastrear novos arquivos
  └── Commitar vital-vision-system/supliful-label-ops/ (inteiro — está untracked)
  └── Commitar .claude/skills/vv-premium-label-architect/
  └── Commitar scripts novos (generate-organic-content-queue.js, etc.)

Fase 6 — Documentar
  └── Atualizar MEMORY.md com arquitetura consolidada
  └── Criar ARCHITECTURE.md na raiz explicando o layout final
```

---

## 13. TRÊS PRÓXIMAS AÇÕES

**Ação 1 — Auditoria de segurança do histórico Git (URGENTE)**

```bash
git log --all --oneline -- .env .env.backup
git show <commit-hash>:.env
```

Se sim: executar limpeza de histórico antes de qualquer push futuro.

**Ação 2 — Commitar o que está pronto e nao rastreado**

Antes de qualquer reorganizacao, commitar os arquivos untracked válidos:
- `vital-vision-system/supliful-label-ops/` (módulo inteiro)
- `.claude/skills/vv-premium-label-architect/`
- `scripts/` novos (queue, format, update-organic)
- Modificacoes em `vital-vision-system/CLAUDE.md`, `README.md`, `.env.example`, `.gitignore`

**Ação 3 — Resolver a divergência brand-voice / compliance-rules**

Os dois arquivos existem em `config/` e `vital-vision-system/brand/`. Comparar conteúdo, escolher a versao canônica, e atualizar as referências nos agents que ainda apontam para `config/`.

---

**FASE 0 CONCLUÍDA — NENHUM ARQUIVO FOI ALTERADO.**
