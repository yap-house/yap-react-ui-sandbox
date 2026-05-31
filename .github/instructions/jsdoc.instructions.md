---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

## JSDoc Instructions

- All JSDoc comments must be written in English.

### What to document

- Document all exported symbols (functions, types, interfaces, constants, React components).
- Use JSDoc comments for any code block whose purpose or behavior is not immediately self-evident from its name and types alone (e.g., non-obvious algorithms, workarounds, or domain-specific logic).
- For non-exported symbols, JSDoc is optional but encouraged when the implementation is non-obvious. At minimum, add a single-line description comment.

### How to write JSDoc

- Provide clear and concise descriptions for each documented item.
- Use `@param` to describe what each parameter represents; do not include type annotations (e.g., `{string}`) — the TypeScript type system handles types.
- Use `@returns` to describe the return value's meaning; omit type annotations for the same reason.
- Use `@throws` to document error conditions and the type of error thrown.
- Use `@example` for every exported function, React component, and helper module. Each example must show a realistic call with concrete argument values and, where the return value is non-obvious, a comment showing the expected result.
- Use `@deprecated` with a migration note when marking APIs as obsolete.
- Ensure JSDoc comments are kept up-to-date and accurately reflect the code they describe.

### TypeScript-specific

- In TypeScript, prefer interfaces and type aliases over `@typedef`; reserve `@typedef` only for plain JavaScript files.

### React-specific

- For React components, document the props interface with a JSDoc comment on the interface itself and a `@param props` description in the component's JSDoc block describing what the component renders.
