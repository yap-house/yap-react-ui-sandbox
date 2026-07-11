import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  resolve: {
    // Prefer ESM builds when bundling third-party packages
    conditions: ["import", "browser", "default"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["@yap-react-ui-sandbox/test-config/setup"],
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/],
    },
  },
});
