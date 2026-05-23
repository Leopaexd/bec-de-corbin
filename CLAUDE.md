# CLAUDE.md — Björkeborgs Cirkel

Campaign hub for a *Mythic Bastionland* tabletop game (Swedish-language; realm
Yxkullen, holding Björkeborg, ruled by the Leaf Knight). Character sheets +
campaign pages for the play group, shared over Discord.

## Repo layout
- `web/` — the **only** thing Vercel deploys (Root Directory = `web`).
  - `web/index.html` — the whole frontend: a single self-contained file
    (inline CSS + JS, no build step). Data-driven: a `CHARACTERS` object renders
    each knight's sheet (`?c=bec` etc.), plus a landing page and campaign pages.
  - `web/api/state.js` — `GET/POST /api/state?c=<key>`: read/write `state/<key>.json` in Blob.
  - `web/api/media.js` — `GET/POST /api/media?scope=<scope>`: list/upload images.
- `.claude/skills/mythic-bastionland/` — the Mythic Bastionland rulebook skill.
  **Contains copyrighted book text. NEVER deploy it or paste its contents into
  public/user-facing output.** Excluded from deploy via `.vercelignore` and by
  Root Directory = `web`. Auto-discovered by Claude Code in this repo.
- `CLAUDE.md`, `README.md` — not deployed.

## Deploy & storage
- Vercel project `bec-de-corbin`, git-connected: **push to `main` → auto-deploy.**
  Live at https://bec-de-corbin.vercel.app
- Storage: Vercel Blob store `becmedia`. Character/campaign state is JSON at
  `state/<key>.json`; uploaded portraits/maps under `media/<scope>/`.
- Writes are gated by env `CAMPAIGN_SECRET` (the shared campaign password);
  reads are public. `BLOB_READ_WRITE_TOKEN` is injected by the connected store.

## Frontend conventions
- Keep `web/index.html` a single self-contained file — no bundler, no framework.
- Editable fields carry class `pf` with a unique `id`; they autosave (~1s debounce)
  to both localStorage (cache) and the server, and fall back to offline-local mode
  if the API is unreachable. Never let a failed fetch break a sheet.
- Match the existing parchment styling and CSS variables.
- Campaign objects live in a shared index at state key `campaign-index`
  (`[{id, name}]`); Björkeborg is id `kampanj` (media scope `campaign`), new
  places use ids like `camp-<slug>-<rand>` (media scope = the id).

## Working rules
- Commits are authored as **Leopaexd** (`oliver.glant@gmail.com`) so Vercel
  accepts them; `gh`/push runs as the DT-Oliver collaborator. Don't change this.
- Never commit secrets or `.env*` files.
- Don't move or deploy anything under `.claude/`.
