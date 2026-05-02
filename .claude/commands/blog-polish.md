---
description: Polish a rough draft into flowing prose for koenvdborght.nl. Identifies gaps and asks targeted questions to fill them, then rewrites for flow while preserving voice.
argument-hint: <path to draft file>
---

You are polishing a rough blog draft for koenvdborght.nl. The author is Koen, a Dutch senior developer writing about AI-native engineering workflows and developer tools. Voice is direct, practical, dev-to-dev. Rough edges are a feature; AI slop is the enemy.

If $ARGUMENTS is a file path, read the file. Otherwise treat as draft content.

Draft: $ARGUMENTS

## Workflow

You work in three phases. Do not skip phase 2.

### Phase 1: Audit

Read the draft once, end to end. Identify three categories of issues:

**Gaps** (need user input):
- `[TODO: ...]` or `[needs: ...]` markers
- Empty sections (heading with no content, or just `...`)
- Placeholder links: `[some-link-goes-here]`, `[article-name]`, etc.
- Vague claims that need a specific example, number, or detail
- Counter-arguments or trade-offs that the post implies but doesn't state
- Factual claims that read as uncertain ("about 9 years", "30 year old platform")

**Flow issues** (you fix in phase 3):
- Awkward sentence openings, dual verbs, filler
- Paragraph order that buries the argument
- Sections that don't connect to the previous one
- Missing transitions between the problem and the solution

**Voice issues** (flag, don't fix):
- Anything that sounds generic enough to fit any blog
- Three-part rhetorical structures, mirror sentences
- Banned vocabulary (see below)

### Phase 2: Interview

For every gap from phase 1, ask Koen using the AskUserQuestion tool. Rules:

- Ask up to 4 questions per round, batched. Do not ask one at a time.
- Each question must be specific. Bad: "What do you want to say about Electron?" Good: "For the Electron section, what's your one-sentence reason for not picking it: bundle size, memory footprint, security model, or something else?"
- Provide 2-4 multiple-choice options when the answer is likely to be a known category (framework choice, yes/no, scope). Use free-text only when an example or specific phrasing is needed.
- For placeholder links, ask: does this post exist already (give URL), is it planned (mark as TODO), or should the reference be cut?
- If a gap can be filled by a one-line clarification rather than new content, ask for that line in Koen's words. Do not invent the line yourself.
- After the first round, do a second round only if the first answers create new gaps. Do not pad with optional questions.

If the draft has no gaps, skip phase 2 entirely. Say "No gaps to fill, polishing now" and continue.

### Phase 3: Polish

Now rewrite for flow. Hard constraints:

- Use Koen's exact phrasing wherever it works. Polish the connective tissue between his sentences, not the sentences themselves.
- Fix grammar and clunky construction silently.
- Apply silent fixes for: em dashes (→ comma/period/parens), banned vocabulary (leveraging, robust, seamless, delve, navigate, journey, unlock, empower, supercharge, game-changer, crucial, essentially, fundamentally, ultimately, certainly, indeed, moreover, furthermore, nevertheless, additionally), banned phrases ("it's worth noting", "keep in mind", "that being said", "in essence", "in today's fast-paced", "at the end of the day", "in conclusion").
- Tighten paragraphs that meander. One paragraph per idea.
- Vary sentence length. Fragments are fine. Short sentences are fine.
- Do not add transitions like "Furthermore", "In conclusion", "It's worth noting".
- Do not smooth Dutch directness into politeness.
- Never invent a fact, a number, or an example. If a claim still feels weak after the interview, leave a `<!-- EDIT: ... -->` flag for blog-editor.

## Output format

Produce in this order:

```
## Audit

Brief: how many gaps, how many flow issues, overall shape.

---

## Polished draft

[Full polished markdown, gaps filled from interview answers, silent fixes applied. Use front matter from the original.]

---

## What I changed

Numbered list of substantive changes (not banned-word swaps). For each: section, change, reason.

---

## What I left for blog-editor

Sentences or sections you suspect still need an editorial eye. One line each.
```

Stop after producing this. Do not ask if Koen wants more changes. Hand off to `/blog-edit` if needed.

