# 008 — Bulk unit-listing scope for developer staff

**Status:** Open
**Blocks:** nothing directly; a follow-up to Phase 2 item 8

## Context

The original roadmap wording for item 8 was "self-service Developer/Compound
management **and bulk-list units**." What shipped covers the first half:
`DeveloperMember`-scoped CRUD on `Developer`/`Compound` records. Bulk-listing
units was explicitly *not* built — a `STAFF`/`MANAGER` member still creates
`Property` rows one at a time through the existing owner-scoped `/properties`
flow, manually setting `compoundId`.

Two things are genuinely undefined if this gets picked up:

1. **Staff-to-compound assignment.** The roadmap's §5.5 table says STAFF can
   "create/edit unit listings under an **assigned** Compound" — but no
   assignment sub-table exists. Today, any `DeveloperMember` (any role) could
   theoretically set `compoundId` to any compound under their developer
   account when creating a property, with no per-staff restriction to a
   specific compound.
2. **What "bulk" actually means.** A CSV/spreadsheet import of many units at
   once? A repeat-same-template "add another unit" UI flow? A dedicated API
   endpoint that accepts an array? These have very different implementation
   costs.

## Question

Is bulk unit-listing (and/or staff-to-compound assignment) still wanted, and
if so, in what form?

## Options

- **Skip it entirely.** The current one-at-a-time flow through `/properties`
  already works for developer staff (they just need `compoundId` from the
  self-service compound list, which the new API already returns). This may
  be "good enough" for an MVP.
- **Add staff-to-compound assignment only**, without bulk import — a small
  join table or a `compoundId` column on `DeveloperMember` restricting which
  compound(s) a STAFF member can post under. Meaningful for larger
  developers with staff split across projects.
- **Add a bulk-import endpoint** (CSV or array-of-units payload) — highest
  effort, only worth it if developer customers are expected to list many
  units at once rather than a handful over time.

## Recommendation

Skip both unless a specific developer customer/workflow actually needs it —
neither is blocking any other roadmap item, and both add real complexity
(a new assignment model, or bulk-validation/error-reporting logic) for a
capability that hasn't been validated as needed yet.

## What's needed to close this

Confirmation of whether this is still wanted, and if so, which of the two
sub-problems (assignment vs. bulk import) actually matters.
