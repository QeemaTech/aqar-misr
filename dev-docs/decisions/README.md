# Open Decisions

Every genuinely open product/technical decision blocking further work on the
[Aqarmap gap-analysis roadmap](../plans/aqarmap-platform-gap-analysis-and-roadmap.md),
pulled into one place so they can be resolved one at a time instead of
re-surfacing mid-implementation. Each file is self-contained: context, the
actual question, the realistic options, and what it blocks.

| # | Decision | Blocks | Status |
|---|---|---|---|
| [001](001-payment-gateway-provider.md) | Which payment gateway to integrate (Paymob vs Stripe vs other) | Phase 1 item 4 | Open |
| [002](002-pro-membership-page-fate.md) | Wire `/pro` standalone membership page to real flow, or retire it | Phase 1 item 4 | Open |
| [003](003-notification-delivery-provider.md) | Which email/SMS provider for notification delivery | Phase 1 item 5 | Open |
| [004](004-credits-wallet-feature-fate.md) | Build a real credits/wallet model, or drop the feature | Phase 4 (credits/points) | Open |
| [005](005-listing-limit-enforcement-semantics.md) | What "plan listing limit" actually means given per-listing (not per-user) subscriptions | Phase 2 item 6 | Open |
| [006](006-retire-broker-developer-roles.md) | Timing/rollout for dropping the dead `BROKER` role and retiring `DEVELOPER` as a role | Phase 2 item 9 | Open (mostly unblocked now) |
| [007](007-company-developer-frontend-ui-priority.md) | When to build frontend UI for the Company/Developer-account models | Follow-up to Phase 2 items 7–8 | Open |
| [008](008-bulk-unit-listing-scope.md) | Whether/how to build a dedicated bulk-unit-listing flow for developer staff | Follow-up to Phase 2 item 8 | Open |

Once a decision is made and acted on, add a `Decision:` line at the top of
its file recording what was chosen and why, then move the file into
[`closed/`](closed/) and strike it through in the table above (keep the row,
just update the link path and status).
