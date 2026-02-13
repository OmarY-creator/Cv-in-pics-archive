# Import Policy

Date: 2026-02-13

This archive stores iteration snapshots in a stable, portable format.

## Exclusions

Directories excluded recursively:

- `.git`
- `node_modules`
- `.venv`
- `dist`
- `build`
- `coverage`
- `.firebase`

File patterns excluded:

- `.env`
- `.env.*`
- `*firebase-adminsdk*.json`
- `firebase-debug.log`
- `firestore-debug.log`
- `nul`

Large file rule:

- Files larger than 95 MB are excluded and listed in each iteration manifest.

