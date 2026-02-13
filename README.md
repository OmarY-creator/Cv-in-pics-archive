# Cv-in-pics Archive

Archive repository for historical portfolio iterations from `Cv-in-pics`.

## Structure

- `iterations/01` - Snapshot of `Omar-Yussuf_01`
- `iterations/02` - Snapshot of `Omar-Yussuf_02`
- `iterations/03` - Snapshot of `Omar-Yussuf_03`
- `iterations/04` - Snapshot of `Omar-Yussuf_04`
- `logs/` - Per-iteration notes and import manifests

## Import Policy

To keep this archive pushable and reviewable:

- Includes source snapshots and assets relevant to each iteration.
- Excludes generated or environment-specific directories:
  - `.git/`, `node_modules/`, `.venv/`, `dist/`, `build/`, `coverage/`, `.firebase/`
- Excludes secrets and local machine artifacts:
  - `.env*`, `*firebase-adminsdk*.json`, `firebase-debug.log`, `firestore-debug.log`, `nul`
- Excludes files larger than 95 MB (GitHub hard limit is 100 MB).

See `logs/import-policy.md` and per-iteration logs for exact exclusions.

