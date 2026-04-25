---
title: "The Ortec Integration: 15 Plans, One Worker, Zero Manual Code"
seriesId: ai-generated-platform
episode: 5
draft: true
summary: "Shipping a third-party planning integration plan-by-plan — async-only design replacing legacy hybrid sync/timeout chaos."
---

> *Draft.*

## The legacy

Hybrid: 15s sync timeout → fall back to async. Worked, but UX was terrible.

## Plan 9: Async all the way

- RabbitMQ via Aspire's `AddRabbitMQ("messaging").WithManagementPlugin()`
- A worker scoped per shift
- SignalR for delivery to the portal

## The numbered plans

| Plan | What | Status |
|------|------|--------|
| 1 | Messaging + worker scaffolding | shipped |
| 2 | ... | ... |
| 9 | Timeslot flow end-to-end | shipped |

## Generating each plan

Each plan = one spec file in `docs/superpowers/specs/`, then one `/implement` command.
