---
title: "Claude Code on my phone, without the wrapper"
date: 2026-05-04
seriesId: my-setup
episode: 1
draft: false
tags: [claude-code, mobile, tailscale, tmux, termius]
summary: How I run native Claude Code from my phone via Tailscale, Termius, and tmux into my Mac Mini. The Happy app was the wrapper that pushed me to roll my own.
---

For a few months I'd been running Claude Code from my phone via [Happy](https://happy.engineering/), a mobile client that wraps CC over an MCP relay. It mostly worked, until it didn't.

Sometimes Happy's remote server was down and the app just stopped responding. Worse, whenever Claude hit `AskUserQuestion` mid-session, the question never reached the phone and Claude would silently assume the default answer. Switching to plan mode wasn't easy. I had to remember to start Happy *before* starting Claude, every time. And updating Claude Code itself was a hacky `cd` into Happy's `node_modules` and an `npm update` in there, otherwise I was stuck on whatever version the Happy developers had last bundled.

The fix turned out to be embarrassingly simple. Skip the wrapper. SSH into the Mac Mini from the phone, run real Claude Code in a tmux session, attach and detach as I like. One evening to wire it up.

## The four pieces

The setup is four tools doing one thing each.

**Tailscale** so my phone is on the same network as the Mac Mini wherever I am. No port forwarding, no public SSH endpoint, no DDNS dance. Install it on both ends, sign in, done.

**Termius** as the SSH client on the phone. There are others, but the saved-host UX makes one-tap reconnect actually fast, and the on-screen toolbar with `Ctrl`, `Esc` and arrow keys is the difference between usable and not on iOS.

**tmux** so my session survives across phone reconnects, screen locks, and hopping between Wi-Fi and cellular. There's a single named session called `work` that I attach to from anywhere. My `~/.zshrc` auto-attaches when I log in:

```sh
if [[ $- == *i* ]] && [ -t 0 ] && [ -t 1 ] && command -v tmux >/dev/null 2>&1; then
  if [ -z "$TMUX" ] && [ -z "$BORGCODE" ]; then
    tmux attach -t work 2>/dev/null || tmux new -s work -n claude 2>/dev/null
  fi
fi
```

The `BORGCODE=1` check is so embedded terminals inside BorgCode don't try to nest a tmux into themselves. Inside the session, `M-n` opens a new window, `M-h`/`M-l` flip between them, `M-arrow` moves between panes. Vi mode for copy. That's the whole interface.

**Claude Code itself**, with a `cc` alias for `claude --dangerously-skip-permissions`. Real Claude Code, not a wrapper. `AskUserQuestion` works. Plan mode works. Updates are a normal `claude update` against the native installation.

No proxy, no MCP relay, no toggle between local and remote. The Mac Mini runs CC, the phone is a thin terminal into it.

## How I actually use it

Most work sessions start the same way. Prompt CC from the phone, hit go, lock the phone. Hours later or the next day, I sit at the desk and check the resulting PR. For things that don't need handholding, like improving unit test coverage or some infrastructure tweak, this is faster than typing the prompt at my workstation, because I don't even need to be at one.

I also use it for codebase questions. Asking Claude where something is handled from my phone beats walking back to the desk and opening the web interface. It's just a question, I just need an answer.

This blog post was written on my phone. So was the BorgDock website, and the majority of BorgDock itself.

A nice side effect, only sort of mobile-related: I can SSH into the Mac Mini from my laptop too, and it works as an additional layer of agents. Playwright runs are CPU-heavy. Pushing those to the Mini means my laptop stays quiet while it churns away.

## When the phone is the wrong tool

This setup is for *dispatching* Claude Code, not for coding. Reading code on a phone screen is fine, I don't mind it. But the second I need to manually edit something longer than a few lines, or check anything visual (a Playwright screenshot, a UI bug, a styling issue), I'm at the desk.

The bigger limit is verification. Claude has a tendency to make tests pass for the sake of making tests pass, and I don't trust the AI to validate that something actually works end-to-end. That part stays at the desk, with the dev tools open and me clicking through the flow.

A sceptic's first instinct here: phones-as-dev-environments are gimmicks. I get it. But on the phone I'm prompting Claude and letting it work, which is a different shape of activity than coding on a phone keyboard. The phone is always there. A laptop is a thing I have to remember to bring, set up, find Wi-Fi for. And the proof is the bit you're reading right now, drafted from the couch.
