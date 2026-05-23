# Björkeborgs Cirkel

Karaktärsark och kampanjnav för en *Mythic Bastionland*-kampanj
(riket Yxkullen, borgen Björkeborg).

## Struktur
- `web/` — den driftsatta appen (datadriven sheet-mall, redigerbara fält,
  tärningsrullning). **Detta är allt Vercel ska deploya** (Root Directory = `web`).
- `skill/` — Claude-skillen för Mythic Bastionland. Innehåller copyrightskyddad
  boktext och får **ALDRIG** driftsättas publikt. Utesluten via `.vercelignore`
  och genom att Vercels Root Directory pekar på `web/`. Privat repo av just
  detta skäl.

## Deploy
Kopplat till Vercel — auto-deploy vid push till `main`, Root Directory = `web`.
Delad lagring (spara/uppdatera rollpersoner, uppladdning av porträtt/kartor)
via Vercel Blob är nästa steg.
