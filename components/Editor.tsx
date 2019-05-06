import * as React from "react";
import MonacoEditor from "react-monaco-editor";
import ReactResizeDetector from "react-resize-detector";

const Editor: React.FunctionComponent = () => {
  const editorRef = React.useRef<MonacoEditor>(null);
  const handleResize = () => {
    console.log("resize!");
    console.log(editorRef.current);
    console.log(editorRef.current!.editor);
    editorRef.current &&
      editorRef.current.editor &&
      editorRef.current.editor.layout();
  };
  return (
    <div>
      <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <MonacoEditor value="hello, world!" theme="vs-dark" ref={editorRef} />
      </div>
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize} />
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          flex: 1 1 0%;
          background-color: yellow;
          min-width: 0;
          min-height: 0;
        }
      `}</style>
    </div>
  );
};

export default Editor;
