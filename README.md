# React Issues — Project Overview

## Project description

React Issues is a small Vite + React + TypeScript application that lists issues from a GitHub repository using Apollo Client and the GitHub GraphQL API. The codebase emphasizes component-scoped CSS Modules, a minimal design system (atoms like Card), and strong TypeScript typings with unit tests (Vitest + React Testing Library).

## How to run (developer)

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Provide credentials
   - Create a `.env` file from `.env.example` and set a GitHub Personal Access Token (PAT):

     ```env
     VITE_GITHUB_TOKEN=your_github_pat_here
     ```

   - A read-only token is sufficient for the demo queries.

3. Start the dev server

   ```bash
   pnpm dev
   ```

4. Project checks

   ```bash
   pnpm run typecheck   # TypeScript (noEmit)
   pnpm run lint        # ESLint
   pnpm run test        # Vitest
   pnpm run build       # Vite build
   ```

## Good-to-knows

- Branching: main is the canonical local branch name in this repo.
- Styling: CSS Modules with tokens in `src/styles/theme.css`; prefer component-scoped styles.
- Types: `src/global.d.ts` and `src/types/css-module-declarations.d.ts` provide ambient types for JSX and CSS modules.
- Testing: Unit tests live alongside components (Vitest + React Testing Library). Aim to add tests for any new logic.
- API: The app queries the GitHub GraphQL API; network calls depend on the provided token and GitHub rate limits. You can read about the available queries an mutations [documentation](https://docs.github.com/en/graphql/overview/public-schema) (also check the references on the left)
- Tooling: pnpm is the package manager (version pinned in package.json), TypeScript strict mode is enabled.

## Confirmation checklist

- [ ] pnpm install completes without errors
- [ ] `.env` present and `VITE_GITHUB_TOKEN` set
- [ ] `pnpm dev` starts and the app loads in the browser
- [ ] `pnpm run typecheck` passes (no errors)
- [ ] `pnpm run lint` passes (or only reports acceptable warnings)
- [ ] `pnpm run test` passes
- [ ] `pnpm run build` completes successfully
