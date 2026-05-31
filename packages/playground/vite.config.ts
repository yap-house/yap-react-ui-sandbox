import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      bundleTypes: true,
    }),
  ],
  publicDir: false,
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
      external: ["react", "react-dom"],
    },
  },
});
