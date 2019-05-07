import * as React from "react";
import { FileEntry } from "../types";

export interface Props {
  entry: FileEntry;
  onOpen: (path: string) => void;
}

const FileTreeItem: React.FunctionComponent<Props> = props => {
  const { onOpen, entry } = props;
  console.log(entry);
  return <div onClick={() => onOpen(entry.item.path)}>{entry.item.path}</div>;
};

export default FileTreeItem;
