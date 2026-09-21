# 004 — Credits/wallet feature fate

**Status:** Open
**Blocks:** Phase 4 (long tail) on the [roadmap](../plans/aqarmap-platform-gap-analysis-and-roadmap.md)

## Context

`/credits` (`apps/web/src/features/credits/repository.ts`) has a comment that
literally reads *"Deterministic fictional demo credit ledger — not real
money."* **No Prisma model exists for this at all** — not even a stub schema.
This is the least-built of all the mocked features; everything else at least
has a real backend concept sitting behind the mock.

## Question

Is a credits/points system part of the actual monetization plan, or is it a
demo-only placeholder that should be removed?

## Options

- **Build it for real** — needs a new `CreditAccount`/`CreditTransaction`
  schema, a purchase flow (tied to the payment gateway decision in
  [001](001-payment-gateway-provider.md)), and defined "what can credits buy"
  rules (featured boosts? extra listings? contact reveals?).
- **Drop the feature** — remove `/credits` and its nav entry entirely if it's
  not part of the actual business model. Lowest-effort option, and avoids
  maintaining a UI that promises functionality that doesn't exist.
- **Leave as a clearly-labeled demo** — keep the page but make it visibly
  non-functional/"coming soon" rather than presenting fictional balances as
  if they were real. Middle ground if the business intends to build it later
  but isn't ready to commit now.

## Recommendation

No implementation recommendation here — this is a pure product/business-model
question (does the platform want a points economy at all?), not a technical
one. Needs an answer before any engineering time goes into it.

## What's needed to close this

A product decision on whether credits/points are part of the monetization
strategy at all.
