---
name: mythic-bastionland
description: >-
  The complete rulebook for Mythic Bastionland (Chris McDowall, 2025) — a
  rules-light arthurian-mythic TTRPG of wandering Knights, Myths, Realms, and
  the City Quest. Use this skill whenever the user asks about Mythic Bastionland
  rules, wants to run or play a session, needs a Knight or Myth (there are 72 of
  each, rolled on d6+d12), asks how a mechanic works (Virtues, Guard, Attacks,
  Gambits, Warbands, Glory, Seasons, Hexes), wants Spark Table prompts, or is
  prepping/refereeing a game. Trigger even when the user names a specific Knight
  or Myth ("the Wurm", "the Barbed Knight") or a term ("Scars", "Feats",
  "Trauma", "Oddpocrypha") without naming the game. The full text lives in the
  reference files; consult them rather than relying on memory.
---

# Mythic Bastionland

This skill is the **rulebook itself**, split into navigable chapter files under
`references/`. The book is a deliberately terse, table-driven system — answers
are short and concrete, so prefer quoting the exact text over paraphrasing.

## How to use this skill

1. Find the relevant chapter in the table of contents below.
2. **Read only the reference file you need** — they range from small (4 KB) to
   large (the Knights and Myths catalogs are ~95–137 KB). The catalog files
   carry their own index up top mapping every entry to a page, so you can jump
   straight to one entry instead of loading the whole file.
3. Each entry preserves a `<!-- page N -->` marker matching the print/PDF page,
   so you can cite page numbers the way the book does (e.g. "Guard, p8").

When asked to *generate* a Knight or Myth, roll **d6 then d12** (read the d6
first) and pull that exact entry — don't invent one, the book has 72 of each.

## Table of contents

| Chapter | Pages | Reference file | What's in it |
|---|---|---|---|
| Getting Started | 6–7 | `references/getting-started.md` | Roles, Start & Scope, Glory, ranks |
| Rules | 8–11 | `references/rules.md` | Virtues (VIG/CLA/SPI), Guard, Attacks, Gambits, Combat, Warbands, Scars, death |
| Equipment | 12–13 | `references/equipment.md` | Weapons, armour, gear, trade goods |
| Running the Game | 14–21 | `references/running-the-game.md` | Referee guidance, Primacy of Action, Realms, Hexes, Seasons, the City Quest |
| Spark Tables | 22–25 | `references/spark-tables.md` | Random-prompt tables for improvising |
| **Knights** | 26–171 | `references/knights.md` | All **72 Knights** (d6 group × d12), with index → page |
| **Myths** | 26–173 | `references/myths.md` | All **72 Myths** with Omens & Cast (d6 group × d12), with index → page |
| Oddpocrypha | 174–212 | `references/oddpocrypha.md` | Designer commentary, optional rules, extra content |

> Note: in the print book, **Knights & Myths is a single chapter (p26–173)** with
> Knights on even pages and Myths on odd. It's split here into two files — and
> de-interleaved into reading order — because it's by far the largest section and
> the two catalogs are used independently at the table.

## Quick mechanical reference

These come up constantly; the authoritative text is in `references/rules.md`.

- **Virtues:** Vigour (VIG), Clarity (CLA), Spirit (SPI). Rolled, depleted by harm.
- **Guard (GD):** absorbs damage before Virtue loss; a Scar may result when GD hits 0.
- **Attacks:** roll the weapon die, subtract the target's Armour, reduce GD then VIG.
- **Gambit:** spend the gap on the die to trigger a special effect instead of max damage.
- **Glory & rank:** Knights gain Glory by resolving Myths; rank gates Court standing.
- **The City Quest:** the unreachable endgame every Knight ultimately seeks.

If a question goes beyond these, open the matching reference file and quote it.
