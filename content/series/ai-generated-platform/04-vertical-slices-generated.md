---
title: "Vertical Slices Are the Best Architecture for AI Codegen"
seriesId: ai-generated-platform
episode: 4
draft: true
summary: "Why vertical-slice architecture maps onto AI codegen better than n-tier — generated code stays scoped, reviewable, and atomic."
---

> *Draft.*

## The hypothesis

Vertical slices = each feature is a self-contained folder. Endpoint, handler, validators, mappers, tests — all in one place.

## Why this fits AI codegen

- The AI gets a complete context window per slice
- A PR is one slice = one reviewable unit
- No cross-slice reasoning required for most changes

## Counter-pattern: n-tier

What goes wrong when you ask Claude to add a feature in n-tier...

## In FSP-Horizon

- `FSP.Core.Api/Features/Quotes/...`
- `FSP.Core.Api/Features/Devices/...`

Each slice = one folder = one PR.
