# 001 — Payment gateway provider

**Status:** Open
**Blocks:** [Roadmap](../plans/aqarmap-platform-gap-analysis-and-roadmap.md) Phase 1, item 4

## Context

`apps/api/src/modules/payments/providers/payment-provider.interface.ts` defines
a clean `PaymentProvider` DI abstraction (token `PAYMENT_PROVIDER`), currently
bound to `MockPaymentProvider` in `payments.module.ts`. The rest of the flow is
real: `POST /properties/me/:id/subscription` → `POST /payments/:id/pay` →
`Payment`/`Invoice` rows are created correctly. Only the actual charge is fake.

## Question

Which payment gateway should back the real `PaymentProvider` implementation?

## Options

- **Paymob** — the standard gateway for Egyptian merchants; supports cards,
  mobile wallets (Vodafone Cash, etc.), and Fawry cash-in. Best fit if the
  target market is genuinely Egypt-only, matching Aqarmap's own market.
- **Stripe** — much simpler API/docs, better developer experience, but weak
  support for Egyptian payment methods (no wallets/Fawry) and payout support
  for Egypt is limited/unavailable in some configurations — needs to be
  confirmed against current Stripe country support before picking it.
- **Both, behind the existing interface** — ship Paymob first (matches the
  market), keep the interface abstraction so Stripe (or another gateway) can
  be added later for other markets without touching the rest of the payment
  flow.

## Recommendation

Paymob first, given the Egypt-only target market and Aqarmap's own reliance
on local payment methods. The existing `PaymentProvider` interface already
makes this a swap-in, not a rewrite.

## What's needed to close this

- Paymob (or chosen provider) merchant account + API credentials.
- Confirm which local payment methods must be supported at launch (cards
  only vs. cards + wallets + Fawry).
