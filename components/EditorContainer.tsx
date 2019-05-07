import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import FileTree from "./FileTree/FileTree";
import DynamicEditor from "./DynamicEditor";
import { FileEntry } from "./types";

export interface Props {
  fileEntriesLoading: boolean;
  fileEntries: FileEntry[];
  entry?: FileEntry;
}

const EditorContainer: React.FunctionComponent<Props> = props => {
  const { fileEntriesLoading, fileEntries, entry } = props;
  return (
    <div className={css(styles.editor)}>
      <FileTree
        fileEntriesLoading={fileEntriesLoading}
        fileEntries={fileEntries}
        entry={entry}
      />
      <DynamicEditor
        path={entry && entry.item.path}
        contents={entry && entry.item.contents}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  editor: {
    display: "flex",
    flexDirection: "row",
    flex: "1 1 0%"
  }
});

export default EditorContainer;
