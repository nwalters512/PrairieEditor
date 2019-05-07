import * as React from "react";
import { StyleSheet, css } from "aphrodite";

import AppToolbar from "./AppToolbar";
import AppFooter from "./AppFooter";
import EditorContainer from "./EditorContainer";
import { FileEntry } from "./types";
import axios from "../utils/axios";

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
        contents: file.contents
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

  const entry = findFocusedEntry(fileEntries);
  return (
    <div className={css(styles.wrapper)}>
      <AppToolbar />
      <EditorContainer
        fileEntriesLoading={filesLoading}
        fileEntries={fileEntries}
        entry={entry}
      />
      <AppFooter />
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw"
  }
});

export default App;
