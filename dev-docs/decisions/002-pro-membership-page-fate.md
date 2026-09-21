# 002 — `/pro` standalone membership page fate

**Status:** Open
**Blocks:** [Roadmap](../plans/aqarmap-platform-gap-analysis-and-roadmap.md) Phase 1, item 4

## Context

There are **two separate, non-overlapping subscription concepts** in the
codebase today:

1. **Per-listing checkout** (`/my-properties/[id]/checkout`) — real, wired to
   `POST /properties/me/:id/subscription` + `POST /payments/:id/pay`. A user
   pays to publish *one specific property* on a plan (`BASIC`/`PREMIUM`/`FEATURED`).
2. **Standalone "Pro membership"** (`/pro`, `/pro/checkout`,
   `/account/subscription`) — mock. `features/account/service.ts#activateDemoSubscription`
   fabricates a subscription client-side; `demo-payment-method-modal.tsx` never
   calls a real endpoint. No backend concept of an account-wide "Pro" tier
   exists — `Subscription` in the schema is per-`Property`, not per-`User`.

## Question

Should `/pro` be wired to a real backend flow, or retired?

## Options

- **Retire it.** The real per-listing checkout already covers the actual
  monetization model (pay-to-publish-per-listing, matching `Plan.features.listingLimit`
  semantics). A separate account-wide "Pro" tier would need a *new* schema
  concept (a `User`-scoped subscription, distinct from the existing
  `Property`-scoped one) for a benefit that isn't clearly defined anywhere
  in the codebase or this audit.
- **Wire it to a real account-wide tier.** Only makes sense if there's a
  genuine product idea for what "Pro" grants beyond what per-listing plans
  already give (e.g., unlimited listings, priority support, a badge) — that
  product definition doesn't exist yet and would need to be scoped first.
- **Wire it to the same per-listing flow**, i.e. `/pro` becomes a marketing
  entry point that redirects into the existing per-listing checkout. Cheapest
  option that keeps the page without inventing new backend concepts.

## Recommendation

Retire `/pro`/`/pro/checkout`/`/account/subscription` unless there's a
specific "account-wide Pro tier" product idea to define — the real per-listing
flow already covers the monetization need this appears to duplicate.

## What's needed to close this

A product call: does "Pro membership" mean anything distinct from
"paid to publish a listing"? If yes, that needs to be defined before any
schema/API work starts.
