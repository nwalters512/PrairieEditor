import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import ResizablePane from "../shared/ResizablePane";
import { FileEntry } from "../types";
import FileTreeItem from "./FileTreeItem";
import { openEntry } from "../../actions/openEntry";

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
      <ResizablePane direction="horizontal" className={css(styles.pane)}>
        <div className={css(styles.innerPane)}>
          {fileEntries.map(entry => (
            <FileTreeItem
              entry={entry}
              key={entry.item.path}
              onOpen={path =>
                onEntriesChange(openEntry(fileEntries, path, true))
              }
            />
          ))}
        </div>
      </ResizablePane>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  pane: {
    width: 240,
    minWidth: 240
  },
  innerPane: {
    overflowX: "scroll",
    height: "100%"
  }
});

export default FileTree;
