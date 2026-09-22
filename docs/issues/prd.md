# PRD — Issue detail route

## Problem Statement

The user sees a list of issues of the `facebook/react` repository. Each card shows the number, the state, the title, the author, and the date. Each card also shows a "View" link, but the link does nothing: it points to `#`.

The user cannot read the full text of an issue in this application. The user cannot send a link to one issue to a colleague. The user cannot bookmark one issue, or open one issue in a new tab.

## Solution

Add a detail page at the address `/issues/<number>`, for example `/issues/123`.

The "View" link on each card goes to this address. The header of the application stays on the screen.

The page shows the same data as the card (number, state, title, author, date) and adds the body text of the issue and a link to the same issue on github.com.

The page gets its own data from the GitHub GraphQL API. Thus the address works also when the user opens it directly, refreshes the browser, or uses a bookmark.

## User Stories

1. As a user, I want to click "View" on an issue card, so that I can read the full issue.
2. As a user, I want the address bar to show `/issues/123`, so that I can see which issue I read.
3. As a user, I want the number in the address to be the same number as on github.com, so that I can compare the two applications easily.
4. As a user, I want to copy the address and send it to a colleague, so that the colleague opens the same issue.
5. As a user, I want to refresh the page, so that the content stays on the screen and does not disappear.
6. As a user, I want to open the address in a new tab, so that I can read two issues at the same time.
7. As a user, I want to bookmark an issue, so that I can find it again later.
8. As a user, I want to see the title of the issue on the detail page, so that I know that I opened the correct issue.
9. As a user, I want to see the issue number and the state (OPEN or CLOSED) on the detail page, so that I know if the work continues.
10. As a user, I want to see the author name and the creation date, so that I know who wrote the issue and when.
11. As a user, I want to read the body text of the issue, so that I understand the problem.
12. As a user, I want a link to the issue on github.com, so that I can do the operations that this application does not do (comment, close, label).
13. As a user, I want to see a "Loading" message while the data comes, so that I know that the application works.
14. As a user, I want to see an error message if the data does not come, so that I know that the problem is not my browser.
15. As a user, I want the header of the application to stay on the detail page, so that the application keeps one identity.
16. As a user, I want the browser back button to return me to the list, so that I can continue to read the other issues.
17. As a developer, I want the detail page to have its own query, so that the page does not depend on a previous visit to the list.
18. As a developer, I want the page in the `src/pages/` folder, so that route pages and components stay separate.
19. As a developer, I want the page to reuse the `Card` component and its styles, so that the two screens look the same and I write no new CSS.
20. As a developer, I want no new dependency, so that the size of the application stays the same.
21. As a developer, I want a test file for the new page, so that a future change that breaks the page fails the test suite.

## Implementation Decisions

- **URL parameter: the issue `number`.** The URL is `/issues/:number`, for example `/issues/123`. The GraphQL node `id` is not used. Reason: the number is short, a person can read it, and it agrees with the address on github.com. The repository is fixed, thus the number is unique.
- **Data source: a new GraphQL query.** A new query document `GET_ISSUE($number: Int!)` reads `repository(owner: "facebook", name: "react") { issue(number: $number) { ... } }`. The page does not read the Apollo cache of the list query, and it does not receive data through the router state. Reason: only a new query makes a direct link work after a refresh. Apollo keeps the result in its cache, thus a second visit is fast.
- **Fields in the query:** `id`, `number`, `title`, `state`, `createdAt`, `author { login }`, `body`, `url`.
- **The body text shows as plain text.** The body is Markdown, but no Markdown library is added. The text shows in a block that keeps the line breaks. Reason: the rule "no new dependency".
- **Route position: inside the existing `Layout` route.** The new route is a child of the route that renders `Layout`. `Layout` already has an `Outlet`, thus `Layout` does not change. The change in the router file is one line.
- **New modules:**
  - A query module in the GraphQL folder. It exports one document, `GET_ISSUE`. Its interface is one variable, `number`. It is a deep module: it hides the repository owner, the repository name, and the field list behind one name.
  - A page module in `src/pages/IssueDetail/`, with three files: the component, the types, and an index file. The component has no props. It reads the parameter from the router. Its interface is the route address only.
  - A types file for the shape of the query result, with the same style as `IssueList.types.ts`.
- **Modified modules:**
  - The router file: add one route.
  - The list component: change the `to="#"` of the "View" link to the address of the new route. The `aria-label` stays.
  - The mocks folder: add the success mock and the error mock for the new query.
- **No new CSS module.** The page uses the `Card` component and the classes `meta`, `metaLine`, `metaState`, `open`, `closed`, `title`, and `byline` from the card styles, as the list does now. If the body block needs a rule (for example, to keep the line breaks), one small CSS module is added at that moment only.
- **No new dependency.** React Router and Apollo Client are already in the project.

## Testing Decisions

- **What makes a good test here:** the test renders the page as a user sees it and makes assertions on the text and the roles on the screen. The test does not make assertions on the internal state, the class names, or the call count of Apollo.
- **Prior art:** `IssueList.test.tsx`. It builds an `ApolloClient` with a `MockLink` and the mocks from `src/mocks/`, and it renders the component inside a router. The new test uses the same pattern, but with a router that starts at `/issues/123`, because the page reads the parameter from the address.
- **The module under test:** the new page module. One new test file goes in the page folder.
- **The cases:**
  1. The page shows the loading state before the data comes.
  2. The page shows the error state if the query fails.
  3. The page shows the number, the state, the title, the author, the date, and the body text after the data comes.
- **The query module and the types need no test.** They contain no logic.

## Out of Scope

- **Validation of the URL parameter.** A value that is not a number (for example `/issues/abc`) is not validated in this work. The value goes to the query, and the user sees the error state.
- **A "not found" message.** If GitHub returns no issue for a valid number, no special message is shown in this work.
- **A "Back to issues" link on the page.** The user uses the browser back button. The header title does not become a link.
- **Comments, labels, assignees, and milestones.** The query does not read them.
- **Markdown rendering of the body.**
- **Issues of other repositories.** The owner and the name stay fixed at `facebook/react`.
- **Pagination, search, or filters on the list.**
- **New tests for the list component.**

## Further Notes

- The list query already receives the `number` field. Thus the link needs no change to the list query.
- Because the parameter validation is out of scope, an incorrect address gives a technical error message from the GraphQL API. This is a known limit. The upgrade path is small: test the parameter for a positive integer, skip the query, and show a "not found" message.
- The application uses a GitHub token from the environment. The detail page has the same limits as the list: the token and the GitHub rate limits control the result.
- Before the work is complete, these commands must pass: `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, and `pnpm run build`.
