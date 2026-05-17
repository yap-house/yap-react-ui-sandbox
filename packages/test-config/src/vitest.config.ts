/**
 * 共通の Vitest 設定
 * 各 apps/ の vite.config.ts の test フィールドに渡して使う
 *
 * @example
 * import { vitestConfig } from "@yap-react-ui-sandbox/test-config/vitest";
 * export default defineConfig({ test: vitestConfig });
 */
export const vitestConfig = {
  // jsdom でブラウザ環境をシミュレートする
  environment: "jsdom",

  // @testing-library/jest-dom のカスタムマッチャーをセットアップする
  setupFiles: ["@yap-react-ui-sandbox/test-config/setup"],

  // describe / it / expect を import なしで使えるようにする
  globals: true,
};
