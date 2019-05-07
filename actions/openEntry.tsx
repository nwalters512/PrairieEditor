import { FileEntry } from "../components/types";
import updateEntry from "./updateEntry";

export function openEntry(
  entries: FileEntry[],
  path: string,
  focus: boolean = true
) {
  return entries.map(entry => {
    if (entry.item.path === path) {
      return updateEntry(entry, { state: { isOpen: true, isFocused: focus } });
    } else {
      if (entry.state.isFocused) {
        return updateEntry(entry, { state: { isFocused: false } });
      }
    }
    return entry;
  });
}
