import * as React from "react";
import { StyleSheet, css } from "aphrodite";

import AppToolbar from "./AppToolbar";
import AppFooter from "./AppFooter";
import Editor from "./EditorContainer";
import { FileSystemEntry } from "./types";

const findFocusedEntry = (entries: FileSystemEntry[]) =>
  entries.find(({ item, state }) => {
    return item.type === "file" && state.isFocused === true;
  });

const dummyEntries: FileSystemEntry[] = [
  {
    item: {
      type: "file",
      path: "question.html",
      content: "<div>Hello, world!</div>"
    },
    state: {
      isFocused: true
    }
  },
  {
    item: {
      type: "file",
      path: "server.py",
      content: "import thing from thing"
    },
    state: {
      isFocused: false
    }
  }
];

const App: React.FunctionComponent = () => {
  const [fileEntries, setFileEntries] = React.useState(dummyEntries);
  const entry = findFocusedEntry(fileEntries);
  return (
    <div className={css(styles.wrapper)}>
      <AppToolbar />
      <Editor fileEntries={fileEntries} entry={entry} />
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
