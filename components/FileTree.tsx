import * as React from "react";
import ResizablePane from "./shared/ResizablePane";
import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  div {
    width: 240px;
    min-width: 240px;
  }
`;

const FileTree: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <ResizablePane direction="horizontal" className={className}>
        This is some content!
      </ResizablePane>
      {styles}
    </React.Fragment>
  );
};

export default FileTree;
