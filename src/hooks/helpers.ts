
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

