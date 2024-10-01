
export function extractKeys(e: KeyboardEvent) {
  const CTRL_KEY = e.ctrlKey || e.metaKey;
  const SHIFT_KEY = e.shiftKey;
  const ALT_KEY = e.altKey;
  const KEY = e.key.toLowerCase();

  return { CTRL_KEY, SHIFT_KEY, ALT_KEY, KEY };
}

interface FormatShortcutProps {
  CTRL_KEY?: boolean;
  SHIFT_KEY?: boolean;
  ALT_KEY?: boolean;
  KEY?: string;
}

export function formatShortcut({ CTRL_KEY, SHIFT_KEY, ALT_KEY, KEY }: FormatShortcutProps) {
  let formattedShortcut = "";
  if (CTRL_KEY) formattedShortcut += "CommandOrControl+";
  if (SHIFT_KEY) formattedShortcut += "Shift+";
  if (ALT_KEY) formattedShortcut += "Alt+";
  if (KEY) formattedShortcut += KEY;
  return formattedShortcut.toLowerCase();
}

export function prettierShortcut(shortcut: string) {
  let formattedShortcut = shortcut.replace(/\+/g, " + ");
  formattedShortcut = formattedShortcut.replace("CommandOrControl", "Cmd/Ctrl");

  return formattedShortcut;
}

const FILE_PATH_REGEX = /\/|\\/g;
export function extractFileInfoFromPath(filePath: string) {
  const lastItem = filePath.split(FILE_PATH_REGEX).pop();
  let parts = lastItem?.split(".");
  const extension = parts?.pop() ?? "";
  const name = (parts?.join(".") ?? "").replace(/\n/g, "").trim();
  return { name, extension };
}


export function isFile(path: string) {
  const lastItem = path.split(FILE_PATH_REGEX).pop();
  let parts = lastItem?.split(".");
  const extension = parts?.pop() ?? "";
  return extension.length > 0
}
