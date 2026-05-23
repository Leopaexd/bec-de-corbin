# Björkeborgs Cirkel

Karaktärsark och kampanjnav för en *Mythic Bastionland*-kampanj
(riket Yxkullen, borgen Björkeborg). Live: https://bec-de-corbin.vercel.app

## Struktur
- `web/` — den driftsatta appen (datadriven sheet-mall, redigerbara fält,
  tärningsrullning, kampanjsidor). **Detta är allt Vercel deployar**
  (Root Directory = `web`). Innehåller `web/api/` (serverless: state + media).
- `.claude/skills/mythic-bastionland/` — Claude-skillen för Mythic Bastionland.
  Innehåller copyrightskyddad boktext och får **ALDRIG** driftsättas publikt.
  Utesluten via `.vercelignore` och av att Root Directory pekar på `web/`.
  Auto-upptäcks av Claude Code när man jobbar i repot. Privat repo av detta skäl.
- `CLAUDE.md` — projektinstruktioner för Claude Code.

## Deploy
Kopplat till Vercel (`bec-de-corbin`) — auto-deploy vid push till `main`,
Root Directory = `web`. Delad lagring via Vercel Blob (`becmedia`); skrivningar
kräver env `CAMPAIGN_SECRET`, läsning är öppen.
