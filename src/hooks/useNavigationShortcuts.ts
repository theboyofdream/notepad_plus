import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { NAVIGATION_SHORTCUTS } from "../constants/keyboard-shortcuts";
import { extractKeys, formatShortcut } from "./helpers";

export function useNavigationShortcuts() {
  const navigate = useNavigate();

  function bindNavigationShortcut(e: KeyboardEvent) {

    const { CTRL_KEY, KEY } = extractKeys(e);
    const formattedShortcut = formatShortcut({ CTRL_KEY, KEY });

    for (let { shortcut, to } of NAVIGATION_SHORTCUTS) {
      if (shortcut.toLowerCase() === formattedShortcut) {
        e.preventDefault();
        navigate({ to });
        return;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", bindNavigationShortcut);

    return () => {
      document.removeEventListener("keyup", bindNavigationShortcut);
    };
  }, []);
}
