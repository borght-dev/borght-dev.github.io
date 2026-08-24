---
title: "About — Koen van der Borght"
description: "Koen van der Borght: senior software engineer and tech lead. Building software professionally since 2016. Legacy .NET modernization, architecture, DevOps, and AI-assisted engineering."
layout: about
fullName: "Koen van der Borght"
photo: /profile.jpg
intro: "Senior software engineer and tech lead, building software professionally since 2016. I started as an intern at [Gomocha](https://www.gomocha.com), grew into senior and then tech lead, and today I lead its development team. Alongside that I take on focused engagements for other teams: critical project delivery, legacy .NET modernization and practical AI-assisted engineering. I write about the work here."
signoff: "let's make your next project easier to build."
experience:
  - period: "2022-now"
    role: "Tech Lead"
    org: "Gomocha"
    summary: "Leading the dev team. Drove the .NET Framework 4.8 → .NET 8 modernization, then kicked off **FSP Horizon**: a ground-up rebuild on .NET Aspire + React, plan-driven and AI-augmented end-to-end."
  - period: "2019-2022"
    role: "Senior Developer"
    org: "Gomocha"
    summary: "Always pushing the platform forward: refreshing UI/UX, tightening the backend, and modernizing the DevOps stack along the way."
  - period: "2017-2019"
    role: "Developer"
    org: "Gomocha"
    summary: "Full-stack on the field-service platform, including DevOps and infra. Promoted from intern to full-time."
  - period: "2016-2017"
    role: "Intern"
    org: "Gomocha"
    summary: "Where it all started."
highlights:
  - period: "2026"
    title: "Ortec optimization integration"
    summary: "Designed and shipped a phased integration with Ortec's optimization engine: messaging + worker scaffolding, periodic syncs, webhook intake with idempotency, batch + single-route + timeslot flows, planboard augmentation, and an admin sync dashboard."
  - period: "2026"
    title: "Workspace Designer rebuild"
    summary: "Replaced the legacy react-dnd workspace editor with a feature-flagged rewrite: Layout, Position, Visible/Editable rules, Bulk update, Reset, optimistic-concurrency Save, plus a Playwright suite. Retired the legacy pages, stores, and components at cutover."
  - period: "2026"
    title: "Cross-app real-time discussions"
    summary: "Wired Horizon, the legacy main portal, and the customer portal onto a shared RabbitMQ broker via SignalR fanout. Tenant-scoped hub, an embedded MassTransit consumer alongside Wolverine, and an Undo/revert UX for accidental customer-visible sends."
  - period: "2026"
    title: "Autonomous nightly fixer loops"
    summary: "Two slash commands run on launchd timers each morning. One triages and fixes failing E2E tests against staging, the other fixes Code Scanning + Dependabot alerts on a daily budget. Both ship one dated PR per run, never dismiss findings, never suppress with comments. A separate monitoring loop watches each PR after it's opened (failing CI, review comments, merge conflicts) and self-heals until it goes green or escalates."
  - period: "2026"
    title: "Skipped-test triage pipeline"
    summary: "Built a classifier that buckets every skipped E2E test by reason, plus a daily loop that converts data-missing skips into seeded specs in batches of eight. Added a nightly gate to keep the count from drifting back up."
  - period: "2026"
    title: "Multi-pod readiness and zero-downtime deploys"
    summary: "Made the platform horizontally scalable on Kubernetes: SignalR Redis backplane, distributed cache, HPA + PDBs, startup-probe tuning, and a deploy workflow that no longer drops connections. Verified via k6 load tests in CI."
  - period: "2026"
    title: "Quote management: workspace and pricing"
    summary: "Shipped the Quote Workspace end to end: wizard, deferred-edit persistence, revision/history lifecycle, the full pricebook hierarchy with CSV export and template management, and synchronous UQTC PDF render on Send."
  - period: "2026"
    title: "Re-implemented Planboard on Bryntum Scheduler"
    summary: "Replaced the legacy planboard with a Bryntum-based scheduler: drag-drop on engineer and equipment resources, a batch MoveOrders endpoint, and JSON-based user preferences for panel persistence."
  - period: "2026"
    title: "Ship-it pipeline from day one"
    summary: "Wired the delivery loop before the team scaled up. Every PR deploys to staging, runs unit + integration + E2E, enforces a no-coverage-decrease gate, runs AI code review, and auto-deploys to the Kubernetes test cluster on merge. Observability as a first-class citizen: OpenTelemetry traces and structured logging from day one. Shared PowerShell profile so every dev gets the same local setup."
  - period: "2026"
    title: "FSP Horizon platform foundation"
    summary: "Set up the technical foundation for re-implementing Gomocha's field service platform (a codebase with decades of history) before teammates joined for feature-parity work. .NET Aspire orchestrating CQRS Vertical Slice services on .NET 10, Dockerized end to end. Frontend on React + Tailwind v4 + AG Grid + TanStack Query, with bun + oxlint. Architecture, internal technical, and customer-facing documentation, kept up to date with AI."
  - period: "2025"
    title: "Coverage-based, AI-unattended unit-test generation"
    summary: "Designed a self-paced test generator with a queue and a durable state cursor that produces tests overnight against a coverage gap list, verifies, and advances on its own."
  - period: "2025"
    title: "Ranorex → Playwright UI test migration"
    summary: "Replaced the legacy Ranorex suite with Playwright, plus a CI-resilient playbook: removed nested retries, fixed flaky dropdowns, brought failure diagnostics inline."
  - period: "2025"
    title: "Admin tooling on AvaloniaUI + license portal"
    summary: "Converted the legacy admin tools to AvaloniaUI for cross-platform .NET desktop with comprehensive test coverage, and shipped a separate portal for organisation creation, environment management, and license reporting."
stack:
  - { name: ".NET 10",     level: "core"  }
  - { name: "C#",          level: "core"  }
  - { name: "Azure",       level: "core"  }
  - { name: "SQL Server",  level: "core"  }
  - { name: "TypeScript",  level: "core"  }
  - { name: ".NET Aspire", level: "core"  }
  - { name: "React",       level: "often" }
  - { name: "Playwright",  level: "often" }
  - { name: "SignalR",     level: "often" }
  - { name: "Tauri",       level: "side"  }
  - { name: "Claude Code", level: "daily" }
currently:
  - { label: "shipping", title: "BorgDock",                          summary: "A dev tool to stay focused while running parallel Claude Code agents." }
  - { label: "writing",  title: "Notes from the work",               summary: ".NET modernization, DevOps and AI-assisted engineering, as I go." }
  - { label: "leading",  title: "FSP Horizon · Gomocha",             summary: "Next-gen field service platform on .NET Aspire + React. Multi-tenant from commit one." }
  - { label: "tinkering", title: "Mechanical keyboards",             summary: "Daily drivers: Ergodox with Gateron Browns and a Keychron Q1 with Zealios 67g." }
certifications:
  - { name: "Professional Scrum Master II", date: "2024-09-02", short: "PSM II" }
  - { name: "Professional Scrum Master I",  date: "2024-02-12", short: "PSM I" }
offTheClockBlocks:
  - "Movie nights with my wife Selina (Marvel & Harry Potter rotation)."
  - "Proud dad of our daughter Niya."
  - "Mechanical keyboard fan: Ergodox with Gateron Browns and a Keychron Q1 with Zealios 67g."
---
