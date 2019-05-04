import * as React from "react";

const Editor: React.FunctionComponent = () => {
  return (
    <div className="editor">
      <div className="filetree">File tree</div>
      <div className="monaco">Monaco editor</div>
      <style jsx>{`
        .editor {
          display: flex;
          flex-direction: row;
          flex: 1 1 0%;
        }
        .filetree {
          width: 300px;
          background-color: green;
        }
        .monaco {
          display: flex;
          flex-direction: column;
          flex: 1 1 0%;
          background-color: yellow;
        }
      `}</style>
    </div>
  );
};

export default Editor;
