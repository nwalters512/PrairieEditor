import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import ReactResizeDetector from "react-resize-detector";
import { FileEntry } from "./types";

export interface Props {
  entry: FileEntry | undefined;
}

const findModel = (path: string) => {
  return monaco.editor.getModels().find(model => model.uri.path === path);
};

const editorStates = new Map<
  string,
  monaco.editor.ICodeEditorViewState | null | undefined
>();

const Editor: React.FunctionComponent<Props> = ({ entry }) => {
  if (!entry) {
    return null;
  }

  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Called when we know we've resized
  const handleResize = () => {
    editorRef.current && editorRef.current.layout();
  };

  // Handles creating the editor after we mount
  React.useEffect(() => {
    if (containerRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current);
      monaco.editor.setTheme("vs-dark");
      return () => editorRef.current && editorRef.current.dispose();
    }
    return () => {};
  }, [containerRef.current]);
  const { path, contents } = entry.item;

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
      <div
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
        ref={containerRef}
      />
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%",
    minWidth: 0,
    minHeight: 0
  }
});

export default Editor;
