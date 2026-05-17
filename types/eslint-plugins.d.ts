// eslint-plugin-jsx-a11y は TypeScript 型定義を同梱していないため手動で宣言する
// @types/eslint-plugin-jsx-a11y は npm に存在しない
declare module "eslint-plugin-jsx-a11y" {
  // eslint.config.ts で pluginJsxA11y.configs.recommended.rules を使用するための最小限の型
  const plugin: {
    configs: {
      recommended: { rules: Record<string, unknown> };
      strict: { rules: Record<string, unknown> };
    };
    rules: Record<string, unknown>;
  };
  export default plugin;
}
