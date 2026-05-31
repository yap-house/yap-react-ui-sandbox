import type { Monaco } from "@monaco-editor/react";
import { useCallback } from "react";

/**
 * Custom hook to configure the Monaco editor before it mounts, setting up TypeScript compiler options and declaring necessary types for the playground scope.
 * @param scope - An object representing the variables and components available in the playground's scope, which will be declared as any in the Monaco editor to avoid "cannot find name" errors.
 * @returns A callback function that can be passed to the Monaco editor's beforeMount prop to configure the editor with the appropriate TypeScript settings and declarations.
 * @example
 * const scope = { MyComponent };
 * const beforeMount = useBeforeMountEditor(scope);
 * <Editor beforeMount={beforeMount} ... />
 */
export function useBeforeMountEditor(
  scope: Record<string, unknown>,
): (monaco: Monaco) => void {
  return useCallback(
    (monaco: Monaco) => {
      // Configure TypeScript compiler options
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.React,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        strict: false,
      });

      // Declare scope variables, JSX intrinsic elements, and the render function
      const declarations = [
        // Resolve "cannot find name" errors for HTML elements
        `declare namespace JSX {
          interface Element {}
          interface IntrinsicElements { [elemName: string]: any; }
        }`,
        // render function used in react-live's noInline mode
        "declare function render(element: any): void;",
        // Declare all variables passed via scope as any
        ...Object.keys(scope).map((key) => `declare const ${key}: any;`),
      ].join("\n");

      // Add the declarations to Monaco's TypeScript language service
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        declarations,
        "file:///node_modules/@types/playground-scope/index.d.ts",
      );
    },
    [scope],
  );
}
