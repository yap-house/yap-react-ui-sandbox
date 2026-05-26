#!/usr/bin/env bash
# =============================================================================
# create-app.sh
# 使用方法: pnpm create:app <app-name>
# 例:       pnpm create:app shadcn-ui
#
# apps/<app-name>/ に Vite + React + TypeScript + Vitest の環境を自動構築する
# =============================================================================
set -euo pipefail

# ── 引数チェック ──────────────────────────────────────────────────────────────
APP_NAME="${1:-}"
if [[ -z "$APP_NAME" ]]; then
  echo "使用方法: pnpm create:app <app-name>"
  echo "例:       pnpm create:app shadcn-ui"
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$REPO_ROOT/apps/$APP_NAME"

if [[ -d "$APP_DIR" ]]; then
  echo "エラー: apps/$APP_NAME はすでに存在します"
  exit 1
fi

echo ""
echo "🚀 apps/$APP_NAME を作成します..."
echo ""

# ── Step 1: Vite プロジェクトを生成（依存インストールは後で行う）────────────
echo "📁 [1/5] Vite プロジェクトを生成中..."
cd "$REPO_ROOT"

# --skip-install は pnpm 経由での create 時に自動インストールを防ぐ
pnpm create vite "apps/$APP_NAME" --template react-ts

# ── Step 2: 設定ファイルを差し替え ───────────────────────────────────────────
echo "⚙️  [2/5] 設定ファイルを作成中..."
cd "$APP_DIR"

# Vite が生成したファイルを削除して独自のものに置き換える
rm -f tsconfig.app.json vite.config.ts eslint.config.js eslint.config.ts

# tsconfig.app.json（ルートの共通設定を継承・アプリコード用）
cat > tsconfig.app.json << 'TSCONFIG_APP'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"],
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
TSCONFIG_APP

# vite.config.ts
cat > vite.config.ts << 'VITE_CONFIG'
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["@yap-react-ui-sandbox/test-config/setup"],
    globals: true,
  },
});
VITE_CONFIG

# ── Step 3: devDependencies のインストール ────────────────────────────────────
echo "📦 [3/5] devDependencies をインストール中..."

# まず Vite が生成した基本 devDeps をインストール（未インストールの場合）
pnpm install

# テスト用パッケージを追加
pnpm add -D \
  vitest \
  "@vitest/ui" \
  jsdom \
  "@testing-library/react" \
  "@testing-library/user-event" \
  "@yap-react-ui-sandbox/test-config@workspace:*"

# ワークスペースルートで再インストール（workspace:* リンクを確立するため）
cd "$REPO_ROOT"
pnpm install
cd "$APP_DIR"

# ── Step 4: package.json の scripts を追加 ────────────────────────────────────
echo "📝 [4/5] package.json にスクリプトを追加中..."
node --input-type=module << 'SCRIPT'
import { readFileSync, writeFileSync } from "fs";

const pkgPath = "package.json";
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

pkg.scripts = {
  "dev":             "vite",
  "build":           "tsc -b && vite build",
  "preview":         "vite preview",
  "test":            "vitest run",
  "test:watch":      "vitest",
  "test:ui":         "vitest --ui",
  "test:coverage":   "vitest run --coverage",
  "storybook":       "storybook dev -p 6006",
  "build-storybook": "storybook build",
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("scripts を更新しました");
SCRIPT

# ── Step 5: サンプルテストファイルを作成 ─────────────────────────────────────
echo "🧪 [5/5] サンプルテストファイルを作成中..."
mkdir -p src/__tests__

cat > src/__tests__/App.test.tsx << 'SAMPLE_TEST'
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
});
SAMPLE_TEST

# ── 完了メッセージ ────────────────────────────────────────────────────────────
echo ""
echo "✅ apps/$APP_NAME の作成が完了しました！"
echo ""
echo "次のステップ:"
echo "  cd apps/$APP_NAME"
echo "  pnpm dev          # 開発サーバー起動 (http://localhost:5173)"
echo "  pnpm test:watch   # テストをウォッチモードで実行"
echo ""
echo "Storybook を追加する場合:"
echo "  cd apps/$APP_NAME"
echo "  pnpm dlx storybook@latest init"
echo ""
