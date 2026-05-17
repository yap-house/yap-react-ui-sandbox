import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // テストファイルの場所
  testDir: "./e2e",

  // 各テストのタイムアウト
  timeout: 30_000,

  // 全テストのタイムアウト
  globalTimeout: 600_000,

  // CI 環境では失敗時のリトライを 2 回行う
  retries: process.env.CI ? 2 : 0,

  // 並列実行の設定（CI では 1 ワーカーに絞る）
  workers: process.env.CI ? 1 : undefined,

  // テスト結果レポートの形式
  reporter: [["html", { outputFolder: "playwright-report" }]],

  use: {
    // テスト失敗時にスクリーンショットを撮る
    screenshot: "only-on-failure",

    // テスト失敗時にトレースを記録する（デバッグ用）
    trace: "on-first-retry",
  },

  projects: [
    // ── デスクトップブラウザ ──
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    // ── モバイル（必要に応じてコメント解除） ──
    // {
    //   name: "mobile-chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "mobile-safari",
    //   use: { ...devices["iPhone 12"] },
    // },
  ],

  // ── アプリごとに dev server を起動してからテスト ──
  // apps/ が作成されたら各エントリを有効にする
  // webServer: [
  //   {
  //     command: "pnpm --filter shadcn-ui dev",
  //     url: "http://localhost:5173",
  //     reuseExistingServer: !process.env.CI,
  //   },
  //   {
  //     command: "pnpm --filter material-ui dev",
  //     url: "http://localhost:5174",
  //     reuseExistingServer: !process.env.CI,
  //   },
  // ],
});
