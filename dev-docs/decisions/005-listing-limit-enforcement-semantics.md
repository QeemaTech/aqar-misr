# 005 — Listing-limit enforcement semantics

**Status:** Open
**Blocks:** [Roadmap](../plans/aqarmap-platform-gap-analysis-and-roadmap.md) Phase 2, item 6

## Context

Seed data already defines `Plan.features.listingLimit` (`BASIC: 1`,
`PREMIUM: 5`, `FEATURED: 10`), but nothing in `properties.service.ts` reads it
to cap active listings per owner. The ambiguity: **`Subscription` in the
schema is per-`Property`, not per-`User`.** A user buys a plan *for one
listing* at a time (the real per-listing checkout flow), not "a plan" in the
abstract sense that would naturally cap "how many listings can I have."

## Question

Given the per-listing subscription model, what does "listing limit" actually
mean in practice?

## Options

- **Per-owner concurrent-active-listing cap, independent of which plan each
  listing bought.** E.g. "a `USER` can have at most N `PUBLISHED`/pending
  listings at once, where N is derived from their *highest* active plan
  across all their listings." Closest to the seed data's intent but requires
  defining what happens when they have listings on *different* plans
  simultaneously.
- **Per-listing plan just controls that listing's visibility/features
  (featured boost, etc.), and there is no separate "total listings" cap at
  all.** This matches the current schema much more naturally (nothing caps
  concurrent listings today) but means `listingLimit` in the seed data is
  currently meaningless and should either be removed or repurposed.
- **Introduce an account-wide `Plan`/`Subscription` concept** (distinct from
  the existing per-listing one) that actually caps total listings — this is
  the same "account-wide Pro tier" idea flagged in
  [002](002-pro-membership-page-fate.md), so these two decisions are linked.

## Recommendation

Resolve [002](002-pro-membership-page-fate.md) first — if the answer there is
"no account-wide tier, per-listing only," then `listingLimit` in the seed
data should be dropped/repurposed rather than enforced, since there's nothing
coherent for it to cap under the current model.

## What's needed to close this

A product decision on whether "listing limit" is a real constraint the
business wants enforced, and if so, at what scope (per-owner total vs.
per-listing feature only).
