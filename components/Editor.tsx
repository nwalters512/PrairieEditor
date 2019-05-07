import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import MonacoEditor from "react-monaco-editor";
import { editor, Uri } from "monaco-editor";
import ReactResizeDetector from "react-resize-detector";

export interface Props {
  contents: string;
  path: string;
}

const findModel = (path: string) => {
  return editor.getModels().find(model => model.uri.path === path);
};

const editorStates = new Map<
  string,
  editor.ICodeEditorViewState | null | undefined
>();

const Editor: React.FunctionComponent<Props> = props => {
  const { contents, path } = props;
  const editorRef = React.useRef<MonacoEditor>(null);

  const handleResize = () => {
    editorRef.current &&
      editorRef.current.editor &&
      editorRef.current.editor.layout();
  };

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      let model = findModel(path);
      if (!model || model.isDisposed()) {
        console.log(editor.getModels());
        // Need to create a new model
        model = editor.createModel(
          contents,
          undefined,
          Uri.from({ scheme: "file", path })
        );
      }

      editorRef.current.editor.setModel(model);
      const editorState = editorStates.get(path);
      if (editorState) {
        editorRef.current.editor.restoreViewState(editorState);
      }
      editor.setTheme("vs-dark");
    }

    return () => {
      if (editorRef.current && editorRef.current.editor) {
        editorStates.set(path, editorRef.current.editor.saveViewState());
      }
    };
  }, [path]);
  return (
    <div className={css(styles.container)}>
      <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <MonacoEditor theme="vs-dark" ref={editorRef} />
      </div>
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
