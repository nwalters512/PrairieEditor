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
import Preview, { PreviewHandles } from "./Preview/Preview";
import updateEntry from "../actions/updateEntry";

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

const makeApiFilesFromEntries = (entries: FileEntry[]): APIFile[] => {
  return entries.map(entry => ({
    path: entry.item.path,
    contents: Base64.encode(entry.item.contents)
  }));
};

const courseInstanceId = 1;
const questionId = 3;

const App: React.FunctionComponent = () => {
  const [filesLoading, setFilesLoading] = React.useState(true);
  const [fileEntries, setFileEntries] = React.useState<FileEntry[]>([]);
  const previewRef = React.useRef<PreviewHandles>(null);
  const vimMode = useBoolean(false);

  React.useEffect(() => {
    setFilesLoading(true);
    axios
      .get(
        `/course_instances/${courseInstanceId}/questions/${questionId}/files`
      )
      .then(res => {
        setFilesLoading(false);
        setFileEntries(makeEntriesFromApi(res.data));
      })
      .catch(err => console.error(err));
  }, []);

  const onEntriesChange = (entries: FileEntry[]) => {
    setFileEntries(entries);
  };

  const onContentChanged = (contents: string) => {
    setFileEntries(entries => {
      return entries.map(entry => {
        if (entry.state.isFocused === true) {
          return updateEntry(entry, { item: { contents } });
        }
        return entry;
      });
    });
  };

  const onSave = () => {
    const files = makeApiFilesFromEntries(fileEntries);
    axios
      .post(
        `/course_instances/${courseInstanceId}/questions/${questionId}/files`,
        files
      )
      .then(res => {
        console.log("save successful!");
        previewRef.current && previewRef.current.reload();
      })
      .catch(err => console.error(err));
  };

  const entry = findFocusedEntry(fileEntries);
  return (
    <div className={css(styles.wrapper)}>
      <AppToolbar onSave={onSave} />
      <div className={css(styles.editor)}>
        <FileTree
          fileEntriesLoading={filesLoading}
          fileEntries={fileEntries}
          entry={entry}
          onEntriesChange={onEntriesChange}
        />
        <DynamicEditor
          entry={entry}
          vimModeEnabled={vimMode.value}
          onContentChanged={onContentChanged}
        />
        <ResizablePane direction="horizontal" position="start">
          <Preview
            courseInstanceId={courseInstanceId}
            questionId={questionId}
            ref={previewRef}
          />
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
