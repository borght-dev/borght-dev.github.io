---
title: "BorgDock: a tool for the way I actually work"
date: 2026-05-03
draft: true
seriesId: borgdock
episode: 1
summary: BorgDock is my answer to losing PRs in tabs and missing CI failures while heads-down on the next thing. Post 1 of the series, on the pain that justified building rather than tab-refreshing, why I keep building my own tools, and the form factor that surprised me.
---

It started when Gomocha kicked off a complete rewrite of the 30-year-old platform I've worked on for nine years. I set the repo up so every PR triggers a build, runs unit tests, runs integration tests, deploys to staging, and runs E2E tests against it. While that's running, Claude reviews the PR and leaves feedback. Once everything is green, the PR can be approved.

In the beginning I was going _fast_. Multiple PRs open at all times, and I had to constantly check their status. Especially because, in my experience, the world of E2E tests is a flaky one. I also hadn't set up my git hooks yet, so I had a lot of CI checks failing on me because of ESLint and TypeScript errors which for some reason are a lot stricter when running a build compared to just "running" during a local app run.

The thing is, I am not great at keeping track of things, or remembering them. I have to find ways to help myself so I do not forget, or better yet, cannot forget. That's where BorgDock (initially called PRDock) came in.

A sceptical colleague's first move is: just refresh GitHub, or trust the Slack notifications. The thing is, those notifications don't come from a specific tool meant to notify me about PRs. Slack and Teams notifications get easily overlooked. And refreshing GitHub manually is exactly the thing I forget when I'm focused on other work, running multiple sessions, jumping between worktrees, half-aware of which PR I shipped a fix to ten minutes ago. The whole point of BorgDock (at least initially) is to draw my attention the moment a CI check goes green or red, instead of me remembering an hour later that I never went back to check.

## Why I keep building my own tools

I'm always looking for ways to improve my workflow, whether that's buying a mechanical keyboard to help me deal with wrist pain, or extending my PowerShell profile with another one- or two-letter abbreviation for things I do all the time. `nb fix user-page-not-loading` fetches the latest `origin/main` and creates a branch called `fix/user-page-not-loading`. The prefix is standardised so the rest of my tooling knows what to do with it. `fsp` runs the AppHost project with all environment variables set correctly so each worktree gets its own port range and can run in parallel with whatever else I have open. These kinds of things remove friction from my workflow and help me stay focused on what I'm trying to achieve.

Beyond scripts, I've always liked the idea of a dock. A long, long time ago I was a big fan of Stardock ObjectDock. I'm one of the few people who actually wants a widget bar in Windows, except Microsoft doesn't really let you add your own widgets to it. So I'd been carrying around the "I wish someone built X" thought for years.

I would probably have never started on BorgDock if it wasn't for AI. Building a Windows desktop app used to be a multi-month project. With Claude Code it's a couple of weekends. That's what changed. The "I wish someone built this" turned into "I'll build it tonight", and any gap in my knowledge I'd fill in by asking Claude or ChatGPT, then make my decision on how to implement something based on that.

## I built a sidebar, I use a tray

A docked sidebar made sense to me at the time. Always visible on the edge of the screen, a row per PR, CI status at a glance, one click to spawn Claude Code with a prompt to fix a failing test. That's what I built first.

Initially I thought, I'm a Windows user, what could feel better than native Windows technologies?! Well, I was wrong. WPF was painful, partly because I was using Claude Code exclusively to write the code, and Claude is a lot better at writing React than WPF, especially on the frontend. Every UI iteration looked great as a claude.ai mockup, but as soon as I'd write a prompt and have Claude Code implement it, the result would be more of a "meh" than the "wow" I'd had initially. After yet another awful outcome from a beautiful mockup, I decided to re-implement in Tauri. By then I had colleagues using PRDock, so I couldn't ship a broken half-rewrite. I kept the WPF build alive in parallel until Tauri hit feature parity.

Tauri shipped. The sidebar shipped. And then, after a few weeks of using my own tool, I quietly stopped opening it. The shape that turned out to fit my day was a tray icon with a flyout, summoned by `Ctrl+Win+Shift+F`. The sidebar still exists. I have a separate hotkey for it when I want a panel open, but I reach for the flyout much more often. The sidebar is where I go when I feel like I need more of an "overview", and the flyout is what I open when I want to do a quick check on the status of things. 

The cost? Around two months of evenings and weekends. A WPF version thrown away. A Tauri main-thread deadlock that took a week to find. None of it was free, and the thing I'd say to anyone thinking about doing the same is: only do it if you can keep it strictly in your own time. The risk is that the side project bleeds into your day job, and suddenly you're polishing your own dashboard instead of shipping the thing the company is paying you to ship. I have one hard rule: work first, then BorgDock.

I also genuinely don't know whether the tool scales past me. It's opinionated to my workflow. A few colleagues use it and seem fine, but I haven't watched anyone else use it long enough to know whether the ergonomics translate.

But I'm having fun building this thing out, and it's my first experience of developing my own product. I've learned a lot in the process — I even spent some time creating [the first BorgDock website](https://borgdock.koenvdborght.nl).

