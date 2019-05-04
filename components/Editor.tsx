import * as React from "react";

const Editor: React.FunctionComponent = () => {
  return (
    <div className="editor">
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

export default Editor;
