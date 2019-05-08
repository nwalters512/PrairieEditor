import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { initVimMode } from "monaco-vim";
import ReactResizeDetector from "react-resize-detector";
import { FileEntry } from "../types";

export interface Props {
  entry: FileEntry | undefined;
  vimModeEnabled: boolean;
  onContentChanged: (content: string) => void;
}

const findModel = (path: string) => {
  return monaco.editor.getModels().find(model => model.uri.path === path);
};

const editorStates = new Map<
  string,
  monaco.editor.ICodeEditorViewState | null | undefined
>();

const Editor: React.FunctionComponent<Props> = ({
  entry,
  vimModeEnabled,
  onContentChanged
}) => {
  if (!entry) {
    return null;
  }

  const { path, contents } = entry.item;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const vimStatusbarRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const vimRef = React.useRef<{ dispose: () => void } | null>(null);
  const subscriptionRef = React.useRef<monaco.IDisposable>();

  // Called when we know we've resized
  const handleResize = () => {
    editorRef.current && editorRef.current.layout();
  };

  // Handles creating the editor after we mount
  React.useEffect(() => {
    if (containerRef.current) {
      const editor = monaco.editor.create(containerRef.current);
      subscriptionRef.current = editor.onDidChangeModelContent(() => {
        const model = editor.getModel();

        if (model) {
          const value = model.getValue();
          onContentChanged(value);
        }
      });
      editorRef.current = editor;
      monaco.editor.setTheme("vs-dark");
      return () => {
        subscriptionRef.current && subscriptionRef.current.dispose();
        editorRef.current && editorRef.current.dispose();
      };
    }
    return () => {};
  }, []);

  // Handles vim keybindings change
  React.useEffect(() => {
    if (
      vimModeEnabled &&
      editorRef.current &&
      vimStatusbarRef.current &&
      !vimRef.current
    ) {
      vimRef.current = initVimMode(editorRef.current, vimStatusbarRef.current);
    }
    return () => {
      if (vimModeEnabled && vimRef.current) {
        vimRef.current.dispose();
        vimRef.current = null;
      }
    };
  }, [vimModeEnabled]);

  // Handles swapping between files when the entry changes
  React.useEffect(() => {
    if (editorRef.current) {
      let model = findModel(path);
      if (!model || model.isDisposed()) {
        // Need to create a new model
        model = monaco.editor.createModel(
          contents,
          undefined,
          monaco.Uri.from({ scheme: "file", path })
        );
      }

      editorRef.current.setModel(model);
      editorRef.current.focus();
      const editorState = editorStates.get(path);
      if (editorState) {
        editorRef.current.restoreViewState(editorState);
      }
      monaco.editor.setTheme("vs-dark");
    }

    return () => {
      if (editorRef.current) {
        editorStates.set(path, editorRef.current.saveViewState());
      }
    };
  }, [path]);

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.outerContainer)}>
        <ReactResizeDetector handleWidth handleHeight onResize={handleResize}>
          <div
            style={{ height: "100%", width: "100%", overflow: "hidden" }}
            ref={containerRef}
          />
        </ReactResizeDetector>
      </div>
      {vimModeEnabled && (
        <div className="bg-dark text-muted px-2 d-flex flex-row">
          <div className="mr-auto">
            <span ref={vimStatusbarRef} />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
    position: "relative"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%",
    minWidth: 0,
    minHeight: 0
  }
});

export default Editor;
