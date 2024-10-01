import { GLOBAL_SHORTCUTS } from "@/constants";
import { extractKeys, formatShortcut } from "@/helpers";
import { useEffect } from "react";

export function useGlobalShortcuts() {

  function bindGlobalShortcut(e: KeyboardEvent) {
    const { CTRL_KEY, SHIFT_KEY, ALT_KEY, KEY } = extractKeys(e);
    const formattedShortcut = formatShortcut({ CTRL_KEY, SHIFT_KEY, ALT_KEY, KEY });

    for (let { shortcut, handler } of GLOBAL_SHORTCUTS) {
      if (shortcut.toLowerCase() === formattedShortcut) {
        e.preventDefault();
        handler();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", bindGlobalShortcut);

    return () => {
      document.removeEventListener("keyup", bindGlobalShortcut);
    };
  }, []);
}
