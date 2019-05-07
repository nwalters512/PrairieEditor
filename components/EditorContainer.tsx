import * as React from "react";
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
    <div className="editor">
      <FileTree
        fileEntriesLoading={fileEntriesLoading}
        fileEntries={fileEntries}
        entry={entry}
      />
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
