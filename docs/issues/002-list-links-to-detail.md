# The list links to the detail page

## Parent PRD

`docs/issues/prd.md`

## What to build

The "View" link on each issue card points to `#` now. Make it point to the detail route, with the issue number that the list query already gives.

## Acceptance criteria

- [ ] A click on "View" opens the detail page of that issue.
- [ ] The address bar shows the number of the issue that the card shows.
- [ ] The `aria-label` of the link does not change.
- [ ] The browser back button returns to the list.
- [ ] The list query is not changed. It already gives the number.
- [ ] `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, and `pnpm run build` pass.

## Blocked by

- Blocked by `docs/issues/001-issue-detail-route-tracer.md`

## User stories addressed

- User story 1
- User story 2
- User story 3
- User story 4
- User story 16

## STATUS

TODO
