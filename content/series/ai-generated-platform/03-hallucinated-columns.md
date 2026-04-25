---
title: "When Claude Made Up a Database Schema (and How We Caught It)"
seriesId: ai-generated-platform
episode: 3
draft: true
summary: "fv_device columns that didn't exist, the incident, and the recovery loop we built so it doesn't happen again."
---

> *Draft.*

## The bug

A `fv_device` table was introduced in a generated PR. It looked plausible. It compiled. It passed unit tests.

It did not exist in the legacy database.

## How it shipped

...

## How we caught it

...

## The fix

The "device-overview legacy-aligned rewrite" PR — replaced the hallucinated schema with the real `iwms_VersionInfos` + `fv_engineer_position` + `Audits` query.

## The recovery loop

What we changed in the workflow so this can't happen again:

1. ...
2. ...
3. ...
