---
title: "The Reference-Code Pattern: How AI Reads a 15-Year Legacy"
seriesId: ai-generated-platform
episode: 2
draft: true
summary: "Common/ and Database/ exist only as legacy-understanding context. They never compile. Here's why."
---

> *Draft — open this in Obsidian and write.*

## The problem

You can't migrate a 15-year-old codebase by reading it cold. You also can't drop it into the AI's context — too big, too noisy.

## The pattern

`Common/` and `Database/` are the *answer keys*. They:

- Live in the repo
- Are never compiled
- Are referenced by the AI when generating new code that must match legacy behavior

## Concrete examples

- `Common/FMP360/...` — the legacy DTOs the new system must accept
- `Database/StoredProcs/...` — the legacy query shapes that drive parity tests

## Why this works

...

## When it fails

...
