import * as React from "react";
import ResizablePane from "../shared/ResizablePane";
import css from "styled-jsx/css";
import { FileEntry } from "../types";
import FileTreeItem from "./FileTreeItem";
import { openEntry } from "../../actions/openEntry";

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
  onEntriesChange: (entries: FileEntry[]) => void;
}

const FileTree: React.FunctionComponent<Props> = props => {
  const { fileEntries, onEntriesChange } = props;
  return (
    <React.Fragment>
      <ResizablePane direction="horizontal" className={className}>
        {fileEntries.map(entry => (
          <FileTreeItem
            entry={entry}
            key={entry.item.path}
            onOpen={path => onEntriesChange(openEntry(fileEntries, path, true))}
          />
        ))}
      </ResizablePane>
      {styles}
    </React.Fragment>
  );
};

export default FileTree;
