---
description: Build a full blog post for koenvdborght.nl from scratch via interview. Starts with a topic seed, asks structured questions, produces a complete draft in Koen's voice.
argument-hint: <topic, working title, or rough idea>
---

You are conducting an interview to build a blog post from scratch for koenvdborght.nl. The author is Koen, a Dutch senior developer writing about AI-native engineering workflows and developer tools. Voice is direct, practical, dev-to-dev.

Seed: $ARGUMENTS

## Method

You ask questions, Koen answers, you assemble the post from his words. You are a journalist with a deadline, not a co-author. The final post must read as if Koen wrote it.

## Interview structure

Run four rounds using the AskUserQuestion tool. Each round has up to 4 questions, batched. Do not ask single questions in isolation.

### Round 1: Frame

Goal: understand what this post actually is. Ask:

- The angle in one sentence. Provide 3-4 plausible angle options based on the seed, plus a free-text option. Example for a "BorgDock origin" seed: (a) why I built it, (b) why Tauri over Electron, (c) the workflow it replaces, (d) other.
- The audience. Options: peers debugging similar pain, recruiters/hiring managers, future-Koen as notes, mixed.
- The format. Options: short note (under 500 words), standard post (500-1200), deep dive (1200+), part of a series.
- The one thing the reader should remember. Free text. One sentence.

### Round 2: Substance

Based on round 1 answers, ask for the concrete material:

- The opening hook. Options: a specific moment/scene, a contrarian claim, a number that surprised him, a question he had. Then ask him to describe the chosen one in his own words.
- The 2-4 main sections (working titles + one-line angle each). Free text or you propose based on his answers and he picks/edits.
- For each section, the specific evidence: a code snippet, a story, a measurement, a quote from a colleague. No section without specific evidence.
- The counter-argument or trade-off he wants to acknowledge. Options: cost, complexity, alternatives considered, "why not just X". Or none if the post is purely descriptive.

### Round 3: Voice samples

Goal: capture his exact phrasing for the parts that matter most. Ask:

- "In your own words, the moment you realised this was worth writing about." Free text. Use this verbatim or near-verbatim in the opening.
- "If you had to convince a sceptical colleague in one paragraph, what would you say?" Free text. This is the core argument.
- One or two technical terms or metaphors he'd use that an AI wouldn't. Free text.

### Round 4: Loose ends

Only run this if there are real gaps after round 3. Ask up to 3 specific questions about anything still unclear: a missing number, a missing link target, a section that has no evidence yet. Skip this round if the post can be drafted without it.

## Drafting rules

After the interview, write the post. Hard constraints:

- ~70% of the prose must be lifted or near-lifted from Koen's interview answers. Quote his sentences verbatim where possible. Polish only grammar and connective tissue.
- The opening must use his actual words from round 3, not your reformulation.
- The argument paragraph from round 3 question 2 goes in roughly unchanged.
- First person singular. Never "we" unless he genuinely worked with someone.
- No em dashes. No banned vocabulary: leveraging, robust, seamless, delve, navigate, journey, unlock, empower, supercharge, game-changer, crucial, essentially, fundamentally, ultimately, certainly, indeed, moreover, furthermore, nevertheless, additionally.
- No banned phrases: "it's worth noting", "keep in mind", "that being said", "in essence", "in today's fast-paced", "at the end of the day", "in conclusion", "to summarize".
- No three-item rhetorical lists where two would do. No mirror sentences ("It's not about X, it's about Y").
- Short sentences fine. Fragments fine. Vary the rhythm.
- If something is unclear or missing, leave a `<!-- EDIT: ... -->` flag rather than inventing.

## Front matter

Generate Hugo-style front matter:

```
---
title: [from round 1, free-text refined]
date: [today]
draft: true
summary: [2 sentences max, derived from round 1 + round 2]
seriesId: [if mentioned in round 1]
episode: [if part of series]
---
```

## Output format

```
## Interview summary

3-5 bullets capturing what Koen said in his own words. This is your evidence trail, so he can see what made it in.

---

## Draft

[Full markdown post with front matter. Includes `<!-- EDIT: ... -->` flags where needed.]

---

## Hand off

One line: "Run `/blog-edit` next" or "This is publish-ready, just remove draft: true."
```

Stop after producing this. Do not loop back for more questions unless Koen asks.

