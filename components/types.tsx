export type FileEntry = Readonly<{
  item: {
    path: string;
    contents: string;
  };
  state: {
    isOpen?: boolean;
    isFocused?: boolean;
    isSelected?: boolean;
    isCreating?: boolean;
    isExpanded?: false;
  };
}>;
