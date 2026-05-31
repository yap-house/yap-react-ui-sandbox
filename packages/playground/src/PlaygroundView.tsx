import { Editor } from "@monaco-editor/react";
import React, { useCallback, useMemo, useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import styled from "styled-components";
import { transform } from "@babel/standalone";
import { useBeforeMountEditor } from "./hooks/useBeforeMountEditor";

/** Default code to be displayed in the playground */
const DEFAULT_CODE: string = `function Counter({ message }: { message: string }) {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>{message}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

render(<Counter message="Hello, World!" />);
`;

/** Props for the PlaygroundView component */
export interface PlaygroundViewProps {
  /** An object representing the variables and components available in the playground's scope */
  scope?: Record<string, unknown>;
  /** An optional string of code to be displayed in the editor by default */
  defaultCode?: string;
}

/**
 * PlaygroundView component that provides a live code editor and preview using react-live.
 * @param props - The props for the PlaygroundView component, including an optional scope for the editor and default code to display.
 * @returns The playground UI consisting of a Monaco editor pane and a live preview pane.
 * @example
 * // Minimal usage with default code
 * <PlaygroundView />
 * @example
 * // With custom default code and scoped components
 * <PlaygroundView
 *   defaultCode="render(<MyButton label='Click me' />);"
 *   scope={{ MyButton }}
 * />
 */
export const PlaygroundView = React.memo(function PlaygroundView({
  scope = {},
  defaultCode = DEFAULT_CODE,
}: PlaygroundViewProps): React.ReactNode {
  /** State to hold the current code in the editor */
  const [code, setCode] = useState(defaultCode);

  /** Options for the Monaco editor */
  const editorOptions = useMemo(() => {
    return {
      minimap: { enabled: false },
      fontSize: 14,
      scrollBeyondLastLine: false,
    };
  }, []);

  /** Memoized scope for the live code editor, including React and styled-components */
  const overrideScope = useMemo(() => {
    return { ...scope, React, styled };
  }, [scope]);

  /** Handler for changes in the Monaco editor */
  const handleChange = useCallback((value: string | undefined) => {
    setCode(value ?? "");
  }, []);

  /** Configures Monaco TypeScript settings before the editor mounts */
  const handleBeforeMount = useBeforeMountEditor(overrideScope);

  return (
    <LiveProvider
      scope={overrideScope}
      code={code}
      noInline
      transformCode={transformCode}
    >
      <Layout>
        <EditorPane>
          <Editor
            path="App.tsx"
            height="100%"
            defaultValue={defaultCode}
            language="typescript"
            onChange={handleChange}
            beforeMount={handleBeforeMount}
            theme={"vs-dark"}
            options={editorOptions}
          />
        </EditorPane>

        <PreviewPane>
          <LivePreview />
          <LiveError />
        </PreviewPane>
      </Layout>
    </LiveProvider>
  );
});

/**
 * Transforms the input code using Babel to ensure it can be executed in the live preview.
 * @param code - The code string to be transformed.
 * @returns The transformed code string that can be executed in the live preview. If transformation fails, returns the original code.
 */
function transformCode(code: string): string {
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

/** Layout component for the playground view */
const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

/** Editor pane component for the playground view */
const EditorPane = styled.div`
  overflow: hidden;
`;

/** Preview pane component for the playground view */
const PreviewPane = styled.div`
  padding: 16px;
  overflow: auto;
`;
