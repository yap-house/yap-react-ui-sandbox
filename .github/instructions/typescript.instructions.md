---
applyTo: "**/*.{ts,tsx}"
---

## TypeScript Code Style Guidelines

### General Principles

- All comments must be written in English.
- Write clear, concise, and self-explanatory code. Strive for readability and maintainability.
- Avoid unnecessary complexity; prefer simple and straightforward solutions.

### Type Safety

- Never use `any`. Use `unknown` for values of unknown type and narrow with type guards.
- Always provide explicit return types on exported functions and methods.
- Use type assertions (`as`) only as a last resort; prefer type narrowing (e.g., `typeof`, `instanceof`, discriminated unions).
- Enable and respect strict mode; do not suppress TypeScript errors with `@ts-ignore` or `@ts-expect-error` without a comment explaining why.
- Use `readonly` for properties and arrays that should not be mutated.

### Types and Interfaces

- Use `interface` for object shapes and React component props — they are extendable and produce clearer error messages.
- Use `type` for union types, intersection types, mapped types, and utility type aliases.
- Avoid enums; prefer union types (e.g., `type Direction = 'left' | 'right'`) for better tree-shaking and type inference.

### Naming Conventions

- Types, interfaces, classes, and React components: `PascalCase`
- Variables, functions, and methods: `camelCase`
- Boolean variables and props: prefix with `is`, `has`, or `can` (e.g., `isLoading`, `hasError`)

### Imports

- Use `import type` for type-only imports to avoid runtime overhead.
- Group imports in the following order: external packages → internal modules → types.

### React + TypeScript

- Define component props as a named `interface` (not inline or with `type`).
- Do not use `React.FC` or `React.FunctionComponent`; write plain function components with an explicit return type of `React.ReactNode`.
- Prefer `React.ReactNode` over `JSX.Element` as a return type to allow `null` and `string` children.
