# yap-react-ui-sandbox

A monorepo sandbox for experimenting with React UI component libraries.
Each app under `apps/` integrates a different UI library (Material UI, shadcn/ui, etc.) with a shared live code playground powered by Monaco Editor and react-live.

---

## Tech Stack

| Category        | Technology                    |
| --------------- | ----------------------------- |
| Package manager | pnpm 11 (workspaces)          |
| Runtime         | Node.js 26 (managed by Volta) |
| Language        | TypeScript 6                  |
| Build           | Vite 8                        |
| UI              | React 19                      |
| Styling         | styled-components 6           |
| Unit testing    | Vitest 4 + Testing Library    |
| E2E testing     | Playwright                    |
| Linting         | oxlint                        |
| Formatting      | Prettier                      |

---

## Prerequisites

- [Volta](https://volta.sh/) — automatically pins Node.js and pnpm versions
- Node.js 26.1.0 (managed by Volta)
- pnpm 11.2.2 (managed by Volta)

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start a specific app (e.g., material-ui)
pnpm --filter @yap-react-ui-sandbox/material-ui dev
```

---

## Project Structure

```
yap-react-ui-sandbox/
├── apps/                          # Demo apps (one per UI library)
│   └── <app-name>/                # Created via `pnpm create:app <name>`
├── packages/
│   ├── playground/                # Live code editor component (Monaco + react-live)
│   └── test-config/               # Shared Vitest configuration
├── scripts/
│   └── create-app.sh              # Scaffold script for new apps
├── .github/
│   └── instructions/              # GitHub Copilot instruction files
├── tsconfig.base.json             # Shared TypeScript base configuration
├── playwright.config.ts           # Root Playwright configuration
├── oxlint.config.ts               # Shared lint configuration
└── prettier.config.mjs            # Shared Prettier configuration
```

---

## Packages

### `@yap-react-ui-sandbox/playground`

A live code playground component.
Provides a Monaco Editor (TypeScript/JSX) paired with a react-live preview pane.
Consumed by apps to allow interactive component experimentation.

→ See [packages/playground/README.md](packages/playground/README.md)

### `@yap-react-ui-sandbox/test-config`

Shared Vitest configuration used by all apps and packages.

---

## Available Scripts

### Root

```bash
pnpm create:app <name>    # Scaffold a new app under apps/<name>/
pnpm lint                 # Run oxlint across the workspace
pnpm test                 # Run all unit tests + E2E tests
pnpm test:unit            # Run Vitest across all apps and packages
pnpm test:e2e             # Run Playwright E2E tests
pnpm test:e2e:ui          # Run Playwright with interactive UI
pnpm playwright:install   # Install Playwright browsers
```

### Per package / app

```bash
pnpm --filter <package> dev       # Start dev server
pnpm --filter <package> build     # Build
pnpm --filter <package> test      # Run unit tests
```

---

## Creating a New App

```bash
pnpm create:app <app-name>
```

Scaffolds a new Vite + React + TypeScript + Vitest app under `apps/<app-name>/` and wires it into the workspace automatically.

**Example:**

```bash
pnpm create:app material-ui
```

---

## Development Conventions

### Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

```
feat(playground): add live preview component
fix(material-ui): resolve hydration error
chore: update pnpm-lock.yaml
docs: update root README
```

### TypeScript

- No `any` — use `unknown` with type guards
- No `React.FC` — use plain function components with explicit `React.ReactNode` return type
- `interface` for object shapes and React props; `type` for unions and utility types
- `import type` for type-only imports

### JSDoc

- All JSDoc comments in English
- Document all exported symbols with `@param`, `@returns`, and `@example`
- Props: document each property on the `interface`, use `@param props` on the component

### Testing

- Unit tests: Vitest + Testing Library (co-located or in `__tests__/`)
- E2E tests: Playwright (in `tests/` at the root)

---

## Versioning

Packages under `packages/` follow independent [Semantic Versioning](https://semver.org/).
Apps under `apps/` are deployment targets and do not require versioning.
