# Tracer bullet — the detail route shows one issue

## Parent PRD

`docs/issues/prd.md`

## What to build

A first end-to-end path from the address bar to the GitHub GraphQL API and back to the screen.

A person types `/issues/123` in the browser. The application keeps the header, calls the API for that one issue, and shows the issue number and the issue title. The page has a loading state and an error state, as the list has.

The page gets its own data. It does not read the data of the list query. Thus the address works after a refresh.

See "Implementation Decisions" in the parent PRD for the URL parameter, the query, the route position, and the file positions.

Only the number and the title show in this slice. The other fields come in `docs/issues/003-issue-detail-all-fields.md`.

## Acceptance criteria

- [ ] A new query document reads one issue of `facebook/react` by number.
- [ ] A new page module is in `src/pages/IssueDetail/` with the component, the types, and an index file.
- [ ] The route `/issues/:number` is a child of the route that renders `Layout`. `Layout` is not changed.
- [ ] The address `/issues/123`, typed directly, shows the number and the title of that issue.
- [ ] The header of the application stays on the screen.
- [ ] The page shows a loading state while the data comes.
- [ ] The page shows an error state if the query fails.
- [ ] Mocks for the new query are in `src/mocks/`.
- [ ] A test file in the page folder covers the loading state, the error state, and the success state. It uses the `MockLink` pattern of `IssueList.test.tsx` and a router that starts at `/issues/123`.
- [ ] No new dependency is added.
- [ ] `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, and `pnpm run build` pass.

## Blocked by

None - can start immediately.

## User stories addressed

- User story 5
- User story 6
- User story 7
- User story 8
- User story 13
- User story 14
- User story 15
- User story 17
- User story 18
- User story 21

## STATUS

TODO
