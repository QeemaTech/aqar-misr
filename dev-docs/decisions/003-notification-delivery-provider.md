# 003 — Notification delivery provider

**Status:** Open
**Blocks:** [Roadmap](../plans/aqarmap-platform-gap-analysis-and-roadmap.md) Phase 1, item 5

## Context

`Notification` rows are created correctly today (in-app only) —
`notifications/notifications.service.ts` has no email/SMS/WhatsApp sending
anywhere. The events that already trigger a `Notification` row (and would
need real delivery) are: lead received, listing approved/rejected/published,
subscription expiring, payment receipt, saved-search alert match.

## Question

Which channel(s) and provider should send these notifications for real?

## Options

- **Email only, via a transactional provider** — simplest to ship. Candidates:
  - **Resend** — modern API, generous free tier, good DX, no Egypt-specific
    concerns since it's just email.
  - **Amazon SES** — cheapest at scale, more setup overhead (domain
    verification, sandbox mode limits until production access is granted).
  - **Postmark** — excellent deliverability reputation, slightly pricier.
- **Email + SMS/WhatsApp** — matches what Aqarmap actually does for
  lead-received and listing-status notifications in Egypt, where WhatsApp is
  the dominant channel. Adds a second provider (e.g. Twilio, or a local
  Egyptian SMS gateway) and meaningfully more integration work.

## Recommendation

Start with email only via **Resend** (simplest integration, no sandbox
approval wait like SES) for the highest-value events: lead received, listing
approved/rejected/published, payment receipt. Revisit WhatsApp/SMS once email
delivery is proven, since it's a second integration with its own cost model.

## What's needed to close this

- Provider account + API key.
- Sender domain to verify (affects deliverability/SPF/DKIM setup).
- Confirm whether WhatsApp/SMS is a launch requirement or a fast-follow.
