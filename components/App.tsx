import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import { Base64 } from "js-base64";

import AppToolbar from "./AppToolbar";
import AppFooter from "./AppFooter";
import DynamicEditor from "./Editor/DynamicEditor";
import { FileEntry } from "./types";
import axios from "../utils/axios";
import FileTree from "./FileTree/FileTree";
import { useBoolean } from "react-hanger";
import ResizablePane from "./shared/ResizablePane";
import Preview from "./Preview/Preview";

const findFocusedEntry = (entries: FileEntry[]) =>
  entries.find(({ state }) => state.isFocused === true);

interface APIFile {
  path: string;
  contents: string;
}

const makeEntriesFromApi = (files: APIFile[]): FileEntry[] => {
  const entries = files.map(
    (file): FileEntry => ({
      item: {
        path: file.path,
        contents: Base64.decode(file.contents)
      },
      state: {}
    })
  );

  // Mark the first file as open
  entries[0].state.isFocused = true;
  entries[0].state.isOpen = true;
  return entries;
};

const App: React.FunctionComponent = () => {
  const [filesLoading, setFilesLoading] = React.useState(true);
  const [fileEntries, setFileEntries] = React.useState<FileEntry[]>([]);
  const vimMode = useBoolean(false);
  React.useEffect(() => {
    setFilesLoading(true);
    axios
      .get("/course_instances/1/questions/1/files")
      .then(res => {
        setFilesLoading(false);
        setFileEntries(makeEntriesFromApi(res.data));
      })
      .catch(err => console.error(err));
  }, []);

  const onEntriesChange = React.useCallback(
    newFileEntries => {
      setFileEntries(newFileEntries);
    },
    [setFileEntries]
  );

  const entry = findFocusedEntry(fileEntries);
  return (
    <div className={css(styles.wrapper)}>
      <AppToolbar />
      <div className={css(styles.editor)}>
        <FileTree
          fileEntriesLoading={filesLoading}
          fileEntries={fileEntries}
          entry={entry}
          onEntriesChange={onEntriesChange}
        />
        <DynamicEditor entry={entry} vimModeEnabled={vimMode.value} />
        <ResizablePane direction="horizontal" position="start">
          <Preview />
        </ResizablePane>
      </div>
      <AppFooter
        vimModeEnabled={vimMode.value}
        toggleVimModeEnabled={vimMode.toggle}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw"
  },
  editorContainer: {
    display: "flex",
    flexDirection: "row",
    minHeight: 0,
    minWidth: 0,
    flex: "1 1 0%"
  },
  editor: {
    display: "flex",
    flexDirection: "row",
    minHeight: 0,
    minWidth: 0,
    flex: "1 1 0%"
  }
});

export default App;
