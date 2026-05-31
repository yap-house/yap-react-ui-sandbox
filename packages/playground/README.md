# @yap-react-ui-sandbox/playground

A live code playground component for the `yap-react-ui-sandbox` monorepo.
Provides an in-browser TypeScript/JSX editor (Monaco Editor) with real-time preview (react-live).

---

## Features

- **Monaco Editor** — VS Code-grade editor with TypeScript and JSX syntax support
- **Live preview** — Code changes are reflected in the preview pane instantly via react-live
- **Scoped execution** — Pass any component or value as `scope` to make it available in the editor
- **Babel transform** — TypeScript + JSX code is transpiled in the browser via `@babel/standalone`
- **styled-components** — Bundled and available in the editor scope by default

---

## Usage

This package is private and intended to be consumed within the monorepo.

```tsx
import { PlaygroundView } from "@yap-react-ui-sandbox/playground";

// Minimal — uses built-in default code (a Counter component example)
<PlaygroundView />

// With custom default code and scoped components
<PlaygroundView
  defaultCode="render(<MyButton label='Click me' />);"
  scope={{ MyButton }}
/>
```

---

## Props

### `PlaygroundViewProps`

| Prop          | Type                      | Default         | Description                                                   |
| ------------- | ------------------------- | --------------- | ------------------------------------------------------------- |
| `scope`       | `Record<string, unknown>` | `{}`            | Variables and components available in the live editor's scope |
| `defaultCode` | `string`                  | Counter example | Initial code displayed in the editor                          |

#### Always available in scope

The following are always injected regardless of `scope`:

| Name     | Value               |
| -------- | ------------------- |
| `React`  | `react`             |
| `styled` | `styled-components` |

---

## Architecture

```
PlaygroundView
├── Monaco Editor          — TypeScript/JSX editor (path="App.tsx" for TSX support)
│   └── useBeforeMountEditor — Configures TS compiler options and scope type declarations
└── react-live
    ├── LiveProvider       — Executes transformed code with the given scope
    ├── LivePreview        — Renders the output of render()
    └── LiveError          — Displays runtime/transform errors
```

Code entered in the editor is transformed by `@babel/standalone` (presets: `react`, `typescript`) before being passed to `LiveProvider`.
The editor uses `noInline` mode, so the entry point must be an explicit `render(...)` call.

---

## Development

```bash
# Start dev server (Vite)
pnpm dev

# Build library (outputs to dist/)
pnpm build

# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

---

## Dependencies

| Package                | Role                                 |
| ---------------------- | ------------------------------------ |
| `@monaco-editor/react` | Code editor component                |
| `react-live`           | Live preview engine                  |
| `@babel/standalone`    | In-browser TypeScript/JSX transform  |
| `styled-components`    | CSS-in-JS, available in editor scope |

**Peer dependencies:** `react ^19.0.0`, `react-dom ^19.0.0`
