import * as React from "react";
import FileTree from "./FileTree";
import DynamicEditor from "./DynamicEditor";

const EditorContainer: React.FunctionComponent = () => {
  return (
    <div className="editor">
      <FileTree />
      <DynamicEditor />
      <style jsx>{`
        .editor {
          display: flex;
          flex-direction: row;
          flex: 1 1 0%;
        }
      `}</style>
    </div>
  );
};

export default EditorContainer;
