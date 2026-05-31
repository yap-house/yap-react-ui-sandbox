import { transform } from "@babel/standalone";

/**
 * Transforms the input code using Babel to ensure it can be executed in the live preview.
 * @param code - The code string to be transformed.
 * @returns The transformed code string that can be executed in the live preview. If transformation fails, returns the original code.
 */
export function transformCode(code: string): string {
  try {
    return (
      transform(code, {
        presets: ["react", "typescript"],
        filename: "playground.tsx",
      }).code ?? ""
    );
  } catch {
    return code;
  }
}
