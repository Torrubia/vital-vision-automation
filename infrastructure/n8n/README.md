# Vital Vision n8n Infrastructure

> **Recovery completed:** 2026-07-21
> Container `vital-vision-n8n` is running. All 3 workflows consolidated. Image pinned to `2.23.2`.
> **Next action required:** Re-authorize credentials in the UI before activating any workflow.
> See [Credential Re-Authorization](#credential-re-authorization-required-before-activating-any-workflow).

---

## Official Runtime

**Docker Compose is the only official n8n runtime for this project.**

Never start n8n with `npx n8n`. That runs a separate local instance with a
separate database (`~/.n8n/`), which causes workflows to appear and disappear
depending on which runtime was last used.

---

## Quick Reference

### Start n8n
```bash
docker compose -f infrastructure/n8n/docker-compose.yml up -d
```

### Stop n8n
```bash
docker compose -f infrastructure/n8n/docker-compose.yml down
```

> **Never use `down -v`** — this deletes the `n8n_data` volume and all workflow data permanently.

### View logs
```bash
docker compose -f infrastructure/n8n/docker-compose.yml logs -f
```

### Open the UI
```
http://localhost:5678
```

### Verify health
```bash
bash infrastructure/n8n/scripts/verify-n8n.sh
```

---

## Setup (first time on a new machine)

1. Copy `.env.example` to `.env` in this directory:
   ```bash
   cp infrastructure/n8n/.env.example infrastructure/n8n/.env
   ```

2. Edit `.env` and set your timezone.

3. The Docker volume `n8n_data` must already exist:
   ```bash
   docker volume ls | grep n8n_data
   ```
   If migrating to a new machine, restore from a SQL dump first (see Backups).

4. Start:
   ```bash
   docker compose -f infrastructure/n8n/docker-compose.yml up -d
   ```

---

## Encryption Key

The encryption key is stored inside the Docker volume at `/home/node/.n8n/config`.
n8n reads it automatically — you do not need to set it in `.env` unless you are
migrating to a new volume.

**Never change the encryption key once credentials have been saved.**
Changing it will make all saved credentials unreadable and they will need to be
re-entered.

The key is backed up (without being printed) in:
```
infrastructure/n8n/backups/docker/config-<timestamp>
```

---

## Backups

### Manual backup of the Docker volume (recommended before upgrades)
```bash
bash infrastructure/n8n/scripts/backup-docker-n8n.sh
```

### Manual backup of the legacy local database
```bash
bash infrastructure/n8n/scripts/backup-local-n8n.sh
```

Backups are written to `infrastructure/n8n/backups/` and are excluded from Git.

**Create a backup before every version upgrade.**

---

## Upgrading n8n

1. Take a backup:
   ```bash
   bash infrastructure/n8n/scripts/backup-docker-n8n.sh
   ```

2. Stop the container:
   ```bash
   docker compose -f infrastructure/n8n/docker-compose.yml down
   ```

3. Change the image version in `docker-compose.yml`:
   ```yaml
   image: docker.n8n.io/n8nio/n8n:X.Y.Z
   ```

4. Pull the new image:
   ```bash
   docker pull docker.n8n.io/n8nio/n8n:X.Y.Z
   ```

5. Start:
   ```bash
   docker compose -f infrastructure/n8n/docker-compose.yml up -d
   ```

6. Verify:
   ```bash
   bash infrastructure/n8n/scripts/verify-n8n.sh
   ```

**Never use the `latest` tag.** Pin to a specific version so upgrades are
deliberate and reversible.

---

## Data Volume

| Volume | Purpose | Rule |
|--------|---------|------|
| `n8n_data` | All n8n data: database, credentials, config | **Never delete** |

The volume is declared as `external: true` in `docker-compose.yml`.
Docker will not create or delete it automatically.

---

## Workflow Rules

- Keep all workflows **inactive** until credentials and integrations are verified.
- Always test a workflow manually before enabling the schedule trigger.
- Do not rename or delete workflows without first exporting a JSON backup.

---

## Infrastructure Limits (Current)

- This setup runs on a local Mac. n8n will not run when the Mac is asleep or off.
- Scheduled triggers depend on the Mac being on.
- A future migration to a VPS (e.g. DigitalOcean, Railway) is required for
  24/7 uptime and reliable scheduled automation.

---

## Canonical Workflows (as of recovery)

| # | Name | ID | Source | Status |
|---|------|----|--------|--------|
| 1 | VV Research MVP - Anthropic Direct | `RSS13rEHxU2WqW2O` | Docker volume (original) | Inactive |
| 2 | Vital Vision - Competitor Research Queue MVP | `JvEyTangcur0fA5Z` | Local `~/.n8n` (imported) | Inactive |
| 3 | My workflow | `bBC9lX4m0OQQS9G4` | Local `~/.n8n` (imported) | Inactive — rename before use |

> **Note on "My workflow":** This is an unnamed placeholder (single manual trigger node).
> Rename it to something descriptive before activating or building on it.

---

## Credential Re-Authorization (Required Before Activating Any Workflow)

Workflows imported from the local `~/.n8n` instance were encrypted with a **different key**
than the Docker instance. Node-level credential references will not resolve automatically.

Before activating any workflow, open it in the UI and re-connect each credential node:

| Workflow | Node | Credential Required |
|---|---|---|
| Vital Vision - Competitor Research Queue MVP | Append Results (Google Sheets) | Google Sheets OAuth2 |
| VV Research MVP - Anthropic Direct | (Anthropic nodes) | Anthropic API key |

**Steps:**
1. Open `http://localhost:5678`
2. Open each workflow
3. Click any node that uses a credential
4. Select the matching credential from the Docker credential store
5. Save the workflow
6. Test manually before enabling any schedule trigger

---

## Directory Structure

```
infrastructure/n8n/
├── docker-compose.yml        ← official Compose file
├── .env.example              ← template (commit this)
├── .env                      ← real secrets (never commit)
├── README.md                 ← this file
├── backups/
│   ├── local/                ← backups of ~/.n8n (gitignored)
│   └── docker/               ← backups of n8n_data volume (gitignored)
└── scripts/
    ├── backup-local-n8n.sh
    ├── backup-docker-n8n.sh
    └── verify-n8n.sh
```
