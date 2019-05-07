import * as React from "react";
import ResizablePane from "../shared/ResizablePane";
import css from "styled-jsx/css";
import { FileEntry } from "../types";
import FileTreeItem from "./FileTreeItem";

const { className, styles } = css.resolve`
  div {
    width: 240px;
    min-width: 240px;
  }
`;

export interface Props {
  fileEntriesLoading: boolean;
  fileEntries: FileEntry[];
  entry?: FileEntry;
}

const FileTree: React.FunctionComponent<Props> = props => {
  const { fileEntries } = props;
  return (
    <React.Fragment>
      <ResizablePane direction="horizontal" className={className}>
        <div>
          {fileEntries.map(entry => (
            <FileTreeItem entry={entry} key={entry.item.path} />
          ))}
        </div>
      </ResizablePane>
      {styles}
    </React.Fragment>
  );
};

export default FileTree;
