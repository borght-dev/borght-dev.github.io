---
description: Rewrite a rough draft into a publish-ready post for koenvdborght.nl. Reads style guide and reference posts, fills gaps via interview, then rewrites in Koen's voice. Output should need <15 min of human review.
argument-hint: <path to draft file>
---

You are taking a rough draft and producing a publish-ready post for koenvdborght.nl. Output goal: Koen reads it, makes 5-10 small tweaks, hits publish.

Draft: $ARGUMENTS

## Required reading before you start

Read these in order. Do not skip.

1. `.claude/style-guide.md` — how Koen writes
2. At least ONE reference post listed in the style guide. Pick the one closest in topic to the draft.
3. The draft itself, end to end, before you touch anything.

If any of these files are missing, stop and tell Koen which one.

## Workflow

### Phase 1: Audit

After reading, identify:

**Hard gaps** (block publishing, need user input):
- `[TODO: ...]` or `[needs: ...]` markers
- Empty sections (heading with no content, just `...`, or single placeholder)
- Placeholder links: `[some-link]`, `[article-name-goes-here]`
- Factual claims that read uncertain ("about 9 years")
- Missing concrete evidence in a section that demands it (a "why we picked X" section with no reasons)

**Soft gaps** (you can rewrite around them, but flag if you do):
- A paragraph that gestures at an idea without landing it
- A section that's shorter than it should be given its weight in the argument

### Phase 2: Interview (only for hard gaps)

Use AskUserQuestion. Up to 4 questions per round, batched. Rules:

- For placeholder links: ask "exists / planned / cut" with options.
- For empty sections: ask for 2-4 bullets in his own words, free text. Tell him 10-second answers are fine, you'll rewrite.
- For uncertain facts: give him the exact line and ask for the correction.
- For missing evidence: offer 2-3 plausible angles based on what the rest of the post implies, plus free-text option.

Skip phase 2 entirely if there are no hard gaps. Say "No gaps, rewriting now."

### Phase 3: Rewrite

This is the agressive step. You are NOT polishing connective tissue. You ARE rewriting for flow, rhythm, and voice match to the reference post.

Allowed:
- Reorder paragraphs within a section if it improves the argument
- Combine or split paragraphs for rhythm
- Rewrite awkward sentences fully, using vocabulary and patterns from the style guide
- Cut sentences that don't earn their place
- Replace generic claims with specific ones IF the specifics exist elsewhere in the draft (do not invent)
- Tighten the opening so it lands in the first 2-3 sentences

Not allowed:
- Inventing facts, numbers, names, code, or examples
- Changing the argument or the order of sections
- Adding "AI smoothing" transitions ("Furthermore", "It's worth noting")
- Smoothing Dutch directness into politeness
- Removing self-deprecation, opinions, or asides — those are voice
- Using any banned vocabulary or banned phrase from the style guide

For every rewritten paragraph, the test is: does this sound like the reference post you read? If not, rewrite again before output.

### Phase 4: Self-check

Before producing output, scan your draft for:
- Em dashes → fix
- Any banned word or phrase → fix
- Three-adjective stacks → cut to one
- "Not just X, but Y" patterns → rewrite
- Mirror sentences ("It's not about X, it's about Y") → rewrite
- Any paragraph longer than 4 sentences without a fragment or short sentence for rhythm → rewrite
- Opening that doesn't land in 2-3 sentences → rewrite

## Output format

```
## Audit

Hard gaps: [count]
Soft gaps: [count]
Reference post used: [filename]

---

## Rewritten draft

[Full markdown, front matter included, ready to publish after light review]

---

## Where I took liberties

Numbered list. For each substantial rewrite (not silent fixes): paragraph reference, what I changed, why.

Maximum 10 entries. If there are more, group them.

---

## Things Koen should double-check

- Factual claims I couldn't verify
- Places where I rewrote heavily and might have drifted from his intent
- Anything that still feels generic to you despite the rewrite
```

Stop after producing this. Do not ask for confirmation.

