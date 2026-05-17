import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImort from "eslint-plugin-import";
import pluginStorybook from "eslint-plugin-storybook";
import configPrettier from "eslint-config-prettier";
import oxlint from "eslint-plugin-oxlint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //----------------------------------------------
  // 除外ファイルの定義
  //----------------------------------------------
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.storybook/**",
      "**/storybook-static/**",
      "**/node_modules/**",
    ],
  },
  //---------------------------------------------
  // JS ファイルの推奨ルール
  //----------------------------------------------
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  // TypeScript 推奨ルール
  ...tseslint.configs.recommended,
  //--------------------------------------------
  // React アプリ本体の設定
  // apps/ 以下の .tsx/.ts ファイルに適用される
  //---------------------------------------------
  {
    files: ["apps/**/*.{ts,tsx}"],
    plugins: {
      react: pluginReact,
      // eslint-plugin-react-hooks v7 の型が ESLint v10 の Plugin 型と互換性がないため cast
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "react-hooks": pluginReactHooks as any,
      "jsx-a11y": pluginJsxA11y,
      import: pluginImort,
    },
    languageOptions: {
      // ブラウザ環境のグローバル変数(window, documentなど)を有効にする
      globals: globals.browser,

      // JSX を解析するための設定
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      // React のバージョンを自動検出する設定
      react: { version: "detect" },
    },
    rules: {
      // React 17 以降は React をインポートする必要がないため、以下のルールをオフにする
      "react/react-in-jsx-scope": "off",

      // PropTypes を使用しないため、以下のルールをオフにする
      "react/prop-types": "off",

      // React Hooks のルールを有効にする
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // アクセシビリティのルールを有効にする
      ...pluginJsxA11y.configs.recommended.rules,
    },
  },
  //--------------------------------------------
  // Storybook の設定
  //---------------------------------------------
  // eslint-plugin-storybook v10 の型が ESLint v10 の Linter.Config 型と互換性がないため cast
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(pluginStorybook.configs["flat/recommended"] as any[]),
  //--------------------------------------------
  // oxlint との併用設定
  // oxlint がサポートするESLintルールをOFFにして二重チェックを防ぐ
  // ※ Prettier と同様に必ず末尾付近に配置する
  //---------------------------------------------
  oxlint.configs["flat/recommended"],
  //--------------------------------------------
  // Prettier の設定
  // すべてのファイルに適用される
  //---------------------------------------------
  configPrettier,
]);
