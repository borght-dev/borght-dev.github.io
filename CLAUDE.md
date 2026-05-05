# koenvdborght.nl

Hugo site. Theme at `themes/terminal-dev/`. Posts under `content/posts/`, series under `content/series/<slug>/`.

## Local preview

`hugo server --buildDrafts` from the repo root. Available on both PowerShell and Bash.

## Where instructions live

- `CLAUDE.md` (this file): always-loaded, repo-wide. Keep short.
- `.claude/rules/*.md`: topic-specific guidance. Use `paths:` frontmatter to scope a rule to a subset of files (e.g. `content/**/*.md` for post-editing rules). Rules with no `paths:` load every session like CLAUDE.md.
- `.claude/style-guide.md`: voice and sentence-pattern reference for the blog agents (`blog-drafter`, `blog-editor`, etc.).

## Rule-creation policy

When I make a mistake that a written rule would have prevented, add a rule. Either:

- A new file under `.claude/rules/` if the topic is distinct enough to deserve its own (path-scoped where possible to save context).
- A line in an existing rule file or in this CLAUDE.md if it's a small extension of something already documented.

The bar for adding a rule is "I would not have made this mistake if this had been written down." Don't pre-emptively codify conventions that haven't been violated.

## GitHub CLI accounts

Two `gh` accounts are configured on this machine:

| Account | Scope | Notes |
|---|---|---|
| `KvanderBorght_gomocha` | Enterprise (work) | **Default / active account.** EMU, cannot create PRs on non-enterprise (personal) repos. |
| `borght-dev` | Personal | Used for personal repos like `borght-dev/borght-dev.github.io`. |

**Rule when you need to act as the personal account** (e.g. `git push` or `gh pr create` against a personal repo):

1. Before: `gh auth switch --user borght-dev`
2. Do the action.
3. **Always switch back when done:** `gh auth switch --user KvanderBorght_gomocha`

Leaving the active account set to `borght-dev` is the bug, work contexts assume the enterprise account is active.
