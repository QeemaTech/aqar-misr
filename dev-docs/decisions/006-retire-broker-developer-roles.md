# 006 — Retire `BROKER` and `DEVELOPER` roles

**Status:** Open (mostly unblocked now)
**Blocks:** [Roadmap](../plans/aqarmap-platform-gap-analysis-and-roadmap.md) Phase 2, item 9

## Context

Per [§5](../plans/aqarmap-platform-gap-analysis-and-roadmap.md#5-role-model-current-vs-what-the-business-needs)
of the roadmap: `BROKER` is dead code (no branches on it anywhere) and
`DEVELOPER` is dead code too — both exist only as `Role` enum seed rows with
zero permissions and zero code checking for them. The `Company`/`CompanyMember`
model (done) and `DeveloperMember` model (done) now cover the actual
multi-person-access use cases these roles were presumably meant for, via
entity-scoped membership instead of a global role. Target end state: `USER`,
`MODERATOR`, `ADMIN`, `SUPER_ADMIN` — 4 roles instead of 6.

## Question

This is now technically unblocked (both membership models exist), but two
things need confirming before flipping the switch:

1. **Are there any existing users currently assigned the `BROKER` or
   `DEVELOPER` role** (in seed data or, more importantly, in whatever
   environment this runs against)? If so, they need reassigning to `USER`
   (+ a `CompanyMember`/`DeveloperMember` row if they should actually have
   org access) before the role rows can be deleted.
2. **Is removing a `Role` row itself safe**, or does anything reference
   `Role.code = 'BROKER'`/`'DEVELOPER'` by string outside of `seed.ts`
   (e.g. hardcoded checks, admin panel role filters)? Needs a repo-wide
   grep before deletion, not just trusting the roadmap audit.

## Options

- **Do it now** — low risk technically since both roles are confirmed dead
  code; mechanical cleanup (remove from `ROLES` seed array, delete the DB
  rows, confirm no lingering `UserRole` references).
- **Defer until other Phase 2/3 work lands** — no strong reason to defer
  found in the audit; this is listed as "mostly unblocked" rather than fully
  blocked because it just hasn't been done yet, not because something else
  needs to happen first.

## Recommendation

Do it — this is cleanup, not a new feature, and the audit already confirmed
both roles are dead. Just needs the two confirmations above run once before
executing.

## What's needed to close this

Green light to do the grep-and-verify pass + seed/migration cleanup.
