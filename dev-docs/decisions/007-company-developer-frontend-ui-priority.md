# 007 — Company/Developer-account frontend UI priority

**Status:** Open
**Blocks:** nothing directly; a follow-up to Phase 2 items 7–8

## Context

Both the `Company`/`CompanyMember` model (Phase 2 item 7) and the
`DeveloperMember` model (Phase 2 item 8) shipped **backend-only** —
self-service APIs (`/companies`, `/developer-accounts`) exist, fully
authorized and live-tested, but there is no UI anywhere that calls them:

- No admin oversight page for either (the admin panel has
  `/admin/companies` API routes gated by `companies.view`/`companies.update`,
  but no page consuming them).
- No self-service agency/developer dashboard on `apps/web` — a user who
  creates a company or developer account today can only do so via direct API
  calls (or the seed script), not through any web UI.
- `Property.companyId`/`compoundId` aren't wired into the `/add-property`
  creation flow — an agent can't currently choose "post this under my
  company" from the UI even though the backend field exists.

## Question

When should frontend work start on these, and in what order?

## Options

- **Admin oversight pages first** — smaller scope (list + activate/deactivate),
  reuses the pattern already built for Locations management
  (`apps/admin/src/features/locations/*`), gives staff visibility into
  company/developer accounts sooner.
- **Self-service dashboards first** — bigger scope (full CRUD + member
  management UI + compound management for developers) but this is what
  actually makes the feature usable by real agencies/developers, which is
  presumably the actual business goal.
- **Wire `Property.companyId` into `/add-property` first** — smallest scope
  of the three, and arguably the highest-leverage piece since it's what
  makes a company's listings actually show up as company-attributed on the
  live site, which existing public pages might already render if the field
  is populated (worth checking `property-details` rendering before deciding
  this is "frontend work" at all — it might just be a backend default-value
  change).

## Recommendation

No strong recommendation — this is a prioritization call that depends on
whether the near-term goal is "impress a demo/stakeholder with a working
agency flow" (self-service dashboard) or "give staff moderation visibility"
(admin oversight page). Worth checking the `property-details` rendering
question above regardless, since it might be near-zero-cost to unlock.

## What's needed to close this

A priority call on which of the three pieces to build first, if any are
needed before the next roadmap phase.
