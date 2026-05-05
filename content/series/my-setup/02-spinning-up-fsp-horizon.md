---
title: "Spinning up FSP-Horizon, one keystroke"
date: 2026-05-05
seriesId: my-setup
episode: 2
draft: true
summary: How our team runs a multi-service .NET Aspire app across multiple worktrees without port collisions or per-project setup, via a shared PowerShell profile checked into the repo.
---

<!--
TODO: title alternatives, pick one before publishing
- "Spinning up FSP-Horizon, one keystroke"
- "fsp 2: how we boot a multi-worktree Aspire app"
- "The shared PowerShell profile that boots our dev stack"
-->

FSP-Horizon is a multi-service .NET Aspire app: a Core API, an Auth API, a Portal frontend, an Ortec worker, Seq, Storybook, and the Aspire dashboard itself. Running one instance is a `dotnet run` in the AppHost project. The trouble starts when multiple agents are working in different worktrees and I want to check all of them at once.

I like to work on several things in parallel, and I use worktrees to do it. Not the way most people use worktrees, though. I keep a `.worktrees` directory in the base repo with five sub-worktrees, named `worktree1` through `worktree5`. When I start something new I pick the base repo or one of the worktrees, run `nb` from my PowerShell profile to branch off latest main, then `cc` to start a Claude Code session (the alias adds `--dangerously-skip-permissions`), and prompt it with whatever needs doing. When CC is done I run `fsp X`, where `X` is the worktree number. In the base repo it's just `fsp`. By worktree three I'd lost track of which terminal was running which instance.

The fix turned out to be fairly simple. One PowerShell file, checked into the repo, sourced from every dev's `$PROFILE`. One command, `fsp N`, and worktree N comes up on its own port range with its own colour, secrets, and seed in place.

The colours pay off again when I'm verifying. I keep a Chrome tab group per running session, each one coloured to match its terminal background, with a name like `2 - Login` so I know what work the worktree is for. When I'm done verifying I don't delete the group, I press `alt + shift + w` to close it but keep the colour, name, and the right `localhost:port` for that worktree. Next time I want to come back to it, I click the group, rename it, and I'm straight back in.

## The shared profile

Initially I had a bunch of commands/aliases in my PowerShell profile when I started working on this project on my own. However, when more teammates started to join I noticed that they were running into the same issues I was running into and I shared snippets with them by just copy and pasting them into a Teams chat. However, then I fixed something but forgot to share it with them and then they complained about the exact issue I already fixed hours/days ago. That's when I isolated the Horizon specific logic from my profile and checked in the `FSP-Dev.ps1` script. 

`Tools/Scripts/FSP-Dev.ps1` lives in the FSP-Horizon repo. New dev clones the repo, adds one line to their `$PROFILE`:

```powershell
. "D:\FSP-Horizon\Tools\Scripts\FSP-Dev.ps1"
```

That's it. Open a new PowerShell window and the whole toolkit is loaded. Because it's in the repo, it's versioned. Someone fixes a port-allocation bug, everyone gets the fix on next pull. No drift, no "works on my machine for the dev env itself".

## The four pieces

**Worktree discovery.** On profile load, `Get-HorizonWorktrees` walks `.worktrees\worktreeN` and finds every numbered worktree. For each one it generates `wN` (cd into it) and `wNcc` (cd in and launch Claude Code). So `w2` jumps to worktree 2, `w2cc` jumps in and starts CC there. Add a worktree on disk, restart the shell, the aliases appear. No config to edit.

The generation itself is a PowerShell trick worth seeing once:

```powershell
foreach ($wt in Get-HorizonWorktrees) {
    $n = $wt.Number
    Set-Item -Path "function:global:w$n" `
        -Value ([scriptblock]::Create("Set-Location '$($wt.Path)'"))
}
```

A function per worktree, defined dynamically, scoped global so it survives outside the loop.

**`fsp N`.** Port offset is `N * 1000`. Worktree 2's Core API runs at base+2000, Auth API at base+2000, Portal at base+2000, and so on across all seven services. No two instances ever fight for the same socket.

`fsp` also self-heals on the way up. It mirrors the Core API's connection string into the Ortec worker's user-secrets, because the two projects have different `UserSecretsId` values but talk to the same DB. And it idempotently seeds a `LOCAL-TEST-{org}` department setting plus two webhook subscription rows via `sqlcmd`, so `POST /webhooks/ortec` resolves to a tenant on a fresh DB instead of 404-ing. Then `dotnet watch run`.

The port-offset block is the cleanest bit:

```powershell
$offset    = $InstanceNumber * 1000
$corePort  = $BasePorts.Core    + $offset
$authPort  = $BasePorts.Auth    + $offset
$portalPort= $BasePorts.Portal  + $offset
# ...same shape for Ortec, Seq, Storybook, Aspire dashboard
```

**Color-coded terminals.** Each instance tints its terminal background a different pastel via the OSC-11 escape, and resets on exit. The map: 0 grey, 1 violet, 2 blue, 3 red, 4 green, 5 yellow.

```powershell
$bgColor = $InstanceColors[$InstanceNumber]
Write-Host "`e]11;$bgColor`e\" -NoNewline
# ... fsp does its thing ...
# on exit:
Write-Host "`e]111`e\" -NoNewline   # reset to default
```

Tiny detail, oversized payoff. With six panes open I never have to read a window title to know which instance I'm looking at. Violet is 2. Done.

**One-command Windows Terminal layouts.** This is the bit that turns "open five panes manually" into one keystroke.

`run` opens a new Windows Terminal window with the base repo and all five worktrees in a 6-pane grid, each pane already `cd`'d into its `.worktrees\worktreeN` directory. `run -Add` does the same but adds the panes to the *current* terminal window instead of a new one, which I use more often than I expected. 

![Five worktree panes opened by run -Add](/images/my-setup/02-run-a-layout.png "run -Add: five worktrees added to the current Windows Terminal window")

`coding` is the slimmer 3-worktree variant for coding. Having six panes open is fine when running the platform, but when coding you need more screen real-estate to properly read code. That's why when coding I have at most 4 panes open.  `coding -Add` adds those three to the current window. `codingextra` stacks worktrees 4 and 5 on top of an existing `coding` layout.

![Three worktree panes opened by coding -Add](/images/my-setup/02-coding-a-layout.png "coding -Add: worktrees 1, 2, and 3 added to the current Windows Terminal window")

`devlayout N` and `devlayoutall` are variants that put a Claude Code pane *on top* of each worktree pane, so the bottom half is the shell and the top half is CC ready to prompt.

## The PowerShell layer underneath

A few smaller things I use daily which are also in my profile:

- **PSReadLine in ListView prediction mode.** Enabled this after reading a [blog post from Scott Hanselmann](https://www.hanselman.com/blog/adding-predictive-intellisense-to-my-windows-terminal-powershell-prompt-with-psreadline) and never looked back. Offers predictive intellisense for PowerShell. 
- **oh-my-posh with a custom theme** (`koen.omp.json`). Shows the current directory, checked out branch, incoming and outgoing commits and the modified and untracked files in git.
- **Terminal-Icons** loaded in a background `Start-ThreadJob` so the prompt isn't blocked on startup. Saves about a second on cold open. Adds icons when listing directories in the terminal.
- **`fnm`** for Node version pinning per directory, prevents a lot of headaches when having to work in older projects.
- **`cc`** for `claude --dangerously-skip-permissions`. 
- **`cicheck`** runs the same checks CI runs, in parallel via `Start-Job`: Portal `bun install --frozen-lockfile` + typecheck + lint + build, Core API restore + build + test, Ortec worker restore + build + test. Catches the embarrassing stuff before push.
- **`nb feat user-prefs`** branches off `origin/main` (after fetching, so you're on the latest and don't create a new branch on a stale main) without checking out main, so it doesn't fight a sibling worktree that already has main checked out.
- **`kd`** (Stop-Dotnet) kills hung `dotnet` processes when `dotnet watch` refuses to let go of a port.

## How I actually use it

When I open my laptop I will either type `run -a`, or I will just start from the current terminal window and create a horizontal pane by pressing alt + shift + minus. Then in the top pane I usually have `cc` (Claude) open and in the bottom pane I have depending on which worktree I'm in `fsp X` running. No two instances collide. No mental tracking of which port is which. Sometimes I also rename the tab to easily spot which window is which when using alt + tab.

Once the first session is running I look at the open PRs whether I have to act on those, and after that I pick up an item and open a new Windows Terminal window, then again create the horizontal pane and rename the tab to give myself some context.

This is my workflow and I really like how everything is stable and doesn't break. I'm always looking for ways to improve my workflow so I will probably have a different setup in a couple of months, but this has been quite the stable workflow for a decent time now. 