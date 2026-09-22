# The detail page shows all the fields

## Parent PRD

`docs/issues/prd.md`

## What to build

Complete the content of the detail page. Add the state, the creation date, the author, the body text, and the link to the same issue on github.com.

The page reuses the `Card` component and its classes, as the list does. The body is Markdown text, but it shows as plain text that keeps the line breaks. No Markdown library is added.

See "Implementation Decisions" in the parent PRD for the full field list.

## Acceptance criteria

- [ ] The query reads `state`, `createdAt`, `author { login }`, `body`, and `url`.
- [ ] The page shows the number and the state in one meta line, with the same style as the card.
- [ ] The page shows the author name and the creation date.
- [ ] The page shows the body text, and the line breaks of the body stay.
- [ ] The page has a link to the issue on github.com.
- [ ] The page writes no new CSS module, or one small module only if the body block needs a rule.
- [ ] No new dependency is added.
- [ ] The test of the page makes assertions on the new fields.
- [ ] `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, and `pnpm run build` pass.

## Blocked by

- Blocked by `docs/issues/001-issue-detail-route-tracer.md`

## User stories addressed

- User story 9
- User story 10
- User story 11
- User story 12
- User story 19
- User story 20

## STATUS

TODO
