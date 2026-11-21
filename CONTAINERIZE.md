# CONTAINERIZE - Solo/masch-frontend

Archetype: vue-spa. Generated 2026-11-20T22:42:22+07:00 by .opencode/scripts/render.sh on branch chore/containerize (uncommitted).

## Generated files
- Dockerfile (template: Dockerfile.spa)
- Jenkinsfile (CI only; parameters REGISTRY, HARBOR_PROJECT, HARBOR_CRED_ID)
- .dockerignore
- .containerize/nginx-spa.conf.template

## Local run
```sh
bash .opencode/scripts/build.sh Solo/masch-frontend
bash .opencode/scripts/smoke.sh Solo/masch-frontend
```
Manual run: podman run --rm --network=host --env-file /home/richie/Documents/Programming/Projects/.smoke.env -e PORT=<free-port> containerize/masch-frontend:local

## Required env var NAMES (values never stored here)
unknown - inspect app config (do not print secret values)

## DB smoke
boot + healthcheck only (DB not smoke-tested). db_driver: unknown. Never migrate/seed/modify; DBs are live.

## Flags
- vue-cli 4 present: Node pinned to 16 (engines/openssl incompatible with Node 24)
- agent label 'node' unverified on k3s Jenkins (only bun/buildah proven by BenchCheck) - confirm with user

Smoke results: 2026-11-21T02:15:38+07:00 boot=PASS http=200 db=not verified (no read-only CLI for vue-spa; health endpoint only)
Smoke results: 2026-11-21T15:05:53+07:00 boot=PASS http=200 db=skipped (legacy mysqli app; pgsql not supported without a code rewrite)
